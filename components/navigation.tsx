"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    // Check initial scroll position
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine if navbar should have solid background
  // Always solid when mobile menu is open, or when scrolled
  const shouldShowSolid = mobileMenuOpen || scrolled

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        shouldShowSolid ? "glass border-b border-primary/20 shadow-2xl shadow-primary/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 text-base sm:text-xl font-bold tracking-tight hover:scale-105 transition-transform group"
          >
            <img
              src="/Logos/kendo_logo.png"
              alt="Ghana Kendo Federation Logo"
              className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
            />
            <span className="text-foreground group-hover:text-gradient transition-all text-xs sm:text-base md:text-xl">
              Ghana Kendo Federation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>

            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium bg-transparent">
                    Clubs
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!bg-background !text-foreground z-50">
                    <div className="w-[500px] p-6 bg-background text-foreground backdrop-blur-xl border border-primary/10 shadow-xl rounded-md">
                      <div className="flex gap-6">
                        {/* Column 1 */}
                        <div className="flex-1 flex flex-col gap-6">
                          {/* Greater Accra */}
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                              Greater Accra
                            </h4>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/nungua"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Nungua Kendo Dojo
                              </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/great-sword"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Great Sword - Sage Kendo Club
                              </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/datus"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Datus International School
                              </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/aviation"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Aviation Social Center
                              </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/kensei"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Kensei Kendo Dojo
                              </Link>
                            </NavigationMenuLink>
                          </div>

                          {/* Ashanti Region */}
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                              Ashanti Region
                            </h4>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/ashanti-north"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Ashanti North Kendo Club
                              </Link>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/clubs/cove"
                                className="block text-sm text-foreground hover:text-foreground hover:bg-primary/20 transition-colors py-1 px-2 rounded"
                              >
                                Cove Kendo Club
                              </Link>
                            </NavigationMenuLink>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="flex-1 flex flex-col gap-6">
                          {/* Volta Region */}
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                              Volta Region
                            </h4>
                            <p className="text-sm text-muted-foreground italic">Coming Soon</p>
                          </div>

                          {/* Central Region */}
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                              Central Region
                            </h4>
                            <p className="text-sm text-muted-foreground italic">Coming Soon</p>
                          </div>

                          {/* Eastern Region */}
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                              Eastern Region
                            </h4>
                            <p className="text-sm text-muted-foreground italic">Coming Soon</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/news" className="text-sm font-medium hover:text-primary transition-colors">
              Events
            </Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-primary transition-colors">
              Gallery
            </Link>
            <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 rounded-full hover:bg-primary/10 transition-all"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button
              size="sm"
              asChild
              className="rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50"
            >
              <Link href="/donate">Donate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 rounded-full hover:bg-primary/10 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 space-y-3 sm:space-y-4 border-t border-primary/20 px-4 sm:px-0">
            <Link
              href="/about"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/clubs"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Clubs
            </Link>
            <Link
              href="/news"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/shop"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/resources"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="block text-base sm:text-lg hover:text-foreground/80 transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <Button
                asChild
                className="w-full rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-primary/50"
              >
                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                  Donate
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}