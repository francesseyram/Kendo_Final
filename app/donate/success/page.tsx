"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"

function DonateSuccessContent() {
  const searchParams = useSearchParams()
  const reference = searchParams?.get("ref")
  const [verifying, setVerifying] = useState(true)
  const [transaction, setTransaction] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (reference) {
      verifyTransaction(reference)
    } else {
      setVerifying(false)
    }
  }, [reference])

  const verifyTransaction = async (ref: string) => {
    try {
      const response = await fetch("/api/paystack/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference: ref }),
      })

      const data = await response.json()

      if (data.success && data.transaction) {
        setTransaction(data.transaction)
        
        // Track donation analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "donation_completed", {
            value: data.transaction.amount,
            currency: data.transaction.currency,
            transaction_id: ref,
          })
        }
      } else {
        setError(data.message || "Unable to verify transaction")
      }
    } catch (err) {
      console.error("Verification error:", err)
      setError("Failed to verify transaction. Please contact support if the issue persists.")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-md w-full text-center space-y-6">
          {verifying ? (
            <>
              <div className="flex justify-center">
                <Loader2 className="h-16 w-16 sm:h-20 sm:w-20 text-primary animate-spin" />
              </div>
              <p className="text-muted-foreground">Verifying your donation...</p>
            </>
          ) : error ? (
            <>
              <div className="flex justify-center">
                <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-primary" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gradient">Thank You</h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Your support helps grow Kendo and develop disciplined youth across Ghana.
                </p>
                <p className="text-sm text-muted-foreground text-red-500 mt-4">
                  Note: {error}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="relative">
                  <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-primary" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-gradient">Thank You</h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Your support helps grow Kendo and develop disciplined youth across Ghana.
                </p>
              </div>

              {transaction && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border/60 space-y-2">
                  <p className="text-xs text-muted-foreground">Donation Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    {transaction.currency} {transaction.amount.toFixed(2)}
                  </p>
                  {transaction.donation_type && (
                    <p className="text-sm text-muted-foreground">
                      {transaction.donation_type}
                    </p>
                  )}
                  {reference && (
                    <>
                      <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                        Transaction Reference
                      </p>
                      <p className="text-xs font-mono text-foreground break-all">{reference}</p>
                    </>
                  )}
                </div>
              )}

              {reference && !transaction && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border/60">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Reference</p>
                  <p className="text-sm font-mono text-foreground break-all">{reference}</p>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary">
              <Link href={transaction?.metadata?.campaign === "2nd Tunis International Open Championships" || transaction?.donation_type === "SPONSORSHIP" ? "/donate?donation_success=true" : "/donate"}>
                Make Another Donation
              </Link>
            </Button>
          </div>

          {!error && (
            <p className="text-xs text-muted-foreground pt-4">
              A confirmation email has been sent to your email address.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function DonateSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <DonateSuccessContent />
    </Suspense>
  )
}
