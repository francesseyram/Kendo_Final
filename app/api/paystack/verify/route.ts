import { NextRequest, NextResponse } from "next/server"

/**
 * Production-ready Payment Verification Endpoint
 * POST /api/paystack/verify
 * 
 * Verifies a Paystack transaction and prevents duplicate verification
 */

const PAYSTACK_API_TIMEOUT = 10000 // 10 seconds

// In-memory cache for verified transactions (in production, use Redis or database)
const verifiedCache = new Map<string, { verifiedAt: Date; transaction: any }>()
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference is required" },
        { status: 400 }
      )
    }

    // Validate reference format
    if (!reference.startsWith("GKF_")) {
      return NextResponse.json(
        { success: false, message: "Invalid transaction reference" },
        { status: 400 }
      )
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY

    if (!secretKey) {
      console.error("[VERIFY] PAYSTACK_SECRET_KEY not configured")
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      )
    }

    // Check cache for already verified transactions (idempotency)
    const cached = verifiedCache.get(reference)
    if (cached && Date.now() - cached.verifiedAt.getTime() < CACHE_TTL) {
      console.log("[VERIFY] Returning cached verification for:", reference)
      return NextResponse.json({
        success: true,
        transaction: cached.transaction,
        cached: true,
      })
    }

    // Verify transaction with Paystack API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), PAYSTACK_API_TIMEOUT)

    let response: Response
    let data: any

    try {
      response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        }
      )

      clearTimeout(timeoutId)
      data = await response.json()
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      if (error.name === "AbortError") {
        console.error("[VERIFY] Paystack API timeout for:", reference)
        return NextResponse.json(
          { 
            success: false, 
            message: "Verification timeout. Please try again." 
          },
          { status: 504 }
        )
      }
      throw error
    }

    if (!response.ok || !data.status) {
      console.error("[VERIFY] Paystack API error:", {
        reference,
        status: response.status,
        message: data.message,
      })
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Transaction verification failed",
        },
        { status: response.status }
      )
    }

    const transaction = data.data

    // Validate transaction data
    if (!transaction.reference || !transaction.amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid transaction data received",
        },
        { status: 500 }
      )
    }

    // Transaction is successful
    if (transaction.status === "success") {
      const transactionData = {
        reference: transaction.reference,
        amount: transaction.amount / 100, // Convert from pesewas to GHS
        currency: transaction.currency,
        email: transaction.customer?.email || transaction.customer?.email_address,
        status: transaction.status,
        paid_at: transaction.paid_at,
        metadata: transaction.metadata,
        channel: transaction.channel,
        gateway_response: transaction.gateway_response,
        donation_type: transaction.metadata?.custom_fields?.find(
          (f: any) => f.variable_name === "donation_type"
        )?.value || "General Donation",
      }

      // Save transaction to database
      const { saveDonation } = await import("@/lib/db/transactions")
      await saveDonation({
        reference: transaction.reference,
        email: transactionData.email || "",
        amount: transactionData.amount,
        currency: transactionData.currency,
        status: "PAID",
        anonymous: transaction.metadata?.anonymous === true,
        metadata: transaction.metadata,
        payment_channel: transactionData.channel,
        paid_at: transactionData.paid_at,
        verified_at: new Date().toISOString(),
        gateway_response: transactionData.gateway_response,
      })

      // Update sponsorship campaign total if this is a sponsorship donation
      const metadata = transaction.metadata
      if (
        metadata?.donation_type === "SPONSORSHIP" ||
        (transactionData.donation_type === "SPONSORSHIP" &&
         metadata?.campaign === "2nd Tunis International Kendo Open Championships")
      ) {
        try {
          const { promises: fs } = await import("fs")
          const path = await import("path")
          
          const dataPath = path.join(process.cwd(), "data", "sponsorship.json")
          // transactionData.amount is already in GHS, no conversion needed
          const amountGHS = transactionData.amount
          
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
          const newTotal = currentTotal + amountGHS
          
          // Ensure directory exists
          await fs.mkdir(path.dirname(dataPath), { recursive: true })
          
          // Write updated total (in GHS)
          await fs.writeFile(
            dataPath,
            JSON.stringify({ amountReceived: newTotal }, null, 2),
            "utf-8"
          )
          
          const { convertGhsToUsd } = await import("@/lib/config/sponsorship")
          const addedUSD = convertGhsToUsd(amountGHS)
          const newTotalUSD = convertGhsToUsd(newTotal)
          
          console.log("[VERIFY] Sponsorship total updated:", {
            reference: transaction.reference,
            added: { ghs: amountGHS, usd: addedUSD },
            newTotal: { ghs: newTotal, usd: newTotalUSD },
          })
        } catch (updateError) {
          // Don't fail verification if sponsorship update fails
          console.error("[VERIFY] Error updating sponsorship total:", updateError)
        }
      }

      // Also log for monitoring
      await logTransaction({
        ...transactionData,
        verified_at: new Date().toISOString(),
      })

      // Cache verified transaction
      verifiedCache.set(reference, {
        verifiedAt: new Date(),
        transaction: transactionData,
      })

      // Clean old cache entries (simple cleanup)
      if (verifiedCache.size > 1000) {
        const now = Date.now()
        for (const [key, value] of verifiedCache.entries()) {
          if (now - value.verifiedAt.getTime() > CACHE_TTL) {
            verifiedCache.delete(key)
          }
        }
      }

      return NextResponse.json({
        success: true,
        transaction: transactionData,
      })
    }

    // Transaction not successful
    return NextResponse.json({
      success: false,
      message: `Transaction ${transaction.status}`,
      transaction: {
        reference: transaction.reference,
        status: transaction.status,
        gateway_response: transaction.gateway_response,
      },
    })
  } catch (error: any) {
    console.error("[VERIFY] Unexpected error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during verification",
      },
      { status: 500 }
    )
  }
}

async function logTransaction(transaction: {
  reference: string
  amount: number
  currency: string
  email?: string
  metadata?: any
  status: string
  gateway_response: string
  channel: string
  paid_at?: string
  created_at?: string
  verified_at?: string
}) {
  try {
    // Log to console (in production, you'd log to a database or file)
    console.log("Transaction Log:", JSON.stringify(transaction, null, 2))

    // TODO: Add database logging here (e.g., Prisma, MongoDB, etc.)
    // Example:
    // await prisma.transaction.create({ data: transaction })
  } catch (error) {
    console.error("Failed to log transaction:", error)
  }
}
