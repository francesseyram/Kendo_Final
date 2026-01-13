"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaystackPaymentButton } from "./paystack-payment-button"
import { TunisSponsorshipForm } from "./tunis-sponsorship-form"
import { Trophy, Users, Calendar, MapPin, Target, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { TUNIS_SPONSORSHIP_CONFIG, getOutstandingAmount, getProgressPercentage } from "@/lib/config/sponsorship"

export function TunisSponsorshipCard() {
  const [showForm, setShowForm] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const totalBudget = TUNIS_SPONSORSHIP_CONFIG.totalBudget
  const amountReceived = TUNIS_SPONSORSHIP_CONFIG.amountReceived
  const outstanding = getOutstandingAmount()
  const progress = getProgressPercentage()

  const airTicketTotal = TUNIS_SPONSORSHIP_CONFIG.budget.airTicket * TUNIS_SPONSORSHIP_CONFIG.team.total
  const hotelMealsTotal = TUNIS_SPONSORSHIP_CONFIG.budget.hotelMeals * TUNIS_SPONSORSHIP_CONFIG.team.total

  const presetAmounts = TUNIS_SPONSORSHIP_CONFIG.presetAmounts

  return (
    <Card className="p-6 sm:p-8 md:p-10 glass border-2 border-primary/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 mb-6">
          <div className="h-12 w-12 sm:h-14 sm:w-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
          </div>
          <div className="flex-1">
            <div className="inline-block mb-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Special Sponsorship Campaign
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-2">
              {TUNIS_SPONSORSHIP_CONFIG.eventName}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{TUNIS_SPONSORSHIP_CONFIG.dates}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{TUNIS_SPONSORSHIP_CONFIG.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose */}
        <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-primary/10">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            <strong className="text-primary">Purpose:</strong> To raise sponsorship funds to support Ghana's Kendo team 
            participating in the championship.
          </p>
        </div>

        {/* Team Composition */}
        <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/60">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Team Composition</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{TUNIS_SPONSORSHIP_CONFIG.team.male}</div>
              <div className="text-xs text-muted-foreground">Male Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{TUNIS_SPONSORSHIP_CONFIG.team.female}</div>
              <div className="text-xs text-muted-foreground">Female Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{TUNIS_SPONSORSHIP_CONFIG.team.total}</div>
              <div className="text-xs text-muted-foreground">Total Players</div>
            </div>
          </div>
        </div>

        {/* Budget Breakdown */}
        <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/60">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Budget Breakdown
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Air Ticket ({TUNIS_SPONSORSHIP_CONFIG.team.total} × ${TUNIS_SPONSORSHIP_CONFIG.budget.airTicket})</span>
              <span className="font-medium">${airTicketTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hotel & Meals ({TUNIS_SPONSORSHIP_CONFIG.team.total} × ${TUNIS_SPONSORSHIP_CONFIG.budget.hotelMeals})</span>
              <span className="font-medium">${hotelMealsTotal.toLocaleString()}</span>
            </div>
            <div className="border-t border-border/60 pt-2 mt-2 flex justify-between font-semibold">
              <span>Total Budget Required</span>
              <span className="text-primary">${totalBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Amount Already Received</span>
              <span>${amountReceived.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-border/60 pt-2 mt-2">
              <span>Outstanding Target</span>
              <span className="text-primary">${outstanding.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Progress</span>
            </div>
            <span className="text-sm font-semibold text-primary">
              ${amountReceived.toLocaleString()} / ${totalBudget.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {progress.toFixed(1)}% funded
          </p>
        </div>

        {/* Donation Options */}
        {!showForm ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3 text-center text-foreground">
                Choose a sponsorship amount (USD)
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {presetAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="min-w-[100px] hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary"
                    onClick={() => {
                      setSelectedAmount(amount)
                      setShowForm(true)
                    }}
                  >
                    ${amount}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="min-w-[100px] hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary"
                  onClick={() => {
                    setSelectedAmount(null)
                    setShowForm(true)
                  }}
                >
                  Custom
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <TunisSponsorshipForm
            presetAmount={selectedAmount}
            onCancel={() => {
              setShowForm(false)
              setSelectedAmount(null)
            }}
          />
        )}
      </div>
    </Card>
  )
}
