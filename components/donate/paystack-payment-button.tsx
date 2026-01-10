"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail } from "lucide-react"
import Script from "next/script"

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: {
        key: string
        email: string
        amount: number
        currency?: string
        ref?: string
        metadata?: Record<string, any>
        onClose?: () => void
        callback?: (response: { reference: string }) => void
      }) => {
        openIframe: () => void
      }
    }
  }
}

interface PaystackPaymentButtonProps {
  amount: number // Amount in GHS (Ghana Cedis)
  label: string
  description?: string
  email?: string // Donor email
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function PaystackPaymentButton({
  amount,
  label,
  description,
  email,
  className,
  variant = "default",
  size = "default",
}: PaystackPaymentButtonProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailInput, setEmailInput] = useState("")

  // Get public key from environment variable
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""

  // Convert GHS to pesewas (Paystack uses smallest currency unit)
  // 1 GHS = 100 pesewas
  const amountInPesewas = Math.round(amount * 100)

  const handlePayment = () => {
    if (!isScriptLoaded) {
      console.error("Paystack script not loaded")
      return
    }

    if (!publicKey) {
      alert("Payment gateway not configured. Please add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY to your .env file.")
      return
    }

    // If email is provided via props, proceed directly
    if (email) {
      initiatePayment(email)
      return
    }

    // Otherwise, show email dialog
    setShowEmailDialog(true)
  }

  const initiatePayment = (donorEmail: string) => {
    setIsProcessing(true)
    setShowEmailDialog(false)

    // Generate a unique reference
    const reference = `GKF_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: donorEmail,
      amount: amountInPesewas,
      currency: "GHS",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: description || "General Donation",
          },
        ],
      },
      callback: function (response: { reference: string }) {
        // Payment successful - redirect to success page
        setIsProcessing(false)
        window.location.href = `/donate/success?ref=${response.reference}`
      },
      onClose: function () {
        // User closed the payment modal
        setIsProcessing(false)
      },
    })

    handler.openIframe()
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (emailInput && emailInput.includes("@")) {
      initiatePayment(emailInput)
    }
  }

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => {
          console.error("Failed to load Paystack script")
          setIsScriptLoaded(false)
        }}
      />
      <Button
        onClick={handlePayment}
        disabled={!isScriptLoaded || isProcessing}
        className={className}
        variant={variant}
        size={size}
      >
        {isProcessing ? "Processing..." : label}
      </Button>

      {/* Email Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Donation</DialogTitle>
            <DialogDescription>
              Please enter your email address to continue with the payment.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dialog-email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="dialog-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowEmailDialog(false)
                  setEmailInput("")
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!emailInput || !emailInput.includes("@")}
                className="bg-primary hover:bg-primary/90"
              >
                Continue
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}


