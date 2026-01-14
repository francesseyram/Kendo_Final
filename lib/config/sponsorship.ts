/**
 * Sponsorship Campaign Configuration
 * 
 * Update these values as donations are received and campaign progresses
 */

export const TUNIS_SPONSORSHIP_CONFIG = {
  eventName: "2nd Tunis International Open Championships",
  location: "Tunisia",
  dates: "28th – 29th November 2026",
  
  // Budget information (GHS - Cedis)
  totalBudget: 192500, // $17,500 USD = ₵192,500 GHS
  amountReceived: 1101.98, // UPDATE THIS VALUE as donations come in (in GHS)
  // Note: All amounts are stored in GHS (Cedis) in the backend
  
  // Team composition
  team: {
    male: 8,
    female: 3,
    total: 11,
  },
  
  // Budget breakdown (per person in GHS - Cedis)
  budget: {
    airTicket: 12100, // $1,100 USD = ₵12,100 GHS
    hotelMeals: 5500, // $500 USD = ₵5,500 GHS
  },
  
  // Currency conversion (update as needed)
  // Paystack in Ghana uses GHS, so USD amounts need conversion
  usdToGhsRate: 11, // 1 USD = 11 GHS
  
  // Preset donation amounts (GHS - Cedis)
  // These are approximate USD equivalents: $50≈₵550, $100≈₵1,100, $250≈₵2,750, $500≈₵5,500, $1,000≈₵11,000
  presetAmounts: [550, 1100, 2750, 5500, 11000],
}

/**
 * Calculate outstanding amount (in GHS)
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
 * Note: Already stored in GHS, returns as-is
 */
export function getTotalBudgetGhs(): number {
  return TUNIS_SPONSORSHIP_CONFIG.totalBudget
}

/**
 * Get amount received in GHS (Cedis)
 * Note: Already stored in GHS, returns as-is
 */
export function getAmountReceivedGhs(): number {
  return TUNIS_SPONSORSHIP_CONFIG.amountReceived
}
