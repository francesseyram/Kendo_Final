import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

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

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Support Kendo in Ghana</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your donation helps us provide equipment, training, and opportunities to aspiring Kendo practitioners across
            Ghana. Together, we can grow the art of the sword.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`p-8 relative ${tier.popular ? "border-kendo-red shadow-lg scale-105" : ""}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-kendo-red text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="text-4xl font-bold mb-6 text-kendo-red">{tier.amount}</div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-kendo-red shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                Donate {tier.amount}
              </Button>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-6">Custom Donation</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Want to contribute a different amount? Every donation, no matter the size, makes a meaningful impact on
              our mission to promote Kendo in Ghana.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button variant="outline">₵100</Button>
              <Button variant="outline">₵250</Button>
              <Button variant="outline">₵1,000</Button>
              <Button>Custom Amount</Button>
            </div>
          </Card>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold mb-4">Corporate Sponsorship</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Interested in becoming a corporate sponsor? We offer various partnership opportunities for businesses
              looking to support sports and youth development.
            </p>
            <Button variant="outline" size="lg">
              Contact Us About Sponsorship
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
