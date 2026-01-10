import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Calendar, ExternalLink, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Status badge color mapping
const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-green-500/80"
    case "ongoing":
      return "bg-blue-500/80"
    case "completed":
      return "bg-gray-500/80"
    default:
      return "bg-gray-500/80"
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case "upcoming":
      return "Upcoming"
    case "ongoing":
      return "Ongoing"
    case "completed":
      return "Completed"
    default:
      return "Event"
  }
}

const events = [
  {
    id: 1,
    title: "Two Days Intensive Seminar",
    date: "13th and 14th December 2025",
    image: "/news/intensive_seminar.jpeg",
    status: "completed",
    type: "seminar",
    featured: false,
  },
  {
    id: 2,
    title: "Tunis International Open",
    date: "28th - 30th November 2025",
    image: "/news/tunis.jpeg",
    status: "completed",
    type: "championship",
    featured: false,
  },
  {
    id: 3,
    title: "Japan Ambassador's Championship",
    date: "November 2025",
    image: "/news/japan_ambassadors.jpeg",
    status: "completed",
    type: "championship",
    featured: false,
  },
  {
    id: 4,
    title: "22nd Yosakoi Japan Festival",
    date: "November 2025",
    image: "/news/yosakoi.jpeg",
    status: "completed",
    type: "festival",
    featured: false,
  },
  {
    id: 5,
    title: "National Team Training",
    date: "Sept, Oct, Nov 2025",
    image: "/news/team_training.jpeg",
    status: "completed",
    type: "training",
    featured: false,
  },
  {
    id: 6,
    title: "National Kendo Senior Challenge",
    date: "August 2025",
    image: "/news/kendo_seniors_challenge.jpg",
    status: "completed",
    type: "championship",
    featured: false,
  },
  {
    id: 7,
    title: "National Kendo Seniors Challenge Registered Players",
    date: "August 2025",
    image: "/news/kendo_seniors_players.jpeg",
    status: "completed",
    type: "championship",
    featured: false,
  },
  {
    id: 8,
    title: "First National Inter-Club Kendo Championships",
    date: "June 2025",
    image: "/news/inter_club.jpg",
    status: "completed",
    type: "championship",
    featured: false,
  },
  {
    id: 9,
    title: "National Kendo Referees Seminar",
    date: "May 2025",
    image: "/news/referees_seminar.jpg",
    status: "completed",
    type: "seminar",
    featured: false,
  },
  {
    id: 10,
    title: "Japanese Ambassador Championship",
    date: "March 2025",
    image: "/news/japanese_ambassador.jpg",
    status: "completed",
    type: "championship",
    featured: false,
  },
  {
    id: 11,
    title: "National Kendo-Ka Seminar",
    date: "January 2025",
    image: "/news/kendo_ka.jpg",
    status: "completed",
    type: "seminar",
    featured: false,
  },
]

// Filter out featured event from main grid
const regularEvents = events.filter((event) => !event.featured)
const featuredEvent = events.find((event) => event.featured)

const newsLinks = [
  { 
    id: 1,
    title: "The National Seniors Kendo Challenge!! Excerpts of Strength and Honour", 
    url: "https://web.facebook.com/61571301195088/videos/1337358874447072/?rdid=cPLUWiLL4rcazUso#"
  },
  {
    id: 2,
    title: "Ghana Kendo Federation Announces National Team Selection",
    url: "https://obusports.org/2025/07/12/ghana-kendo-federation-announces-national-team-selection/",
  },
  {
    id: 3,
    title: "1st National Inter-Club Kendo Championships",
    url: "https://youtu.be/ArRtLgqO7VY?si=KADfwEp0F9UudfJI",
  },
  {
    id: 4,
    title: "Japanese Ambassador Kendo Championship Hosts 5th Edition",
    url: "https://obusports.org/2025/03/16/japanese-ambassador-kendo-championship-hosts-5th-edition/",
  },
  {
    id: 5,
    title: "Ghana Kendo Federation Hosts Referees Seminar to Enhance Officiating",
    url: "https://obusports.org/2025/04/07/ghana-kendo-association-hosts-referees-seminar-to-enhance-officiating/",
  },
]

export const metadata = {
  title: "Events - Ghana Kendo Federation",
  description: "Stay updated with the latest news and upcoming events from Ghana Kendo Federation",
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 overflow-hidden">
        {/* Grid background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 rounded-full glass border border-primary/20 animate-pulse-glow">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Events</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance text-gradient">
              Events
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-3xl mx-auto">
              Stay updated with the latest news, upcoming events, and competitions from the Ghana Kendo Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          
          {/* Main Content - Events Grid */}
          <div className="lg:col-span-3">
            {/* Featured Event */}
            {featuredEvent && (
              <Card
                className="mb-6 sm:mb-10 overflow-hidden grid grid-cols-1 md:grid-cols-2 group hover:shadow-xl transition-all duration-300"
                data-aos="zoom-in"
              >
                <div className="relative h-full min-h-[250px] sm:min-h-[300px] md:min-h-0">
                  <Image
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 sm:px-3 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur">
                    {getStatusLabel(featuredEvent.status)}
                  </span>
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                  <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-wide">
                    Featured Event
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 text-foreground">
                    {featuredEvent.title}
                  </h2>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    A historic milestone marking Ghana's first nationwide Kendo championship,
                    bringing together clubs, referees, and national selectors.
                  </p>
                  <div className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    {featuredEvent.date}
                  </div>
                </div>
              </Card>
            )}

            {/* Regular Events Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {regularEvents.map((event, index) => (
                <Card
                  key={event.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="relative bg-black/40 aspect-[3/4] flex items-center justify-center">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={400}
                      height={600}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Status Badge */}
                    <span
                      className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full text-white backdrop-blur ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Calendar className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{event.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - Press Coverage */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <Card className="p-4 sm:p-6 sticky top-20 sm:top-24">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Newspaper className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Press Coverage</h2>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {newsLinks.map((news, index) => (
                  <Link
                    key={news.id}
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    data-aos="fade-left"
                    data-aos-delay={index * 100}
                  >
                    <div className="relative p-3 sm:p-4 rounded-lg border border-border bg-card hover:bg-gradient-to-br hover:from-accent/30 hover:to-accent/10 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
                      
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        {index + 1}
                      </div>

                      <div className="flex items-start gap-3 relative z-10">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                            <ExternalLink className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 pr-4 sm:pr-6">
                          <span className="text-xs text-muted-foreground block mb-1">
                            External Media
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-all duration-300 leading-relaxed group-hover:translate-x-1 line-clamp-2">
                            {news.title}
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/80 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      
                      <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}