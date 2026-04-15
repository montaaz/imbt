"use client"

import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle,
  Zap,
  Calendar,
  Video,
  FileText,
  Brain,
  Rocket,
  Shield,
  Laptop,
  MessageCircle,
  BarChart3,
  Globe,
  Clock,
} from "lucide-react"
import ServiceDetailLayout from "@/components/service-detail-layout"

export default function FormationsDigitalesPage() {
  return (
    <ServiceDetailLayout
      icon={GraduationCap}
      title="Formations Digitales"
      subtitle="Formation & Développement des Compétences"
      heroDescription="Développez les compétences digitales de vos équipes avec nos formations sur mesure. De la transformation digitale aux outils métier, nous proposons des programmes complets adaptés à tous les niveaux pour accélérer votre croissance."
      whyImportant="Dans un monde en constante évolution technologique, la formation continue est essentielle pour maintenir la compétitivité de votre entreprise. Nos programmes de formation permettent à vos équipes de maîtriser les outils et technologies digitales les plus récents, d'améliorer leur productivité et de s'adapter rapidement aux changements du marché."
      color="from-primary to-accent"
      statistics={[
        { value: "500+", label: "Professionnels formés" },
        { value: "50+", label: "Programmes de formation" },
        { value: "98%", label: "Taux de satisfaction" },
        { value: "100%", label: "Certifications reconnues" },
      ]}
      sections={[
        {
          title: "Formations Personnalisées et Adaptatives",
          icon: Target,
          content:
            "Nous concevons des programmes de formation sur mesure parfaitement adaptés à votre secteur d'activité, à vos objectifs stratégiques et au niveau de compétence de vos collaborateurs. Chaque formation est élaborée après une analyse approfondie de vos besoins spécifiques, garantissant un contenu pertinent et immédiatement applicable dans votre contexte professionnel. Notre approche personnalisée permet d'optimiser l'engagement des participants et de maximiser le retour sur investissement de votre programme de formation.",
        },
        {
          title: "Ateliers Pratiques et Interactifs",
          icon: Users,
          content:
            "Nos formations privilégient l'apprentissage par la pratique avec des ateliers interactifs, des études de cas réels tirés de votre industrie, des simulations professionnelles et des projets concrets. Cette approche hands-on garantit une meilleure assimilation des connaissances et permet aux participants de développer des compétences directement transférables à leur environnement de travail. Chaque atelier est conçu pour favoriser la collaboration, l'échange d'expériences et la résolution collective de problématiques métier.",
        },
        {
          title: "Certifications Professionnelles Reconnues",
          icon: Award,
          content:
            "À l'issue de nos formations, vos collaborateurs obtiennent des certifications officielles reconnues par l'industrie qui valorisent leurs compétences nouvellement acquises et renforcent leur expertise professionnelle. Ces certifications constituent un atout majeur pour votre entreprise en attestant du niveau de qualification de vos équipes et en améliorant votre positionnement concurrentiel. Nous préparons également vos équipes aux certifications internationales les plus prestigieuses dans leurs domaines respectifs.",
        },
        {
          title: "Programmes Multi-formats Flexibles",
          icon: Video,
          content:
            "Nous proposons différents formats de formation adaptés à vos contraintes organisationnelles : formations en présentiel pour un accompagnement rapproché et des échanges directs, formations en ligne pour une flexibilité maximale et un apprentissage à votre rythme, formations hybrides combinant le meilleur des deux approches, et webinaires interactifs pour des sessions courtes et ciblées. Cette flexibilité permet à vos équipes de se former sans impacter significativement leur activité quotidienne.",
        },
        {
          title: "Suivi Post-Formation et Coaching Continu",
          icon: TrendingUp,
          content:
            "Notre accompagnement ne s'arrête pas à la fin de la formation initiale. Nous assurons un suivi personnalisé de la montée en compétences avec des sessions de coaching individuel ou collectif, des points de progression réguliers, un support technique dédié pour répondre aux questions et résoudre les difficultés rencontrées lors de la mise en pratique, et des formations complémentaires ciblées selon les besoins identifiés. Ce suivi garantit l'application effective des connaissances acquises et l'atteinte de vos objectifs de transformation.",
        },
        {
          title: "Domaines de Formation Couverts",
          icon: BookOpen,
          content: [
            "Transformation digitale et conduite du changement organisationnel",
            "Outils collaboratifs et productivité (Microsoft 365, Google Workspace, Slack)",
            "Marketing digital et stratégies de communication en ligne (SEO, SEM, Social Media)",
            "Data Analytics et Business Intelligence (Power BI, Tableau, Excel avancé)",
            "Gestion de projet agile et méthodologies Scrum, Kanban",
            "Cybersécurité et protection des données (RGPD, sécurité informatique)",
            "Cloud Computing et architecture cloud (AWS, Azure, Google Cloud)",
            "Intelligence artificielle et automatisation des processus",
            "E-commerce et stratégies de vente en ligne",
            "Design thinking et innovation collaborative",
          ],
        },
        {
          title: "Méthodologie Pédagogique Innovante",
          icon: Lightbulb,
          content:
            "Nous utilisons des méthodes pédagogiques modernes et éprouvées basées sur les neurosciences de l'apprentissage : apprentissage actif avec participation constante des apprenants, microlearning pour faciliter la mémorisation avec des modules courts et ciblés, gamification pour augmenter l'engagement et la motivation, social learning favorisant l'apprentissage collaboratif et le partage de connaissances, et adaptive learning personnalisant le parcours selon le rythme et le niveau de chaque participant. Cette approche innovante garantit des taux de rétention des connaissances nettement supérieurs aux formations traditionnelles.",
        },
      ]}
      benefits={[
        {
          text: "Programmes de formation 100% personnalisés selon vos besoins métier spécifiques",
          icon: Target,
        },
        {
          text: "Formateurs experts certifiés avec une expérience terrain significative",
          icon: Award,
        },
        {
          text: "Amélioration mesurable de la productivité et de l'efficacité de vos équipes",
          icon: TrendingUp,
        },
        {
          text: "Formats flexibles adaptés à vos contraintes : présentiel, distanciel ou hybride",
          icon: Calendar,
        },
        {
          text: "Contenus pédagogiques constamment mis à jour avec les dernières technologies",
          icon: Rocket,
        },
        {
          text: "Certifications officielles reconnues valorisant les compétences acquises",
          icon: CheckCircle,
        },
        {
          text: "Ateliers pratiques avec cas réels et projets concrets de votre secteur",
          icon: Laptop,
        },
        {
          text: "Support et coaching post-formation pour garantir la mise en application",
          icon: MessageCircle,
        },
        {
          text: "Plateforme e-learning accessible 24/7 avec ressources illimitées",
          icon: Globe,
        },
        {
          text: "Suivi des progrès avec tableaux de bord et indicateurs de performance",
          icon: BarChart3,
        },
        {
          text: "ROI rapide grâce à l'application immédiate des compétences acquises",
          icon: Zap,
        },
        {
          text: "Montée en compétences progressive et accompagnement dans la durée",
          icon: Brain,
        },
        {
          text: "Documentation complète et ressources pédagogiques téléchargeables",
          icon: FileText,
        },
        {
          text: "Sessions adaptées au rythme de travail sans perturbation de l'activité",
          icon: Clock,
        },
        {
          text: "Certification de conformité et respect des standards de qualité formation",
          icon: Shield,
        },
      ]}
    />
  )
}
