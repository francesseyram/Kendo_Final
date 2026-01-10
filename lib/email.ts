/**
 * Email utility for sending donor receipts and notifications
 * Supports multiple email providers: Resend, SendGrid, SMTP
 */

interface ReceiptEmailData {
  email: string
  amount: number
  currency: string
  reference: string
  donation_type: string
  paid_at: string
  donor_name?: string
}

export async function sendDonorReceipt(data: ReceiptEmailData) {
  try {
    // Check which email service is configured
    if (process.env.RESEND_API_KEY) {
      return await sendViaResend(data)
    } else if (process.env.SENDGRID_API_KEY) {
      return await sendViaSendGrid(data)
    } else if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD
    ) {
      return await sendViaSMTP(data)
    } else {
      console.warn("No email service configured. Skipping receipt email.")
      console.log("Would send receipt to:", data.email, {
        amount: `${data.currency} ${data.amount.toFixed(2)}`,
        reference: data.reference,
        donation_type: data.donation_type,
      })
      return { success: false, message: "Email service not configured" }
    }
  } catch (error) {
    console.error("Failed to send donor receipt:", error)
    return { success: false, error }
  }
}

async function sendViaResend(data: ReceiptEmailData) {
  // Dynamic import to avoid build errors if Resend is not installed
  const { Resend } = await import("resend").catch(() => {
    throw new Error("Resend package not installed. Run: npm install resend")
  })

  const resend = new Resend(process.env.RESEND_API_KEY)
  const fromEmail = process.env.FROM_EMAIL || "donations@kendoghana.com"
  const fromName = process.env.FROM_NAME || "Ghana Kendo Federation"

  const { error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: data.email,
    subject: "Thank you for your donation to Ghana Kendo Federation",
    html: generateReceiptEmailHTML(data),
    text: generateReceiptEmailText(data),
  })

  if (error) {
    throw error
  }

  return { success: true }
}

async function sendViaSendGrid(data: ReceiptEmailData) {
  // Dynamic import to avoid build errors if SendGrid is not installed
  const sgMail = await import("@sendgrid/mail").catch(() => {
    throw new Error("SendGrid package not installed. Run: npm install @sendgrid/mail")
  })

  sgMail.default.setApiKey(process.env.SENDGRID_API_KEY!)

  const msg = {
    to: data.email,
    from: process.env.FROM_EMAIL || "donations@kendoghana.com",
    subject: "Thank you for your donation to Ghana Kendo Federation",
    html: generateReceiptEmailHTML(data),
    text: generateReceiptEmailText(data),
  }

  await sgMail.default.send(msg)
  return { success: true }
}

async function sendViaSMTP(data: ReceiptEmailData) {
  // SMTP implementation using nodemailer
  const nodemailer = await import("nodemailer").catch(() => {
    throw new Error("Nodemailer package not installed. Run: npm install nodemailer")
  })

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: process.env.FROM_EMAIL || "donations@kendoghana.com",
    to: data.email,
    subject: "Thank you for your donation to Ghana Kendo Federation",
    html: generateReceiptEmailHTML(data),
    text: generateReceiptEmailText(data),
  })

  return { success: true }
}

function generateReceiptEmailHTML(data: ReceiptEmailData): string {
  const formattedAmount = `${data.currency} ${data.amount.toFixed(2)}`
  const formattedDate = new Date(data.paid_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Receipt</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Ghana Kendo Federation</h1>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="color: #EF4444; margin-top: 0;">Thank You for Your Donation!</h2>
        
        <p>Dear ${data.donor_name || "Valued Supporter"},</p>
        
        <p>We are deeply grateful for your generous donation to the Ghana Kendo Federation. Your support helps us:</p>
        <ul>
          <li>Provide equipment and training facilities</li>
          <li>Organize tournaments and events</li>
          <li>Train youth in the discipline of Kendo</li>
          <li>Promote the art of the sword across Ghana</li>
        </ul>
        
        <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #EF4444;">
          <p style="margin: 5px 0;"><strong>Donation Type:</strong> ${data.donation_type}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> ${formattedAmount}</p>
          <p style="margin: 5px 0;"><strong>Transaction Reference:</strong> ${data.reference}</p>
          <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
        </div>
        
        <p>This email serves as your official receipt for tax purposes. Please save it for your records.</p>
        
        <p>Once again, thank you for your support in growing Kendo in Ghana.</p>
        
        <p style="margin-top: 30px;">
          <strong>The Ghana Kendo Federation Team</strong><br>
          <a href="https://kendoghana.com" style="color: #EF4444;">www.kendoghana.com</a>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
        <p>Ghana Kendo Federation is a recognized sporting body in Ghana.</p>
      </div>
    </body>
    </html>
  `
}

function generateReceiptEmailText(data: ReceiptEmailData): string {
  const formattedAmount = `${data.currency} ${data.amount.toFixed(2)}`
  const formattedDate = new Date(data.paid_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return `
Ghana Kendo Federation
Donation Receipt

Thank You for Your Donation!

Dear ${data.donor_name || "Valued Supporter"},

We are deeply grateful for your generous donation to the Ghana Kendo Federation. Your support helps us provide equipment, training facilities, organize tournaments, and promote the art of Kendo across Ghana.

Donation Details:
- Donation Type: ${data.donation_type}
- Amount: ${formattedAmount}
- Transaction Reference: ${data.reference}
- Date: ${formattedDate}

This email serves as your official receipt for tax purposes. Please save it for your records.

Once again, thank you for your support in growing Kendo in Ghana.

The Ghana Kendo Federation Team
www.kendoghana.com

---
Ghana Kendo Federation is a recognized sporting body in Ghana.
  `
}
