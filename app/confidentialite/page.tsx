"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText } from "lucide-react"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function ConfidentialitePage() {
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
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <span className="text-primary text-sm font-medium tracking-wider uppercase block">
                  Politique de Confidentialité
                </span>
                <p className="text-foreground/60 text-sm">Dernière mise à jour : 17 juillet 2025</p>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Politique de <span className="gradient-text">Confidentialité</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                1. Responsable du Traitement
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                IMBT Consulting est située à l'adresse suivante : Immeuble Omar bloc A bureau 3-2 Montplaisir 1073,
                Tunis, Tunisie.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-2">
                <strong>Contact :</strong> contact@imbt-consulting.com
              </p>
              <p className="text-foreground/80 leading-relaxed mb-2">
                <strong>Téléphone :</strong> +216 93 286 677
              </p>
              <p className="text-foreground/80 leading-relaxed">
                <strong>Responsable :</strong> Ismail Ferjani
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Eye className="h-6 w-6 text-primary" />
                2. Collecte des Données
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Nous collectons les types de données suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Données d'identification (nom, société, fonction)</li>
                <li>Informations de contact (email, téléphone, adresse)</li>
                <li>Données techniques (adresse IP, navigateur, cookies)</li>
                <li>Informations professionnelles liées aux besoins de conseil</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                3. Finalités du Traitement
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Répondre aux demandes de contact ou de devis</li>
                <li>Fournir des services de conseil, développement et marketing digital</li>
                <li>Gestion administrative</li>
                <li>Amélioration de nos services</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Lock className="h-6 w-6 text-primary" />
                4. Base Légale
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Votre consentement pour les communications marketing</li>
                <li>L'exécution d'un contrat pour la prestation de services</li>
                <li>Les obligations légales pour la comptabilité et la fiscalité</li>
                <li>Nos intérêts légitimes pour l'amélioration des services</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Conservation des Données</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les informations sont conservées pendant la durée de la relation contractuelle et jusqu'à cinq ans après
                le dernier contact, avec une conservation plus longue si requise légalement.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Destinataires des Données</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Peuvent accéder à vos données :
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Le personnel autorisé d'IMBT Consulting</li>
                <li>Les partenaires techniques et sous-traitants (hébergement, systèmes CRM)</li>
                <li>Les autorités administratives et judiciaires si requis légalement</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Vos Droits</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Vous disposez des droits suivants concernant vos données :
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Pour exercer ces droits, contactez-nous à : contact@imbt-consulting.com
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Mesures de Sécurité</h2>
              <p className="text-foreground/80 leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées incluant le chiffrement,
                les pare-feu et l'accès restreint pour protéger vos données personnelles.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Transferts Internationaux</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les transferts de données hors Tunisie/UE incluent des garanties appropriées telles que les clauses
                contractuelles types.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Cookies</h2>
              <p className="text-foreground/80 leading-relaxed">
                Notre site utilise des cookies à des fins d'analyse, de navigation et de marketing. Vous pouvez refuser
                ou configurer les cookies via les paramètres de votre navigateur.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Réclamations</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les résidents tunisiens peuvent contacter l'INPDP (Instance Nationale de Protection des Données
                Personnelles). Les résidents de l'UE peuvent contacter leur autorité nationale de protection des données.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">12. Mises à Jour de la Politique</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les modifications seront communiquées via le site web ou par email.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
