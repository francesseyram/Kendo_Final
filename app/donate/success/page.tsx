import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Donation Successful - Ghana Kendo Federation",
  description: "Thank you for your support",
}

export default async function DonateSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>
}) {
  const params = await searchParams
  const reference = params?.ref

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-md w-full text-center space-y-6" data-aos="fade-up">
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

          {reference && (
            <div className="p-4 rounded-lg bg-muted/50 border border-border/60">
            <p className="text-xs text-muted-foreground mb-1">Transaction Reference</p>
            <p className="text-sm font-mono text-foreground break-all">{reference}</p>
          </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/">Return Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/donate">Make Another Donation</Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-4">
            A confirmation email has been sent to your email address.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

