"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaystackPaymentButton } from "./paystack-payment-button"
import { Mail, CreditCard, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { TUNIS_SPONSORSHIP_CONFIG, convertUsdToGhs } from "@/lib/config/sponsorship"

interface TunisSponsorshipFormProps {
  presetAmount: number | null
  onCancel: () => void
}

export function TunisSponsorshipForm({ presetAmount, onCancel }: TunisSponsorshipFormProps) {
  const [amount, setAmount] = useState(presetAmount ? presetAmount.toString() : "")
  const [email, setEmail] = useState("")
  const [anonymous, setAnonymous] = useState(false)

  // Convert USD to GHS for Paystack (Ghana uses GHS)
  const parsedAmountUSD = parseFloat(amount)
  const parsedAmountGHS = convertUsdToGhs(parsedAmountUSD)

  return (
    <div className="rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm p-6 sm:p-8 space-y-6 glass">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold text-gradient">Complete Your Sponsorship</h4>
          <p className="text-sm text-muted-foreground mt-1">
            Support Ghana's team at the 2nd Tunis International Open
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="sponsor-email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="sponsor-email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sponsor-amount">
            Sponsorship Amount (USD)
            {parsedAmountUSD > 0 && (
              <span className="ml-2 text-xs text-muted-foreground">
                ≈ ₵{parsedAmountGHS.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
            )}
          </Label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              id="sponsor-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="Enter amount in USD"
              className="pl-10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Amount will be converted to GHS (₵) for payment processing
          </p>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="anonymous"
            checked={anonymous}
            onCheckedChange={(checked) => setAnonymous(checked === true)}
          />
          <Label
            htmlFor="anonymous"
            className="text-sm font-normal cursor-pointer text-muted-foreground"
          >
            Make this donation anonymous
          </Label>
        </div>
      </div>

      {parsedAmountUSD > 0 && email && (
        <PaystackPaymentButton
          amount={parsedAmountGHS}
          email={email}
          label={`Sponsor $${parsedAmountUSD.toLocaleString()}`}
          description="2nd Tunis International Open Sponsorship"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
          campaign="2nd Tunis International Open Championships"
          donationType="SPONSORSHIP"
          anonymous={anonymous}
          metadata={{
            campaign: "2nd Tunis International Open Championships",
            year: 2026,
            event_location: "Tunisia",
            event_dates: "28th – 29th November 2026",
            amount_usd: parsedAmountUSD,
            amount_ghs: parsedAmountGHS,
          }}
        />
      )}

      <Button
        variant="ghost"
        className="w-full text-muted-foreground hover:text-foreground"
        onClick={onCancel}
      >
        Cancel
      </Button>
    </div>
  )
}
