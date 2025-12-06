"use client"

import { motion } from "framer-motion"
import { Building, Mail, Phone, MapPin, User, FileText } from "lucide-react"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      <ParticleField />
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <span className="text-primary text-sm font-medium tracking-wider uppercase block">
                  Mentions Légales
                </span>
                <p className="text-foreground/60 text-sm">Informations légales et réglementaires</p>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Mentions <span className="gradient-text">Légales</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Building className="h-6 w-6 text-primary" />
                1. Informations sur la Société
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Raison sociale</p>
                  <p className="text-foreground/90 font-semibold text-lg">IMBT Consulting</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Forme juridique</p>
                  <p className="text-foreground/90">Société à Responsabilité Limitée (SARL)</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Capital social</p>
                  <p className="text-foreground/90">20.000 TND</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                2. Siège Social
              </h2>
              <div className="space-y-2">
                <p className="text-foreground/90 leading-relaxed">
                  Immeuble Omar bloc A bureau 3-2
                  <br />
                  Montplaisir 1073
                  <br />
                  Tunis, Tunisie
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                3. Représentant Légal
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Gérant</p>
                  <p className="text-foreground/90 font-semibold">Ismail Ferjani</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Mail className="h-6 w-6 text-primary" />
                4. Coordonnées
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-foreground/60 text-sm">Téléphone</p>
                    <a href="tel:+21693286677" className="text-foreground/90 hover:text-primary transition-colors">
                      +216 93 286 677
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-foreground/60 text-sm">Email</p>
                    <a
                      href="mailto:contact@imbt-consulting.com"
                      className="text-foreground/90 hover:text-primary transition-colors"
                    >
                      contact@imbt-consulting.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Hébergement du Site</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Hébergeur</p>
                  <p className="text-foreground/90">Vercel Inc.</p>
                </div>
                <div>
                  <p className="text-foreground/60 text-sm mb-1">Adresse</p>
                  <p className="text-foreground/90">
                    340 S Lemon Ave #4133
                    <br />
                    Walnut, CA 91789
                    <br />
                    États-Unis
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Propriété Intellectuelle</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété
                exclusive d'IMBT Consulting ou de ses partenaires.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces
                différents éléments est strictement interdite sans l'accord écrit préalable d'IMBT Consulting.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Données Personnelles</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                IMBT Consulting s'engage à respecter la confidentialité des données personnelles collectées sur ce site.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Pour plus d'informations sur la collecte et le traitement de vos données personnelles, veuillez consulter
                notre{" "}
                <a href="/confidentialite" className="text-primary hover:underline">
                  Politique de Confidentialité
                </a>
                .
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Cookies</h2>
              <p className="text-foreground/80 leading-relaxed">
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En poursuivant
                votre navigation sur ce site, vous acceptez l'utilisation de cookies conformément à notre politique de
                confidentialité.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Limitation de Responsabilité</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                IMBT Consulting s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site.
                Toutefois, IMBT Consulting ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations
                mises à disposition sur ce site.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                IMBT Consulting ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès au
                site ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données, détériorations,
                destructions ou virus qui pourraient affecter l'équipement informatique de l'utilisateur.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Liens Hypertextes</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Le site peut contenir des liens hypertextes vers d'autres sites. IMBT Consulting ne saurait être
                responsable du contenu de ces sites tiers.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                La création de liens hypertextes vers le site d'IMBT Consulting nécessite l'autorisation préalable écrite
                de la société.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">11. Droit Applicable</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les présentes mentions légales sont régies par le droit tunisien. Tout litige relatif à l'utilisation du
                site sera de la compétence exclusive des tribunaux de Tunis.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
