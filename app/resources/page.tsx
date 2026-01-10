import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

const resources = [
  {
    title: "Ghana Kendo Federation Calendar 2025",
    description:
      "Official calendar outlining federation events, trainings, and competitions for 2025.",
    type: "PDF",
    href: "/Documents/Calendar - 2025.pdf",
  },
  {
    title: "Kendo Application Form",
    description:
      "Application form for membership, grading, or participation in Ghana Kendo Federation activities.",
    type: "PDF",
    href: "/Documents/kendo_application_form.pdf",
  },
  {
    title: "European Kendo Federation Grading Rules",
    description:
      "Official grading rules as defined by the European Kendo Federation (EKF).",
    type: "PDF",
    href: "/Documents/European Kendo Federation(EKF)grading rules.pdf",
  },
  {
    title: "Ghana Kendo Federation Constitution",
    description:
      "The governing constitution outlining the structure, mandate, and regulations of the Ghana Kendo Federation.",
    type: "PDF",
    href: "/Documents/Ghana Kendo Federation -Constitution-updated - Dec-2024.pdf",
  },
]

const externalLinks = [
  {
    title: "International Kendo Federation",
    url: "https://www.kendo-fik.org/",
    description: "The global governing body for Kendo",
  },
  {
    title: "All Japan Kendo Federation",
    url: "https://www.kendo.or.jp/en/",
    description: "Japan's national Kendo federation",
  },
  {
    title: "Kendo World Magazine",
    url: "https://kendoworld.com/",
    description: "International Kendo publication and resources",
  },
]

export const metadata = {
  title: "Resources - Ghana Kendo Federation",
  description:
    "Download and view official documents, guides, and external resources for Kendo practitioners",
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-24">
        {/* Page Header */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Resources
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Access official documents, forms, and trusted external resources for
            Kendo practitioners.
          </p>
        </div>

        {/* Downloads */}
        <div className="max-w-5xl mb-20">
          <h2 className="text-3xl font-bold mb-8">Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <Card
                key={resource.title}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-kendo-red/10 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="h-6 w-6 text-kendo-red" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-2 text-lg">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {resource.type}
                      </span>

                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="gap-2 bg-transparent"
                      >
                        <a
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FileText className="h-4 w-4" />
                          View
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">External Resources</h2>
          <div className="space-y-4">
            {externalLinks.map((link) => (
              <Card
                key={link.title}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold mb-1">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>

                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}