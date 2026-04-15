"use client"

import {
  Rocket,
  Search,
  Target,
  Blocks,
  Users,
  TrendingUp,
  GraduationCap,
  DollarSign,
  BarChart3,
  Gauge,
  Heart,
  Globe,
  Zap,
  Shield,
  CheckCircle,
  Trophy,
  Cog,
  UserCheck,
  LineChart,
  Sparkles,
  Network,
  ArrowUpRight,
  Lock,
  FileCheck,
  Lightbulb,
} from "lucide-react"
import ServiceDetailLayout from "@/components/service-detail-layout"

export default function ConseilTransformationDigitalePage() {
  return (
    <ServiceDetailLayout
      icon={Rocket}
      title="Conseil en Transformation Digitale"
      subtitle="Accélérez Votre Transformation"
      heroDescription="Accélérez votre transformation digitale avec IMBT Consulting. Nos experts vous accompagnent dans l'optimisation de vos processus et l'implémentation de solutions digitales sur mesure pour transformer votre entreprise."
      whyImportant="La transformation digitale optimise les opérations, améliore les expériences client et génère des opportunités de croissance significatives. Chaque entreprise a des besoins uniques en matière de digitalisation. Nous vous aidons à tirer parti des technologies modernes pour transformer vos workflows et maximiser vos performances dans un environnement en constante évolution."
      color="from-primary to-primary/50"
      statistics={[
        { value: "10+", label: "Ans d'expérience" },
        { value: "200+", label: "Projets réussis" },
        { value: "95%", label: "Clients satisfaits" },
        { value: "24/7", label: "Support disponible" },
      ]}
      sections={[
        {
          title: "Évaluation et Diagnostic Complet",
          icon: Search,
          content:
            "Nous réalisons des audits approfondis et méthodiques de vos systèmes actuels, de vos processus métier et de votre infrastructure technologique pour identifier les opportunités d'amélioration et les obstacles potentiels. Cette analyse complète et détaillée nous permet d'établir une feuille de route claire et réaliste pour une transformation réussie, en tenant compte de vos objectifs stratégiques, de vos contraintes opérationnelles et budgétaires, ainsi que de la maturité digitale de votre organisation. Notre approche diagnostique comprend l'évaluation de vos systèmes existants, l'analyse des flux de travail, l'identification des goulots d'étranglement et la cartographie complète de votre écosystème digital actuel.",
        },
        {
          title: "Stratégie Digitale Personnalisée",
          icon: Target,
          content:
            "En collaboration étroite avec vos équipes dirigeantes et opérationnelles, nous co-développons des stratégies digitales personnalisées et adaptées à votre secteur d'activité qui intègrent les technologies les plus appropriées et innovantes. Nous vous aidons à prioriser les actions selon leur impact business, à définir les jalons clés de votre transformation avec des indicateurs de succès mesurables, et à établir un roadmap détaillé en assurant un alignement parfait avec vos objectifs stratégiques à court, moyen et long terme. Notre approche stratégique prend en compte les tendances du marché, l'analyse concurrentielle, et les meilleures pratiques de votre industrie.",
        },
        {
          title: "Implémentation de Solutions Digitales",
          icon: Blocks,
          content:
            "Nous vous accompagnons de A à Z dans la sélection rigoureuse et l'intégration harmonieuse d'outils technologiques pertinents et performants pour votre entreprise. Que ce soit des systèmes ERP robustes, des plateformes CRM intelligentes, des solutions cloud évolutives, des outils d'automatisation des processus (RPA), ou des plateformes d'intelligence artificielle, nous minimisons les risques de perturbation opérationnelle tout en maximisant l'adoption et l'engagement de vos équipes. Notre méthodologie d'implémentation éprouvée garantit un déploiement sans accroc, avec des phases de tests approfondis, une migration sécurisée des données, et un accompagnement personnalisé à chaque étape du processus.",
        },
        {
          title: "Gestion du Changement et Adoption",
          icon: Users,
          content:
            "Notre équipe d'experts du change management vous soutient activement dans les transitions organisationnelles complexes en assurant la formation complète et progressive de vos employés à tous les niveaux, et en facilitant l'adoption fluide des nouvelles technologies et méthodes de travail. Nous mettons en place des programmes d'accompagnement sur mesure adaptés à votre culture d'entreprise pour garantir une transition en douceur, minimiser la résistance au changement, et assurer l'adhésion enthousiaste de l'ensemble de vos collaborateurs. Notre approche inclut des ateliers pratiques, du coaching individuel, des ambassadeurs du changement, et un support continu post-déploiement.",
        },
        {
          title: "Suivi Continu et Optimisation Performance",
          icon: TrendingUp,
          content:
            "Reconnaissant que la transformation digitale est un processus continu et évolutif plutôt qu'un projet ponctuel, nous maintenons un suivi rigoureux et régulier des performances avec des KPIs précis et pertinents, et ajustons de manière proactive les stratégies et solutions pour assurer une efficacité optimale et durable. Notre approche itérative et agile permet d'optimiser constamment vos processus métier, de s'adapter rapidement aux évolutions technologiques et du marché, et de garantir que votre transformation continue de générer de la valeur business à long terme. Nous organisons des revues de performance trimestrielles et proposons des améliorations continues basées sur les données et les retours utilisateurs.",
        },
        {
          title: "Formation et Support Technique",
          icon: GraduationCap,
          content:
            "Nous renforçons significativement les capacités et l'autonomie de vos équipes internes grâce à des programmes de formation complets, structurés et adaptés à chaque niveau de compétence, ainsi qu'un support technique expert et réactif disponible en continu. Notre objectif ultime est de vous rendre totalement autonome dans l'utilisation optimale, la gestion quotidienne et l'évolution future de vos solutions digitales, tout en restant à vos côtés comme partenaire de confiance pour vous accompagner dans vos futurs défis technologiques et stratégiques. Nous proposons des formations en présentiel et en ligne, des ressources documentaires riches, et une hotline technique dédiée.",
        },
      ]}
      benefits={[
        {
          text: "Optimisation drastique des coûts opérationnels et des processus métier inefficaces",
          icon: DollarSign,
        },
        {
          text: "Tableaux de bord intelligents et personnalisés pour une gestion optimale et des décisions data-driven",
          icon: BarChart3,
        },
        {
          text: "Amélioration significative et mesurable de l'efficacité opérationnelle de tous les départements",
          icon: Gauge,
        },
        {
          text: "Expériences client digitales enrichies, personnalisées et différenciantes",
          icon: Heart,
        },
        {
          text: "Accès facilité à de nouveaux marchés, segments et opportunités de croissance",
          icon: Globe,
        },
        {
          text: "Agilité organisationnelle et réactivité stratégique accrues face aux changements du marché",
          icon: Zap,
        },
        {
          text: "Réduction substantielle des risques opérationnels, technologiques et de sécurité",
          icon: Shield,
        },
        {
          text: "Adoption réussie et engagement fort des technologies par l'ensemble de vos équipes",
          icon: UserCheck,
        },
        {
          text: "ROI mesurable avec suivi en temps réel des indicateurs de performance clés",
          icon: LineChart,
        },
        {
          text: "Avantage concurrentiel durable grâce à l'innovation digitale",
          icon: Trophy,
        },
        {
          text: "Automatisation intelligente des tâches répétitives libérant du temps pour les activités à valeur ajoutée",
          icon: Cog,
        },
        {
          text: "Collaboration améliorée entre équipes grâce aux outils digitaux modernes",
          icon: Network,
        },
        {
          text: "Scalabilité de votre infrastructure pour accompagner votre croissance future",
          icon: ArrowUpRight,
        },
        {
          text: "Conformité renforcée aux réglementations et standards de votre industrie",
          icon: FileCheck,
        },
        {
          text: "Culture d'innovation et de transformation continue ancrée dans votre organisation",
          icon: Lightbulb,
        },
      ]}
    />
  )
}
