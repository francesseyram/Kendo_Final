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
  amountReceived: 100.18, // UPDATE THIS VALUE as donations come in (in USD)
  // Note: When donations come in GHS, convert to USD using: USD = GHS / 11
  // Updated: Added 2 GHS (₵2) = 0.18 USD
  
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
  usdToGhsRate: 11, // 1 USD = 11 GHS
  
  // Preset donation amounts (GHS - Cedis)
  // These are approximate USD equivalents: $50≈₵550, $100≈₵1,100, $250≈₵2,750, $500≈₵5,500, $1,000≈₵11,000
  presetAmounts: [550, 1100, 2750, 5500, 11000],
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

/**
 * Convert GHS to USD
 */
export function convertGhsToUsd(ghsAmount: number): number {
  return ghsAmount / TUNIS_SPONSORSHIP_CONFIG.usdToGhsRate
}

/**
 * Get total budget in GHS (Cedis)
 */
export function getTotalBudgetGhs(): number {
  return convertUsdToGhs(TUNIS_SPONSORSHIP_CONFIG.totalBudget)
}

/**
 * Get amount received in GHS (Cedis)
 * Note: amountReceived is stored in USD, convert to GHS
 */
export function getAmountReceivedGhs(): number {
  return convertUsdToGhs(TUNIS_SPONSORSHIP_CONFIG.amountReceived)
}
