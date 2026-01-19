"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaystackPaymentButton } from "./paystack-payment-button"
import { Mail, CreditCard, X, Trophy, Shield, Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { TUNIS_SPONSORSHIP_CONFIG, convertGhsToUsd } from "@/lib/config/sponsorship"

interface TunisSponsorshipFormProps {
  presetAmount: number | null
  onCancel: () => void
}

export function TunisSponsorshipForm({ presetAmount, onCancel }: TunisSponsorshipFormProps) {
  const [amount, setAmount] = useState(presetAmount ? presetAmount.toString() : "")
  const [email, setEmail] = useState("")
  const [anonymous, setAnonymous] = useState(false)

  // Amount is in GHS (Cedis) - convert to USD for display/reporting
  const parsedAmountGHS = parseFloat(amount) || 0
  const parsedAmountUSD = parsedAmountGHS > 0 ? convertGhsToUsd(parsedAmountGHS) : 0
  const isValidAmount = parsedAmountGHS > 0 && !isNaN(parsedAmountGHS) && isFinite(parsedAmountGHS)
  const isValidEmail = email && email.includes("@")

  return (
    <div className="relative rounded-2xl border-2 border-primary/30 dark:border-primary/50 dark:ring-1 dark:ring-white/10 bg-background dark:bg-gradient-to-br dark:from-card dark:via-card dark:to-card/90 backdrop-blur-sm p-8 sm:p-10 space-y-8 dark:space-y-10 shadow-2xl dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden">
      {/* Animated background effects - toned down for dark mode */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl dark:blur-2xl animate-pulse-glow" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl dark:blur-2xl animate-pulse-glow animation-delay-2000" />
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-2xl" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />

      <div className="relative z-10">
        {/* Header Section - More Prominent */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  Complete Your Sponsorship
                </h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-muted-foreground/90">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>Support Ghana's team at the 2nd Tunis International Kendo Open</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-10 w-10 rounded-lg hover:bg-destructive/10 hover:text-destructive shrink-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form Fields - Enhanced */}
        <div className="grid gap-6">
          {/* Email Field */}
          <div className="space-y-3">
            <Label htmlFor="sponsor-email" className="text-base font-semibold flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Address
            </Label>
            <div className="relative group">
              <div className="relative bg-muted/50 dark:bg-muted/30 border border-border dark:border-white/15 rounded-lg shadow-sm dark:shadow-md transition-all group-hover:border-primary/50 dark:group-hover:border-primary/40 group-focus-within:border-primary dark:group-focus-within:border-primary group-focus-within:shadow-md dark:group-focus-within:shadow-lg dark:group-focus-within:shadow-primary/20">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-muted-foreground/90 group-focus-within:text-primary transition-colors z-10" />
                <Input
                  id="sponsor-email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-12 pr-4 h-14 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 dark:placeholder:text-muted-foreground/70"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            {email && !isValidEmail && (
              <p className="text-sm text-destructive flex items-center gap-2">
                <span>•</span> Please enter a valid email address
              </p>
            )}
          </div>

          {/* Amount Field - More Prominent */}
          <div className="space-y-3">
            <Label htmlFor="sponsor-amount" className="text-base font-semibold flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              Sponsorship Amount (Cedis)
              {parsedAmountGHS > 0 && (
                <span className="ml-auto text-sm font-normal text-muted-foreground dark:text-muted-foreground/90">
                  ≈ ${parsedAmountUSD.toLocaleString(undefined, { maximumFractionDigits: 2 })} USD
                </span>
              )}
            </Label>
            <div className="relative group">
              <div className="relative bg-muted/50 dark:bg-muted/30 border border-border dark:border-white/15 rounded-lg shadow-sm dark:shadow-md transition-all group-hover:border-primary/50 dark:group-hover:border-primary/40 group-focus-within:border-primary dark:group-focus-within:border-primary group-focus-within:shadow-md dark:group-focus-within:shadow-lg dark:group-focus-within:shadow-primary/20">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-muted-foreground/90 group-focus-within:text-primary transition-colors z-10" />
                <Input
                  id="sponsor-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount in Cedis (₵)"
                  className="pl-12 pr-20 h-14 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 dark:placeholder:text-muted-foreground/70 font-semibold"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                {parsedAmountGHS > 0 && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-primary dark:text-primary-foreground z-10">
                    ₵{parsedAmountGHS.toLocaleString()}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/90 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Secure payment via Paystack
              </p>
              {amount && !isValidAmount && (
                <p className="text-sm text-destructive flex items-center gap-2">
                  <span>•</span> Minimum ₵1 required
                </p>
              )}
            </div>
          </div>

          {/* Section Divider */}
          <div className="h-px bg-border/60 dark:bg-white/10 my-2" />

          {/* Anonymous Checkbox - Enhanced */}
          <div className="flex items-center space-x-3 pt-2 p-4 rounded-lg bg-muted/30 dark:bg-muted/20 border border-border dark:border-white/10 shadow-sm">
            <Checkbox
              id="anonymous"
              checked={anonymous}
              onCheckedChange={(checked) => setAnonymous(checked === true)}
              className="h-5 w-5 border-2"
            />
            <Label
              htmlFor="anonymous"
              className="text-sm font-medium cursor-pointer flex-1"
            >
              Make this donation anonymous
            </Label>
          </div>
        </div>

        {/* Action Button - Much More Prominent */}
        <div className="pt-4 space-y-4">
          {isValidAmount && isValidEmail ? (
            <div className="space-y-3">
              <PaystackPaymentButton
                amount={parsedAmountGHS}
                email={email}
                label={`Sponsor ₵${parsedAmountGHS.toLocaleString()} Now`}
                description="2nd Tunis International Kendo Open Sponsorship"
                size="lg"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                campaign="2nd Tunis International Kendo Open Championships"
                donationType="SPONSORSHIP"
                anonymous={anonymous}
                metadata={{
                  campaign: "2nd Tunis International Kendo Open Championships",
                  year: 2026,
                  event_location: "Tunisia",
                  event_dates: "28th – 29th November 2026",
                  amount_ghs: parsedAmountGHS,
                  amount_usd: parsedAmountUSD,
                }}
              />
              <p className="text-xs text-center text-muted-foreground dark:text-muted-foreground/90">
                Your contribution directly supports Ghana's Kendo team
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Button
                disabled
                size="lg"
                className="w-full h-14 text-base font-semibold bg-muted/50 text-muted-foreground cursor-not-allowed border-2 border-dashed"
              >
                {!email 
                  ? "Enter your email address to continue" 
                  : !isValidEmail
                  ? "Please enter a valid email address"
                  : !amount
                  ? "Enter sponsorship amount (minimum ₵1)"
                  : !isValidAmount
                  ? "Please enter a valid amount (minimum ₵1)"
                  : "Complete the form to continue"}
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground/90">
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
                <span>All fields are required to proceed</span>
                <div className="h-1 w-1 rounded-full bg-muted-foreground" />
              </div>
            </div>
          )}

          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground hover:bg-muted/50"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
