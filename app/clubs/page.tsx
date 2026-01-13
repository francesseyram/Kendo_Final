import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

const regions = [
  {
    name: "Greater Accra Regional Kendo Association",
    clubs: [
      { name: "Nungua Kendo Dojo", slug: "nungua" },
      { name: "Great Sword - Sage Kendo Club", slug: "great-sword" },
      { name: "Datus International School Kendo Club", slug: "datus" },
      { name: "Aviation Social Center Kendo Club", slug: "aviation" },
      { name: "Kensei Kendo Dojo", slug: "kensei" },
    ],
  },
  {
    name: "Ashanti Regional Kendo Association",
    clubs: [
      { name: "Ashanti North Kendo Club", slug: "ashanti-north" },
      { name: "Cove Kendo Club", slug: "cove" },
    ],
  },
  {
    name: "Volta Regional Kendo Association",
    comingSoon: true,
  },
  {
    name: "Central Regional Kendo Association",
    comingSoon: true,
  },
  {
    name: "Eastern Regional Kendo Association",
    comingSoon: true,
  },
]

export const metadata = {
  title: "Member Clubs - Ghana Kendo Federation",
  description: "Find a Kendo club near you in Ghana",
}

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-block mb-4 sm:mb-6 px-4 py-2 rounded-full glass border border-primary/20 animate-pulse-glow">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Member Clubs
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance text-gradient">
            Member Clubs
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            The Ghana Kendo Federation oversees officially recognized dojos across the country,
            each upholding the principles and discipline of Kendo.
          </p>
          <div className="mt-6 sm:mt-8 h-0.5 w-24 bg-primary/60 mx-auto" />
        </div>

        {/* Regions */}
        <div className="space-y-12 sm:space-y-16 max-w-7xl mx-auto">
          {regions.map((region, regionIndex) => (
            <div
              key={region.name}
              className="relative pl-4 sm:pl-6 border-l border-border/60"
              data-aos="fade-up"
              data-aos-delay={regionIndex * 100}
            >
              {/* Region Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-primary shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gradient">
                  {region.name}
                </h2>
              </div>

              {region.comingSoon ? (
                <Card className="p-6 sm:p-8 bg-muted/40 border-dashed glass border border-primary/10">
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Regional association currently under development.
                  </p>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {region.clubs?.map((club, clubIndex) => (
                    <Card
                      key={club.slug}
                      data-aos="fade-up"
                      data-aos-delay={clubIndex * 60}
                      className="p-5 sm:p-6 border border-border/60 hover:border-primary/40 hover:shadow-md transition-all duration-300 glass"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2 uppercase tracking-wide">
                        Registered Member Club
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold mb-4 leading-snug">
                        {club.name}
                      </h3>
                      <Button asChild variant="outline" className="gap-2 bg-transparent hover:!bg-primary hover:!text-primary-foreground hover:!border-primary dark:hover:!bg-primary dark:hover:!text-primary-foreground dark:hover:!border-primary">
                        <Link href={`/clubs/${club.slug}`}>
                          Learn More <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </Card>
                  ))}
                </div>
              )}

              {/* Section Divider */}
              {regionIndex < regions.length - 1 && (
                <div className="h-px bg-border/60 my-8 sm:my-12" />
              )}
            </div>
          ))}
        </div>

        {/* Ceremonial Closing */}
        <div className="max-w-3xl mx-auto mt-16 sm:mt-20 md:mt-24 text-center" data-aos="fade-up">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4 sm:px-0">
            Each dojo is guided by qualified instructors and operates under the standards
            of the Ghana Kendo Federation.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
