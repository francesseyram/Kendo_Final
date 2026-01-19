"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaystackPaymentButton } from "./paystack-payment-button"
import { Mail, CreditCard, Heart, Shield } from "lucide-react"

export function CustomAmountForm() {
  const [amount, setAmount] = useState("")
  const [email, setEmail] = useState("")
  const [showForm, setShowForm] = useState(false)

  const parsedAmount = parseFloat(amount)

  return (
    <div className="space-y-6">
      {!showForm ? (
        <>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {[100, 250, 1000].map((value) => (
              <Button
                key={value}
                variant="outline"
                className="min-w-[100px] bg-transparent hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary"
                onClick={() => {
                  setAmount(value.toString())
                  setShowForm(true)
                }}
              >
                ₵{value}
              </Button>
            ))}

            <Button
              size="lg"
              className="px-8 bg-primary hover:bg-primary/90"
              onClick={() => setShowForm(true)}
            >
              Choose Amount
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            Secure payments powered by Paystack
          </p>
        </>
      ) : (
        <div className="relative rounded-2xl border-2 border-primary/20 dark:border-primary/50 dark:ring-1 dark:ring-white/10 bg-background dark:bg-gradient-to-br dark:from-card dark:via-card dark:to-card/90 backdrop-blur-sm p-8 sm:p-10 space-y-8 dark:space-y-10 shadow-xl dark:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Background effects - toned down for dark mode */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl dark:blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl dark:blur-2xl" />

          <div className="relative z-10">
            <div className="text-center space-y-3 mb-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 mb-2 mx-auto shadow-lg">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <h4 className="text-2xl font-bold text-gradient">Complete Your Donation</h4>
              <p className="text-sm text-muted-foreground">
                Your support makes a difference
              </p>
            </div>

            <div className="grid gap-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  Email Address
                </Label>
                <div className="relative group">
                  <div className="relative bg-muted/50 dark:bg-muted/30 border border-border dark:border-white/15 rounded-lg shadow-sm dark:shadow-md transition-all group-hover:border-primary/50 dark:group-hover:border-primary/40 group-focus-within:border-primary dark:group-focus-within:border-primary group-focus-within:shadow-md dark:group-focus-within:shadow-lg dark:group-focus-within:shadow-primary/20">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-muted-foreground/90 group-focus-within:text-primary transition-colors z-10" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="pl-12 pr-4 h-14 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 dark:placeholder:text-muted-foreground/70"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="amount" className="text-base font-semibold flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  Donation Amount (GHS)
                </Label>
                <div className="relative group">
                  <div className="relative bg-muted/50 dark:bg-muted/30 border border-border dark:border-white/15 rounded-lg shadow-sm dark:shadow-md transition-all group-hover:border-primary/50 dark:group-hover:border-primary/40 group-focus-within:border-primary dark:group-focus-within:border-primary group-focus-within:shadow-md dark:group-focus-within:shadow-lg dark:group-focus-within:shadow-primary/20">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground dark:text-muted-foreground/90 group-focus-within:text-primary transition-colors z-10" />
                    <Input
                      id="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      placeholder="Enter amount in Cedis (₵)"
                      className="pl-12 pr-20 h-14 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 dark:placeholder:text-muted-foreground/70 font-semibold"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    {parsedAmount > 0 && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold text-primary dark:text-primary-foreground z-10">
                        ₵{parsedAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/90 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Secure payment via Paystack
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-4">
              {parsedAmount > 0 && email && email.includes("@") ? (
                <div className="space-y-3">
                  <PaystackPaymentButton
                    amount={parsedAmount}
                    email={email}
                    label={`Donate ₵${parsedAmount.toLocaleString()} Now`}
                    description="Custom Donation"
                    size="lg"
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
                  />
                  <p className="text-xs text-center text-muted-foreground dark:text-muted-foreground/90">
                    Every contribution strengthens Kendo in Ghana
                  </p>
                </div>
              ) : (
                <Button
                  disabled
                  size="lg"
                  className="w-full h-14 text-base font-semibold bg-muted/50 text-muted-foreground cursor-not-allowed border-2 border-dashed"
                >
                  {!email 
                    ? "Enter your email address to continue"
                    : !email.includes("@")
                    ? "Please enter a valid email address"
                    : !amount
                    ? "Enter donation amount (minimum ₵1)"
                    : "Complete the form to continue"}
                </Button>
              )}

              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground hover:bg-muted/50"
                onClick={() => {
                  setShowForm(false)
                  setAmount("")
                  setEmail("")
                }}
              >
                Change my mind
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

