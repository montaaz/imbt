"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, FileText, Users, Globe, AlertCircle, Mail, Phone, MapPin, Target, Clock, Cookie, ArrowLeft, Scale } from "lucide-react"
import { useRouter } from "next/navigation"

const sections = [
  {
    icon: Users,
    title: "1. Responsable du Traitement",
    content: "IMBT Consulting est l'entité responsable du traitement des informations personnelles conformément à la loi tunisienne n° 2004-63 et au RGPD de l'UE.",
  },
  {
    icon: FileText,
    title: "2. Collecte de Données",
    content: "Nous collectons les informations nécessaires incluant :",
    list: [
      "Détails d'identification (nom, entreprise, poste)",
      "Informations de contact (email, téléphone, adresse)",
      "Données techniques (adresse IP, navigateur, cookies)",
      "Informations professionnelles (besoins en conseil, historique de contact)",
    ],
  },
  {
    icon: Target,
    title: "3. Finalités du Traitement",
    content: "Les données sont utilisées pour :",
    list: [
      "Répondre aux demandes de contact et devis",
      "Fournir des services de conseil, développement et marketing digital",
      "Gestion administrative et commerciale",
      "Communications liées aux services (avec consentement)",
      "Amélioration du site web et des services",
    ],
  },
  {
    icon: Scale,
    title: "4. Base Légale",
    content: "Le traitement repose sur : le consentement pour les communications marketing, l'exécution du contrat, les obligations légales et les intérêts commerciaux légitimes.",
  },
  {
    icon: Clock,
    title: "5. Conservation des Données",
    content: "Les informations sont conservées pendant la durée de la relation contractuelle, jusqu'à 5 ans après le contact, ou plus longtemps si requis légalement.",
  },
  {
    icon: Users,
    title: "6. Destinataires des Données",
    content: "Les informations peuvent être partagées avec le personnel, les partenaires techniques et les autorités légales si nécessaire.",
  },
  {
    icon: Eye,
    title: "7. Droits Individuels",
    content: "Les utilisateurs peuvent accéder, corriger, s'opposer, supprimer, porter ou retirer leur consentement concernant leurs données.",
  },
  {
    icon: Lock,
    title: "8. Mesures de Sécurité",
    content: "Nous mettons en œuvre des protections techniques et organisationnelles incluant le chiffrement et l'accès restreint.",
  },
  {
    icon: Globe,
    title: "9. Transfert International de Données",
    content: "Les transferts hors Tunisie/UE incluent des garanties appropriées via des clauses contractuelles et des évaluations d'adéquation des pays.",
  },
  {
    icon: Cookie,
    title: "10. Cookies",
    content: "Le site utilise des cookies pour l'analytique, la navigation et le marketing, gérables via les paramètres du navigateur.",
  },
  {
    icon: AlertCircle,
    title: "11. Réclamations",
    content: "Les litiges peuvent être déposés auprès de l'INPDP de Tunisie ou des autorités respectives de protection des données de l'UE.",
  },
  {
    icon: FileText,
    title: "12. Mises à Jour de la Politique",
    content: "Les modifications seront communiquées via le site web ou par email.",
  },
]

export default function PolitiqueConfidentialitePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Retour</span>
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Protection des Données</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Politique de <span className="gradient-text">Confidentialité</span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8">
                Votre vie privée est notre priorité. Découvrez comment nous protégeons et utilisons vos données personnelles.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Conforme RGPD</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Données Sécurisées</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Transparence Totale</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass glow-primary rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FileText className="h-6 w-6 text-primary" />
              Informations Légales
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Société</p>
                <p className="font-semibold">IMBT Consulting</p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-1">Responsable</p>
                <p className="font-semibold">Ismail Ferjani</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-foreground/60 mb-1">Adresse</p>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <p className="font-semibold">Immeuble Omar bloc A bureau 3-2 Montplaisir 1073, Tunis, Tunisie</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:contact@imbt-consulting.com" className="font-semibold hover:text-primary transition-colors">
                    contact@imbt-consulting.com
                  </a>
                </div>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-1">Téléphone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+21693286677" className="font-semibold hover:text-primary transition-colors">
                    +216 93 286 677
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-foreground/60 mb-1">Dernière mise à jour</p>
                <p className="font-semibold">17 juillet 2025</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass rounded-2xl p-8 hover:glow-primary transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                    <p className="text-foreground/80 mb-4">{section.content}</p>
                    {section.list && (
                      <ul className="space-y-2">
                        {section.list.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-foreground/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass glow-primary rounded-3xl p-12 text-center"
          >
            <Shield className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Des Questions sur Vos Données ?</h2>
            <p className="text-xl text-foreground/70 mb-8">
              Notre équipe est disponible pour répondre à toutes vos questions concernant la confidentialité et la protection de vos données.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@imbt-consulting.com"
                className="px-8 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="inline-block h-5 w-5 mr-2" />
                Nous Contacter
              </a>
              <a
                href="tel:+21693286677"
                className="px-8 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-semibold"
              >
                <Phone className="inline-block h-5 w-5 mr-2" />
                +216 93 286 677
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Copyright */}
      <section className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-foreground/60">
            © 2025 IMBT Consulting. Tous droits réservés.
          </p>
        </div>
      </section>
    </div>
  )
}
