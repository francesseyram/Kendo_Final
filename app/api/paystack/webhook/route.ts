import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

/**
 * Production-ready Paystack Webhook Handler
 * POST /api/paystack/webhook
 * 
 * Handles Paystack webhook events securely with signature verification
 * Implements idempotency to prevent duplicate processing
 */

// In-memory idempotency store (in production, use Redis or database)
const processedEvents = new Map<string, Date>()
const IDEMPOTENCY_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  let eventId: string | null = null

  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    if (!signature) {
      console.error("[WEBHOOK] Missing signature header")
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 401 }
      )
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY

    if (!secretKey) {
      console.error("[WEBHOOK] PAYSTACK_SECRET_KEY not configured")
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      )
    }

    // Verify webhook signature
    const hash = crypto
      .createHmac("sha512", secretKey)
      .update(body)
      .digest("hex")

    if (hash !== signature) {
      console.error("[WEBHOOK] Invalid signature - potential security threat")
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      )
    }

    const event = JSON.parse(body)
    eventId = event.data?.reference || event.id || `event_${Date.now()}`

    // Ensure eventId is never null
    if (!eventId) {
      eventId = `event_${Date.now()}`
    }

    // Idempotency check - prevent duplicate processing
    if (processedEvents.has(eventId)) {
      const processedAt = processedEvents.get(eventId)!
      const age = Date.now() - processedAt.getTime()
      
      if (age < IDEMPOTENCY_TTL) {
        console.log(`[WEBHOOK] Event already processed: ${eventId} (${age}ms ago)`)
        return NextResponse.json({ 
          success: true, 
          message: "Event already processed",
          event_id: eventId,
        })
      } else {
        // Clean up old entry
        processedEvents.delete(eventId)
      }
    }

    // Mark event as processing
    processedEvents.set(eventId, new Date())

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        await handleSuccessfulPayment(event.data, eventId)
        break
      case "charge.failure":
        await handleFailedPayment(event.data, eventId)
        break
      case "transfer.success":
        await handleSuccessfulTransfer(event.data, eventId)
        break
      default:
        console.log(`[WEBHOOK] Unhandled event type: ${event.event}`, { eventId })
    }

    const processingTime = Date.now() - startTime
    console.log(`[WEBHOOK] Processed ${event.event} in ${processingTime}ms`, { eventId })

    // Return 200 OK immediately (Paystack expects quick response)
    return NextResponse.json({ 
      success: true, 
      message: "Webhook processed",
      event_id: eventId,
      processing_time_ms: processingTime,
    })
  } catch (error: any) {
    console.error("[WEBHOOK] Processing error:", {
      error: error.message,
      eventId,
      stack: error.stack,
    })

    // Still return 200 to prevent Paystack retries for malformed requests
    // But log the error for investigation
    return NextResponse.json(
      {
        success: false,
        message: "Webhook processing error (logged)",
        event_id: eventId,
      },
      { status: 200 } // Return 200 to prevent Paystack retries
    )
  }
}

async function handleSuccessfulPayment(data: any, eventId: string) {
  try {
    const transaction = {
      reference: data.reference,
      amount: data.amount / 100, // Convert from pesewas to GHS
      currency: data.currency,
      email: data.customer?.email || data.customer?.email_address,
      metadata: data.metadata,
      status: data.status,
      gateway_response: data.gateway_response,
      channel: data.channel,
      paid_at: data.paid_at,
      created_at: data.created_at,
      authorization: data.authorization,
      event_id: eventId,
    }

    // Validate required fields
    if (!transaction.reference || !transaction.amount) {
      console.error("[WEBHOOK] Invalid transaction data in charge.success", { eventId })
      return
    }

    // Check if this is a sponsorship donation
    const donationType = transaction.metadata?.donation_type || 
                        transaction.metadata?.custom_fields?.find(
                          (f: any) => f.variable_name === "donation_type"
                        )?.value
    const isSponsorship = donationType === "SPONSORSHIP" || 
                         transaction.metadata?.campaign === "2nd Tunis International Open Championships"

    // Save transaction to database (idempotent - upsert by reference)
    const { saveDonation } = await import("@/lib/db/transactions")
    await saveDonation({
      reference: transaction.reference,
      email: transaction.email || "",
      amount: transaction.amount,
      currency: transaction.currency,
      status: "PAID",
      anonymous: transaction.metadata?.anonymous === true,
      metadata: transaction.metadata,
      payment_channel: transaction.channel,
      paid_at: transaction.paid_at,
      verified_at: new Date().toISOString(),
      event_id: eventId,
      gateway_response: transaction.gateway_response,
    })

    // Update sponsorship total if this is a sponsorship donation
    if (isSponsorship) {
      try {
        const { convertGhsToUsd } = await import("@/lib/config/sponsorship")
        const { promises: fs } = await import("fs")
        const path = await import("path")
        
        const dataPath = path.join(process.cwd(), "data", "sponsorship.json")
        // transaction.amount is already in GHS, no conversion needed
        
        // Read current total (already in GHS)
        let currentTotal = 0
        try {
          const fileContent = await fs.readFile(dataPath, "utf-8")
          const data = JSON.parse(fileContent)
          currentTotal = data.amountReceived || 0
        } catch {
          // File doesn't exist, initialize from config
          const { TUNIS_SPONSORSHIP_CONFIG } = await import("@/lib/config/sponsorship")
          currentTotal = TUNIS_SPONSORSHIP_CONFIG.amountReceived // Already in GHS
        }
        
        // Update total (both amounts are in GHS)
        const newTotal = currentTotal + transaction.amount
        
        // Ensure directory exists
        await fs.mkdir(path.dirname(dataPath), { recursive: true })
        
        // Write updated total (in GHS)
        await fs.writeFile(
          dataPath,
          JSON.stringify({ amountReceived: newTotal }, null, 2),
          "utf-8"
        )
        
        const addedUSD = convertGhsToUsd(transaction.amount)
        const newTotalUSD = convertGhsToUsd(newTotal)
        
        console.log("[WEBHOOK] Sponsorship total updated:", {
          added: { ghs: transaction.amount, usd: addedUSD },
          newTotal: { ghs: newTotal, usd: newTotalUSD },
        })
      } catch (updateError) {
        // Don't fail webhook if sponsorship update fails
        console.error("[WEBHOOK] Error updating sponsorship total:", updateError)
      }
    }

    // Also log for monitoring
    await logTransaction({
      ...transaction,
      event_type: "charge.success",
      webhook_received_at: new Date().toISOString(),
    })

    // Send email receipt to donor (idempotent - email service should handle duplicates)
    if (transaction.email) {
      try {
        const { sendDonorReceipt } = await import("@/lib/email")
        await sendDonorReceipt({
          email: transaction.email,
          amount: transaction.amount,
          currency: transaction.currency,
          reference: transaction.reference,
          donation_type: donationType || "General Donation",
          paid_at: transaction.paid_at,
          donor_name: transaction.metadata?.custom_fields?.find(
            (f: any) => f.variable_name === "donor_name"
          )?.value,
        })
        console.log("[WEBHOOK] Receipt email sent:", transaction.reference)
      } catch (emailError) {
        // Don't fail webhook if email fails
        console.error("[WEBHOOK] Failed to send receipt email:", emailError)
      }
    }

    // Update analytics (tracked server-side)
    console.log("[WEBHOOK] Analytics - Donation Completed:", {
      event: "donation_completed",
      amount: transaction.amount,
      currency: transaction.currency,
      donation_type: donationType || "General Donation",
      channel: transaction.channel,
      reference: transaction.reference,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[WEBHOOK] Error handling successful payment:", error)
    throw error // Re-throw to be caught by main handler
  }
}

async function handleFailedPayment(data: any, eventId: string) {
  try {
    // Save failed transaction to database
    const { saveDonation } = await import("@/lib/db/transactions")
    await saveDonation({
      reference: data.reference,
      email: data.customer?.email || data.customer?.email_address || "",
      amount: data.amount / 100,
      currency: data.currency,
      status: "FAILED",
      anonymous: data.metadata?.anonymous === true,
      metadata: data.metadata,
      payment_channel: data.channel,
      event_id: eventId,
      gateway_response: data.gateway_response,
    })

    // Also log for monitoring
    await logTransaction({
      reference: data.reference,
      amount: data.amount / 100,
      currency: data.currency,
      email: data.customer?.email || data.customer?.email_address,
      metadata: data.metadata,
      status: data.status,
      gateway_response: data.gateway_response,
      channel: data.channel,
      created_at: data.created_at,
      event_type: "charge.failure",
      event_id: eventId,
      webhook_received_at: new Date().toISOString(),
    })

    console.log(`[WEBHOOK] Payment failed: ${data.reference}`, {
      reason: data.gateway_response,
      eventId,
    })
  } catch (error) {
    console.error("[WEBHOOK] Error handling failed payment:", error)
    throw error
  }
}

async function handleSuccessfulTransfer(data: any, eventId: string) {
  try {
    console.log(`[WEBHOOK] Transfer successful: ${data.reference}`, { eventId })
    // Handle transfer events if needed (e.g., payouts to vendors)
    // This is typically not needed for donation flows
  } catch (error) {
    console.error("[WEBHOOK] Error handling transfer:", error)
    throw error
  }
}

async function logTransaction(transaction: any) {
  try {
    // Log to console with structured data
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...transaction,
    }
    
    // Use structured logging for better production monitoring
    console.log(JSON.stringify({
      type: "TRANSACTION_LOG",
      ...logEntry,
    }))

    // TODO: Add database logging here
    // Example with Prisma:
    // await prisma.donation.create({
    //   data: {
    //     reference: transaction.reference,
    //     amount: transaction.amount,
    //     currency: transaction.currency,
    //     email: transaction.email,
    //     status: transaction.status === "success" ? "PAID" : "FAILED",
    //     payment_channel: transaction.channel,
    //     metadata: transaction.metadata,
    //     verified_at: transaction.verified_at || transaction.webhook_received_at,
    //     created_at: transaction.created_at,
    //   }
    // })

    // Or log to file system:
    // const fs = await import('fs/promises')
    // await fs.appendFile(
    //   'logs/transactions.log', 
    //   JSON.stringify(logEntry) + '\n'
    // )
  } catch (error) {
    console.error("[LOG] Failed to log transaction:", error)
    // Don't throw - logging failures shouldn't break the flow
  }
}

