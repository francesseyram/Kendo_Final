import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-paystack-signature")

    if (!signature) {
      return NextResponse.json(
        { success: false, message: "Missing signature" },
        { status: 401 }
      )
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not configured")
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
      console.error("Invalid webhook signature")
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 401 }
      )
    }

    const event = JSON.parse(body)

    // Handle different event types
    switch (event.event) {
      case "charge.success":
        await handleSuccessfulPayment(event.data)
        break
      case "charge.failure":
        await handleFailedPayment(event.data)
        break
      case "transfer.success":
        await handleSuccessfulTransfer(event.data)
        break
      default:
        console.log(`Unhandled event type: ${event.event}`)
    }

    return NextResponse.json({ success: true, message: "Webhook processed" })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error processing webhook",
      },
      { status: 500 }
    )
  }
}

async function handleSuccessfulPayment(data: any) {
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
  }

  // Log transaction
  await logTransaction({
    ...transaction,
    event_type: "charge.success",
  })

  // Send email receipt to donor
  if (transaction.email) {
    const { sendDonorReceipt } = await import("@/lib/email")
    await sendDonorReceipt({
      email: transaction.email,
      amount: transaction.amount,
      currency: transaction.currency,
      reference: transaction.reference,
      donation_type: transaction.metadata?.custom_fields?.find(
        (f: any) => f.variable_name === "donation_type"
      )?.value || "General Donation",
      paid_at: transaction.paid_at,
    })
  }

  // Update analytics (tracked server-side)
  console.log("Analytics Track - Donation Completed:", {
    event: "donation_completed",
    amount: transaction.amount,
    currency: transaction.currency,
    donation_type: transaction.metadata?.custom_fields?.find(
      (f: any) => f.variable_name === "donation_type"
    )?.value || "General Donation",
    channel: transaction.channel,
    reference: transaction.reference,
    timestamp: new Date().toISOString(),
  })
}

async function handleFailedPayment(data: any) {
  await logTransaction({
    reference: data.reference,
    amount: data.amount / 100,
    currency: data.currency,
    email: data.customer?.email,
    metadata: data.metadata,
    status: data.status,
    gateway_response: data.gateway_response,
    channel: data.channel,
    created_at: data.created_at,
    event_type: "charge.failure",
  })

  console.log(`Payment failed for reference: ${data.reference}`)
}

async function handleSuccessfulTransfer(data: any) {
  console.log(`Transfer successful: ${data.reference}`)
  // Handle transfer events if needed
}

async function logTransaction(transaction: any) {
  try {
    // Log to console with timestamp
    const logEntry = {
      timestamp: new Date().toISOString(),
      ...transaction,
    }
    console.log("Transaction Log:", JSON.stringify(logEntry, null, 2))

    // TODO: Add database logging here
    // Example with Prisma:
    // await prisma.transaction.create({ data: logEntry })

    // Or log to file:
    // await fs.appendFile('transactions.log', JSON.stringify(logEntry) + '\n')
  } catch (error) {
    console.error("Failed to log transaction:", error)
  }
}

