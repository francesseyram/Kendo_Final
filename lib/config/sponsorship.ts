/**
 * Sponsorship Campaign Configuration
 * 
 * Update these values as donations are received and campaign progresses
 */

export const TUNIS_SPONSORSHIP_CONFIG = {
  eventName: "2nd Tunis International Open Championships",
  location: "Tunisia",
  dates: "28th – 29th November 2026",
  
  // Budget information (USD)
  totalBudget: 17500,
  amountReceived: 100, // UPDATE THIS VALUE as donations come in
  
  // Team composition
  team: {
    male: 8,
    female: 3,
    total: 11,
  },
  
  // Budget breakdown (per person in USD)
  budget: {
    airTicket: 1100,
    hotelMeals: 500,
  },
  
  // Currency conversion (update as needed)
  // Paystack in Ghana uses GHS, so USD amounts need conversion
  usdToGhsRate: 15, // Update this rate as needed
  
  // Preset donation amounts (USD)
  presetAmounts: [50, 100, 250, 500, 1000],
}

/**
 * Calculate outstanding amount
 */
export function getOutstandingAmount(): number {
  return TUNIS_SPONSORSHIP_CONFIG.totalBudget - TUNIS_SPONSORSHIP_CONFIG.amountReceived
}

/**
 * Calculate progress percentage
 */
export function getProgressPercentage(): number {
  return (TUNIS_SPONSORSHIP_CONFIG.amountReceived / TUNIS_SPONSORSHIP_CONFIG.totalBudget) * 100
}

/**
 * Convert USD to GHS for Paystack
 */
export function convertUsdToGhs(usdAmount: number): number {
  return usdAmount * TUNIS_SPONSORSHIP_CONFIG.usdToGhsRate
}
