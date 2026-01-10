import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Reference is required" },
        { status: 400 }
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

    // Verify transaction with Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    )

    const data = await response.json()

    if (!response.ok || !data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Transaction verification failed",
        },
        { status: response.status }
      )
    }

    // Transaction is successful
    if (data.data.status === "success") {
      const transaction = data.data

      // Log transaction
      await logTransaction({
        reference: transaction.reference,
        amount: transaction.amount / 100, // Convert from pesewas to GHS
        currency: transaction.currency,
        email: transaction.customer?.email,
        metadata: transaction.metadata,
        status: transaction.status,
        gateway_response: transaction.gateway_response,
        channel: transaction.channel,
        paid_at: transaction.paid_at,
        created_at: transaction.created_at,
      })

      return NextResponse.json({
        success: true,
        transaction: {
          reference: transaction.reference,
          amount: transaction.amount / 100,
          currency: transaction.currency,
          email: transaction.customer?.email,
          status: transaction.status,
          paid_at: transaction.paid_at,
          metadata: transaction.metadata,
        },
      })
    }

    return NextResponse.json({
      success: false,
      message: "Transaction not successful",
      transaction: data.data,
    })
  } catch (error) {
    console.error("Transaction verification error:", error)
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
  created_at: string
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
