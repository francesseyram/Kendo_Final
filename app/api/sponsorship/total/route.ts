import { NextRequest, NextResponse } from "next/server"

/**
 * Get current sponsorship total for Tunis International Open
 * GET /api/sponsorship/total
 * 
 * Returns the total amount received for the sponsorship campaign
 */

// In-memory storage (in production, this would come from database)
// This tracks only sponsorship donations for the Tunis campaign
// Initialize from config
let sponsorshipTotal: number | null = null

async function getInitialAmount() {
  if (sponsorshipTotal === null) {
    const { TUNIS_SPONSORSHIP_CONFIG } = await import("@/lib/config/sponsorship")
    sponsorshipTotal = TUNIS_SPONSORSHIP_CONFIG.amountReceived
  }
  return sponsorshipTotal
}

export async function GET(request: NextRequest) {
  try {
    const { convertUsdToGhs } = await import("@/lib/config/sponsorship")
    
    const totalUSD = await getInitialAmount()
    const totalGHS = convertUsdToGhs(totalUSD)

    return NextResponse.json({
      success: true,
      amountReceived: {
        usd: totalUSD,
        ghs: totalGHS,
      },
    })
  } catch (error) {
    console.error("[SPONSORSHIP_TOTAL] Error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to get sponsorship total" },
      { status: 500 }
    )
  }
}

/**
 * Update sponsorship total (called by webhook)
 * POST /api/sponsorship/total
 */
export async function POST(request: NextRequest) {
  try {
    const { amountGHS } = await request.json()

    if (!amountGHS || typeof amountGHS !== "number") {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      )
    }

    // Initialize if needed
    await getInitialAmount()

    const { convertGhsToUsd, convertUsdToGhs } = await import("@/lib/config/sponsorship")
    const amountUSD = convertGhsToUsd(amountGHS)

    // Add to total
    sponsorshipTotal! += amountUSD

    console.log("[SPONSORSHIP_TOTAL] Updated:", {
      added: { ghs: amountGHS, usd: amountUSD },
      newTotal: { ghs: convertUsdToGhs(sponsorshipTotal!), usd: sponsorshipTotal },
    })

    return NextResponse.json({
      success: true,
      total: {
        usd: sponsorshipTotal,
        ghs: convertUsdToGhs(sponsorshipTotal!),
      },
    })
  } catch (error) {
    console.error("[SPONSORSHIP_TOTAL] Update error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update sponsorship total" },
      { status: 500 }
    )
  }
}
