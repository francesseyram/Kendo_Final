"use client"

import React, { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function ContactFormWithParams() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  return (
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
  )
}