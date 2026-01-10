"use client"

import { useEffect } from "react"
import type React from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    })
  }, [])

  return <>{children}</>
}

