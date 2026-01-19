import { Suspense } from "react"
import ContactFormClient from "./ContactFormClient"

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactFormClient />
    </Suspense>
  )
}