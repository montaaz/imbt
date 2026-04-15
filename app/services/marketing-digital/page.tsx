"use client"

import {
  TrendingUp,
  Target,
  Share2,
  Megaphone,
  Search,
  FileText,
  Mail,
  BarChart3,
  Eye,
  Users,
  MousePointerClick,
  Sparkles,
  MessageCircle,
  PenTool,
  TrendingUpIcon,
  Award,
  Globe,
  Zap,
  CheckCircle,
  Repeat,
  DollarSign,
  LineChart,
} from "lucide-react"
import ServiceDetailLayout from "@/components/service-detail-layout"

export default function MarketingDigitalPage() {
  return (
    <ServiceDetailLayout
      icon={TrendingUp}
      title="Marketing Digital"
      subtitle="Stratégies Marketing Performantes"
      heroDescription="Nous nous spécialisons dans l'élaboration de stratégies de marketing digital personnalisées, conçues pour répondre aux besoins spécifiques de votre entreprise. Transformez vos idées en campagnes marketing intégrées et performantes."
      color="from-accent/80 to-primary/80"
      sections={[
        {
          title: "Stratégie de Marketing Digital",
          content:
            "Nous aidons votre entreprise à mettre en œuvre des stratégies efficaces sur les réseaux sociaux grâce à des audits complets, la définition d'objectifs clairs, l'identification précise de votre audience et la planification d'actions concrètes. Nos indicateurs de performance vous permettent de mesurer l'efficacité de vos actions et d'assurer une mise en œuvre réussie de votre stratégie digitale.",
        },
        {
          title: "Gestion des Réseaux Sociaux",
          content:
            "Nous prenons en charge l'ensemble de vos opérations sur les réseaux sociaux, de la création de contenu engageant à la planification stratégique et l'analyse des performances. Nos équipes développent des stratégies sur mesure adaptées à votre activité et à votre public cible pour maximiser l'impact de votre présence digitale et optimiser la gestion de votre communication en ligne.",
        },
        {
          title: "Publicité en Ligne",
          content:
            "Notre équipe gère vos campagnes publicitaires de bout en bout en sélectionnant les plateformes appropriées, en définissant des objectifs clairs et en optimisant vos budgets. Nous créons des annonces percutantes, surveillons les performances en temps réel et ajustons les stratégies pour maximiser votre retour sur investissement publicitaire.",
        },
        {
          title: "SEO et Référencement Naturel",
          content:
            "Améliorez votre visibilité sur les moteurs de recherche grâce à nos stratégies SEO avancées. Nous optimisons votre contenu, votre structure technique et votre autorité en ligne pour vous positionner en tête des résultats de recherche et attirer un trafic qualifié vers votre site web.",
        },
        {
          title: "Content Marketing",
          content:
            "Créez un lien durable avec votre audience grâce à du contenu de qualité. Nous développons des stratégies de content marketing qui racontent l'histoire de votre marque, éduquent votre audience et génèrent des leads qualifiés à travers différents formats : articles de blog, vidéos, infographies et livres blancs.",
        },
        {
          title: "Email Marketing",
          content:
            "Développez des campagnes d'email marketing personnalisées qui convertissent. Nous segmentons votre audience, créons des messages ciblés et automatisons vos séquences pour maintenir l'engagement de vos prospects et clients tout au long de leur parcours.",
        },
        {
          title: "Notre Méthodologie Complète",
          content: [
            "Consultation initiale gratuite avec nos experts pour analyser vos besoins et attentes",
            "Analyse approfondie de votre présence en ligne et développement d'une stratégie personnalisée",
            "Déploiement des campagnes en utilisant les technologies avancées et les meilleures pratiques du secteur",
            "Surveillance continue et optimisation régulière pour maximiser l'impact de vos campagnes",
            "Rapports détaillés avec recommandations d'amélioration et ajustements stratégiques",
          ],
        },
        {
          title: "Analytics et Reporting",
          content:
            "Mesurez précisément l'impact de vos actions marketing grâce à nos tableaux de bord personnalisés. Nous analysons les données pour identifier les opportunités d'optimisation et vous fournissons des rapports clairs qui démontrent le ROI de vos investissements marketing.",
        },
      ]}
      benefits={[
        {
          text: "Stratégies marketing personnalisées adaptées à vos objectifs",
          icon: Target,
        },
        {
          text: "Augmentation mesurable de votre visibilité en ligne",
          icon: Eye,
        },
        {
          text: "Génération de leads qualifiés et conversions accrues",
          icon: Users,
        },
        {
          text: "Gestion complète de vos réseaux sociaux",
          icon: Share2,
        },
        {
          text: "Campagnes publicitaires optimisées pour le ROI",
          icon: DollarSign,
        },
        {
          text: "Amélioration du positionnement SEO sur les moteurs de recherche",
          icon: Search,
        },
        {
          text: "Contenu engageant qui renforce votre image de marque",
          icon: PenTool,
        },
        {
          text: "Email marketing personnalisé avec taux de conversion élevés",
          icon: Mail,
        },
        {
          text: "Rapports détaillés et analytics en temps réel",
          icon: BarChart3,
        },
        {
          text: "Support d'experts disponibles pour vos questions",
          icon: MessageCircle,
        },
        {
          text: "Veille concurrentielle et analyse de marché",
          icon: Globe,
        },
        {
          text: "Stratégies omnicanales pour une présence cohérente",
          icon: Repeat,
        },
      ]}
    />
  )
}
