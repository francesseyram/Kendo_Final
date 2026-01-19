"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function ContactFormClient() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

      <Navigation />

      {/* Hero */}
      <div className="relative bg-gradient-to-b from-background via-background/95 to-background py-24 sm:py-28 md:py-32 lg:py-40 text-center">
        <h1 className="text-5xl font-bold mb-4">Get in touch</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Whether you're beginning your journey or seeking guidance, we're here to help.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Google Maps */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl font-semibold">Training Location</h3>
              <p className="text-sm text-muted-foreground">
                Our primary training sessions are held at the Aviation Social Centre.
              </p>
              <Card className="p-0 overflow-hidden glass border border-primary/10">
                <div className="w-full h-[300px] sm:h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.8361082789584!2d-0.17915052452556374!3d5.591223033293497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9aefb8485fa7%3A0xc0ff6bbede1c6ad5!2sAviation%20Social%20Centre!5e0!3m2!1sen!2sgh!4v1752323253741!5m2!1sen!2sgh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-6 sm:p-8 glass border border-primary/10">
              {success && (
                <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-sm text-foreground">
                    Thank you. Your message has been received.
                  </p>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Our technical team will respond and guide you accordingly.
              </p>

              <form
                action="https://formsubmit.co/info@kendoghana.com"
                method="POST"
                className="space-y-6"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="/contact?success=true" />

                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
                <Input
                  type="text"
                  name="contact"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full"
                />
                <Textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto uppercase tracking-wide px-8 bg-primary hover:bg-primary/90"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="p-6 glass border border-primary/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Image
                    src="/Logos/kendo_logo.png"
                    alt="Ghana Kendo Federation"
                    width={64}
                    height={64}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary mt-1" />
                  <p>+233 266 000 201</p>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <p>Aviation Social Centre</p>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <a href="mailto:Info@kendoghana.com">
                    Info@kendoghana.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 glass border border-primary/10">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <p className="text-sm text-muted-foreground">
                  Visits and inquiries are handled by appointment.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}