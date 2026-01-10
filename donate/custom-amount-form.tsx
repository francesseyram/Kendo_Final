"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PaystackPaymentButton } from "./paystack-payment-button"
import { Mail, CreditCard } from "lucide-react"

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
                className="min-w-[100px] bg-transparent"
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
        <div className="rounded-xl border border-border/60 bg-background/60 backdrop-blur-sm p-6 sm:p-8 space-y-6 glass">
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold text-gradient">Complete Your Donation</h4>
            <p className="text-sm text-muted-foreground">
              This will take less than a minute
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
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
              <Label htmlFor="amount">Donation Amount (GHS)</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="Enter amount"
                  className="pl-10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {parsedAmount > 0 && email && (
            <PaystackPaymentButton
              amount={parsedAmount}
              email={email}
              label={`Donate ₵${parsedAmount.toLocaleString()}`}
              description="Custom Donation"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90"
            />
          )}

          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              setShowForm(false)
              setAmount("")
              setEmail("")
            }}
          >
            Change my mind
          </Button>
        </div>
      )}
    </div>
  )
}

