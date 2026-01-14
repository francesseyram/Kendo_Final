import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"

export const metadata = {
  title: "About Us - Ghana Kendo Federation",
  description: "Learn about the history, mission, and governance of the Ghana Kendo Federation",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(var(--primary-r), var(--primary-g), var(--primary-b), 0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(var(--primary-r), var(--primary-g), var(--primary-b), 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <span className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass border border-primary/20 animate-pulse-glow text-xs uppercase tracking-widest text-primary">
                About Us
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 text-gradient">
                The Way of the Sword in Ghana
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The Ghana Kendo Federation is the national body dedicated to preserving,
                developing, and representing the spirit and discipline of Kendo in Ghana.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Statement Image */}
          <div className="relative mb-12 sm:mb-16 md:mb-20">
            <Image
              src="/gallery_images/saturday_training/practice_14.jpg"
              alt="Kendo training in Ghana"
              width={1200}
              height={600}
              className="rounded-3xl shadow-2xl w-full object-cover"
            />

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <p className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-xs sm:text-sm text-white/80 max-w-xs sm:max-w-md">
              Discipline. Respect. Continuous self-improvement.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20 md:space-y-24 pb-12 sm:pb-16 md:pb-20">

            {/* About the Federation */}
            <section className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient">About the Federation</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Ghana Kendo Federation (GKF) was established in 2024 as a non-profit organization
                dedicated to promoting the practice and spirit of Kendo in alignment with its
                traditional values. The federation serves as the national body responsible for the
                development, regulation, and representation of Kendo in Ghana.
              </p>
            </section>

            {/* Introduction of Kendo to Ghana */}
            <section className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient">The Introduction of Kendo to Ghana</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In 2015, His Excellency Kaoru Yoshimura, the Japanese Ambassador to Ghana, played a pivotal role in introducing 
                the traditional Japanese martial art of Kendo to the Ghanaian community. This initiative was part of a broader 
                effort to promote cultural exchange and foster stronger ties between Japan and Ghana.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Kendo, often referred to as "the way of the sword," is a modern martial art deeply rooted in the traditions
                of the samurai. It emphasizes discipline, respect, and the pursuit of self-improvement, values that align
                closely with the philosophies underpinning Japanese culture.
              </p>

            </section>

            {/* History & Milestones */}
            <section className="space-y-4 sm:space-y-6 mt-12 sm:mt-16 md:mt-24">
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-4 sm:mb-6"
                data-aos="fade-up"
              >
                History & Milestones
              </h2>
              <p
                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                From its introduction to Ghana through diplomatic channels to becoming a recognized national federation,
                the journey of Kendo in Ghana has been marked by significant milestones and achievements.
              </p>

              <div className="relative border-l border-primary/30 pl-6 sm:pl-8 md:pl-10 space-y-10 sm:space-y-12 md:space-y-16 mt-8 sm:mt-10 md:mt-12">
                {[
                  {
                    year: "2015",
                    text: "His Excellency Kaoru Yoshimura, then Japanese Ambassador to Ghana, introduced Kendo through demonstrations, workshops, and training sessions supported by the Japanese Embassy, Ghana Judo Federation, Ghana Karate Federation, and the National Sports Authority. This marked the first organized exposure of the martial art to the Ghanaian community.",
                  },
                  {
                    year: "2024",
                    text: "The Ghana Kendo Federation (GKF) was officially established as a national non-profit organization dedicated to promoting and regulating Kendo in Ghana, aligning with traditional values of discipline, respect, and self-improvement.",
                  },
                  {
                    year: "January 2025",
                    text: "The Federation hosted a National Kendo-Ka Seminar, gathering practitioners for advanced training and community development.",
                  },
                  {
                    year: "March 2025",
                    text: "The Japanese Ambassador Championship was held, reinforcing cultural and diplomatic ties and offering competition experience to Ghanaian kenshi.",
                  },
                  {
                    year: "May 2025",
                    text: "GKF conducted a National Kendo Referees Seminar to strengthen officiating standards and enhance competitive structure within the federation.",
                  },
                  {
                    year: "June 28, 2025",
                    text: "Ghana Kendo Federation hosted its inaugural National Inter-Club Championships at the Accra Sports Stadium. This was a major milestone showcasing competitive Kendo across age groups and identifying top talent within the country.",
                  },
                  {
                    year: "July 12, 2025",
                    text: "Following the first National Inter-Club Championships, the Federation selected athletes for the Ghana National Kendo Team, establishing a structured national team with scheduled monthly training sessions at the Aviation Social Center.",
                  },
                  {
                    year: "November 28–30, 2025",
                    text: "Ghana Kendo Federation participated in the Tunis International Open, competing internationally and building exposure for Ghanaian athletes on the global stage.",
                  },
                  {
                    year: "December 13–14, 2025",
                    text: "A 2-day intensive seminar was conducted, aimed at high-level training and skill development with international or experienced instructors.",
                  },
                  {
                    year: "2025",
                    text: "The National Seniors Kendo Challenge was held, an event designed for senior competitors to test and refine their skills in a competitive setting.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.year}
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <span className="absolute -left-[38px] sm:-left-[46px] top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary shadow-md shadow-primary/40" />

                    {/* Content Card */}
                    <div className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/20 hover:border-primary/40 transition-all">
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-primary">
                        {item.year}
                      </span>
                      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Objectives & Mandate */}
            <section className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">Objectives & Mandate</h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                {[
                  "Foster and develop the practice and ethos of Kendo while organizing and regulating its activities both nationally and internationally.",
                  "Represent Ghana at international Kendo events and oversee the promotion of members to higher ranks.",
                  "Encourage the highest ethical standards and cultivate self-discipline, character, and respect through regular practice.",
                  "Uphold democratic principles in all federation operations and decision-making.",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass rounded-2xl p-6 border border-primary/20 hover:border-primary/40 transition"
                  >
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recognition & Affiliations */}
            <section className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient">Recognition & Affiliations</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The Ghana Kendo Federation is the sole recognized body for Kendo, Iaido, and Jodo in
                Ghana. It is officially accredited by the Registrar General's Department and the
                National Sports Authority of Ghana.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                As a newly established federation, the GKF is committed to expanding the practice of
                Kendo nationwide and aims to affiliate with both the European Kendo Federation and the
                International Kendo Federation by 2025.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                The federation currently benefits from training support provided by the Embassy of
                Japan, helping to develop skilled instructors with backgrounds in Judo, Aikido,
                Karate-Do, and Taekwondo.
              </p>
            </section>

            {/* Governance */}
            <section className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">Governance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
                {[
                  ["President & Acting Secretary", "Sesinam Don Dzakpasu"],
                  ["Vice President", "Dickson Enam Kwame Acolatse"],
                  ["Technical Director", "Promise Bruce Adjaho"],
                  ["Deputy Technical Director", "Daniel Barnes"],
                  ["Chief Instructor", "Russo Thierry Rusman De-Roch"],
                  ["Executive Member & Instructor", "Randolph Darku"],
                  ["Executive Member", "Wahab El Housseini"],
                ].map(([role, name]) => (
                  <div
                    key={name}
                    className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary/20"
                  >
                    <p className="text-xs sm:text-sm text-primary uppercase tracking-wide">{role}</p>
                    <p className="mt-1.5 sm:mt-2 text-sm sm:text-base font-medium">{name}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* What is Kendo */}
            <section className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gradient">What is Kendo?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Kendo is a modern Japanese martial art that descended from traditional swordsmanship
                (kenjutsu) and uses bamboo swords (shinai) and protective armor (bogu). The name Kendo 
                translates to "the way of the sword" in English.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond physical technique, Kendo emphasizes character development, mental discipline, and the pursuit 
                of continuous self-improvement. Practitioners learn not just how to wield a sword, but how to cultivate 
                a strong spirit, respect for others, and integrity in all aspects of life.
              </p>
            </section>
          </div>

          {/* Philosophical Close */}
          <section className="mt-32 text-center max-w-3xl mx-auto pb-20">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gradient">
              More Than a Martial Art
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Kendo is not merely practiced with the sword, but with the heart.
              Through discipline and respect, we seek to build individuals who
              contribute positively to society.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}