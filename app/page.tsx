import { Button } from "@/components/ui/button"
import { ArrowRight, Sword, Users, Trophy, Heart, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-background to-black" />

        {/* Animated red glow orbs - reduced opacity */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/8 rounded-full blur-[120px] animate-pulse-glow animation-delay-2000" />

        {/* Hero image */}
        <Image
          src="/japanese-ambassador-yoshimura-introducing-kendo-to.jpeg"
          alt="Kendo practitioner"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />

        {/* Grid overlay - hidden on mobile for cleaner experience */}
        <div className="hidden md:block absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(var(--primary-r), var(--primary-g), var(--primary-b), 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary-r), var(--primary-g), var(--primary-b), 0.03) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 text-center pt-16 sm:pt-20">
          <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8" data-aos="fade-up" data-aos-easing="ease-out-cubic" suppressHydrationWarning>
            {/* Badge with red accent */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/30 text-xs sm:text-sm font-medium">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-foreground">Traditional Japanese Martial Arts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-balance leading-[0.95] px-2">
              The way of the{" "}
              <span className="text-gradient relative">
                sword
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
              Discover traditional Japanese Kendo in Ghana. Join a community dedicated to discipline, respect, and
              personal excellence.
            </p>

            <div className="flex gap-3 sm:gap-4 justify-center flex-wrap pt-2 sm:pt-4 px-4 sm:px-0">
              <Button
                size="lg"
                asChild
                className="rounded-full px-8 h-14 gap-2 text-base bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 group"
              >
                <Link href="/clubs">
                  Find a Club <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full px-8 h-14 text-base hover:!bg-primary hover:!text-primary-foreground hover:!border-primary transition-all hover:scale-105 bg-transparent border-primary/30"
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div
              className="group relative overflow-hidden rounded-xl p-8 glass border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 text-center sm:text-left"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative flex flex-col items-center sm:items-start">
                <div className="flex items-baseline gap-2 mb-3 justify-center sm:justify-start">
                  <div className="text-5xl md:text-6xl font-bold text-gradient">8</div>
                  <div className="text-3xl font-bold text-primary/40">+</div>
                </div>
                <div className="text-sm text-muted-foreground font-medium">Member Clubs</div>
              </div>
            </div>

            <div
              className="group relative overflow-hidden rounded-xl p-8 glass border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 text-center sm:text-left"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative flex flex-col items-center sm:items-start">
                <div className="flex items-baseline gap-2 mb-3 justify-center sm:justify-start">
                  <div className="text-5xl md:text-6xl font-bold text-gradient">100</div>
                  <div className="text-3xl font-bold text-primary/40">+</div>
                </div>
                <div className="text-sm text-muted-foreground font-medium">Active Members</div>
              </div>
            </div>

            <div
              className="group relative overflow-hidden rounded-xl p-8 glass border border-primary/20 hover:border-primary/40 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/10 text-center sm:text-left"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors" />
              <div className="relative flex flex-col items-center sm:items-start">
                <div className="text-5xl md:text-6xl font-bold mb-3 text-gradient">2024</div>
                <div className="text-sm text-muted-foreground font-medium">Year Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origins Section - Visual Breathing Zone */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-40 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1 relative aspect-[4/5] group" data-aos="fade-in">
              {/* Subtle border only - removed glow for breathing space */}
              <div className="absolute inset-0 border border-primary/20 rounded-xl" />
              <Image
                src="/japanese-ambassador-yoshimura-introducing-kendo-to.jpeg"
                alt="Introduction of Kendo to Ghana"
                fill
                className="object-cover rounded-xl relative z-10 group-hover:scale-[1.02] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
              />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
            </div>
            <div className="order-1 lg:order-2" data-aos="fade-in" data-aos-delay="200">
              <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full glass border border-primary/30">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">Origins</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-balance leading-tight">
                Kendo arrives in <span className="text-gradient">Ghana</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
                <p>
                  In 2015, His Excellency Kaoru Yoshimura, the Japanese Ambassador to Ghana, played a pivotal role in introducing the traditional Japanese martial art of Kendo to the Ghanaian community. This initiative was part of a broader effort to promote cultural exchange and foster stronger ties between Japan and Ghana. 
                </p>
                <p>
                  Kendo, often referred to as "the way of the sword," is a modern martial art deeply rooted in the traditions of the samurai. It emphasizes discipline, respect, and the pursuit of self-improvement, values that align closely with the philosophies underpinning Japanese culture.
                </p>
              </div>
              <Button variant="link" asChild className="mt-8 px-0 gap-2 text-primary text-base group">
                <Link href="/about">
                  Read the full story <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background to-black/50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20" data-aos="fade-up">
              <p className="text-xs uppercase tracking-widest text-primary mb-3 font-semibold">
                The Federation Promise
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight px-4 sm:px-0">
                Why <span className="text-gradient">join us</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
                Experience the transformative power of traditional Kendo training
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div
                className="group relative p-8 rounded-xl glass border border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                data-aos="fade-up"
                data-aos-delay="0"
              >
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-xl border border-primary/30 group-hover:scale-110 transition-transform">
                  <Sword className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-4 text-primary/40">01</div>
                <h3 className="text-xl font-semibold mb-3">Traditional Training</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Experience authentic Kendo training rooted in centuries-old samurai tradition and philosophy.
                </p>
              </div>

              <div
                className="group relative p-8 rounded-xl glass border border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-xl border border-primary/30 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-4 text-primary/40">02</div>
                <h3 className="text-xl font-semibold mb-3">Expert Instruction</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Learn from certified instructors with international experience and deep cultural knowledge.
                </p>
              </div>

              <div
                className="group relative p-8 rounded-xl glass border border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-xl border border-primary/30 group-hover:scale-110 transition-transform">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-4 text-primary/40">03</div>
                <h3 className="text-xl font-semibold mb-3">Competitive Events</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Participate in local tournaments and international competitions to test your skills.
                </p>
              </div>

              <div
                className="group relative p-8 rounded-xl glass border border-primary/20 hover:border-primary/40 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-xl border border-primary/30 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold mb-4 text-primary/40">04</div>
                <h3 className="text-xl font-semibold mb-3">Welcoming Community</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Join a diverse, supportive community united by shared values and dedication to growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Inevitable & Philosophical */}
      <section className="py-24 sm:py-32 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/30 to-primary/20 animate-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px] animate-pulse-glow" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-easing="ease-out-quart">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6 sm:mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Start Your Journey</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 tracking-tight text-balance">
              Step onto the path of the sword
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Training is not about strength alone — it is about character.
              Your journey begins with a single step.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                asChild
                className="rounded-full px-8 h-14 gap-2 text-base bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-2xl shadow-primary/30 hover:shadow-primary/50 group"
              >
                <Link href="/clubs">
                  Explore Clubs <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full px-8 h-14 text-base border-primary/30 hover:!bg-primary hover:!text-primary-foreground hover:!border-primary transition-all hover:scale-105 bg-transparent"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
