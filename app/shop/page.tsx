import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Mail } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Bamboo Shinai",
    image: "/shop/bamboo-shinai-kendo-sword.jpg",
    description: "Professional grade bamboo sword for training",
  },
  {
    id: 2,
    name: "Men",
    image: "/shop/kendo-men-helmet.jpg",
    description: "The helmet part of the protective armor (bogu)",
  },
  {
    id: 3,
    name: "Kendo Gi & Hakama",
    image: "/shop/kendo-gi-hakama-uniform.jpg",
    description: "Traditional training uniform set",
  },
  {
    id: 4,
    name: "Tenugui (Headcloth)",
    image: "/shop/kendo-tenugui-headcloth.jpg",
    description: "Traditional cotton headcloth worn under men",
  },
  {
    id: 5,
    name: "Kendo Do",
    image: "/shop/dou.jpg",
    description: "Rigid chest protector designed to protect the torso and encourage proper posture and striking form",
  },
  {
    id: 6,
    name: "Kendo Tare",
    image: "/shop/kendo-tare-waist-protection.jpg",
    description: "Waist and hip protector that guards the lower body and displays the kendoka’s name and dojo affiliation",
  },
  {
    id: 7,
    name: "Kote",
    image: "/shop/kote.jpeg",
    description: "Protective gloves for the hands and wrists",
  },
  {
    id: 8,
    name: "Complete Bogu Set",
    image: "/shop/kendo-bogu-complete-set.jpg",
    description: "Full protective armor set including men, kote, dō, and tare for safe and proper Kendo practice",
  },
  {
    id: 9,
    name: "Bokuto (Wooden Sword)",
    image: "/shop/bokuto-wooden-sword-kendo.jpg",
    description: "Solid oak practice sword",
  },
  
]

export const metadata = {
  title: "Shop - Ghana Kendo Federation",
  description: "Kendo equipment catalogue – request authentic gear through Ghana Kendo Federation",
}

export default function ShopPage() {
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
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Shop</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance text-gradient">
              Kendo Equipment
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
              Authentic Kendo equipment curated by the Ghana Kendo Federation.
              All items are available upon request to ensure proper sizing, quality,
              and suitability for your level of practice.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="aspect-square relative bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Availability badge */}
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold">
                  Available on request
                </div>
              </div>

              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed flex-1">
                  {product.description}
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="w-full gap-2 hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary"
                >
                  <a
                    href={`mailto:info@kendoghana.com?subject=Equipment Request: ${encodeURIComponent(
                      product.name
                    )}`}
                  >
                    <Mail className="h-4 w-4" />
                    Request this item
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <Card className="p-8 bg-muted/50">
            <h3 className="text-2xl font-bold mb-4">
              How Equipment Requests Work
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To maintain quality and ensure proper fit, all equipment is supplied
              through direct request. Send us an email indicating the item you’re
              interested in, your experience level, and any sizing details if applicable.
            </p>

            <Button asChild variant="default">
              <a href="mailto:info@kendoghana.com">
                Contact info@kendoghana.com
              </a>
            </Button>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}