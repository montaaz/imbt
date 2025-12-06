"use client"

import { motion } from "framer-motion"
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function CGVPage() {
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
                <Scale className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <span className="text-primary text-sm font-medium tracking-wider uppercase block">
                  Conditions Générales de Vente
                </span>
                <p className="text-foreground/60 text-sm">En vigueur au 01/01/2025</p>
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Conditions Générales <span className="gradient-text">de Vente</span>
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
                1. Objet
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre IMBT
                Consulting, société de conseil et de services informatiques, et ses clients dans le cadre de la
                fourniture de prestations de conseil en transformation digitale, développement informatique et marketing
                digital.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-primary" />
                2. Prestations
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                IMBT Consulting propose les prestations suivantes :
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Conseil en transformation digitale et stratégie numérique</li>
                <li>Développement d'applications web et mobiles sur mesure</li>
                <li>Solutions de marketing digital et communication</li>
                <li>Audit et optimisation des systèmes d'information</li>
                <li>Formation et accompagnement</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Devis et Commandes</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Toute prestation fait l'objet d'un devis détaillé précisant la nature des services, les délais de
                réalisation et le prix. Le devis est valable 30 jours à compter de sa date d'émission.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                La commande est réputée ferme et définitive après signature du devis par le client et versement de
                l'acompte éventuel.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Prix et Modalités de Paiement</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les prix sont exprimés en Dinars Tunisiens (TND) ou en Euros (EUR) hors taxes. Ils sont fermes et non
                révisables pendant la durée d'exécution de la prestation, sauf accord contraire.
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                <strong>Modalités de paiement :</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Acompte de 30% à la signature du contrat</li>
                <li>40% à mi-parcours de la prestation</li>
                <li>Solde de 30% à la livraison finale</li>
              </ul>
              <p className="text-foreground/80 leading-relaxed mt-4">
                Le paiement s'effectue par virement bancaire dans un délai de 30 jours à compter de la date d'émission
                de la facture.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Délais d'Exécution</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les délais d'exécution sont indiqués à titre indicatif dans le devis. IMBT Consulting s'engage à mettre
                en œuvre tous les moyens nécessaires pour respecter les délais convenus. Tout retard imputable au client
                entraîne un report proportionnel des délais.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Obligations du Client</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">Le client s'engage à :</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-4">
                <li>Fournir toutes les informations et documents nécessaires à la réalisation de la prestation</li>
                <li>Désigner un interlocuteur unique</li>
                <li>Valider les livrables dans les délais convenus</li>
                <li>Régler les factures aux échéances prévues</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Propriété Intellectuelle</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les développements réalisés spécifiquement pour le client deviennent sa propriété après paiement
                intégral du prix convenu.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                IMBT Consulting conserve la propriété de ses méthodes, outils, frameworks et composants réutilisables.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Confidentialité</h2>
              <p className="text-foreground/80 leading-relaxed">
                Les parties s'engagent à maintenir confidentielles toutes les informations échangées dans le cadre de la
                prestation. Cette obligation subsiste pendant toute la durée du contrat et pendant 5 ans après son terme.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Garanties et Responsabilité</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                IMBT Consulting garantit que les prestations seront réalisées conformément aux règles de l'art et aux
                standards de la profession.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                La responsabilité d'IMBT Consulting ne peut être engagée qu'en cas de faute prouvée et est limitée au
                montant des sommes effectivement versées par le client.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Résiliation</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                En cas de manquement grave de l'une des parties à ses obligations, l'autre partie pourra résilier le
                contrat de plein droit 15 jours après l'envoi d'une mise en demeure restée sans effet.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                En cas de résiliation pour faute du client, les sommes déjà versées restent acquises à IMBT Consulting.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-primary" />
                11. Force Majeure
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                Aucune des parties ne sera tenue responsable d'un retard ou d'une inexécution résultant d'un cas de force
                majeure tel que défini par la jurisprudence tunisienne.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Droit Applicable et Litiges</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                Les présentes CGV sont régies par le droit tunisien.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                En cas de litige, les parties s'engagent à rechercher une solution amiable. À défaut, le litige sera
                porté devant les tribunaux compétents de Tunis.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">13. Contact</h2>
              <p className="text-foreground/80 leading-relaxed mb-2">
                <strong>IMBT Consulting</strong>
              </p>
              <p className="text-foreground/80 leading-relaxed mb-2">
                Immeuble Omar bloc A bureau 3-2 Montplaisir 1073, Tunis, Tunisie
              </p>
              <p className="text-foreground/80 leading-relaxed mb-2">
                <strong>Email :</strong> contact@imbt-consulting.com
              </p>
              <p className="text-foreground/80 leading-relaxed">
                <strong>Téléphone :</strong> +216 93 286 677
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
