import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ghana Kendo Federation",
  description: "Promoting the way of the sword in Ghana through traditional Japanese Kendo",
  generator: "Sentinel360",
  icons: {
    icon: "/Logos/kendo_logo.png",
    apple: "/Logos/kendo_logo.png",
    shortcut: "/Logos/kendo_logo.png",
  },
  // Performance optimizations
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kendoghana.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
