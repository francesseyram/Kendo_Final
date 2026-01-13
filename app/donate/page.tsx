import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PaystackPaymentButton } from "@/components/donate/paystack-payment-button"
import { CustomAmountForm } from "@/components/donate/custom-amount-form"
import { Check } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: "Supporter",
    amount: "₵50",
    features: ["Support our grassroots programs", "Recognition on our website", "Federation newsletter"],
  },
  {
    name: "Patron",
    amount: "₵200",
    features: [
      "All Supporter benefits",
      "Exclusive event invitations",
      "Federation merchandise",
      "Priority event registration",
    ],
    popular: true,
  },
  {
    name: "Champion",
    amount: "₵500",
    features: [
      "All Patron benefits",
      "Name on donor wall",
      "VIP seating at events",
      "Private training session",
      "Annual recognition award",
    ],
  },
]

export const metadata = {
  title: "Donate - Ghana Kendo Federation",
  description: "Support the growth of Kendo in Ghana through your generous donation",
}

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(var(--primary-r), var(--primary-g), var(--primary-b), 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-r), var(--primary-g), var(--primary-b), 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full glass border border-primary/20 animate-pulse-glow">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Donate</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance text-gradient">
              Support Kendo in Ghana
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
              Your donation helps us provide equipment, training, and opportunities to aspiring Kendo practitioners across
              Ghana. Together, we can grow the art of the sword.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`p-8 relative ${tier.popular ? "border-primary shadow-lg scale-105" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-6 text-primary">{tier.amount}</div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <PaystackPaymentButton
                amount={parseFloat(tier.amount.replace("₵", ""))}
                label={`Donate ${tier.amount}`}
                description={tier.name}
                className="w-full"
                variant={tier.popular ? "default" : "outline"}
              />
            </Card>
          ))}
        </div>

        {/* Custom Donation Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-8 sm:p-10 glass border border-primary/10 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gradient">Make a Custom Contribution</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base">
              Every contribution, regardless of amount, strengthens the future of Kendo in Ghana.
            </p>
            <CustomAmountForm />
          </Card>

          {/* Trust Signal */}
          <p className="text-xs text-muted-foreground text-center mt-12 sm:mt-16 max-w-2xl mx-auto leading-relaxed">
            Ghana Kendo Federation is a recognized sporting body. Donations are used solely for training, development, and federation activities.
          </p>
          
        </div>
      </div>

      <Footer />
    </div>
  )
}
