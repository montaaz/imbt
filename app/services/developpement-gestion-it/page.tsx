"use client"

import {
  Monitor,
  Target,
  Gauge,
  Network,
  DollarSign,
  TrendingUp,
  Headphones,
  Shield,
  Database,
  Zap,
  Lightbulb,
  Users,
  FileText,
} from "lucide-react"
import ServiceDetailLayout from "@/components/service-detail-layout"

export default function DeveloppementGestionITPage() {
  return (
    <ServiceDetailLayout
      icon={Monitor}
      title="Développement et Gestion IT"
      subtitle="Solutions IT Sur Mesure"
      heroDescription="Le développement et la gestion IT sont au cœur de la performance de votre entreprise. Nous créons des solutions technologiques personnalisées alignées avec vos objectifs stratégiques tout en optimisant votre efficacité opérationnelle."
      color="from-accent to-accent/50"
      sections={[
        {
          title: "Notre Approche Globale",
          content:
            "Nous couvrons l'ensemble du cycle de vie de vos projets IT, de la planification initiale à la mise en œuvre et au suivi des performances. Notre méthodologie éprouvée garantit que chaque solution développée répond précisément à vos besoins et s'intègre harmonieusement dans votre écosystème technologique existant.",
        },
        {
          title: "Intégration de Systèmes d'Entreprise",
          content:
            "Nous connectons vos différents systèmes et applications pour rationaliser la gestion des processus métier et optimiser vos workflows opérationnels. Notre expertise en intégration permet de créer un écosystème IT cohérent où les données circulent de manière fluide et sécurisée entre toutes vos plateformes.",
        },
        {
          title: "Développement de Solutions Personnalisées",
          content:
            "Création de solutions IT sur mesure adaptées à vos exigences organisationnelles spécifiques et aux défis uniques de votre secteur. Nos développeurs experts utilisent les technologies les plus récentes pour concevoir des applications robustes, évolutives et parfaitement alignées avec vos processus métier.",
        },
        {
          title: "Migration de Données",
          content:
            "Nous facilitons des transferts de données sécurisés et transparents vers de nouveaux systèmes ou plateformes cloud. Notre processus rigoureux garantit l'intégrité de vos données tout au long de la migration, minimisant les temps d'arrêt et assurant une transition en douceur pour vos équipes.",
        },
        {
          title: "Gestion de Projets IT",
          content:
            "Supervision et coordination de bout en bout de vos initiatives technologiques en utilisant des méthodologies de gestion de projet éprouvées. Nous assurons le respect des délais, du budget et des objectifs de qualité, tout en maintenant une communication transparente avec toutes les parties prenantes.",
        },
        {
          title: "Optimisation des Performances",
          content:
            "Amélioration de l'efficacité de vos systèmes et de la vitesse de traitement pour une productivité organisationnelle accrue. Nous analysons en profondeur vos infrastructures pour identifier les goulots d'étranglement et mettre en œuvre des solutions d'optimisation qui transforment réellement vos performances.",
        },
        {
          title: "Maintenance et Support",
          content:
            "Fourniture de mises à jour régulières des systèmes et d'un support technique continu pour une fonctionnalité optimale. Notre équipe reste disponible pour résoudre rapidement les incidents, appliquer les correctifs de sécurité et faire évoluer vos solutions au rythme de votre croissance.",
        },
        {
          title: "Processus d'Implémentation en 5 Phases",
          content: [
            "Phase 1 : Consultation initiale et évaluation approfondie de vos besoins",
            "Phase 2 : Analyse détaillée et conception de l'architecture système",
            "Phase 3 : Développement et intégration des solutions",
            "Phase 4 : Tests rigoureux et déploiement contrôlé",
            "Phase 5 : Maintenance continue et évolution des systèmes",
          ],
        },
      ]}
      benefits={[
        {
          text: "Solutions IT parfaitement alignées avec vos objectifs stratégiques",
          icon: Target,
        },
        {
          text: "Amélioration mesurable de l'efficacité opérationnelle",
          icon: Gauge,
        },
        {
          text: "Systèmes intégrés pour une meilleure circulation de l'information",
          icon: Network,
        },
        {
          text: "Réduction des coûts d'exploitation grâce à l'optimisation",
          icon: DollarSign,
        },
        {
          text: "Infrastructure évolutive qui grandit avec votre entreprise",
          icon: TrendingUp,
        },
        {
          text: "Support technique réactif et maintenance proactive",
          icon: Headphones,
        },
        {
          text: "Sécurité renforcée et conformité réglementaire",
          icon: Shield,
        },
        {
          text: "Migration de données sans perte ni interruption",
          icon: Database,
        },
        {
          text: "Méthodologies agiles pour une livraison rapide",
          icon: Zap,
        },
        {
          text: "Expertise technique pointue et veille technologique",
          icon: Lightbulb,
        },
        {
          text: "Formation complète de vos équipes internes",
          icon: Users,
        },
        {
          text: "Documentation exhaustive pour une meilleure autonomie",
          icon: FileText,
        },
      ]}
    />
  )
}
