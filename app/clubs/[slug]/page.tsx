import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Clock, User, Mail, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

const clubsData: Record<
  string,
  {
    name: string
    sensei?: string
    location: string
    trainingDays: string
    trainingTime: string
    email: string
    phone: string
    description: string
  }
> = {
  "nungua": {
    name: "Nungua Kendo Dojo",
    sensei: "SESI DZAKPASU",
    location: "Nungua Kendo Dojo, Nungua, 246 Beach Drive",
    trainingDays: "Sunday",
    trainingTime: "3.00pm – 6.00pm",
    email: "info@kendoghana.com",
    phone: "+233 266 000 201",
    description:
      "Nungua Kendo Dojo is one of the founding clubs of the Ghana Kendo Federation. We offer comprehensive training for beginners and advanced practitioners in a supportive environment.",
  },
  "great-sword": {
    name: "Great Sword - Sage Kendo Club",
    sensei: "RANDOLPH PHILIP DARKU",
    location: "Accra Sports Stadium",
    trainingDays: "Saturday",
    trainingTime: "12:00pm – 3:00pm",
    email: "info@kendoghana.com",
    phone: "+233553644551",
    description: "Training by appointment available",
  },
  datus: {
    name: "Datus International School Kendo Club",
    sensei: "Bruce Adjaho",
    location: "Tema comm 7",
    trainingDays: "Monday, Wednesday, Friday & Saturday",
    trainingTime: "3:00pm – 5:00pm (MWF), 9:00am – 12:00pm (Sat)",
    email: "info@kendoghana.com",
    phone: "+233553644551",
    description: "Training by appointment available",
  },
  aviation: {
    name: "Aviation Social Center Kendo Club",
    sensei: "Bruce and Sesi",
    location: "Aviation Social Center",
    trainingDays: "Wednesday, Saturday & Sunday",
    trainingTime: "6:00pm - 8:00pm (Wed), 1:00pm – 3:00pm (Sat), 2:00pm – 4:00pm (Sun)",
    email: "info@kendoghana.com",
    phone: "+233500450430",
    description: "Training by appointment available",
  },
  kensei: {
    name: "Kensei Kendo Dojo",
    sensei: "Dickson EK Acolatse",
    location: "California fitness gym, Palace mall - spintex",
    trainingDays: "Saturday",
    trainingTime: "2:00pm – 3:00pm",
    email: "info@kendoghana.com",
    phone: "+233544094922 / +233548220291",
    description: "Professional kendo training facility",
  },
  "ashanti-north": {
    name: "Ashanti North Kendo Club",
    sensei: "FRANK AGYEI",
    location: "State Boys School near Suame Police Station",
    trainingDays: "Saturday & Sunday",
    trainingTime: "6:00am – 8:00am",
    email: "info@kendoghana.com",
    phone: "+233574859545",
    description: "Training by appointment available",
  },
  cove: {
    name: "Cove Kendo Club",
    sensei: "FRANK AGYEI",
    location: "Palestra Gym, Kaase",
    trainingDays: "Saturday & Sunday",
    trainingTime: "6:00am – 7:30am (Sat), 6:00am – 8:00am (Sun)",
    email: "info@kendoghana.com",
    phone: "+233574859545",
    description: "Training by appointment available",
  },
}

export function generateStaticParams() {
  return Object.keys(clubsData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const club = clubsData[slug]
  if (!club) return { title: "Club Not Found" }
  return {
    title: `${club.name} - Ghana Kendo Federation`,
    description: club.description,
  }
}

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const club = clubsData[slug]

  if (!club) {
    notFound()
  }

  // Map club slugs to their logo images
  const clubLogos: Record<string, string> = {
    "nungua": "/Logos/nungua_logo.jpeg",
    "great-sword": "/Logos/logo_sword.jpg",
    datus: "/Logos/logo_datus.jpg",
    aviation: "/Logos/logo_aviation2.jpg",
    kensei: "/Logos/kenseilogo.png",
    "ashanti-north": "/Logos/ashanti_north.jpeg",
    cove: "/Logos/cove_kendo.jpeg",
  }

  const clubImageSrc = clubLogos[slug] || `/kendo-dojo-training-.jpg?height=600&width=900&query=kendo+dojo+training+${club.name}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Ceremonial Hero Section */}
      <div className="relative overflow-hidden border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <Button variant="ghost" asChild className="mb-6 sm:mb-8 gap-2">
            <Link href="/clubs">
              <ArrowLeft className="h-4 w-4" /> Back to Clubs
            </Link>
          </Button>
          <div className="max-w-5xl">
            <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-3">
              Official Member Dojo
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-4 text-gradient">
              {club.name}
            </h1>
            {club.sensei && (
              <p className="text-base sm:text-lg text-muted-foreground">
                Led by <span className="font-medium text-foreground">{club.sensei}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="lg:col-span-2" data-aos="fade-up">
              <div className="flex items-center justify-center lg:justify-start">
                <Image
                  src={clubImageSrc}
                  alt={club.name}
                  width={900}
                  height={600}
                  className="rounded-xl shadow-2xl w-full max-w-2xl object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Training Information Card */}
              <Card className="p-5 sm:p-6 glass border border-primary/10" data-aos="fade-left">
                <h3 className="font-semibold text-lg mb-1">Training Information</h3>
                <div className="h-px bg-border my-4" />
                <div className="space-y-4 text-sm">
                  {club.sensei && (
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Sensei</div>
                        <div className="font-medium text-foreground">{club.sensei}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Location</div>
                      <div className="font-medium text-foreground leading-snug">{club.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Training Days</div>
                      <div className="font-medium text-foreground">{club.trainingDays}</div>
                      <div className="text-sm text-muted-foreground mt-1">{club.trainingTime}</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Official Contact Card */}
              <Card className="p-5 sm:p-6 glass border border-primary/10" data-aos="fade-left" data-aos-delay="100">
                <h3 className="font-semibold text-lg mb-1">Official Contact</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                  For inquiries and training arrangements
                </p>
                <div className="h-px bg-border my-4" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground shrink-0" />
                    <a 
                      href={`mailto:${club.email}`} 
                      className="text-sm hover:text-primary transition-colors"
                    >
                      {club.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground shrink-0" />
                    <span className="text-sm text-foreground">{club.phone}</span>
                  </div>
                </div>
              </Card>

              <Button 
                asChild 
                className="w-full gap-2 bg-primary hover:bg-primary/90"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <Link href="/contact">Enquire About Training</Link>
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-12 sm:mt-16 md:mt-20 max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gradient">About the Dojo</h2>
            <div className="h-0.5 w-16 bg-primary/60 mb-6" />
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {club.description}
            </p>
          </div>

          {/* Federation Stamp */}
          <div className="mt-16 sm:mt-20 md:mt-24 text-center text-xs sm:text-sm text-muted-foreground" data-aos="fade-up">
            Recognized and governed under the Ghana Kendo Federation
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
