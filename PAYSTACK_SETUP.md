# Paystack Integration Setup Guide

This guide will help you set up and configure Paystack payment integration for the Ghana Kendo Federation donation system.

## 🔑 Environment Variables

### Required Keys

Create a `.env.local` file in the root directory with the following:

```env
# Paystack Live Keys (Production)
# Get your keys from: https://dashboard.paystack.com/#/settings/developer
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_YOUR_LIVE_PUBLIC_KEY
PAYSTACK_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://kendoghana.com
```

**⚠️ IMPORTANT:**
- The `PAYSTACK_SECRET_KEY` should NEVER be exposed in client-side code
- Never commit `.env.local` to version control (already in `.gitignore`)
- The public key is safe to expose and is used in the frontend

## 📧 Email Configuration (Optional but Recommended)

Choose one email provider:

### Option 1: Resend (Recommended)

1. Sign up at https://resend.com
2. Create an API key
3. Add to `.env.local`:

```env
RESEND_API_KEY=re_YOUR_API_KEY
FROM_EMAIL=donations@kendoghana.com
FROM_NAME=Ghana Kendo Federation
```

4. Install Resend:
```bash
npm install resend
```

### Option 2: SendGrid

1. Sign up at https://sendgrid.com
2. Create an API key
3. Add to `.env.local`:

```env
SENDGRID_API_KEY=SG.YOUR_API_KEY
FROM_EMAIL=donations@kendoghana.com
```

4. Install SendGrid:
```bash
npm install @sendgrid/mail
```

### Option 3: SMTP (Generic)

Add to `.env.local`:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
FROM_EMAIL=donations@kendoghana.com
```

4. Install Nodemailer:
```bash
npm install nodemailer
```

## 📊 Analytics Configuration (Optional)

### Google Analytics 4

1. Get your Measurement ID from Google Analytics
2. Add to `.env.local`:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Add Google Analytics script to `app/layout.tsx`:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

## 🔗 Webhook Configuration

To receive payment notifications, configure Paystack webhooks:

1. Go to https://dashboard.paystack.com/#/settings/developer
2. Click "Add Endpoint"
3. Set the webhook URL to: `https://kendoghana.com/api/paystack/webhook`
4. Select events to listen for:
   - `charge.success` ✅
   - `charge.failure` ✅
   - `transfer.success` (optional)

**Important:** 
- Webhook URL must be HTTPS in production
- Paystack will send a test webhook when you create the endpoint
- The webhook endpoint verifies the signature for security

## 🔍 Testing

### Test Payment Flow

1. Use Paystack test cards:
   - Success: `4084084084084081`
   - Decline: `5060666666666666666`
   - 3DS Auth: `5078607856785678`
   - PIN: Any 4 digits
   - CVV: Any 3 digits
   - Expiry: Any future date

2. Test the complete flow:
   - Click donation button
   - Enter email
   - Complete payment
   - Verify success page
   - Check email receipt (if configured)
   - Verify transaction in Paystack dashboard

### Test Webhook (Local Development)

Use ngrok or similar tool to expose local server:

```bash
ngrok http 3000
```

Then set webhook URL in Paystack dashboard to your ngrok URL.

## 📝 Transaction Logging

Transactions are currently logged to the console. To persist logs:

### Option 1: Database (Prisma example)

1. Install Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```

2. Create transaction model in `prisma/schema.prisma`:

```prisma
model Transaction {
  id          String   @id @default(cuid())
  reference   String   @unique
  amount      Float
  currency    String
  email       String?
  status      String
  donation_type String?
  metadata    Json?
  channel     String?
  paid_at     DateTime?
  created_at  DateTime @default(now())
}
```

3. Update `app/api/paystack/webhook/route.ts` to save to database

### Option 2: File Logging

Modify the `logTransaction` function in webhook to write to a file:

```typescript
import fs from 'fs/promises'

async function logTransaction(transaction: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    ...transaction,
  }
  
  await fs.appendFile(
    'transactions.log',
    JSON.stringify(logEntry) + '\n'
  )
}
```

## 🚀 Deployment Checklist

Before going live:

- [ ] Replace test keys with live keys ✅
- [ ] Configure email service for receipts
- [ ] Set up webhook endpoint in Paystack dashboard
- [ ] Test webhook with test payment
- [ ] Set up transaction logging (database or file)
- [ ] Configure analytics tracking
- [ ] Test complete payment flow with real card (small amount)
- [ ] Set up monitoring/error tracking (Sentry, etc.)
- [ ] Verify HTTPS is enabled
- [ ] Test email receipts are being sent
- [ ] Verify transactions appear in Paystack dashboard

## 🔐 Security Best Practices

1. **Never expose secret key**: Always use server-side API routes
2. **Verify webhook signatures**: Already implemented in webhook route
3. **Validate amounts server-side**: Always verify transaction amounts
4. **Use HTTPS**: Required for production
5. **Rate limiting**: Consider adding rate limits to API routes
6. **Error handling**: Proper error handling prevents information leakage
7. **Logging**: Log all transactions for audit trail

## 📚 API Endpoints

### Transaction Verification
- **URL:** `/api/paystack/verify`
- **Method:** POST
- **Body:** `{ "reference": "transaction_reference" }`
- **Response:** Transaction details

### Webhook (Paystack → Your Server)
- **URL:** `/api/paystack/webhook`
- **Method:** POST
- **Headers:** `x-paystack-signature` (verified automatically)
- **Body:** Paystack event payload

### Analytics Tracking
- **URL:** `/api/analytics/track`
- **Method:** POST
- **Body:** Event data
- **Purpose:** Client-side event tracking

## 🐛 Troubleshooting

### Payment modal not opening
- Check if Paystack script loaded: `window.PaystackPop`
- Verify public key is correct
- Check browser console for errors

### Webhook not receiving events
- Verify webhook URL in Paystack dashboard
- Check webhook signature verification
- Ensure endpoint is accessible (not blocked by firewall)
- Check server logs for errors

### Email receipts not sending
- Verify email service credentials
- Check email service API key is valid
- Review server logs for email errors
- Ensure FROM_EMAIL is verified in email service

### Transaction verification failing
- Verify secret key is correct
- Check transaction reference is valid
- Ensure Paystack API is accessible
- Review error logs

## 📞 Support

- Paystack Documentation: https://paystack.com/docs/
- Paystack Support: support@paystack.com
- Paystack Dashboard: https://dashboard.paystack.com/

## 📄 License

This integration is for the Ghana Kendo Federation website.
