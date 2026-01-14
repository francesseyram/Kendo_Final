"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaystackPaymentButton } from "./paystack-payment-button"
import { TunisSponsorshipForm } from "./tunis-sponsorship-form"
import { Trophy, Users, Calendar, MapPin, Target, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { 
  TUNIS_SPONSORSHIP_CONFIG, 
  getOutstandingAmount, 
  getProgressPercentage,
  getTotalBudgetGhs,
  convertUsdToGhs,
  convertGhsToUsd
} from "@/lib/config/sponsorship"

export function TunisSponsorshipCard() {
  const [showForm, setShowForm] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [amountReceivedGHS, setAmountReceivedGHS] = useState(TUNIS_SPONSORSHIP_CONFIG.amountReceived)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch current sponsorship total
  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const response = await fetch("/api/sponsorship/total", { cache: "no-store" })
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setAmountReceivedGHS(data.amountReceived.ghs)
          }
        }
      } catch (error) {
        console.error("Failed to fetch sponsorship total:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Fetch on mount
    fetchTotal()

    // Listen for custom event to refresh immediately after donation
    const handleDonationSuccess = () => {
      fetchTotal()
    }
    window.addEventListener("donation-success", handleDonationSuccess)

    // Check if we're returning from a successful donation
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("donation_success") === "true") {
      fetchTotal()
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname)
    }

    return () => {
      window.removeEventListener("donation-success", handleDonationSuccess)
    }
  }, [])

  const totalBudgetGHS = getTotalBudgetGhs()
  const totalBudgetUSD = convertGhsToUsd(totalBudgetGHS)
  const amountReceivedUSD = convertGhsToUsd(amountReceivedGHS)
  const outstandingGHS = totalBudgetGHS - amountReceivedGHS
  const outstandingUSD = convertGhsToUsd(outstandingGHS)
  const progress = (amountReceivedGHS / totalBudgetGHS) * 100

  const airTicketTotal = TUNIS_SPONSORSHIP_CONFIG.budget.airTicket * TUNIS_SPONSORSHIP_CONFIG.team.total // Already in GHS
  const hotelMealsTotal = TUNIS_SPONSORSHIP_CONFIG.budget.hotelMeals * TUNIS_SPONSORSHIP_CONFIG.team.total // Already in GHS
  const airTicketTotalUSD = convertGhsToUsd(airTicketTotal)
  const hotelMealsTotalUSD = convertGhsToUsd(hotelMealsTotal)

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
              <span className="text-muted-foreground">Air Ticket ({TUNIS_SPONSORSHIP_CONFIG.team.total} × ₵{TUNIS_SPONSORSHIP_CONFIG.budget.airTicket.toLocaleString()})</span>
              <span className="font-medium">₵{airTicketTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hotel & Meals ({TUNIS_SPONSORSHIP_CONFIG.team.total} × ₵{TUNIS_SPONSORSHIP_CONFIG.budget.hotelMeals.toLocaleString()})</span>
              <span className="font-medium">₵{hotelMealsTotal.toLocaleString()}</span>
            </div>
            <div className="border-t border-border/60 pt-2 mt-2 flex justify-between font-semibold">
              <span>Total Budget Required</span>
              <div className="text-right">
                <div className="text-primary">₵{totalBudgetGHS.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground font-normal">(${totalBudgetUSD.toLocaleString()})</div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Amount Already Received</span>
              <div className="text-right">
                <span>₵{amountReceivedGHS.toLocaleString()}</span>
                <span className="ml-1">(${amountReceivedUSD.toLocaleString()})</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-border/60 pt-2 mt-2">
              <span>Outstanding Target</span>
              <div className="text-right">
                <span className="text-primary">₵{outstandingGHS.toLocaleString()}</span>
                <div className="text-xs text-muted-foreground font-normal">(${outstandingUSD.toLocaleString()})</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Funding Progress</h3>
                <p className="text-xs text-muted-foreground">Help us reach our goal</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {progress.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">funded</div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative mb-4">
            <div className="h-6 w-full rounded-full bg-primary/10 border border-primary/20 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-primary/90 transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            {/* Progress markers */}
            <div className="absolute top-0 left-0 right-0 h-6 flex items-center pointer-events-none">
              {[25, 50, 75, 100].map((marker) => (
                <div
                  key={marker}
                  className="absolute h-full w-0.5 bg-background/40"
                  style={{ left: `${marker}%`, transform: 'translateX(-50%)' }}
                />
              ))}
            </div>
          </div>

          {/* Amount Display */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Raised</p>
              {isLoading ? (
                <div className="h-6 w-24 bg-muted animate-pulse rounded" />
              ) : (
                <>
                  <p className="text-lg font-bold text-foreground">
                    ₵{amountReceivedGHS.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${amountReceivedUSD.toLocaleString()} USD
                  </p>
                </>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Goal</p>
              <p className="text-lg font-bold text-primary">
                ₵{totalBudgetGHS.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                ${totalBudgetUSD.toLocaleString()} USD
              </p>
            </div>
          </div>
        </div>

        {/* Donation Options */}
        {!showForm ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3 text-center text-foreground">
                Choose a sponsorship amount (Cedis)
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
                    ₵{amount.toLocaleString()}
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
