"use client"

import { useEffect } from "react"
import type React from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import { ThemeProvider } from "@/components/theme-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Delay AOS initialization to prevent hydration mismatches
    const timer = setTimeout(() => {
      AOS.init({
        duration: 900,
        easing: "ease-out-cubic",
        once: true,
        offset: 80,
        startEvent: "DOMContentLoaded",
      })
      AOS.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}

