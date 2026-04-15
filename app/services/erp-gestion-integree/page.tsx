"use client"

import {
  Settings,
  Boxes,
  Workflow,
  Database,
  TrendingUp,
  BarChart3,
  Zap,
  Shield,
  Users,
  DollarSign,
  Package,
  Truck,
  Factory,
  FileText,
  LineChart,
  Gauge,
  Network,
  CheckCircle,
  Target,
  Globe,
  Clock,
  Award,
} from "lucide-react"
import ServiceDetailLayout from "@/components/service-detail-layout"

export default function ERPGestionIntegreePage() {
  return (
    <ServiceDetailLayout
      icon={Settings}
      title="ERP - Gestion Intégrée"
      subtitle="Système de Gestion Intégré"
      heroDescription="Optimisez l'ensemble de vos processus d'entreprise avec nos solutions ERP sur mesure. Nous vous accompagnons dans la sélection, l'implémentation et l'optimisation de systèmes de gestion intégrée pour centraliser vos opérations, améliorer votre efficacité et piloter votre croissance."
      whyImportant="Un système ERP (Enterprise Resource Planning) est le système nerveux central de votre entreprise. Il unifie l'ensemble de vos processus métier (finance, comptabilité, ressources humaines, production, logistique, achats, ventes) dans une plateforme unique et cohérente, éliminant les silos de données, automatisant les workflows complexes, et vous fournissant une vision en temps réel de votre activité pour prendre des décisions stratégiques éclairées et rapides."
      color="from-primary/80 to-accent/80"
      statistics={[
        { value: "45%", label: "Gain de productivité" },
        { value: "60%", label: "Réduction des coûts" },
        { value: "100%", label: "Visibilité temps réel" },
        { value: "30+", label: "ERP déployés" },
      ]}
      sections={[
        {
          title: "Audit Complet de Vos Processus Métier",
          icon: Target,
          content:
            "Nous commençons par une analyse approfondie et méthodique de l'ensemble de vos processus organisationnels actuels pour identifier les inefficacités, les redondances et les opportunités d'optimisation. Cette phase d'audit critique comprend : la cartographie détaillée de tous vos flux de travail et circuits de validation, l'identification des goulots d'étranglement et des tâches manuelles chronophages, l'analyse des interfaces et des transferts de données entre vos systèmes actuels, l'évaluation de la qualité et de la cohérence de vos données de gestion, et la compréhension des besoins spécifiques de chaque département. Cet audit nous permet de concevoir une solution ERP parfaitement alignée avec vos objectifs stratégiques et vos contraintes opérationnelles.",
        },
        {
          title: "Sélection Stratégique de Votre Solution ERP",
          icon: Award,
          content:
            "Grâce à notre expertise approfondie des principales solutions ERP du marché (SAP, Oracle NetSuite, Microsoft Dynamics 365, Odoo, Sage), nous vous guidons dans le choix de la plateforme la plus adaptée à votre taille d'entreprise, votre secteur d'activité, vos processus métier spécifiques et votre budget. Nous évaluons objectivement pour vous : l'adéquation fonctionnelle avec vos besoins actuels et futurs, la capacité de scalabilité pour accompagner votre croissance, la facilité d'utilisation et d'adoption par vos équipes, les possibilités de personnalisation et d'extension, le coût total de possession (TCO) incluant licences, maintenance et évolutions, et la pérennité et la solidité de l'éditeur. Notre recommandation est toujours guidée par vos intérêts business plutôt que par des considérations commerciales.",
        },
        {
          title: "Déploiement Méthodique et Intégration Complète",
          icon: Workflow,
          content:
            "Nous gérons l'ensemble du cycle de déploiement de votre ERP avec une méthodologie éprouvée qui minimise les risques et garantit le succès du projet : configuration et paramétrage complet des modules selon vos processus métier réels, personnalisation de l'interface utilisateur et des workflows pour une adoption facilitée, intégration bidirectionnelle avec tous vos systèmes existants (CRM, solutions de paie, outils de production, plateformes e-commerce), développement de fonctionnalités spécifiques si nécessaire pour couvrir vos besoins uniques, configuration des droits d'accès et des profils utilisateurs selon votre organigramme, et mise en place d'environnements de test, formation et production distincts. Nous adoptons une approche par phases progressives pour limiter l'impact sur votre activité quotidienne.",
        },
        {
          title: "Migration Sécurisée et Fiabilisée des Données",
          icon: Database,
          content:
            "La migration de vos données vers le nouvel ERP est une phase critique que nous gérons avec la plus grande rigueur et attention : nettoyage approfondi et standardisation de vos données existantes pour éliminer doublons, incohérences et erreurs, structuration et mapping précis des données depuis vos systèmes sources multiples, migration par lots avec validation systématique à chaque étape, tests exhaustifs de l'intégrité et de la cohérence des données migrées, réconciliation comptable et validation métier avec vos équipes clés, et mise en place de plans de contingence et de rollback en cas de problème. Nous garantissons la traçabilité complète du processus et la conservation de l'historique de vos données critiques.",
        },
        {
          title: "Formation Approfondie et Change Management",
          icon: Users,
          content:
            "L'adoption réussie de votre ERP par l'ensemble de vos collaborateurs est notre priorité. Nous déployons un programme de formation et d'accompagnement au changement complet et structuré : formations des key users et super-utilisateurs qui deviendront vos relais internes, sessions de formation dédiées par métier et par niveau hiérarchique avec des scénarios adaptés, ateliers pratiques sur vos processus réels avec vos propres données, création de supports de formation détaillés, guides utilisateurs et tutoriels vidéo accessibles en ligne, accompagnement sur le terrain pendant les premières semaines d'utilisation (support au démarrage), et mise en place d'ambassadeurs du changement pour faciliter l'adoption. Nous adaptons notre pédagogie au niveau de maturité digitale de chaque population utilisateur.",
        },
        {
          title: "Modules ERP Couverts et Optimisés",
          icon: Boxes,
          content: [
            "Gestion financière et comptabilité générale, analytique et budgétaire",
            "Gestion commerciale : devis, commandes, facturation, suivi clients",
            "Gestion des achats et approvisionnements avec optimisation des stocks",
            "Gestion de production et planification (MRP, ordonnancement, suivi atelier)",
            "Gestion des stocks et de la logistique (réception, expédition, inventaires)",
            "Gestion des ressources humaines et paie (temps, congés, talents)",
            "Business Intelligence et reporting avec tableaux de bord dynamiques",
            "Gestion de projets et suivi de la rentabilité des affaires",
            "Gestion de la qualité et traçabilité produits",
            "Gestion de la maintenance et des actifs (GMAO)",
          ],
        },
        {
          title: "Optimisation Continue et Évolution",
          icon: TrendingUp,
          content:
            "Notre accompagnement se poursuit dans la durée avec un service d'optimisation continue de votre système ERP : support technique réactif et qualifié disponible pour résoudre vos problématiques rapidement, revues de performance régulières pour analyser l'utilisation et identifier les axes d'amélioration, optimisation progressive des workflows et automatisations basée sur les retours terrain, déploiement de nouvelles fonctionnalités et modules au rythme de votre croissance et de vos besoins, formation continue de vos nouvelles recrues et montée en compétence des utilisateurs existants, maintenance préventive et application des mises à jour système, et veille technologique pour vous faire bénéficier des dernières innovations. Nous assurons l'évolution de votre ERP en phase avec votre développement.",
        },
      ]}
      benefits={[
        {
          text: "Centralisation de toutes vos données de gestion dans un système unique et cohérent",
          icon: Database,
        },
        {
          text: "Gain de productivité massif grâce à l'automatisation des processus répétitifs",
          icon: Gauge,
        },
        {
          text: "Réduction drastique des coûts opérationnels et des erreurs de saisie",
          icon: DollarSign,
        },
        {
          text: "Visibilité en temps réel sur l'ensemble de votre activité avec KPIs dynamiques",
          icon: BarChart3,
        },
        {
          text: "Amélioration de la collaboration inter-départements et fluidité des processus",
          icon: Network,
        },
        {
          text: "Optimisation de la gestion des stocks et réduction du besoin en fonds de roulement",
          icon: Package,
        },
        {
          text: "Accélération des cycles de facturation et amélioration de la trésorerie",
          icon: Zap,
        },
        {
          text: "Conformité réglementaire facilitée (fiscale, comptable, sociale, qualité)",
          icon: Shield,
        },
        {
          text: "Prise de décision stratégique éclairée basée sur des données fiables et actualisées",
          icon: LineChart,
        },
        {
          text: "Scalabilité pour accompagner votre croissance sans changer de système",
          icon: TrendingUp,
        },
        {
          text: "Traçabilité complète de toutes les opérations pour un meilleur contrôle",
          icon: FileText,
        },
        {
          text: "Optimisation de la chaîne logistique et des délais de livraison clients",
          icon: Truck,
        },
        {
          text: "Amélioration de la qualité et de la satisfaction client finale",
          icon: CheckCircle,
        },
        {
          text: "Accès sécurisé multi-sites et multi-utilisateurs avec gestion fine des droits",
          icon: Globe,
        },
        {
          text: "Retour sur investissement rapide grâce aux gains d'efficacité mesurables",
          icon: Clock,
        },
      ]}
    />
  )
}
