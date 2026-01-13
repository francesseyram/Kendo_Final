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
import { cn } from "@/lib/utils"

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

// Shared script loading state across all button instances
let scriptLoadingState = {
  isLoaded: typeof window !== "undefined" && typeof window.PaystackPop !== "undefined",
  isLoading: false,
  listeners: new Set<() => void>(),
}

function checkScriptLoaded() {
  return typeof window !== "undefined" && typeof window.PaystackPop !== "undefined"
}

interface PaystackPaymentButtonProps {
  amount: number // Amount in GHS (Ghana Cedis)
  label: string
  description?: string
  email?: string // Donor email
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  campaign?: string // Campaign name (e.g., "2nd Tunis International Open Championships")
  donationType?: string // Donation type (e.g., "SPONSORSHIP", "General Donation")
  anonymous?: boolean // Whether donation is anonymous
  metadata?: Record<string, any> // Additional metadata
}

export function PaystackPaymentButton({
  amount,
  label,
  description,
  email,
  className,
  variant = "default",
  size = "default",
  campaign,
  donationType,
  anonymous = false,
  metadata = {},
}: PaystackPaymentButtonProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(checkScriptLoaded())
  const [isProcessing, setIsProcessing] = useState(false)
  const [showEmailDialog, setShowEmailDialog] = useState(false)
  const [emailInput, setEmailInput] = useState("")

  // Get public key from environment variable
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""

  // Validate amount
  const isValidAmount = amount > 0 && !isNaN(amount) && isFinite(amount)

  // Listen for script load updates and check periodically if already loaded
  useEffect(() => {
    const notifyLoaded = () => {
      setIsScriptLoaded(true)
    }
    
    // Check immediately if already loaded
    if (scriptLoadingState.isLoaded || checkScriptLoaded()) {
      setIsScriptLoaded(true)
      scriptLoadingState.isLoaded = true
    } else {
      // Add listener for when script loads
      scriptLoadingState.listeners.add(notifyLoaded)
      
      // Also check periodically in case script loads before our listener is set
      const checkInterval = setInterval(() => {
        if (checkScriptLoaded()) {
          scriptLoadingState.isLoaded = true
          setIsScriptLoaded(true)
          scriptLoadingState.listeners.forEach((listener) => listener())
          scriptLoadingState.listeners.clear()
          clearInterval(checkInterval)
        }
      }, 100)
      
      return () => {
        scriptLoadingState.listeners.delete(notifyLoaded)
        clearInterval(checkInterval)
      }
    }
  }, [])

  const handlePayment = () => {
    // Check if Paystack is available (either from our state or globally)
    const paystackAvailable = isScriptLoaded || checkScriptLoaded()
    
    if (!paystackAvailable) {
      console.error("Paystack script not loaded")
      return
    }

    if (!publicKey) {
      // Fail silently - no alert or error message to user
      return
    }

    if (!isValidAmount) {
      console.error(`Invalid donation amount: ₵${amount}`)
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
    if (!isValidAmount) {
      console.error(`Invalid donation amount: ₵${amount}`)
      setIsProcessing(false)
      return
    }

    setIsProcessing(true)
    setShowEmailDialog(false)

    // Convert GHS to pesewas (Paystack uses smallest currency unit)
    // 1 GHS = 100 pesewas - calculate fresh each time
    const amountInPesewas = Math.round(amount * 100)

    if (amountInPesewas < 100) {
      console.error("Minimum donation amount is ₵1.00")
      setIsProcessing(false)
      return
    }

    // Generate a unique reference
    const reference = `GKF_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

    try {
      // Build metadata with campaign and donation type information
      const customFields = [
        {
          display_name: "Donation Type",
          variable_name: "donation_type",
          value: donationType || description || "General Donation",
        },
      ]

      if (campaign) {
        customFields.push({
          display_name: "Campaign",
          variable_name: "campaign",
          value: campaign,
        })
      }

      if (anonymous) {
        customFields.push({
          display_name: "Anonymous",
          variable_name: "anonymous",
          value: "Yes",
        })
      }

      // Merge additional metadata
      const paymentMetadata = {
        custom_fields: customFields,
        donation_type: donationType || description || "General Donation",
        campaign: campaign || null,
        anonymous: anonymous,
        ...metadata,
      }

      const handler = window.PaystackPop.setup({
        key: publicKey,
        email: donorEmail,
        amount: amountInPesewas,
        currency: "GHS",
        ref: reference,
        metadata: paymentMetadata,
        callback: function (response: { reference: string }) {
          // Track donation initiation (client-side)
          if (typeof window !== "undefined") {
            // Track with analytics
            import("@/lib/analytics").then(({ trackDonation }) => {
              trackDonation({
                amount: amount,
                currency: "GHS",
                donation_type: donationType || description || "General Donation",
                reference: response.reference,
                channel: "web",
                campaign: campaign,
              })
            }).catch(() => {
              // Analytics not available, continue anyway
            })
          }

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
    } catch (error) {
      console.error("Payment initialization error:", error)
      setIsProcessing(false)
    }
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
        id="paystack-inline-js"
        src="https://js.paystack.co/v1/inline.js"
        strategy="lazyOnload"
        onLoad={() => {
          scriptLoadingState.isLoaded = true
          setIsScriptLoaded(true)
          // Notify all listeners
          scriptLoadingState.listeners.forEach((listener) => listener())
          scriptLoadingState.listeners.clear()
        }}
        onError={() => {
          console.error("Failed to load Paystack script")
          setIsScriptLoaded(false)
        }}
      />
      <Button
        onClick={handlePayment}
        disabled={(!isScriptLoaded && !checkScriptLoaded()) || isProcessing || !publicKey}
        className={cn(
          className,
          variant === "outline" && "hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary"
        )}
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


