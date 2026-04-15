"use client"

import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Users, Target, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    id: 1,
    title: "GRT Security - Implémentation ERP",
    subtitle: "Transformation digitale d'une entreprise de sécurité privée",
    image: "/images/case-study-1.jpg",
    context: "Une entreprise de sécurité privée en pleine croissance ayant besoin d'améliorer son efficacité opérationnelle.",
    challenges: [
      "Systèmes de gestion multiples et déconnectés",
      "Difficultés de centralisation des informations",
      "Manque de visibilité en temps réel sur la performance",
      "Processus manuels source d'erreurs",
    ],
    solution: "IMBT Consulting a déployé un système ERP intégré comprenant la gestion RH, la planification des interventions, des modules de facturation/comptabilité, et des tableaux de bord de reporting en temps réel.",
    results: [
      { metric: "30%", description: "Réduction des erreurs administratives" },
      { metric: "Efficacité", description: "Amélioration du temps de planification et d'administration du personnel" },
      { metric: "Satisfaction", description: "Amélioration de la satisfaction client grâce à une meilleure gestion" },
      { metric: "KPI", description: "Suivi précis avec des rapports en temps réel" },
    ],
    testimonial: "La mise en œuvre a 'transformé la façon dont nous gérons notre entreprise. Nous avons gagné en efficacité et en réactivité, avec une meilleure visibilité sur la performance' nous permettant de nous concentrer sur nos services de sécurité principaux.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Oxygène Print - Plateforme de Collaboration Interne",
    subtitle: "Optimisation de la communication inter-départementale",
    image: "/images/case-study-2.jpg",
    context: "Une entreprise d'impression et de communication visuelle nécessitant une amélioration de la communication inter-départementale avec l'expansion de l'équipe.",
    challenges: [
      "Silos d'information entre les départements",
      "Outils de gestion de projet dispersés",
      "Difficulté à suivre la progression en temps réel",
      "Mauvaise coordination entre les équipes créatives, production et logistique",
    ],
    solution: "IMBT Consulting a développé une plateforme de collaboration personnalisée avec gestion centralisée des projets, espaces de communication en temps réel, partage de fichiers, et planification intégrée.",
    results: [
      { metric: "25%", description: "Augmentation de la productivité grâce à une meilleure coordination d'équipe" },
      { metric: "40%", description: "Réduction du temps de gestion de projet" },
      { metric: "Collaboration", description: "Amélioration de la collaboration inter-départementale" },
      { metric: "Temps réel", description: "Suivi des tâches en temps réel permettant une gestion proactive" },
    ],
    testimonial: "La plateforme a 'révolutionné notre façon de travailler. Nous avons gagné en fluidité et en efficacité, avec une collaboration améliorée se reflétant dans la qualité de service.'",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Digitalisation.Services - Implémentation CRM",
    subtitle: "Optimisation de la gestion de la relation client",
    image: "/images/case-study-3.jpg",
    context: "Un cabinet de conseil en transformation digitale nécessitant une amélioration de la gestion interne de la relation client malgré une croissance rapide.",
    challenges: [
      "Suivi désorganisé des interactions clients à travers des canaux dispersés",
      "Difficulté à prioriser les opportunités commerciales",
      "Manque de visibilité sur le pipeline de vente",
      "Processus de gestion de projet non structurés",
    ],
    solution: "IMBT Consulting a mis en œuvre un CRM personnalisé avec suivi centralisé des interactions clients, gestion des opportunités commerciales, outils de collaboration interne, automatisation des tâches, et reporting de performance.",
    results: [
      { metric: "40%", description: "Amélioration de la productivité commerciale" },
      { metric: "35%", description: "Réduction du temps de gestion client" },
      { metric: "Satisfaction", description: "Amélioration de la satisfaction client grâce au suivi précis" },
      { metric: "Pipeline", description: "Augmentation de la visibilité du pipeline de vente soutenant les décisions stratégiques" },
    ],
    testimonial: "Le CRM a 'transformé la façon dont nous gérons nos clients et projets. Nous avons gagné en efficacité et pouvons offrir une meilleure expérience client, essentielle pour la croissance.'",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Cyris360 - Optimisation Marketing Digital",
    subtitle: "Stratégie omnicanale pour croissance en ligne",
    image: "/images/case-study-4.jpg",
    context: "Une entreprise de solutions technologiques en expansion manquant d'approches marketing cohésives et basées sur les données pour la croissance en ligne.",
    challenges: [
      "Absence de stratégie omnicanale avec des campagnes dispersées",
      "Faibles taux de conversion malgré les investissements publicitaires",
      "Outils analytiques limités",
      "Faible visibilité en ligne",
    ],
    solution: "IMBT Consulting a déployé une stratégie marketing digital omnicanale complète incluant des audits de campagnes, l'optimisation SEO, la gestion de publicité payante, la création de contenu personnalisé, la mise en œuvre d'analytics, et l'automatisation marketing.",
    results: [
      { metric: "50%", description: "Augmentation des leads qualifiés" },
      { metric: "35%", description: "Amélioration des taux de conversion" },
      { metric: "ROI", description: "Augmentation du ROI publicitaire grâce à une gestion affinée des campagnes" },
      { metric: "Visibilité", description: "Renforcement de la visibilité en ligne avec un meilleur positionnement SEO" },
    ],
    testimonial: "La stratégie digitale leur a permis de 'booster la présence en ligne et générer des résultats tangibles. Le suivi des performances en temps réel nous garde compétitifs.'",
    color: "from-orange-500 to-red-500",
  },
]

export default function EtudesDeCasPage() {
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
                className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <span className="text-primary font-semibold">Nos Réussites</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Études de <span className="gradient-text">Cas</span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8">
                Découvrez comment IMBT Consulting a transformé les entreprises grâce à des solutions digitales innovantes
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-32">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                      <span className={`font-semibold bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                        Étude de Cas #{study.id}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{study.title}</h2>
                    <p className="text-xl text-foreground/70 mb-8">{study.subtitle}</p>

                    {/* Context */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        Contexte
                      </h3>
                      <p className="text-foreground/80">{study.context}</p>
                    </div>

                    {/* Challenges */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3">Défis</h3>
                      <ul className="space-y-2">
                        {study.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                            <span className="text-foreground/80">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div className="mb-8 p-6 rounded-2xl glass glow-primary">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        Solution
                      </h3>
                      <p className="text-foreground/80">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="glass glow-primary rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="h-6 w-6 text-accent" />
                        <h3 className="text-2xl font-bold">Résultats</h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        {study.results.map((result, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-accent/10 border border-accent/20"
                          >
                            <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${study.color} bg-clip-text text-transparent`}>
                              {result.metric}
                            </div>
                            <div className="text-sm text-foreground/70">{result.description}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial */}
                      <div className="relative p-6 rounded-2xl bg-muted/50 border-l-4 border-primary">
                        <Users className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                        <p className="text-foreground/80 italic relative z-10">"{study.testimonial}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass glow-primary rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Contactez-nous pour découvrir comment nous pouvons vous aider à atteindre vos objectifs
            </p>
            <Link href="/contact">
              <Button size="lg" className="glow-primary group">
                Demander une consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
