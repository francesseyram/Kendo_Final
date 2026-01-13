# 2nd Tunis International Open Sponsorship Campaign

## 📋 Overview

This document describes the special sponsorship donation campaign for the **2nd Tunis International Open Championships** that has been integrated into the existing donation system.

## 🎯 Campaign Details

- **Event Name:** 2nd Tunis International Open Championships
- **Location:** Tunisia
- **Dates:** 28th – 29th November 2026
- **Purpose:** Raise sponsorship funds to support Ghana's Kendo team

## 👥 Team Composition

- Male players: 8
- Female players: 3
- **Total players: 11**

## 💰 Budget Breakdown

- **Air Ticket:** 11 × $1,100 = **$12,100**
- **Hotel & Meals:** 11 × $500 = **$5,500**
- **Total Budget Required:** **$17,500**
- **Amount Already Received:** **$100** (Anonymous donor)
- **Outstanding Sponsorship Target:** **$17,400**

## 🔧 Implementation Details

### Files Created

1. **`components/donate/tunis-sponsorship-card.tsx`**
   - Main sponsorship campaign card component
   - Displays event details, budget breakdown, and progress
   - Includes preset donation amounts and custom amount option

2. **`components/donate/tunis-sponsorship-form.tsx`**
   - Donation form for sponsorship contributions
   - Handles USD to GHS conversion for Paystack
   - Supports anonymous donations

3. **`lib/config/sponsorship.ts`**
   - Centralized configuration for sponsorship campaign
   - Easy to update `amountReceived` as donations come in
   - Currency conversion utilities

### Files Modified

1. **`app/donate/page.tsx`**
   - Added sponsorship card at the top of the donate page
   - Appears before regular donation tiers

2. **`components/donate/paystack-payment-button.tsx`**
   - Extended to support campaign metadata
   - Added props: `campaign`, `donationType`, `anonymous`, `metadata`
   - Properly tags donations with sponsorship information

## 📊 Progress Tracking

The sponsorship card displays:
- **Progress bar** showing percentage funded
- **Amount received** vs **Total target**
- **Outstanding amount** needed

### Updating Progress

To update the amount received as donations come in:

1. Open `lib/config/sponsorship.ts`
2. Update the `amountReceived` value:
   ```typescript
   amountReceived: 100, // Change this value
   ```
3. Save the file - the progress will update automatically

## 💳 Donation Flow

### Metadata Tagging

When a user donates via the sponsorship section, the donation is tagged with:

```json
{
  "donationType": "SPONSORSHIP",
  "campaign": "2nd Tunis International Open Championships",
  "year": 2026,
  "event_location": "Tunisia",
  "event_dates": "28th – 29th November 2026",
  "amount_usd": 100,
  "amount_ghs": 1500,
  "anonymous": false
}
```

This metadata is:
- Sent to Paystack in the transaction
- Stored in the backend (via webhook)
- Available for reporting and analytics

## 🔄 Currency Conversion

Since Paystack in Ghana uses GHS (Ghana Cedis), USD amounts are automatically converted:

- **Conversion Rate:** 1 USD = 15 GHS (configurable in `lib/config/sponsorship.ts`)
- **Update Rate:** Change `usdToGhsRate` in the config file as needed

## 🎨 Features

### Preset Amounts
- $50, $100, $250, $500, $1000 (USD)
- Custom amount option

### Anonymous Donations
- Optional checkbox to make donation anonymous
- Properly tagged in metadata

### Progress Display
- Real-time progress bar
- Percentage funded
- Outstanding amount clearly displayed

## 📝 Backend Integration

The sponsorship donations use the **exact same backend** as regular donations:

- ✅ Same Paystack initialization endpoint
- ✅ Same verification endpoint
- ✅ Same webhook handler
- ✅ Same database schema

**Only difference:** Metadata includes campaign information for easy filtering/reporting.

## 🔍 Identifying Sponsorship Donations

In the backend/admin views, sponsorship donations can be identified by:

1. **Metadata field:** `donation_type === "SPONSORSHIP"`
2. **Campaign field:** `campaign === "2nd Tunis International Open Championships"`
3. **Custom fields in Paystack:** Check `metadata.custom_fields` for campaign info

## 🚀 Future Enhancements

Potential improvements:
- [ ] Real-time progress updates from database
- [ ] Admin panel to update `amountReceived`
- [ ] Email notifications for campaign milestones
- [ ] Donor wall/recognition for sponsors
- [ ] Campaign-specific analytics dashboard

## 📞 Support

For questions or updates:
1. Update `amountReceived` in `lib/config/sponsorship.ts`
2. Update `usdToGhsRate` if exchange rate changes
3. Modify preset amounts in the config file if needed

---

**Note:** All sponsorship donations flow through the same secure Paystack payment system as regular donations, ensuring consistency and reliability.
