"use client"

import { motion } from "framer-motion"
import { Briefcase, Users, TrendingUp, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

const positions = [
  {
    title: "Développeur Full Stack",
    type: "CDI",
    location: "Paris / Remote",
    description: "Rejoignez notre équipe de développement pour créer des solutions innovantes.",
  },
  {
    title: "Consultant Digital",
    type: "CDI",
    location: "Paris",
    description: "Accompagnez nos clients dans leur transformation digitale.",
  },
  {
    title: "Designer UX/UI",
    type: "CDI / Freelance",
    location: "Remote",
    description: "Créez des expériences utilisateur exceptionnelles pour nos clients.",
  },
]

const benefits = [
  {
    icon: TrendingUp,
    title: "Évolution de carrière",
    description: "Des opportunités de croissance et de développement professionnel.",
  },
  {
    icon: Users,
    title: "Équipe passionnée",
    description: "Travaillez avec des experts passionnés par leur métier.",
  },
  {
    icon: Heart,
    title: "Équilibre vie pro/perso",
    description: "Télétravail flexible et horaires adaptables.",
  },
  {
    icon: Briefcase,
    title: "Projets innovants",
    description: "Participez à des projets stimulants et innovants.",
  },
]

export default function CarrieresPage() {
  return (
    <main className="min-h-screen bg-background">
      <ParticleField />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">Carrières</span>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Rejoignez notre <span className="gradient-text">équipe</span>
            </h1>
            <p className="text-foreground/60 text-xl leading-relaxed mb-8">
              Faites partie d'une équipe passionnée qui transforme les entreprises grâce au digital. Découvrez nos
              opportunités et construisez votre carrière avec nous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Pourquoi nous <span className="gradient-text">rejoindre</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Découvrez les avantages de faire partie de notre équipe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl glass hover:bg-card/60 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <benefit.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Postes <span className="gradient-text">ouverts</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Découvrez nos opportunités actuelles et postulez dès maintenant
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl glass hover:bg-card/60 transition-all duration-500 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {position.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                        {position.location}
                      </span>
                    </div>
                    <p className="text-foreground/60">{position.description}</p>
                  </div>
                  <Link href="/contact">
                    <Button className="glow-primary group/btn">
                      Postuler
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl glass glow-primary">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Candidature <span className="gradient-text">spontanée</span>
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
              Vous ne trouvez pas le poste qui vous correspond ? Envoyez-nous votre candidature spontanée, nous serions
              ravis de vous rencontrer.
            </p>
            <Link href="/contact">
              <Button size="lg" className="glow-primary">
                Nous contacter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
