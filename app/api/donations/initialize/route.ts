import { NextRequest, NextResponse } from "next/server"

/**
 * Production-ready Paystack Donation Initialization Endpoint
 * POST /api/donations/initialize
 * 
 * Initializes a donation transaction with Paystack
 * Returns authorization URL and reference for frontend redirect
 */

interface InitializeRequest {
  amount: number // Amount in GHS (will be converted to pesewas)
  email: string
  currency?: string
  name?: string
  anonymous?: boolean
  metadata?: {
    campaign?: string
    donation_type?: string
    [key: string]: any
  }
}

const MIN_AMOUNT_GHS = 1 // Minimum donation amount in GHS
const MAX_AMOUNT_GHS = 1000000 // Maximum donation amount in GHS
const PAYSTACK_API_TIMEOUT = 10000 // 10 seconds

export async function POST(request: NextRequest) {
  try {
    // Check if production mode
    const isProduction = process.env.NODE_ENV === "production"
    const secretKey = process.env.PAYSTACK_SECRET_KEY

    if (!secretKey) {
      console.error("[DONATION_INIT] PAYSTACK_SECRET_KEY not configured")
      return NextResponse.json(
        { 
          success: false, 
          message: "Payment gateway not configured" 
        },
        { status: 500 }
      )
    }

    // Validate secret key is live key in production
    if (isProduction && !secretKey.startsWith("sk_live_")) {
      console.error("[DONATION_INIT] Production mode requires live Paystack key")
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid payment configuration" 
        },
        { status: 500 }
      )
    }

    const body: InitializeRequest = await request.json()

    // Validate required fields
    if (!body.amount || !body.email) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Amount and email are required" 
        },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid email address" 
        },
        { status: 400 }
      )
    }

    // Validate amount
    if (body.amount < MIN_AMOUNT_GHS) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Minimum donation amount is ₵${MIN_AMOUNT_GHS}` 
        },
        { status: 400 }
      )
    }

    if (body.amount > MAX_AMOUNT_GHS) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Maximum donation amount is ₵${MAX_AMOUNT_GHS}` 
        },
        { status: 400 }
      )
    }

    // Convert GHS to pesewas (Paystack uses smallest currency unit)
    const amountInPesewas = Math.round(body.amount * 100)
    const currency = body.currency || "GHS"

    // Generate unique reference
    const reference = `GKF_${Date.now()}_${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // Prepare metadata
    const metadata: Record<string, any> = {
      ...body.metadata,
      donation_type: body.metadata?.donation_type || "General Donation",
      anonymous: body.anonymous || false,
      donor_name: body.name || null,
      campaign: body.metadata?.campaign || "General",
    }

    // Prepare Paystack initialization payload
    const paystackPayload = {
      email: body.email,
      amount: amountInPesewas,
      currency: currency,
      reference: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: metadata.donation_type,
          },
          {
            display_name: "Campaign",
            variable_name: "campaign",
            value: metadata.campaign,
          },
          ...(body.name ? [{
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: body.name,
          }] : []),
          {
            display_name: "Anonymous",
            variable_name: "anonymous",
            value: body.anonymous ? "Yes" : "No",
          },
        ],
        ...metadata,
      },
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.APP_BASE_URL || "https://kendoghana.com"}/donate/success?ref=${reference}`,
    }

    // Initialize transaction with Paystack API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), PAYSTACK_API_TIMEOUT)

    try {
      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paystackPayload),
          signal: controller.signal,
        }
      )

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("[DONATION_INIT] Paystack API error:", errorData)
        return NextResponse.json(
          { 
            success: false, 
            message: errorData.message || "Failed to initialize payment" 
          },
          { status: response.status }
        )
      }

      const data = await response.json()

      if (!data.status || !data.data) {
        return NextResponse.json(
          { 
            success: false, 
            message: "Invalid response from payment gateway" 
          },
          { status: 500 }
        )
      }

      // Log initialization (non-sensitive data)
      console.log("[DONATION_INIT] Transaction initialized:", {
        reference,
        amount: body.amount,
        currency,
        email: body.email.substring(0, 3) + "***", // Partial email for logging
        timestamp: new Date().toISOString(),
      })

      // Return authorization URL and reference
      return NextResponse.json({
        success: true,
        data: {
          authorization_url: data.data.authorization_url,
          access_code: data.data.access_code,
          reference: reference,
        },
      })
    } catch (error: any) {
      clearTimeout(timeoutId)
      
      if (error.name === "AbortError") {
        console.error("[DONATION_INIT] Paystack API timeout")
        return NextResponse.json(
          { 
            success: false, 
            message: "Payment gateway timeout. Please try again." 
          },
          { status: 504 }
        )
      }

      throw error
    }
  } catch (error: any) {
    console.error("[DONATION_INIT] Unexpected error:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error" 
      },
      { status: 500 }
    )
  }
}
