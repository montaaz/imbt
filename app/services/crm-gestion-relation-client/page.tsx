"use client"

import {
  Users,
  Target,
  BarChart3,
  Workflow,
  Heart,
  TrendingUp,
  Database,
  Zap,
  Shield,
  Globe,
  MessageCircle,
  Mail,
  Calendar,
  Phone,
  DollarSign,
  LineChart,
  UserCheck,
  Smartphone,
  Clock,
  Award,
  CheckCircle,
} from "lucide-react"
import ServiceDetailLayout from "@/components/service-detail-layout"

export default function CRMGestionRelationClientPage() {
  return (
    <ServiceDetailLayout
      icon={Users}
      title="CRM - Gestion de la Relation Client"
      subtitle="Optimisez Votre Relation Client"
      heroDescription="Transformez votre gestion de la relation client avec nos solutions CRM sur mesure. Nous vous accompagnons dans le choix, l'implémentation et l'optimisation de systèmes CRM performants pour améliorer l'acquisition, la fidélisation et la satisfaction de vos clients."
      whyImportant="Un système CRM bien implémenté est le cœur battant de votre stratégie client. Il centralise toutes les interactions client, améliore la collaboration entre vos équipes commerciales et marketing, augmente significativement vos taux de conversion et fidélisation, et vous fournit des insights précieux sur le comportement de vos clients pour prendre des décisions stratégiques éclairées."
      color="from-accent to-primary"
      statistics={[
        { value: "40%", label: "Augmentation des ventes" },
        { value: "35%", label: "Amélioration fidélisation" },
        { value: "50+", label: "CRM déployés" },
        { value: "99%", label: "Uptime garanti" },
      ]}
      sections={[
        {
          title: "Analyse Approfondie de Vos Besoins CRM",
          icon: Target,
          content:
            "Nous débutons chaque projet par une analyse détaillée et méthodique de vos processus commerciaux actuels, de vos cycles de vente, de vos points de contact client et de vos objectifs de croissance. Cette phase d'audit nous permet d'identifier précisément vos besoins fonctionnels et techniques, de cartographier votre parcours client actuel et idéal, d'évaluer les lacunes de votre système existant, et de définir les critères de succès de votre projet CRM. Nous analysons également les spécificités de votre secteur d'activité pour recommander les meilleures pratiques adaptées à votre contexte.",
        },
        {
          title: "Sélection de la Solution CRM Optimale",
          icon: Award,
          content:
            "Fort de notre expertise approfondie des principales plateformes CRM du marché (Salesforce, HubSpot, Microsoft Dynamics 365, Zoho CRM, Pipedrive), nous vous guidons dans le choix de la solution la plus adaptée à vos besoins spécifiques, votre budget et votre stratégie de croissance. Nous évaluons objectivement les fonctionnalités offertes, la scalabilité de chaque plateforme, les capacités d'intégration avec votre écosystème technologique existant, la facilité d'utilisation pour vos équipes, et le coût total de possession (TCO) à long terme. Notre recommandation est toujours basée sur vos intérêts plutôt que sur des partenariats commerciaux.",
        },
        {
          title: "Implémentation et Configuration Personnalisée",
          icon: Workflow,
          content:
            "Nous gérons l'ensemble du processus d'implémentation de votre solution CRM de manière méthodique et structurée : configuration initiale de la plateforme selon vos processus métier, personnalisation complète de l'interface et des workflows pour correspondre à vos besoins spécifiques, paramétrage des pipelines de vente et des étapes du cycle commercial, création de tableaux de bord et rapports personnalisés pour chaque rôle, configuration des automatisations pour optimiser la productivité de vos équipes, et intégration fluide avec vos outils existants (ERP, outils marketing, solutions de communication). Chaque paramètre est optimisé pour maximiser l'adoption utilisateur et l'efficacité opérationnelle.",
        },
        {
          title: "Migration Sécurisée de Vos Données Client",
          icon: Database,
          content:
            "Nous assurons une migration complète, sécurisée et sans perte de vos données clients depuis vos systèmes actuels (fichiers Excel, bases de données, ancien CRM) vers votre nouvelle plateforme. Notre processus rigoureux comprend : l'audit et le nettoyage de vos données existantes pour éliminer les doublons et incohérences, la cartographie précise des champs de données entre l'ancien et le nouveau système, la migration par phases avec tests approfondis à chaque étape, la validation de l'intégrité des données migrées, et la réconciliation complète pour garantir qu'aucune information critique n'est perdue. Nous établissons également des procédures de backup pour sécuriser vos données tout au long du processus.",
        },
        {
          title: "Formation Complète de Vos Équipes",
          icon: UserCheck,
          content:
            "L'adoption utilisateur est la clé du succès d'un projet CRM. Nous proposons des programmes de formation complets et adaptés à chaque profil utilisateur : formations des administrateurs pour la gestion et la maintenance du système, sessions dédiées aux équipes commerciales sur les fonctionnalités de gestion des opportunités et du pipeline, formation des équipes marketing sur les campagnes et la segmentation client, et ateliers pour les managers sur l'exploitation des rapports et analytics. Nos formations combinent théorie et pratique avec des exercices basés sur vos cas d'usage réels, et incluent des supports de formation détaillés ainsi qu'un accès à notre plateforme de ressources en ligne.",
        },
        {
          title: "Intégration avec Votre Écosystème Digital",
          icon: Globe,
          content:
            "Nous connectons votre CRM à l'ensemble de vos outils métier pour créer un écosystème digital cohérent et automatisé : synchronisation bidirectionnelle avec votre système ERP pour une vision unifiée client-finance, intégration avec vos plateformes d'email marketing (Mailchimp, SendinBlue) pour des campagnes ciblées, connexion avec vos outils de communication (téléphonie IP, messagerie) pour tracer tous les échanges client, liens avec vos solutions e-commerce pour un suivi complet du parcours d'achat, et intégration avec vos réseaux sociaux pour le social selling et la veille client. Ces intégrations éliminent les silos de données et automatisent les tâches répétitives.",
        },
        {
          title: "Optimisation Continue et Support Dédié",
          icon: TrendingUp,
          content:
            "Notre accompagnement se poursuit bien après le déploiement initial avec un service de support technique réactif disponible pour résoudre rapidement vos problématiques, des revues de performance trimestrielles pour analyser l'utilisation et identifier les axes d'amélioration, des optimisations régulières de vos workflows et automatisations basées sur les retours utilisateurs, l'ajout de nouvelles fonctionnalités au fur et à mesure de l'évolution de vos besoins, et une veille technologique pour vous tenir informé des nouveautés et meilleures pratiques CRM. Nous assurons également les mises à jour système et la maintenance préventive pour garantir des performances optimales.",
        },
      ]}
      benefits={[
        {
          text: "Vision client à 360° avec historique complet des interactions et transactions",
          icon: Users,
        },
        {
          text: "Augmentation significative des taux de conversion et du chiffre d'affaires",
          icon: DollarSign,
        },
        {
          text: "Automatisation des processus commerciaux et gain de temps massif",
          icon: Zap,
        },
        {
          text: "Amélioration de la collaboration entre équipes commerciales et marketing",
          icon: MessageCircle,
        },
        {
          text: "Segmentation avancée et ciblage précis pour des campagnes plus efficaces",
          icon: Target,
        },
        {
          text: "Reporting en temps réel et tableaux de bord personnalisés par rôle",
          icon: BarChart3,
        },
        {
          text: "Fidélisation client renforcée grâce à un suivi personnalisé",
          icon: Heart,
        },
        {
          text: "Prévisions de vente précises avec intelligence artificielle intégrée",
          icon: LineChart,
        },
        {
          text: "Accès mobile pour gérer votre relation client en déplacement",
          icon: Smartphone,
        },
        {
          text: "Intégration complète avec vos outils existants (ERP, email, téléphonie)",
          icon: Workflow,
        },
        {
          text: "Gestion multi-canal : email, téléphone, chat, réseaux sociaux",
          icon: Globe,
        },
        {
          text: "Rappels automatiques et notifications pour ne manquer aucune opportunité",
          icon: Calendar,
        },
        {
          text: "Sécurité renforcée des données clients avec conformité RGPD",
          icon: Shield,
        },
        {
          text: "Réduction du cycle de vente grâce aux workflows optimisés",
          icon: Clock,
        },
        {
          text: "Support technique dédié et maintenance proactive continue",
          icon: CheckCircle,
        },
      ]}
    />
  )
}
