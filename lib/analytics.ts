/**
 * Analytics utility for tracking donations and user interactions
 */

interface DonationEvent {
  amount: number
  currency: string
  donation_type: string
  reference: string
  channel?: string
  email?: string
  campaign?: string
}

interface PageViewEvent {
  page: string
  title?: string
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
    fbq?: (...args: any[]) => void
    _gaq?: any[]
  }
}

/**
 * Track a donation completion event
 */
export function trackDonation(event: DonationEvent) {
  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "donation_completed", {
      value: event.amount,
      currency: event.currency,
      transaction_id: event.reference,
      donation_type: event.donation_type,
      channel: event.channel || "web",
    })
  }

  // Legacy Google Analytics
  if (typeof window !== "undefined" && window._gaq) {
    window._gaq.push([
      "_trackEvent",
      "Donations",
      "Donation Completed",
      event.donation_type,
      event.amount,
    ])
  }

  // Facebook Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Donate", {
      value: event.amount,
      currency: event.currency,
      content_name: event.donation_type,
    })
  }

  // DataLayer for GTM
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "donation_completed",
      donation_amount: event.amount,
      donation_currency: event.currency,
      donation_type: event.donation_type,
      transaction_id: event.reference,
      channel: event.channel || "web",
    })
  }

  // Server-side tracking (send to your analytics endpoint)
  if (typeof window !== "undefined") {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: "donation_completed",
        ...event,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch((error) => {
      console.error("Failed to send analytics event:", error)
    })
  }
}

/**
 * Track page views
 */
export function trackPageView(event: PageViewEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID || "", {
      page_path: event.page,
      page_title: event.title,
    })
  }

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "page_view",
      page: event.page,
      title: event.title,
    })
  }
}

/**
 * Track button clicks or other interactions
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties)
  }

  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...properties,
    })
  }
}
