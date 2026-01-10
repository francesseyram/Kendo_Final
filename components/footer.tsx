import Link from "next/link"
import Image from "next/image"
import { Facebook, Youtube, Phone, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      {/* Main Footer Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/Logos/kendo_logo.png"
                alt="Ghana Kendo Federation Logo"
                width={80}
                height={56}
                className="object-contain"
              />
              <div className="text-foreground text-lg sm:text-xl md:text-[26px] font-bold leading-tight">
                Ghana Kendo Federation
              </div>
            </Link>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              The Ghana Kendo Federation (GKF) was established in 2024 as a non-profit organization dedicated to promoting the practice and spirit of Kendo in alignment with its traditional values.
            </p>
          </div>

          {/* Column 2: Useful Links */}
          <div className="space-y-4">
            <h5 className="text-foreground text-sm sm:text-base font-semibold mb-3 sm:mb-4">Useful Links</h5>
            <ul className="space-y-1 text-muted-foreground text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-primary transition-colors py-1 block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors py-1 block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-primary transition-colors py-1 block">
                  Member Clubs
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-primary transition-colors py-1 block">
                  Store
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors py-1 block">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h5 className="text-foreground text-sm sm:text-base font-semibold mb-3 sm:mb-4">Contact Info</h5>
            <div className="space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base">
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>+233 266 000 201</span>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Aviation Social Center</span>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Info@kendoghana.com</span>
              </div>
            </div>
          </div>

          {/* Column 4: Documents */}
          <div className="space-y-4">
            <h5 className="text-foreground text-sm sm:text-base font-semibold mb-3 sm:mb-4">Documents</h5>
            <ul className="space-y-1 text-muted-foreground text-sm sm:text-base">
              <li>
                <a
                  href="/Documents/Calendar - 2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors py-1 block"
                >
                  Calendar - 2025
                </a>
              </li>
              <li>
                <a
                  href="/Documents/European Kendo Federation(EKF)grading rules.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors py-1 block"
                >
                  European Kendo Federation (EKF) Grading Rules
                </a>
              </li>
              <li>
                <a
                  href="/Documents/Ghana Kendo Federation -Constitution-updated - Dec-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors py-1 block"
                >
                  Ghana Kendo Federation Constitution
                </a>
              </li>
              <li>
                <a
                  href="/Documents/kendo_application_form.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors py-1 block"
                >
                  Ghana Kendo Club Application Form
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="bg-muted border-t border-border py-4 sm:py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
            {/* Copyright */}
            <div className="text-muted-foreground text-xs sm:text-sm font-semibold text-center md:text-left">
              <Link href="/" className="hover:text-primary transition-colors">
                © {new Date().getFullYear()} Ghana Kendo Federation. All Rights Reserved.
              </Link>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61571301195088&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
