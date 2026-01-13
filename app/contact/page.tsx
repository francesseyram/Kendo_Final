import React, { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import ContactFormWithParams from "./ContactFormWithParams"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Phone, MapPin, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <Navigation />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-background via-background/95 to-background py-24 sm:py-28 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-4 sm:mb-6 px-4 py-2 rounded-full glass border border-primary/20 animate-pulse-glow">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Contact
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-balance text-gradient">
              Get in touch
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto mb-4 sm:mb-6 leading-relaxed px-4 sm:px-0">
              Whether you're beginning your journey or seeking guidance, we're here to help.
            </p>
            <div className="flex justify-center">
              <div className="h-0.5 w-24 bg-primary/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* Left Column - Map + Form */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Map */}
            <Card className="p-0 overflow-hidden glass border border-primary/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8361082789584!2d-0.17915052452556374!3d5.591223033293497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9aefb8485fa7%3A0xc0ff6bbede1c6ad5!2sAviation%20Social%20Centre!5e0!3m2!1sen!2sgh!4v1752323253741!5m2!1sen!2sgh"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>

            {/* Contact Form */}
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactFormWithParams />
            </Suspense>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <Card className="p-6 glass border border-primary/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/Logos/kendo_logo.png"
                    alt="Ghana Kendo Federation"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-bold mb-4 text-lg">Federation Contact</h3>

                <div className="flex items-start gap-4 mb-4">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground">+233 266 000 201</p>
                </div>

                <div className="h-px bg-border my-4" />

                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-foreground">Aviation Social Centre</p>
                </div>

                <div className="h-px bg-border my-4" />

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <a href="mailto:Info@kendoghana.com" className="text-foreground hover:text-primary transition-colors">
                    Info@kendoghana.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 glass border border-primary/10">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold mb-2 text-lg">Availability</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Visits and inquiries are handled by appointment to ensure proper attention.
                  </p>
                </div>
              </div>
            </Card>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}