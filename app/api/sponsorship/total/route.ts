import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

/**
 * Get current sponsorship total for Tunis International Open
 * GET /api/sponsorship/total
 * 
 * Returns the total amount received for the sponsorship campaign
 */

const SPONSORSHIP_DATA_PATH = path.join(process.cwd(), "data", "sponsorship.json")

async function readSponsorshipTotal(): Promise<number> {
  try {
    const fileContent = await fs.readFile(SPONSORSHIP_DATA_PATH, "utf-8")
    const data = JSON.parse(fileContent)
    return data.amountReceived || 0 // Returns GHS
  } catch (error) {
    // If file doesn't exist, initialize from config
    const { TUNIS_SPONSORSHIP_CONFIG } = await import("@/lib/config/sponsorship")
    const initialAmount = TUNIS_SPONSORSHIP_CONFIG.amountReceived // Already in GHS
    
    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(SPONSORSHIP_DATA_PATH), { recursive: true })
    
    // Write initial file
    await fs.writeFile(
      SPONSORSHIP_DATA_PATH,
      JSON.stringify({ amountReceived: initialAmount }, null, 2),
      "utf-8"
    )
    
    return initialAmount
  }
}

async function writeSponsorshipTotal(amountGHS: number): Promise<void> {
  // Create directory if it doesn't exist
  await fs.mkdir(path.dirname(SPONSORSHIP_DATA_PATH), { recursive: true })
  
  await fs.writeFile(
    SPONSORSHIP_DATA_PATH,
    JSON.stringify({ amountReceived: amountGHS }, null, 2),
    "utf-8"
  )
}

export async function GET(request: NextRequest) {
  try {
    const { convertGhsToUsd, TUNIS_SPONSORSHIP_CONFIG } = await import("@/lib/config/sponsorship")
    
    const totalGHS = await readSponsorshipTotal() // Already in GHS
    const totalUSD = convertGhsToUsd(totalGHS)
    
    const targetGHS = TUNIS_SPONSORSHIP_CONFIG.totalBudget // Already in GHS
    const targetUSD = convertGhsToUsd(targetGHS)

    return NextResponse.json({
      success: true,
      amountReceived: {
        ghs: totalGHS,
        usd: totalUSD,
      },
      targetAmount: {
        ghs: targetGHS,
        usd: targetUSD,
      },
      progress: (totalGHS / targetGHS) * 100,
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

    const { convertGhsToUsd } = await import("@/lib/config/sponsorship")

    // Read current total (already in GHS) and add new amount (also in GHS)
    const currentTotal = await readSponsorshipTotal()
    const newTotal = currentTotal + amountGHS

    // Write updated total (in GHS)
    await writeSponsorshipTotal(newTotal)

    const newTotalUSD = convertGhsToUsd(newTotal)
    const addedUSD = convertGhsToUsd(amountGHS)

    console.log("[SPONSORSHIP_TOTAL] Updated:", {
      added: { ghs: amountGHS, usd: addedUSD },
      newTotal: { ghs: newTotal, usd: newTotalUSD },
    })

    return NextResponse.json({
      success: true,
      total: {
        ghs: newTotal,
        usd: newTotalUSD,
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
