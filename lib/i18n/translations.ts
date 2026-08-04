// Translation keys and values for the entire application

export type Language = 'fr' | 'en' | 'ar'

export interface Translations {
  // Common
  common: {
    home: string
    services: string
    about: string
    blog: string
    ourCabinet: string
    reservation: string
    contact: string
    login: string
    logout: string
    reserve: string
    loading: string
    error: string
    success: string
    cancel: string
    save: string
    delete: string
    edit: string
    view: string
    search: string
    filter: string
    close: string
    back: string
    next: string
    previous: string
    submit: string
    readMore: string
    and: string
  }

  // Navigation
  nav: {
    consulting: string
  }

  // Hero Section
  hero: {
    badge: string
    title: string
    subtitle: string
    description: string
    cta: string
    ctaSecondary: string
    scrollToExplore: string
  }

  // Services
  servicesSection: {
    title: string
    subtitle: string
    description: string
    viewAll: string
    learnMore: string
  }

  // Service Cards
  serviceCards: {
    transformation: {
      title: string
      description: string
      features: string[]
    }
    development: {
      title: string
      description: string
      features: string[]
    }
    marketing: {
      title: string
      description: string
      features: string[]
    }
    crm: {
      title: string
      description: string
      features: string[]
    }
    erp: {
      title: string
      description: string
      features: string[]
    }
    training: {
      title: string
      description: string
      features: string[]
    }
  }

  // Benefits
  benefits: {
    speed: { title: string; description: string }
    expertise: { title: string; description: string }
    support: { title: string; description: string }
  }

  aboutPage: {
    hero: {
      badge: string
      title: string
      subtitle: string
      description1: string
      description2: string
      cta: string
    }
    stats: {
      projects: { value: string; label: string }
      clients: { value: string; label: string }
      experience: { value: string; label: string }
      experts: { value: string; label: string }
    }
    values: {
      title: string
      subtitle: string
      description: string
      items: {
        excellence: { title: string; description: string }
        innovation: { title: string; description: string }
        engagement: { title: string; description: string }
        collaboration: { title: string; description: string }
      }
    }
    team: {
      title: string
      subtitle: string
      description: string
      members: {
        mohamed: { role: string }
        sarah: { role: string }
        thomas: { role: string }
        julie: { role: string }
      }
    }
    cta: {
      title: string
      subtitle: string
      description: string
      button1: string
      button2: string
    }
  }

  // About Section (Preview)
  aboutSection: {
    title: string
    subtitle: string
    description: string
    learnMore: string
    certifiedExpert: string
    projectsDelivered: string
    values: string[]
  }

  // Stats
  stats: {
    projects: string
    clients: string
    satisfaction: string
    experience: string
  }

  // CTA Section
  ctaSection: {
    badge: string
    title: string
    description: string
    bookConsultation: string
    contactUs: string
    emailUs: string
  }

  // Footer
  footer: {
    description: string
    company: string
    services: string
    contact: string
    legal: string
    copyright: string
    digitalTransformation: string
    webDevelopment: string
    training: string
    crmErp: string
    about: string
    ourValues: string
    caseStudies: string
    privacyPolicy: string
    legalNotice: string
    termsConditions: string
  }

  // Auth
  auth: {
    signIn: string
    signUp: string
    signInButton: string
    signUpButton: string
    signingIn: string
    signingUp: string
    email: string
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    phone: string
    company: string
    rememberMe: string
    forgotPassword: string
    forgotPasswordTitle: string
    forgotPasswordSubtitle: string
    sendResetLink: string
    resetLinkSent: string
    checkSpamFolder: string
    backToSignIn: string
    resetPasswordTitle: string
    resetPasswordSubtitle: string
    resetPasswordButton: string
    newPassword: string
    passwordResetSuccess: string
    invalidResetLink: string
    requestNewLink: string
    noAccount: string
    alreadyHaveAccount: string
    createAccount: string
    joinIMBT: string
    allRolesSpace: string
    demoAccountsAvailable: string
    administrator: string
    manager: string
    client: string
    passwordsMismatch: string
    passwordTooShort: string
    minCharacters: string
    acceptTerms: string
    termsAndConditions: string
    privacyPolicy: string
    or: string
    invalidCredentials: string
    accountDeactivated: string
    adminSpace: string
    clientSpace: string
    managerSpace: string
  }


  // Dashboard
  dashboard: {
    welcome: string
    upcomingReservations: string
    completedReservations: string
    totalPurchases: string
    totalSpent: string
    myReservations: string
    myPurchases: string
    profile: string
    noReservations: string
    noReservationsDesc: string
    noPurchases: string
    noPurchasesDesc: string
    makeReservation: string
    profileInfo: string
    emailVerified: string
    notVerified: string
    verified: string
    memberSince: string
    lastLogin: string
    duration: string
    message: string
    createdOn: string
    type: string
    tracking: string
    total: string
    ordered: string
    paid: string
    delivered: string
    notProvided: string
    city: string
    country: string
    position: string
  }

  // Status
  status: {
    pending: string
    confirmed: string
    completed: string
    cancelled: string
    processing: string
    draft: string
    published: string
    archived: string
  }

  // Reservation Page
  reservation: {
    title: string
    subtitle: string
    description: string
    selectService: string
    chooseService: string
    chooseDateTime: string
    selectDate: string
    selectTime: string
    yourInfo: string
    additionalInfo: string
    messageLabel: string
    messagePlaceholder: string
    createAccount: string
    createAccountDesc: string
    createAccountPrompt: string
    setPassword: string
    createPassword: string
    passwordHint: string
    confirmReservation: string
    reservationSuccess: string
    confirmed: string
    confirmationEmail: string
    summary: string
    service: string
    date: string
    time: string
    duration: string
    viewDashboard: string
    backToHome: string
    newReservation: string
    orSignInWithPassword: string
    continue: string
    today: string
    selected: string
    unavailable: string
    availableSlots: string
    required: string
    days: string[]
    months: string[]
  }

  // Admin
  admin: {
    dashboard: string
    manageReservationsDesc: string
    manageClients: string
    blogManagement: string
    statistics: string
    settings: string
    totalReservations: string
    activeClients: string
    confirmationRate: string
    averageDuration: string
    totalRevenue: string
    title: string
    author: string
    views: string
    recentReservations: string
    client: string
    service: string
    dateTime: string
    status: string
    actions: string
    viewDetails: string
    confirm: string
    cancel: string
    noReservationsFound: string
    reservationDetails: string
    email: string
    phone: string
    company: string
    date: string
    time: string
    close: string
    searchPlaceholder: string
    statusFilter: string
    allStatus: string
    confirmedStatus: string
    pendingStatus: string
    cancelledStatus: string
    viewSite: string
    newArticle: string
    createPost: string
    editPost: string
    deletePost: string
    confirmDelete: string
    manageClientsTitle: string
    manageClientsDesc: string
    newClient: string
    searchClientsPlaceholder: string
    firstName: string
    lastName: string
    confirmDeleteClient: string
    create: string
    update: string
    noClientsFound: string
    pageOf: string
    clientDetails: string
    editClient: string
    addClient: string
    position: string
    city: string
    country: string
    address: string
    notes: string
    blogManagementTitle: string
    blogManagementDesc: string
    totalArticles: string
    published: string
    drafts: string
    totalViews: string
    basicInfo: string
    mainTitle: string
    subtitle: string
    slug: string
    excerpt: string
    featuredImage: string
    tags: string
    articleContent: string
    addSection: string
    addParagraph: string
    addList: string
    sectionTitle: string
    listTitle: string
    listItemPlaceholder: string
    save: string
    saving: string
    successSave: string
    errorSave: string
    confirmDeletePost: string
    articleSubtitlePlaceholder: string
    articleTitlePlaceholder: string
    articleSlugPlaceholder: string
    articleExcerptPlaceholder: string
    notPublished: string
    statsTitle: string
    statsDesc: string
    thisWeek: string
    thisMonth: string
    perMonth: string
    popularServices: string
    monthlyEvolution: string
    recentReservationsTitle: string
    topClients: string
    reservations: string
    completedLabel: string
    cancelledLabel: string
    totalLabel: string
    upcoming: string
    settingsTitle: string
    settingsDesc: string
    saveSettings: string
    savingSettings: string
    reset: string
    successSettings: string
    errorSettings: string
    generalSettings: string
    notifications: string
    reservationsCategory: string
    securityNotice: string
    securityNoticeDesc: string
    publicBadge: string
    enabled: string
    disabled: string
  }

  // Blog
  blog: {
    title: string
    subtitle: string
    description: string
    searchPlaceholder: string
    allTags: string
    readArticle: string
    shareOn: string
    shareOnFacebook: string
    shareOnLinkedIn: string
    relatedArticles: string
    tags: string
    loading: string
    noArticles: string
    noArticlesFound: string
    backToBlog: string
    views: string
    articleNotFound: string
    articleNotFoundDesc: string
    shareTitle: string
    shareDesc: string
    didYouLike: string
    shareWithNetwork: string
    linkCopied: string
    loadingArticle: string
  }

  caseStudiesPage: {
    hero: {
      badge: string
      title: string
      subtitle: string
      description: string
      back: string
    }
    sections: {
      context: string
      challenges: string
      solution: string
      results: string
      studyNumber: string
      ctaTitle: string
      ctaDescription: string
      ctaButton: string
    }
    items: {
      id: number
      title: string
      subtitle: string
      context: string
      challenges: string[]
      solution: string
      results: { metric: string; description: string }[]
      testimonial: string
    }[]
  }

  // Contact
  contactPage: {
    title: string
    subtitle: string
    description: string
    info: {
      email: { title: string }
      phone: { title: string }
      address: { title: string }
      hours: { title: string; value: string }
    }
    form: {
      title: string
      subtitle: string
      nameLabel: string
      emailLabel: string
      companyLabel: string
      subjectLabel: string
      messageLabel: string
      namePlaceholder: string
      emailPlaceholder: string
      companyPlaceholder: string
      subjectPlaceholder: string
      messagePlaceholder: string
      submitButton: string
      submitting: string
      successTitle: string
      successMessage: string
      sendAnother: string
    }
  }

  // Errors
  errors: {
    somethingWrong: string
    tryAgain: string
    notFound: string
    unauthorized: string
    serverError: string
  }

  privacyPolicy: {
    title: string
    subtitle: string
    description: string
    protectionBadge: string
    conformityBadge: string
    secureBadge: string
    transparencyBadge: string
    legalInfoTitle: string
    companyLabel: string
    managerLabel: string
    addressLabel: string
    emailLabel: string
    phoneLabel: string
    lastUpdateLabel: string
    lastUpdateValue: string
    sections: {
      title: string
      content: string
      list?: string[]
    }[]
    ctaTitle: string
    ctaDescription: string
    ctaButton: string
  }
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      home: 'Accueil',
      services: 'Services',
      about: 'À Propos',
      blog: 'Blog',
      ourCabinet: 'Notre Cabinet',
      reservation: 'Réservation',
      contact: 'Contact',
      login: 'Connexion',
      logout: 'Déconnexion',
      reserve: 'Réserver',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      search: 'Rechercher',
      filter: 'Filtrer',
      close: 'Fermer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      submit: 'Soumettre',
      readMore: 'Lire plus',
      and: 'et la',
    },
    nav: {
      consulting: 'Consulting',
    },
    hero: {
      badge: 'Votre partenaire stratégique',
      title: 'Stratégies Digitales',
      subtitle: 'pour un Avenir Durable',
      description: 'IMBT Consulting libère le plein potentiel de votre entreprise avec des solutions innovantes en transformation digitale, développement sur mesure et marketing digital.',
      cta: 'Réserver une consultation',
      ctaSecondary: 'Découvrir nos services',
      scrollToExplore: 'Scroll pour explorer',
    },
    servicesSection: {
      title: 'Nos Services',
      subtitle: 'Une gamme complète de solutions digitales',
      description: 'Chacune de nos interventions est conçue pour stimuler votre croissance, améliorer votre efficacité opérationnelle, et maximiser vos performances.',
      viewAll: 'Voir tous nos services',
      learnMore: 'En savoir plus',
    },
    serviceCards: {
      transformation: {
        title: 'Conseil en Transformation Digitale',
        description: 'Nous élaborons des stratégies digitales personnalisées pour maximiser votre impact sur le marché.',
        features: [
          "Audit digital complet",
          "Stratégie de transformation",
          "Accompagnement au changement",
          "Mesure des performances",
        ],
      },
      development: {
        title: 'Développement Web & Applications',
        description: 'Nous créons des sites web performants et adaptés à votre activité avec des technologies de pointe.',
        features: ["Sites web sur mesure", "Applications mobiles", "E-commerce", "Maintenance & support"],
      },
      marketing: {
        title: 'Marketing Digital',
        description: 'Optimisation des campagnes digitales et stratégie marketing omnicanal pour une meilleure performance.',
        features: ["SEO & SEA", "Réseaux sociaux", "Email marketing", "Analytics & reporting"],
      },
      crm: {
        title: 'CRM & Gestion Client',
        description: 'Implémentation de systèmes de gestion de la relation client pour optimiser votre acquisition et fidélisation.',
        features: [
          "Analyse des besoins CRM",
          "Implémentation Salesforce/HubSpot",
          "Migration des données",
          "Formation des équipes",
        ],
      },
      erp: {
        title: 'ERP & Gestion Intégrée',
        description: 'Mise en place de systèmes de gestion intégrés pour une meilleure efficacité opérationnelle.',
        features: [
          "Audit des processus",
          "Sélection de solution ERP",
          "Déploiement & intégration",
          "Optimisation continue",
        ],
      },
      training: {
        title: 'Formations Digitales',
        description: 'Des programmes complets pour maîtriser les outils et technologies digitales, du débutant à l\'avancé.',
        features: ["Formations personnalisées", "Ateliers pratiques", "Certifications reconnues", "Suivi post-formation"],
      },
    },
    benefits: {
      speed: { title: "Rapidité", description: "Résultats visibles en quelques semaines" },
      expertise: { title: "Expertise", description: "10+ ans d'expérience dans le digital" },
      support: { title: "Support 24/7", description: "Accompagnement continu" },
    },
    aboutPage: {
      hero: {
        badge: 'À Propos',
        title: 'Votre partenaire pour la',
        subtitle: 'transformation digitale',
        description1: "IMBT Consulting est votre partenaire stratégique pour libérer le plein potentiel de votre entreprise. Nous offrons une gamme complète de services, incluant le conseil en transformation digitale, le développement informatique sur mesure, et des solutions innovantes en marketing digital.",
        description2: "Avec une approche personnalisée, nous vous accompagnons dans l'atteinte de vos objectifs, tout en vous aidant à naviguer dans l'univers complexe de la transformation digitale.",
        cta: 'Commencer un projet',
      },
      stats: {
        projects: { value: "100+", label: "Projets réalisés" },
        clients: { value: "98%", label: "Clients satisfaits" },
        experience: { value: "10+", label: "Années d'expérience" },
        experts: { value: "50+", label: "Experts" },
      },
      values: {
        title: 'Nos Valeurs',
        subtitle: 'Les piliers de notre excellence',
        description: 'Nos valeurs guident chacune de nos actions et définissent notre approche du conseil digital.',
        items: {
          excellence: {
            title: "Excellence",
            description: "Nous visons l'excellence dans chaque projet, en dépassant les attentes de nos clients grâce à un travail rigoureux et une attention aux détails.",
          },
          innovation: {
            title: "Innovation",
            description: "Nous restons à la pointe des technologies et des tendances pour offrir des solutions innovantes et performantes.",
          },
          engagement: {
            title: "Engagement",
            description: "Nous nous engageons pleinement auprès de nos clients, avec transparence et intégrité, pour bâtir des relations durables.",
          },
          collaboration: {
            title: "Collaboration",
            description: "Nous croyons en la force du travail d'équipe et de la collaboration étroite avec nos clients pour atteindre les meilleurs résultats.",
          },
        },
      },
      team: {
        title: 'Notre Équipe',
        subtitle: 'Des experts passionnés',
        description: 'Une équipe pluridisciplinaire dédiée à votre réussite digitale.',
        members: {
          mohamed: { role: "Fondateur & CEO" },
          sarah: { role: "Directrice Technique" },
          thomas: { role: "Responsable Marketing" },
          julie: { role: "Lead Developer" },
        },
      },
      cta: {
        title: 'Rejoignez notre aventure',
        subtitle: 'digitale',
        description: 'Que vous souhaitiez devenir client ou rejoindre notre équipe, nous serions ravis de vous rencontrer.',
        button1: 'Commencer un projet',
        button2: 'Nous contacter',
      },
    },
    aboutSection: {
      title: 'À Propos',
      subtitle: 'Votre partenaire pour la transformation digitale',
      description: 'IMBT Consulting est votre partenaire stratégique pour libérer le plein potentiel de votre entreprise. Nous vous accompagnons dans l\'atteinte de vos objectifs, tout en vous aidant à naviguer dans l\'univers complexe de la transformation digitale.',
      learnMore: 'En savoir plus sur nous',
      certifiedExpert: 'Certifié Expert',
      projectsDelivered: 'Projets livrés',
      values: [
        'Approche personnalisée pour chaque client',
        'Technologies de pointe et innovation',
        'Accompagnement dans la transformation digitale',
        'Excellence opérationnelle et performance',
      ],
    },
    stats: {
      projects: 'Projets Réalisés',
      clients: 'Clients Satisfaits',
      satisfaction: 'Satisfaction',
      experience: 'Ans d\'Expérience',
    },
    ctaSection: {
      badge: 'Prêt à transformer votre entreprise ?',
      title: 'Commencez votre transformation digitale aujourd\'hui',
      description: 'Contactez-nous pour une consultation gratuite. Nos experts analyseront vos besoins et développeront un plan d\'action personnalisé pour atteindre vos objectifs.',
      bookConsultation: 'Réserver une consultation',
      contactUs: 'Nous contacter',
      emailUs: 'Ou envoyez-nous un email à',
    },
    footer: {
      description: 'Votre partenaire stratégique pour libérer le plein potentiel de votre entreprise dans l\'univers de la transformation digitale.',
      company: 'Entreprise',
      services: 'Services',
      contact: 'Contact',
      legal: 'Légal',
      copyright: 'Tous droits réservés.',
      digitalTransformation: 'Transformation Digitale',
      webDevelopment: 'Développement Web',
      training: 'Formation',
      crmErp: 'CRM & ERP',
      about: 'À Propos',
      ourValues: 'Nos Valeurs',
      caseStudies: 'Études de cas',
      privacyPolicy: 'Politique de Confidentialité',
      legalNotice: 'Mentions Légales',
      termsConditions: 'CGV',
    },
    auth: {
      signIn: 'Connexion',
      signUp: 'Inscription',
      email: 'Email',
      password: 'Mot de passe',
      firstName: 'Prénom',
      lastName: 'Nom',
      phone: 'Téléphone',
      company: 'Entreprise',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié ?',
      forgotPasswordTitle: 'Mot de passe oublié',
      forgotPasswordSubtitle: 'Saisissez votre email pour recevoir un lien de réinitialisation',
      sendResetLink: 'Envoyer le lien',
      resetLinkSent: 'Si un compte existe pour cette adresse, un lien de réinitialisation vient d’être envoyé.',
      checkSpamFolder: 'Pensez à vérifier vos courriers indésirables.',
      backToSignIn: 'Retour à la connexion',
      resetPasswordTitle: 'Nouveau mot de passe',
      resetPasswordSubtitle: 'Choisissez un nouveau mot de passe pour votre compte',
      resetPasswordButton: 'Réinitialiser le mot de passe',
      newPassword: 'Nouveau mot de passe',
      passwordResetSuccess: 'Votre mot de passe a été réinitialisé avec succès.',
      invalidResetLink: 'Ce lien de réinitialisation est invalide ou a expiré.',
      requestNewLink: 'Demander un nouveau lien',
      noAccount: 'Pas encore de compte ?',
      createAccount: 'Créer un compte',
      alreadyHaveAccount: 'Déjà un compte ?',
      invalidCredentials: 'Email ou mot de passe invalide',
      accountDeactivated: 'Compte désactivé',
      passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
      adminSpace: 'Espace administrateur',
      clientSpace: 'Espace client',
      managerSpace: 'Espace manager',
      allRolesSpace: 'Espace client, manager et administrateur',
      signInButton: 'Se connecter',
      signUpButton: 'Créer mon compte',
      signingIn: 'Connexion...',
      signingUp: 'Création du compte...',
      confirmPassword: 'Confirmer le mot de passe',
      passwordsMismatch: 'Les mots de passe ne correspondent pas',
      minCharacters: 'Minimum 6 caractères',
      acceptTerms: 'J\'accepte les',
      termsAndConditions: 'conditions générales',
      privacyPolicy: 'politique de confidentialité',
      or: 'OU',
      joinIMBT: 'Rejoignez IMBT Consulting',
      demoAccountsAvailable: 'Comptes de test disponibles:',
      administrator: 'Administrateur',
      manager: 'Manager',
      client: 'Client',
    },
    dashboard: {
      welcome: 'Bienvenue',
      upcomingReservations: 'Réservations à venir',
      completedReservations: 'Réservations terminées',
      totalPurchases: 'Achats totaux',
      totalSpent: 'Total dépensé',
      myReservations: 'Mes Réservations',
      myPurchases: 'Mes Achats',
      profile: 'Profil',
      noReservations: 'Aucune réservation',
      noReservationsDesc: 'Vous n\'avez pas encore de réservations',
      noPurchases: 'Aucun achat',
      noPurchasesDesc: 'Vous n\'avez pas encore effectué d\'achats',
      makeReservation: 'Faire une réservation',
      profileInfo: 'Informations du profil',
      emailVerified: 'Email vérifié',
      notVerified: 'Non vérifié',
      verified: 'Vérifié',
      memberSince: 'Membre depuis',
      lastLogin: 'Dernière connexion',
      duration: 'Durée',
      message: 'Message',
      createdOn: 'Créé le',
      type: 'Type',
      tracking: 'Suivi',
      total: 'Total',
      ordered: 'Commandé',
      paid: 'Payé',
      delivered: 'Livré',
      notProvided: 'Non renseigné',
      city: 'Ville',
      country: 'Pays',
      position: 'Poste',
    },
    status: {
      pending: 'En attente',
      confirmed: 'Confirmé',
      completed: 'Terminé',
      cancelled: 'Annulé',
      processing: 'En cours',
      draft: 'Brouillon',
      published: 'Publié',
      archived: 'Archivé',
    },
    reservation: {
      title: 'Réservation de Consultation',
      subtitle: 'Réservez votre consultation',
      description: 'Choisissez le service souhaité et sélectionnez un créneau qui vous convient.',
      selectService: 'Sélectionnez un service',
      chooseService: 'Choisissez un service',
      chooseDateTime: 'Choisissez une date et un créneau',
      selectDate: 'Sélectionnez une date',
      selectTime: 'Sélectionnez une heure',
      yourInfo: 'Vos informations',
      additionalInfo: 'Informations supplémentaires',
      messageLabel: 'Message (optionnel)',
      messagePlaceholder: 'Décrivez brièvement votre projet ou vos besoins...',
      createAccount: 'Créer un compte',
      createAccountDesc: 'Créez un compte pour suivre vos réservations',
      createAccountPrompt: 'Créez un compte pour accéder à votre dashboard et suivre vos réservations :',
      setPassword: 'Définir un mot de passe',
      createPassword: 'Créer un mot de passe',
      passwordHint: 'Ce mot de passe vous permettra d\'accéder à votre espace client',
      confirmReservation: 'Confirmer la réservation',
      reservationSuccess: 'Réservation créée avec succès',
      confirmed: 'Réservation confirmée !',
      confirmationEmail: 'Votre consultation a été réservée avec succès. Vous recevrez un email de confirmation avec tous les détails.',
      summary: 'Récapitulatif',
      service: 'Service',
      date: 'Date',
      time: 'Heure',
      duration: 'Durée',
      viewDashboard: 'Voir mon dashboard',
      backToHome: 'Retour à l\'accueil',
      newReservation: 'Nouvelle réservation',
      orSignInWithPassword: 'Ou connectez-vous avec un mot de passe',
      continue: 'Continuer',
      today: 'Aujourd\'hui',
      selected: 'Sélectionné',
      unavailable: 'Indisponible',
      availableSlots: 'Créneaux disponibles',
      required: 'Requis',
      days: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    },
    admin: {
      dashboard: 'Tableau de bord',
      manageReservationsDesc: 'Gérez vos réservations et clients',
      manageClients: 'Gestion des clients',
      blogManagement: 'Gestion du blog',
      statistics: 'Statistiques',
      settings: 'Paramètres',
      totalReservations: 'Réservations totales',
      activeClients: 'Clients actifs',
      confirmationRate: 'Taux de confirmation',
      averageDuration: 'Durée moyenne',
      totalRevenue: 'Revenus Total',
      title: 'Titre',
      author: 'Auteur',
      views: 'Vues',
      recentReservations: 'Réservations récentes',
      client: 'Client',
      service: 'Service',
      dateTime: 'Date & Heure',
      status: 'Statut',
      actions: 'Actions',
      viewDetails: 'Voir détails',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      noReservationsFound: 'Aucune réservation trouvée',
      reservationDetails: 'Détails de la réservation',
      email: 'Email',
      phone: 'Téléphone',
      company: 'Entreprise',
      date: 'Date',
      time: 'Heure',
      close: 'Fermer',
      searchPlaceholder: 'Rechercher...',
      statusFilter: 'Statut',
      allStatus: 'Tous',
      confirmedStatus: 'Confirmés',
      pendingStatus: 'En attente',
      cancelledStatus: 'Annulés',
      viewSite: 'Voir le site',
      newArticle: 'Nouvel Article',
      createPost: 'Créer un article',
      editPost: 'Modifier l\'article',
      deletePost: 'Supprimer l\'article',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      manageClientsTitle: 'Gestion des Clients',
      manageClientsDesc: 'Gérez votre base de données clients',
      newClient: 'Nouveau Client',
      searchClientsPlaceholder: 'Rechercher par nom, email ou entreprise...',
      firstName: 'Prénom',
      lastName: 'Nom',
      confirmDeleteClient: 'Êtes-vous sûr de vouloir supprimer ce client ?',
      create: 'Créer',
      update: 'Mettre à jour',
      noClientsFound: 'Aucun client trouvé',
      pageOf: 'Page {page} sur {total}',
      clientDetails: 'Détails Client',
      editClient: 'Modifier Client',
      addClient: 'Nouveau Client',
      position: 'Poste',
      city: 'Ville',
      country: 'Pays',
      address: 'Adresse',
      notes: 'Notes',
      blogManagementTitle: 'Gestion du Blog',
      blogManagementDesc: 'Créez et gérez vos articles de blog',
      totalArticles: 'Total Articles',
      published: 'Publiés',
      drafts: 'Brouillons',
      totalViews: 'Vues Totales',
      basicInfo: 'Informations de base',
      mainTitle: 'Titre Principal',
      subtitle: 'Sous-titre (optionnel)',
      slug: 'URL (Slug)',
      excerpt: 'Résumé',
      featuredImage: 'Image (URL)',
      tags: 'Tags',
      articleContent: 'Contenu de l\'article',
      addSection: 'Section',
      addParagraph: 'Paragraphe',
      addList: 'Liste',
      sectionTitle: 'Titre de la section',
      listTitle: 'Titre de la liste',
      listItemPlaceholder: 'Élément de liste...',
      save: 'Enregistrer',
      saving: 'Enregistrement...',
      successSave: 'Article enregistré avec succès',
      errorSave: 'Erreur lors de l\'enregistrement',
      confirmDeletePost: 'Êtes-vous sûr de vouloir supprimer cet article ?',
      articleSubtitlePlaceholder: 'Découvrez les principales tendances...',
      articleTitlePlaceholder: 'Les 5 tendances...',
      articleSlugPlaceholder: 'tendances-transformation-digitale-2025',
      articleExcerptPlaceholder: 'Résumé court qui apparaîtra...',
      notPublished: 'Non publié',
      statsTitle: 'Statistiques',
      statsDesc: 'Vue d\'ensemble de votre activité',
      thisWeek: 'cette semaine',
      thisMonth: 'ce mois',
      perMonth: 'par mois',
      popularServices: 'Services Populaires',
      monthlyEvolution: 'Évolution Mensuelle',
      recentReservationsTitle: 'Réservations Récentes',
      topClients: 'Meilleurs Clients',
      reservations: 'réservations',
      completedLabel: 'terminées',
      cancelledLabel: 'annulées',
      totalLabel: 'total',
      upcoming: 'À Venir',
      settingsTitle: 'Paramètres',
      settingsDesc: 'Configurez votre application',
      saveSettings: 'Enregistrer',
      savingSettings: 'Enregistrement...',
      reset: 'Annuler',
      successSettings: 'Paramètres enregistrés avec succès',
      errorSettings: 'Une erreur est survenue lors de l\'enregistrement',
      generalSettings: 'Paramètres Généraux',
      notifications: 'Notifications',
      reservationsCategory: 'Réservations',
      securityNotice: 'Note de Sécurité',
      securityNoticeDesc: 'Les paramètres marqués comme "Public" sont accessibles via l\'API publique. Assurez-vous de ne pas exposer d\'informations sensibles dans ces paramètres.',
      publicBadge: 'Public',
      enabled: 'Activé',
      disabled: 'Désactivé',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Notre Blog',
      description: 'Découvrez nos articles, conseils et analyses sur la transformation digitale, le CRM, l\'ERP et le marketing digital.',
      searchPlaceholder: 'Rechercher un article...',
      allTags: 'Tous',
      readArticle: 'Lire l\'article',
      shareOn: 'Partager sur',
      shareOnFacebook: 'Partager sur Facebook',
      shareOnLinkedIn: 'Partager sur LinkedIn',
      relatedArticles: 'Articles similaires',
      tags: 'Tags',
      loading: 'Chargement des articles...',
      noArticles: 'Aucun article publié pour le moment.',
      noArticlesFound: 'Aucun article trouvé avec ces critères.',
      backToBlog: 'Retour au blog',
      views: 'vues',
      articleNotFound: 'Article non trouvé',
      articleNotFoundDesc: 'Désolé, cet article n\'existe pas ou a été supprimé.',
      shareTitle: 'Partager cet article',
      shareDesc: 'Cliquez pour partager cet article avec votre réseau',
      didYouLike: 'Cet article vous a plu ?',
      shareWithNetwork: 'Partagez-le avec votre réseau !',
      linkCopied: 'Lien copié dans le presse-papier!',
      loadingArticle: 'Chargement de l\'article...',
    },
    caseStudiesPage: {
      hero: {
        badge: 'Nos Réussites',
        title: 'Études de Cas',
        subtitle: 'Cas',
        description: 'Découvrez comment IMBT Consulting a transformé les entreprises grâce à des solutions digitales innovantes',
        back: 'Retour',
      },
      sections: {
        context: 'Contexte',
        challenges: 'Défis',
        solution: 'Solution',
        results: 'Résultats',
        studyNumber: 'Étude de Cas #',
        ctaTitle: 'Prêt à transformer votre entreprise ?',
        ctaDescription: 'Contactez-nous pour découvrir comment nous pouvons vous aider à atteindre vos objectifs',
        ctaButton: 'Demander une consultation',
      },
      items: [
        {
          id: 1,
          title: "GRT Security - Implémentation ERP",
          subtitle: "Transformation digitale d'une entreprise de sécurité privée",
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
        },
        {
          id: 2,
          title: "Oxygène Print - Plateforme de Collaboration Interne",
          subtitle: "Optimisation de la communication inter-départementale",
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
        },
        {
          id: 3,
          title: "Digitalisation.Services - Implémentation CRM",
          subtitle: "Optimisation de la gestion de la relation client",
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
        },
        {
          id: 4,
          title: "Cyris360 - Optimisation Marketing Digital",
          subtitle: "Stratégie omnicanale pour croissance en ligne",
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
        },
      ],
    },
    contactPage: {
      title: 'Contact',
      subtitle: 'Parlons de votre',
      description: 'Vous avez des questions ? Contactez-nous pour en savoir plus sur nos services et comment nous pouvons vous aider.',
      info: {
        email: { title: "Email" },
        phone: { title: "Téléphone" },
        address: { title: "Adresse" },
        hours: { title: "Horaires", value: "Lun-Ven: 9h-18h" },
      },
      form: {
        title: 'Envoyez-nous un message',
        subtitle: 'Nous vous répondrons dans les 24h',
        nameLabel: 'Nom complet',
        emailLabel: 'Email',
        companyLabel: 'Entreprise',
        subjectLabel: 'Sujet',
        messageLabel: 'Message',
        namePlaceholder: 'Votre nom',
        emailPlaceholder: 'votre@email.com',
        companyPlaceholder: 'Votre entreprise',
        subjectPlaceholder: 'Objet de votre message',
        messagePlaceholder: 'Décrivez votre projet ou votre demande...',
        submitButton: 'Envoyer le message',
        submitting: 'Envoi en cours...',
        successTitle: 'Message envoyé !',
        successMessage: 'Merci pour votre message. Notre équipe vous contactera très bientôt.',
        sendAnother: 'Envoyer un autre message',
      },
    },
    errors: {
      somethingWrong: 'Une erreur est survenue',
      tryAgain: 'Réessayer',
      notFound: 'Page non trouvée',
      unauthorized: 'Non autorisé',
      serverError: 'Erreur serveur',
    },
    privacyPolicy: {
      title: 'Confidentialité',
      subtitle: 'Politique de',
      description: 'Votre vie privée est notre priorité. Découvrez comment nous protégeons et utilisons vos données personnelles.',
      protectionBadge: 'Protection des Données',
      conformityBadge: 'Conforme RGPD',
      secureBadge: 'Données Sécurisées',
      transparencyBadge: 'Transparence Totale',
      legalInfoTitle: 'Informations Légales',
      companyLabel: 'Société',
      managerLabel: 'Responsable',
      addressLabel: 'Adresse',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      lastUpdateLabel: 'Dernière mise à jour',
      lastUpdateValue: '17 juillet 2025',
      sections: [
        {
          title: "1. Responsable du Traitement",
          content: "IMBT Consulting est l'entité responsable du traitement des informations personnelles conformément à la loi tunisienne n° 2004-63 et au RGPD de l'UE.",
        },
        {
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
          title: "4. Base Légale",
          content: "Le traitement repose sur : le consentement pour les communications marketing, l'exécution du contrat, les obligations légales et les intérêts commerciaux légitimes.",
        },
        {
          title: "5. Conservation des Données",
          content: "Les informations sont conservées pendant la durée de la relation contractuelle, jusqu'à 5 ans après le contact, ou plus longtemps si requis légalement.",
        },
        {
          title: "6. Destinataires des Données",
          content: "Les informations peuvent être partagées avec le personnel, les partenaires techniques et les autorités légales si nécessaire.",
        },
        {
          title: "7. Droits Individuels",
          content: "Les utilisateurs peuvent accéder, corriger, s'opposer, supprimer, porter ou retirer leur consentement concernant leurs données.",
        },
        {
          title: "8. Mesures de Sécurité",
          content: "Nous mettons en œuvre des protections techniques et organisationnelles incluant le chiffrement et l'accès restreint.",
        },
        {
          title: "9. Transfert International de Données",
          content: "Les transferts hors Tunisie/UE incluent des garanties appropriées via des clauses contractuelles et des évaluations d'adéquation des pays.",
        },
        {
          title: "10. Cookies",
          content: "Le site utilise des cookies pour l'analytique, la navigation et le marketing, gérables via les paramètres du navigateur.",
        },
        {
          title: "11. Réclamations",
          content: "Les litiges peuvent être déposés auprès de l'INPDP de Tunisie ou des autorités respectives de protection des données de l'UE.",
        },
        {
          title: "12. Mises à Jour de la Politique",
          content: "Les modifications seront communiquées via le site web ou par email.",
        },
      ],
      ctaTitle: 'Des Questions sur Vos Données ?',
      ctaDescription: 'Notre équipe est disponible pour répondre à toutes vos questions concernant la confidentialité et la protection de vos données.',
      ctaButton: 'Nous Contacter',
    },
  },

  en: {
    common: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      blog: 'Blog',
      ourCabinet: 'Our Cabinet',
      reservation: 'Reservation',
      contact: 'Contact',
      login: 'Login',
      logout: 'Logout',
      reserve: 'Reserve',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      search: 'Search',
      filter: 'Filter',
      close: 'Close',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      readMore: 'Read more',
      and: 'and the',
    },
    nav: {
      consulting: 'Consulting',
    },
    hero: {
      badge: 'Your strategic partner',
      title: 'Digital Strategies',
      subtitle: 'for a Sustainable Future',
      description: 'IMBT Consulting unlocks the full potential of your business with innovative solutions in digital transformation, custom development and digital marketing.',
      cta: 'Book a consultation',
      ctaSecondary: 'Discover our services',
      scrollToExplore: 'Scroll to explore',
    },
    servicesSection: {
      title: 'Our Services',
      subtitle: 'A complete range of digital solutions',
      description: 'Each of our interventions is designed to stimulate your growth, improve your operational efficiency, and maximize your performance.',
      viewAll: 'View all our services',
      learnMore: 'Learn more',
    },
    serviceCards: {
      transformation: {
        title: 'Digital Transformation Consulting',
        description: 'We develop personalized digital strategies to maximize your market impact.',
        features: [
          "Full digital audit",
          "Transformation strategy",
          "Change management",
          "Performance measurement",
        ],
      },
      development: {
        title: 'Web & Application Development',
        description: 'We create high-performance websites tailored to your business with cutting-edge technologies.',
        features: ["Custom websites", "Mobile applications", "E-commerce", "Maintenance & support"],
      },
      marketing: {
        title: 'Digital Marketing',
        description: 'Optimization of digital campaigns and omnichannel marketing strategy for better performance.',
        features: ["SEO & SEA", "Social media", "Email marketing", "Analytics & reporting"],
      },
      crm: {
        title: 'CRM & Customer Management',
        description: 'Implementation of customer relationship management systems to optimize your acquisition and retention.',
        features: [
          "CRM needs analysis",
          "Salesforce/HubSpot implementation",
          "Data migration",
          "Team training",
        ],
      },
      erp: {
        title: 'ERP & Integrated Management',
        description: 'Implementation of integrated management systems for better operational efficiency.',
        features: [
          "Process audit",
          "ERP solution selection",
          "Deployment & integration",
          "Continuous optimization",
        ],
      },
      training: {
        title: 'Digital Training',
        description: 'Comprehensive programs to master digital tools and technologies, from beginner to advanced.',
        features: ["Custom training", "Practical workshops", "Recognized certifications", "Post-training follow-up"],
      },
    },
    benefits: {
      speed: { title: "Speed", description: "Visible results in a few weeks" },
      expertise: { title: "Expertise", description: "10+ years of digital experience" },
      support: { title: "24/7 Support", description: "Continuous guidance" },
    },
    aboutPage: {
      hero: {
        badge: 'About Us',
        title: 'Your partner for',
        subtitle: 'digital transformation',
        description1: "IMBT Consulting is your strategic partner to unlock the full potential of your business. We offer a full range of services, including digital transformation consulting, custom IT development, and innovative digital marketing solutions.",
        description2: "With a personalized approach, we support you in achieving your goals, while helping you navigate the complex world of digital transformation.",
        cta: 'Start a project',
      },
      stats: {
        projects: { value: "100+", label: "Completed projects" },
        clients: { value: "98%", label: "Satisfied clients" },
        experience: { value: "10+", label: "Years of experience" },
        experts: { value: "50+", label: "Experts" },
      },
      values: {
        title: 'Our Values',
        subtitle: 'The pillars of our excellence',
        description: 'Our values guide every action we take and define our approach to digital consulting.',
        items: {
          excellence: {
            title: "Excellence",
            description: "We strive for excellence in every project, exceeding our clients' expectations through rigorous work and attention to detail.",
          },
          innovation: {
            title: "Innovation",
            description: "We stay at the forefront of technology and trends to offer innovative and high-performance solutions.",
          },
          engagement: {
            title: "Engagement",
            description: "We are fully committed to our clients, with transparency and integrity, to build long-lasting relationships.",
          },
          collaboration: {
            title: "Collaboration",
            description: "We believe in the power of teamwork and close collaboration with our clients to achieve the best results.",
          },
        },
      },
      team: {
        title: 'Our Team',
        subtitle: 'Passionate experts',
        description: 'A multidisciplinary team dedicated to your digital success.',
        members: {
          mohamed: { role: "Founder & CEO" },
          sarah: { role: "Technical Director" },
          thomas: { role: "Marketing Manager" },
          julie: { role: "Lead Developer" },
        },
      },
      cta: {
        title: 'Join our digital',
        subtitle: 'adventure',
        description: 'Whether you want to become a client or join our team, we would love to meet you.',
        button1: 'Start a project',
        button2: 'Contact us',
      },
    },
    aboutSection: {
      title: 'About',
      subtitle: 'Your partner for digital transformation',
      description: 'IMBT Consulting is your strategic partner to unlock the full potential of your business. We support you in achieving your goals while helping you navigate the complex world of digital transformation.',
      learnMore: 'Learn more about us',
      certifiedExpert: 'Certified Expert',
      projectsDelivered: 'Projects delivered',
      values: [
        'Personalized approach for each client',
        'Cutting-edge technologies and innovation',
        'Support in digital transformation',
        'Operational excellence and performance',
      ],
    },
    stats: {
      projects: 'Completed Projects',
      clients: 'Satisfied Clients',
      satisfaction: 'Satisfaction',
      experience: 'Years of Experience',
    },
    ctaSection: {
      badge: 'Ready to transform your business?',
      title: 'Start your digital transformation today',
      description: 'Contact us for a free consultation. Our experts will analyze your needs and develop a personalized action plan to achieve your goals.',
      bookConsultation: 'Book a consultation',
      contactUs: 'Contact us',
      emailUs: 'Or send us an email at',
    },
    footer: {
      description: 'Your strategic partner to unlock the full potential of your business in the world of digital transformation.',
      company: 'Company',
      services: 'Services',
      contact: 'Contact',
      legal: 'Legal',
      copyright: 'All rights reserved.',
      digitalTransformation: 'Digital Transformation',
      webDevelopment: 'Web Development',
      training: 'Training',
      crmErp: 'CRM & ERP',
      about: 'About',
      ourValues: 'Our Values',
      caseStudies: 'Case Studies',
      privacyPolicy: 'Privacy Policy',
      legalNotice: 'Legal Notice',
      termsConditions: 'Terms & Conditions',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      company: 'Company',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      forgotPasswordTitle: 'Forgot password',
      forgotPasswordSubtitle: 'Enter your email to receive a reset link',
      sendResetLink: 'Send reset link',
      resetLinkSent: 'If an account exists for this address, a reset link has just been sent.',
      checkSpamFolder: 'Remember to check your spam folder.',
      backToSignIn: 'Back to sign in',
      resetPasswordTitle: 'New password',
      resetPasswordSubtitle: 'Choose a new password for your account',
      resetPasswordButton: 'Reset password',
      newPassword: 'New password',
      passwordResetSuccess: 'Your password has been reset successfully.',
      invalidResetLink: 'This reset link is invalid or has expired.',
      requestNewLink: 'Request a new link',
      noAccount: 'No account yet?',
      createAccount: 'Create account',
      alreadyHaveAccount: 'Already have an account?',
      invalidCredentials: 'Invalid email or password',
      accountDeactivated: 'Account deactivated',
      passwordTooShort: 'Password must be at least 6 characters',
      adminSpace: 'Admin space',
      clientSpace: 'Client space',
      managerSpace: 'Manager space',
      allRolesSpace: 'Client, manager and admin space',
      signInButton: 'Sign In',
      signUpButton: 'Create my account',
      signingIn: 'Signing in...',
      signingUp: 'Creating account...',
      confirmPassword: 'Confirm password',
      passwordsMismatch: 'Passwords do not match',
      minCharacters: 'Minimum 6 characters',
      acceptTerms: 'I accept the',
      termsAndConditions: 'terms and conditions',
      privacyPolicy: 'privacy policy',
      or: 'OR',
      joinIMBT: 'Join IMBT Consulting',
      demoAccountsAvailable: 'Demo accounts available:',
      administrator: 'Administrator',
      manager: 'Manager',
      client: 'Client',
    },
    dashboard: {
      welcome: 'Welcome',
      upcomingReservations: 'Upcoming Reservations',
      completedReservations: 'Completed Reservations',
      totalPurchases: 'Total Purchases',
      totalSpent: 'Total Spent',
      myReservations: 'My Reservations',
      myPurchases: 'My Purchases',
      profile: 'Profile',
      noReservations: 'No reservations',
      noReservationsDesc: 'You don\'t have any reservations yet',
      noPurchases: 'No purchases',
      noPurchasesDesc: 'You haven\'t made any purchases yet',
      makeReservation: 'Make a reservation',
      profileInfo: 'Profile information',
      emailVerified: 'Email verified',
      notVerified: 'Not verified',
      verified: 'Verified',
      memberSince: 'Member since',
      lastLogin: 'Last login',
      duration: 'Duration',
      message: 'Message',
      createdOn: 'Created on',
      type: 'Type',
      tracking: 'Tracking',
      total: 'Total',
      ordered: 'Ordered',
      paid: 'Paid',
      delivered: 'Delivered',
      notProvided: 'Not provided',
      city: 'City',
      country: 'Country',
      position: 'Position',
    },
    status: {
      pending: 'Pending',
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled',
      processing: 'Processing',
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
    },
    reservation: {
      title: 'Consultation Booking',
      subtitle: 'Book your consultation',
      description: 'Choose your desired service and select a time slot that suits you.',
      selectService: 'Select a service',
      chooseService: 'Choose a service',
      chooseDateTime: 'Choose a date and time slot',
      selectDate: 'Select a date',
      selectTime: 'Select a time',
      yourInfo: 'Your information',
      additionalInfo: 'Additional information',
      messageLabel: 'Message (optional)',
      messagePlaceholder: 'Briefly describe your project or needs...',
      createAccount: 'Create an account',
      createAccountDesc: 'Create an account to track your reservations',
      createAccountPrompt: 'Create an account to access your dashboard and track your reservations:',
      setPassword: 'Set a password',
      createPassword: 'Create a password',
      passwordHint: 'This password will allow you to access your client area',
      confirmReservation: 'Confirm reservation',
      reservationSuccess: 'Reservation created successfully',
      confirmed: 'Reservation confirmed!',
      confirmationEmail: 'Your consultation has been successfully booked. You will receive a confirmation email with all the details.',
      summary: 'Summary',
      service: 'Service',
      date: 'Date',
      time: 'Time',
      duration: 'Duration',
      viewDashboard: 'View my dashboard',
      backToHome: 'Back to home',
      newReservation: 'New reservation',
      orSignInWithPassword: 'Or sign in with a password',
      continue: 'Continue',
      today: 'Today',
      selected: 'Selected',
      unavailable: 'Unavailable',
      availableSlots: 'Available slots',
      required: 'Required',
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    },
    admin: {
      dashboard: 'Dashboard',
      manageReservationsDesc: 'Manage your reservations and clients',
      manageClients: 'Manage Clients',
      blogManagement: 'Blog Management',
      statistics: 'Statistics',
      settings: 'Settings',
      totalReservations: 'Total Reservations',
      activeClients: 'Active Clients',
      confirmationRate: 'Confirmation Rate',
      averageDuration: 'Average Duration',
      totalRevenue: 'Total Revenue',
      title: 'Title',
      author: 'Author',
      views: 'Views',
      recentReservations: 'Recent Reservations',
      client: 'Client',
      service: 'Service',
      dateTime: 'Date & Time',
      status: 'Status',
      actions: 'Actions',
      viewDetails: 'View details',
      confirm: 'Confirm',
      cancel: 'Cancel',
      noReservationsFound: 'No reservations found',
      reservationDetails: 'Reservation Details',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      date: 'Date',
      time: 'Time',
      close: 'Close',
      searchPlaceholder: 'Search...',
      statusFilter: 'Status',
      allStatus: 'All',
      confirmedStatus: 'Confirmed',
      pendingStatus: 'Pending',
      cancelledStatus: 'Cancelled',
      viewSite: 'View Site',
      newArticle: 'New Article',
      createPost: 'Create an article',
      editPost: 'Edit article',
      deletePost: 'Delete article',
      confirmDelete: 'Are you sure you want to delete this article?',
      manageClientsTitle: 'Client Management',
      manageClientsDesc: 'Manage your client database',
      newClient: 'New Client',
      searchClientsPlaceholder: 'Search by name, email or company...',
      firstName: 'First Name',
      lastName: 'Last Name',
      confirmDeleteClient: 'Are you sure you want to delete this client?',
      create: 'Create',
      update: 'Update',
      noClientsFound: 'No clients found',
      pageOf: 'Page {page} of {total}',
      clientDetails: 'Client Details',
      editClient: 'Edit Client',
      addClient: 'Add Client',
      position: 'Position',
      city: 'City',
      country: 'Country',
      address: 'Address',
      notes: 'Notes',
      blogManagementTitle: 'Blog Management',
      blogManagementDesc: 'Create and manage your blog posts',
      totalArticles: 'Total Articles',
      published: 'Published',
      drafts: 'Drafts',
      totalViews: 'Total Views',
      basicInfo: 'Basic Information',
      mainTitle: 'Main Title',
      subtitle: 'Subtitle (optional)',
      slug: 'URL (Slug)',
      excerpt: 'Excerpt',
      featuredImage: 'Image (URL)',
      tags: 'Tags',
      articleContent: 'Article Content',
      addSection: 'Section',
      addParagraph: 'Paragraph',
      addList: 'List',
      sectionTitle: 'Section Title',
      listTitle: 'List Title',
      listItemPlaceholder: 'List item...',
      save: 'Save',
      saving: 'Saving...',
      successSave: 'Article saved successfully',
      errorSave: 'Error saving article',
      confirmDeletePost: 'Are you sure you want to delete this article?',
      articleSubtitlePlaceholder: 'Discover the main trends...',
      articleTitlePlaceholder: 'The 5 trends...',
      articleSlugPlaceholder: 'digital-transformation-trends-2025',
      articleExcerptPlaceholder: 'Short summary that will appear...',
      notPublished: 'Not published',
      statsTitle: 'Statistics',
      statsDesc: 'Overview of your activity',
      thisWeek: 'this week',
      thisMonth: 'this month',
      perMonth: 'per month',
      popularServices: 'Popular Services',
      monthlyEvolution: 'Monthly Evolution',
      recentReservationsTitle: 'Recent Reservations',
      topClients: 'Top Clients',
      reservations: 'reservations',
      completedLabel: 'completed',
      cancelledLabel: 'cancelled',
      totalLabel: 'total',
      upcoming: 'Upcoming',
      settingsTitle: 'Settings',
      settingsDesc: 'Configure your application',
      saveSettings: 'Save',
      savingSettings: 'Saving...',
      reset: 'Reset',
      successSettings: 'Settings saved successfully',
      errorSettings: 'An error occurred while saving',
      generalSettings: 'General Settings',
      notifications: 'Notifications',
      reservationsCategory: 'Reservations',
      securityNotice: 'Security Notice',
      securityNoticeDesc: 'Settings marked as "Public" are accessible via the public API. Make sure not to expose sensitive information in these settings.',
      publicBadge: 'Public',
      enabled: 'Enabled',
      disabled: 'Disabled',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Our Blog',
      description: 'Discover our articles, tips and analyses on digital transformation, CRM, ERP and digital marketing.',
      searchPlaceholder: 'Search for an article...',
      allTags: 'All',
      readArticle: 'Read article',
      shareOn: 'Share on',
      shareOnFacebook: 'Share on Facebook',
      shareOnLinkedIn: 'Share on LinkedIn',
      relatedArticles: 'Related articles',
      tags: 'Tags',
      loading: 'Loading articles...',
      noArticles: 'No articles published yet.',
      noArticlesFound: 'No articles found with these criteria.',
      backToBlog: 'Back to blog',
      views: 'views',
      articleNotFound: 'Article not found',
      articleNotFoundDesc: 'Sorry, this article doesn\'t exist or has been deleted.',
      shareTitle: 'Share this article',
      shareDesc: 'Click to share this article with your network',
      didYouLike: 'Did you like this article?',
      shareWithNetwork: 'Share it with your network!',
      linkCopied: 'Link copied to clipboard!',
      loadingArticle: 'Loading article...',
    },
    caseStudiesPage: {
      hero: {
        badge: 'Our Success Stories',
        title: 'Case',
        subtitle: 'Studies',
        description: 'Discover how IMBT Consulting has transformed businesses through innovative digital solutions',
        back: 'Back',
      },
      sections: {
        context: 'Context',
        challenges: 'Challenges',
        solution: 'Solution',
        results: 'Results',
        studyNumber: 'Case Study #',
        ctaTitle: 'Ready to transform your business?',
        ctaDescription: 'Contact us to find out how we can help you achieve your goals',
        ctaButton: 'Request a consultation',
      },
      items: [
        {
          id: 1,
          title: "GRT Security - ERP Implementation",
          subtitle: "Digital transformation of a private security company",
          context: "A fast-growing private security company needing to improve its operational efficiency.",
          challenges: [
            "Multiple and disconnected management systems",
            "Difficulties in centralizing information",
            "Lack of real-time visibility on performance",
            "Manual processes prone to errors",
          ],
          solution: "IMBT Consulting deployed an integrated ERP system including HR management, intervention planning, billing/accounting modules, and real-time reporting dashboards.",
          results: [
            { metric: "30%", description: "Reduction in administrative errors" },
            { metric: "Efficiency", description: "Improved planning and personnel administration time" },
            { metric: "Satisfaction", description: "Improved customer satisfaction through better management" },
            { metric: "KPI", description: "Accurate tracking with real-time reports" },
          ],
          testimonial: "The implementation 'transformed the way we manage our business. We have gained efficiency and responsiveness, with better visibility on performance' allowing us to focus on our core security services.",
        },
        {
          id: 2,
          title: "Oxygène Print - Internal Collaboration Platform",
          subtitle: "Optimization of inter-departmental communication",
          context: "A printing and visual communication company requiring improved inter-departmental communication with the expansion of the team.",
          challenges: [
            "Information silos between departments",
            "Scattered project management tools",
            "Difficulty tracking progress in real-time",
            "Poor coordination between creative, production and logistics teams",
          ],
          solution: "IMBT Consulting developed a custom collaboration platform with centralized project management, real-time communication spaces, file sharing, and integrated planning.",
          results: [
            { metric: "25%", description: "Increase in productivity through better team coordination" },
            { metric: "40%", description: "Reduction in project management time" },
            { metric: "Collaboration", description: "Improved inter-departmental collaboration" },
            { metric: "Real-time", description: "Real-time task tracking allowing proactive management" },
          ],
          testimonial: "The platform 'revolutionized the way we work. We have gained fluidity and efficiency, with improved collaboration reflected in the quality of service.'",
        },
        {
          id: 3,
          title: "Digitalisation.Services - CRM Implementation",
          subtitle: "Optimization of customer relationship management",
          context: "A digital transformation consulting firm needing to improve internal customer relationship management despite rapid growth.",
          challenges: [
            "Disorganized tracking of customer interactions across scattered channels",
            "Difficulty prioritizing business opportunities",
            "Lack of visibility on the sales pipeline",
            "Unstructured project management processes",
          ],
          solution: "IMBT Consulting implemented a custom CRM with centralized tracking of customer interactions, business opportunity management, internal collaboration tools, task automation, and performance reporting.",
          results: [
            { metric: "40%", description: "Improvement in sales productivity" },
            { metric: "35%", description: "Reduction in customer management time" },
            { metric: "Satisfaction", description: "Improved customer satisfaction through precise tracking" },
            { metric: "Pipeline", description: "Increased visibility of the sales pipeline supporting strategic decisions" },
          ],
          testimonial: "The CRM 'transformed the way we manage our customers and projects. We have gained efficiency and can offer a better customer experience, essential for growth.'",
        },
        {
          id: 4,
          title: "Cyris360 - Digital Marketing Optimization",
          subtitle: "Omnichannel strategy for online growth",
          context: "An expanding technology solutions company lacking cohesive and data-driven marketing approaches for online growth.",
          challenges: [
            "Absence of omnichannel strategy with scattered campaigns",
            "Low conversion rates despite advertising investment",
            "Limited analytical tools",
            "Low online visibility",
          ],
          solution: "IMBT Consulting deployed a comprehensive omnichannel digital marketing strategy including campaign audits, SEO optimization, paid advertising management, custom content creation, analytics implementation, and marketing automation.",
          results: [
            { metric: "50%", description: "Increase in qualified leads" },
            { metric: "35%", description: "Improvement in conversion rates" },
            { metric: "ROI", description: "Increase in advertising ROI through refined campaign management" },
            { metric: "Visibility", description: "Strengthening online visibility with better SEO positioning" },
          ],
          testimonial: "The digital strategy allowed them to 'boost online presence and generate tangible results. Real-time performance tracking keeps us competitive.'",
        },
      ],
    },
    contactPage: {
      title: 'Contact',
      subtitle: "Let's talk about your",
      description: 'Have questions? Contact us to learn more about our services and how we can help you.',
      info: {
        email: { title: "Email" },
        phone: { title: "Phone" },
        address: { title: "Address" },
        hours: { title: "Hours", value: "Mon-Fri: 9am-6pm" },
      },
      form: {
        title: 'Send us a message',
        subtitle: 'We will get back to you within 24h',
        nameLabel: 'Full Name',
        emailLabel: 'Email',
        companyLabel: 'Company',
        subjectLabel: 'Subject',
        messageLabel: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'your@email.com',
        companyPlaceholder: 'Your company',
        subjectPlaceholder: 'Subject of your message',
        messagePlaceholder: 'Describe your project or request...',
        submitButton: 'Send message',
        submitting: 'Sending...',
        successTitle: 'Message sent!',
        successMessage: 'Thank you for your message. Our team will contact you very soon.',
        sendAnother: 'Send another message',
      },
    },
    errors: {
      somethingWrong: 'Something went wrong',
      tryAgain: 'Try again',
      notFound: 'Page not found',
      unauthorized: 'Unauthorized',
      serverError: 'Server error',
    },
    privacyPolicy: {
      title: 'Privacy',
      subtitle: 'Policy',
      description: 'Your privacy is our priority. Discover how we protect and use your personal data.',
      protectionBadge: 'Data Protection',
      conformityBadge: 'GDPR Compliant',
      secureBadge: 'Secure Data',
      transparencyBadge: 'Total Transparency',
      legalInfoTitle: 'Legal Information',
      companyLabel: 'Company',
      managerLabel: 'Manager',
      addressLabel: 'Address',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      lastUpdateLabel: 'Last update',
      lastUpdateValue: 'July 17, 2025',
      sections: [
        {
          title: "1. Data Controller",
          content: "IMBT Consulting is the entity responsible for processing personal information in accordance with Tunisian Law No. 2004-63 and the EU GDPR.",
        },
        {
          title: "2. Data Collection",
          content: "We collect necessary information including:",
          list: [
            "Identification details (name, company, position)",
            "Contact information (email, phone, address)",
            "Technical data (IP address, browser, cookies)",
            "Professional information (consulting needs, contact history)",
          ],
        },
        {
          title: "3. Purposes of Processing",
          content: "Data is used to:",
          list: [
            "Respond to contact requests and quotes",
            "Provide consulting, development, and digital marketing services",
            "Administrative and commercial management",
            "Service-related communications (with consent)",
            "Improvement of the website and services",
          ],
        },
        {
          title: "4. Legal Basis",
          content: "Processing is based on: consent for marketing communications, contract execution, legal obligations, and legitimate business interests.",
        },
        {
          title: "5. Data Retention",
          content: "Information is kept for the duration of the contractual relationship, up to 5 years after contact, or longer if legally required.",
        },
        {
          title: "6. Data Recipients",
          content: "Information may be shared with personnel, technical partners, and legal authorities if necessary.",
        },
        {
          title: "7. Individual Rights",
          content: "Users can access, correct, object to, delete, port, or withdraw their consent regarding their data.",
        },
        {
          title: "8. Security Measures",
          content: "We implement technical and organizational protections including encryption and restricted access.",
        },
        {
          title: "9. International Data Transfer",
          content: "Transfers outside Tunisia/EU include appropriate safeguards via contractual clauses and country adequacy assessments.",
        },
        {
          title: "10. Cookies",
          content: "The site uses cookies for analytics, navigation, and marketing, manageable via browser settings.",
        },
        {
          title: "11. Complaints",
          content: "Disputes can be filed with the INPDP of Tunisia or respective EU data protection authorities.",
        },
        {
          title: "12. Policy Updates",
          content: "Changes will be communicated via the website or email.",
        },
      ],
      ctaTitle: 'Questions about Your Data?',
      ctaDescription: 'Our team is available to answer all your questions regarding privacy and data protection.',
      ctaButton: 'Contact Us',
    },
  },

  ar: {
    common: {
      home: 'الرئيسية',
      services: 'الخدمات',
      about: 'من نحن',
      blog: 'المدونة',
      ourCabinet: 'مكتبنا',
      reservation: 'الحجز',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول',
      logout: 'تسجيل الخروج',
      reserve: 'احجز',
      loading: 'جاري التحميل...',
      error: 'خطأ',
      success: 'نجح',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      view: 'عرض',
      search: 'بحث',
      filter: 'تصفية',
      close: 'إغلاق',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      submit: 'إرسال',
      readMore: 'اقرأ المزيد',
      and: 'و',
    },
    nav: {
      consulting: 'الاستشارات',
    },
    hero: {
      badge: 'شريكك الاستراتيجي',
      title: 'الاستراتيجيات الرقمية',
      subtitle: 'لمستقبل مستدام',
      description: 'تطلق IMBT Consulting الإمكانات الكاملة لعملك من خلال حلول مبتكرة في التحول الرقمي والتطوير المخصص والتسويق الرقمي.',
      cta: 'احجز استشارة',
      ctaSecondary: 'اكتشف خدماتنا',
      scrollToExplore: 'اسحب للاستكشاف',
    },
    servicesSection: {
      title: 'خدماتنا',
      subtitle: 'مجموعة كاملة من الحلول الرقمية',
      description: 'تم تصميم كل تدخلاتنا لتحفيز نموك وتحسين كفاءتك التشغيلية وتعظيم أدائك.',
      viewAll: 'عرض جميع خدماتنا',
      learnMore: 'اعرف المزيد',
    },
    serviceCards: {
      transformation: {
        title: 'استشارات التحول الرقمي',
        description: 'نطور استراتيجيات رقمية مخصصة لتعظيم تأثيرك في السوق.',
        features: [
          "تدقيق رقمي كامل",
          "استراتيجية التحول",
          "إدارة التغيير",
          "قياس الأداء",
        ],
      },
      development: {
        title: 'تطوير الويب والتطبيقات',
        description: 'نقوم بإنشاء مواقع ويب عالية الأداء مصممة خصيصًا لنشاطك التجاري بتقنيات متطورة.',
        features: ["مواقع ويب مخصصة", "تطبيقات جوال", "تجارة إلكترونية", "الصيانة والدعم"],
      },
      marketing: {
        title: 'التسويق الرقمي',
        description: 'تحسين الحملات الرقمية واستراتيجية التسويق متعددة القنوات لأداء أفضل.',
        features: ["SEO و SEA", "وسائل التواصل الاجتماعي", "التسويق عبر البريد الإلكتروني", "التحليلات والتقارير"],
      },
      crm: {
        title: 'إدارة علاقات العملاء وإدارة العملاء',
        description: 'تطبيق أنظمة إدارة علاقات العملاء لتحسين الاستحواذ والاحتفاظ.',
        features: [
          "تحليل احتياجات CRM",
          "تنفيذ Salesforce/HubSpot",
          "هجرة البيانات",
          "تدريب الفريق",
        ],
      },
      erp: {
        title: 'أنظمة الإدارة المتكاملة',
        description: 'تطبيق أنظمة إدارة متكاملة لكفاءة تشغيلية أفضل.',
        features: [
          "تدقيق العمليات",
          "اختيار حل ERP",
          "النشر والتكامل",
          "التحسين المستمر",
        ],
      },
      training: {
        title: 'التدريب الرقمي',
        description: 'برامج شاملة لإتقان الأدوات والتقنيات الرقمية، من المبتدئ إلى المتقدم.',
        features: ["تدريب مخصص", "ورش عمل عملية", "شهادات معترف بها", "متابعة ما بعد التدريب"],
      },
    },
    benefits: {
      speed: { title: "السرعة", description: "نتائج مرئية في غضون أسابيع قليلة" },
      expertise: { title: "الخبرة", description: "أكثر من 10 سنوات من الخبرة الرقمية" },
      support: { title: "دعم 24/7", description: "توجيه مستمر" },
    },
    aboutPage: {
      hero: {
        badge: 'من نحن',
        title: 'شريكك من أجل',
        subtitle: 'التحول الرقمي',
        description1: "IMBT Consulting هي شريكك الاستراتيجي لإطلاق الإمكانات الكاملة لعملك. نحن نقدم مجموعة كاملة من الخدمات، بما في ذلك استشارات التحول الرقمي، وتطوير تكنولوجيا المعلومات المخصص، وحلول التسويق الرقمي المبتكرة.",
        description2: "من خلال نهج مخصص، ندعمك في تحقيق أهدافك، بينما نساعدك على التنقل في عالم التحول الرقمي المعقد.",
        cta: 'ابدأ مشروعاً',
      },
      stats: {
        projects: { value: "100+", label: "مشاريع منجزة" },
        clients: { value: "98%", label: "عملاء راضون" },
        experience: { value: "10+", label: "سنوات خبرة" },
        experts: { value: "50+", label: "خبراء" },
      },
      values: {
        title: 'قيمنا',
        subtitle: 'ركائز تميزنا',
        description: 'توجه قيمنا كل إجراء نتخذه وتحدد نهجنا في الاستشارات الرقمية.',
        items: {
          excellence: {
            title: "التميز",
            description: "نحن نسعى جاهدين للتميز في كل مشروع، متجاوزين توقعات عملائنا من خلال العمل الجاد والاهتمام بالتفاصيل.",
          },
          innovation: {
            title: "الابتكار",
            description: "نحن نبقى في طليعة التكنولوجيا والاتجاهات لتقديم حلول مبتكرة وعالية الأداء.",
          },
          engagement: {
            title: "الالتزام",
            description: "نحن ملتزمون تماماً تجاه عملائنا، بشفافية ونزاهة، لبناء علاقات طويلة الأمد.",
          },
          collaboration: {
            title: "التعاون",
            description: "نحن نؤمن بقوة العمل الجماعي والتعاون الوثيق مع عملائنا لتحقيق أفضل النتائج.",
          },
        },
      },
      team: {
        title: 'فريقنا',
        subtitle: 'خبراء شغوفون',
        description: 'فريق متعدد التخصصات مكرس لنجاحك الرقمي.',
        members: {
          mohamed: { role: "المؤسس والرئيس التنفيذي" },
          sarah: { role: "المدير التقني" },
          thomas: { role: "مدير التسويق" },
          julie: { role: "مطور رئيسي" },
        },
      },
      cta: {
        title: 'انضم إلى مغامرتنا',
        subtitle: 'الرقمية',
        description: 'سواء كنت ترغب في أن تصبح عميلاً أو تنضم إلى فريقنا، يسعدنا مقابلتك.',
        button1: 'ابدأ مشروعاً',
        button2: 'اتصل بنا',
      },
    },
    aboutSection: {
      title: 'من نحن',
      subtitle: 'شريكك في التحول الرقمي',
      description: 'IMBT Consulting هو شريكك الاستراتيجي لإطلاق الإمكانات الكاملة لعملك. ندعمك في تحقيق أهدافك بينما نساعدك على التنقل في عالم التحول الرقمي المعقد.',
      learnMore: 'اعرف المزيد عنا',
      certifiedExpert: 'خبير معتمد',
      projectsDelivered: 'المشاريع المسلمة',
      values: [
        'نهج شخصي لكل عميل',
        'التقنيات المتطورة والابتكار',
        'الدعم في التحول الرقمي',
        'التميز التشغيلي والأداء',
      ],
    },
    stats: {
      projects: 'المشاريع المنجزة',
      clients: 'العملاء الراضون',
      satisfaction: 'الرضا',
      experience: 'سنوات الخبرة',
    },
    ctaSection: {
      badge: 'هل أنت مستعد لتحويل عملك؟',
      title: 'ابدأ تحولك الرقمي اليوم',
      description: 'اتصل بنا للحصول على استشارة مجانية. سيقوم خبراؤنا بتحليل احتياجاتك وتطوير خطة عمل مخصصة لتحقيق أهدافك.',
      bookConsultation: 'احجز استشارة',
      contactUs: 'اتصل بنا',
      emailUs: 'أو أرسل لنا بريدًا إلكترونيًا على',
    },
    footer: {
      description: 'شريكك الاستراتيجي لإطلاق الإمكانات الكاملة لعملك في عالم التحول الرقمي.',
      company: 'الشركة',
      services: 'الخدمات',
      contact: 'اتصل بنا',
      legal: 'قانوني',
      copyright: 'جميع الحقوق محفوظة.',
      digitalTransformation: 'التحول الرقمي',
      webDevelopment: 'تطوير الويب',
      training: 'التدريب',
      crmErp: 'إدارة علاقات العملاء وتخطيط موارد المؤسسات',
      about: 'من نحن',
      ourValues: 'قيمنا',
      caseStudies: 'دراسات الحالة',
      privacyPolicy: 'سياسة الخصوصية',
      legalNotice: 'الإشعار القانوني',
      termsConditions: 'الشروط والأحكام',
    },
    auth: {
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      phone: 'الهاتف',
      company: 'الشركة',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      forgotPasswordTitle: 'نسيت كلمة المرور',
      forgotPasswordSubtitle: 'أدخل بريدك الإلكتروني لتلقي رابط إعادة التعيين',
      sendResetLink: 'إرسال الرابط',
      resetLinkSent: 'إذا كان هناك حساب مرتبط بهذا العنوان، فقد تم إرسال رابط إعادة التعيين.',
      checkSpamFolder: 'يرجى التحقق من مجلد الرسائل غير المرغوب فيها.',
      backToSignIn: 'العودة إلى تسجيل الدخول',
      resetPasswordTitle: 'كلمة مرور جديدة',
      resetPasswordSubtitle: 'اختر كلمة مرور جديدة لحسابك',
      resetPasswordButton: 'إعادة تعيين كلمة المرور',
      newPassword: 'كلمة المرور الجديدة',
      passwordResetSuccess: 'تمت إعادة تعيين كلمة المرور بنجاح.',
      invalidResetLink: 'رابط إعادة التعيين غير صالح أو منتهي الصلاحية.',
      requestNewLink: 'طلب رابط جديد',
      noAccount: 'ليس لديك حساب؟',
      createAccount: 'إنشاء حساب',
      alreadyHaveAccount: 'لديك حساب بالفعل؟',
      invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      accountDeactivated: 'الحساب معطل',
      passwordTooShort: 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل',
      adminSpace: 'مساحة المسؤول',
      clientSpace: 'مساحة العميل',
      managerSpace: 'مساحة المدير',
      allRolesSpace: 'مساحة العميل والمدير والمسؤول',
      signInButton: 'تسجيل الدخول',
      signUpButton: 'إنشاء حسابي',
      signingIn: 'جاري تسجيل الدخول...',
      signingUp: 'جاري إنشاء الحساب...',
      confirmPassword: 'تأكيد كلمة المرور',
      passwordsMismatch: 'كلمات المرور غير متطابقة',
      minCharacters: 'الحد الأدنى 6 أحرف',
      acceptTerms: 'أوافق على',
      termsAndConditions: 'الشروط والأحكام',
      privacyPolicy: 'سياسة الخصوصية',
      or: 'أو',
      joinIMBT: 'انضم إلى IMBT للاستشارات',
      demoAccountsAvailable: 'حسابات تجريبية متاحة:',
      administrator: 'المسؤول',
      manager: 'المدير',
      client: 'العميل',
    },
    dashboard: {
      welcome: 'مرحباً',
      upcomingReservations: 'الحجوزات القادمة',
      completedReservations: 'الحجوزات المكتملة',
      totalPurchases: 'إجمالي المشتريات',
      totalSpent: 'إجمالي الإنفاق',
      myReservations: 'حجوزاتي',
      myPurchases: 'مشترياتي',
      profile: 'الملف الشخصي',
      noReservations: 'لا توجد حجوزات',
      noReservationsDesc: 'ليس لديك أي حجوزات بعد',
      noPurchases: 'لا توجد مشتريات',
      noPurchasesDesc: 'لم تقم بأي مشتريات بعد',
      makeReservation: 'إجراء حجز',
      profileInfo: 'معلومات الملف الشخصي',
      emailVerified: 'البريد الإلكتروني مؤكد',
      notVerified: 'غير مؤكد',
      verified: 'مؤكد',
      memberSince: 'عضو منذ',
      lastLogin: 'آخر تسجيل دخول',
      duration: 'المدة',
      message: 'الرسالة',
      createdOn: 'تم الإنشاء في',
      type: 'النوع',
      tracking: 'التتبع',
      total: 'المجموع',
      ordered: 'تم الطلب',
      paid: 'مدفوع',
      delivered: 'تم التسليم',
      notProvided: 'غير محدد',
      city: 'المدينة',
      country: 'البلد',
      position: 'المنصب',
    },
    status: {
      pending: 'قيد الانتظار',
      confirmed: 'مؤكد',
      completed: 'مكتمل',
      cancelled: 'ملغى',
      processing: 'قيد المعالجة',
      draft: 'مسودة',
      published: 'منشور',
      archived: 'مؤرشف',
    },
    reservation: {
      title: 'حجز الاستشارة',
      subtitle: 'احجز استشارتك',
      description: 'اختر الخدمة المطلوبة وحدد الموعد الذي يناسبك.',
      selectService: 'اختر خدمة',
      chooseService: 'اختر خدمة',
      chooseDateTime: 'اختر التاريخ والوقت',
      selectDate: 'اختر تاريخاً',
      selectTime: 'اختر وقتاً',
      yourInfo: 'معلوماتك',
      additionalInfo: 'معلومات إضافية',
      messageLabel: 'رسالة (اختياري)',
      messagePlaceholder: 'صف مشروعك أو احتياجاتك بإيجاز...',
      createAccount: 'إنشاء حساب',
      createAccountDesc: 'أنشئ حساباً لتتبع حجوزاتك',
      createAccountPrompt: 'أنشئ حساباً للوصول إلى لوحة التحكم وتتبع حجوزاتك:',
      setPassword: 'تعيين كلمة مرور',
      createPassword: 'إنشاء كلمة مرور',
      passwordHint: 'ستسمح لك كلمة المرور هذه بالوصول إلى حسابك',
      confirmReservation: 'تأكيد الحجز',
      reservationSuccess: 'تم إنشاء الحجز بنجاح',
      confirmed: 'تم تأكيد الحجز!',
      confirmationEmail: 'تم حجز استشارتك بنجاح. ستتلقى بريداً إلكترونياً للتأكيد مع جميع التفاصيل.',
      summary: 'الملخص',
      service: 'الخدمة',
      date: 'التاريخ',
      time: 'الوقت',
      duration: 'المدة',
      viewDashboard: 'عرض لوحة التحكم',
      backToHome: 'العودة إلى الصفحة الرئيسية',
      newReservation: 'حجز جديد',
      orSignInWithPassword: 'أو سجل الدخول بكلمة مرور',
      continue: 'متابعة',
      today: 'اليوم',
      selected: 'محدد',
      unavailable: 'غير متاح',
      availableSlots: 'المواعيد المتاحة',
      required: 'مطلوب',
      days: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
      months: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    },
    blog: {
      title: 'المدونة',
      subtitle: 'مدونتنا',
      description: 'اكتشف مقالاتنا ونصائحنا وتحليلاتنا حول التحول الرقمي وإدارة علاقات العملاء وتخطيط موارد المؤسسات والتسويق الرقمي.',
      searchPlaceholder: 'ابحث عن مقال...',
      allTags: 'الكل',
      readArticle: 'اقرأ المقال',
      shareOn: 'شارك على',
      shareOnFacebook: 'مشاركة على فيسبوك',
      shareOnLinkedIn: 'مشاركة على لينكد إن',
      relatedArticles: 'مقالات ذات صلة',
      tags: 'الوسوم',
      loading: 'جاري تحميل المقالات...',
      noArticles: 'لا توجد مقالات منشورة بعد.',
      noArticlesFound: 'لم يتم العثور على مقالات بهذه المعايير.',
      backToBlog: 'العودة للمدونة',
      views: 'مشاهدات',
      articleNotFound: 'المقال غير موجود',
      articleNotFoundDesc: 'عذرًا، هذا المقال غير موجود أو تم حذفه.',
      shareTitle: 'شارك هذا المقال',
      shareDesc: 'انقر لمشاركة هذا المقال مع شبكتك',
      didYouLike: 'هل أعجبك هذا المقال؟',
      shareWithNetwork: 'شاركه مع شبكتك!',
      linkCopied: 'تم نسخ الرابط إلى الحافظة!',
      loadingArticle: 'جاري تحميل المقال...',
    },
    caseStudiesPage: {
      hero: {
        badge: 'قصص نجاحنا',
        title: 'دراسات',
        subtitle: 'الحالة',
        description: 'اكتشف كيف قامت IMBT Consulting بتحويل الشركات من خلال حلول رقمية مبتكرة',
        back: 'رجوع',
      },
      sections: {
        context: 'السياق',
        challenges: 'التحديات',
        solution: 'الحل',
        results: 'النتائج',
        studyNumber: 'دراسة حالة #',
        ctaTitle: 'هل أنت مستعد لتحويل عملك؟',
        ctaDescription: 'اتصل بنا لمعرفة كيف يمكننا مساعدتك في تحقيق أهدافك',
        ctaButton: 'اطلب استشارة',
      },
      items: [
        {
          id: 1,
          title: "GRT Security - تنفيذ نظام ERP",
          subtitle: "التحول الرقمي لشركة أمن خاص",
          context: "شركة أمن خاص سريعة النمو تحتاج إلى تحسين كفاءتها التشغيلية.",
          challenges: [
            "أنظمة إدارة متعددة ومنفصلة",
            "صعوبات في مركزية المعلومات",
            "نقص الرؤية في الوقت الفعلي للأداء",
            "عمليات يدوية عرضة للأخطاء",
          ],
          solution: "قامت IMBT Consulting بنشر نظام ERP متكامل يتضمن إدارة الموارد البشرية، وتخطيط التدخلات، ووحدات الفوترة/المحاسبة، ولوحات معلومات التقارير في الوقت الفعلي.",
          results: [
            { metric: "30%", description: "تقليل الأخطاء الإدارية" },
            { metric: "كفاءة", description: "تحسين وقت التخطيط وإدارة الأفراد" },
            { metric: "رضا", description: "تحسين رضا العملاء من خلال إدارة أفضل" },
            { metric: "KPI", description: "تتبع دقيق مع تقارير في الوقت الفعلي" },
          ],
          testimonial: "لقد أدى التنفيذ إلى 'تحويل الطريقة التي ندير بها أعمالنا. لقد اكتسبنا الكفاءة والاستجابة، مع رؤية أفضل للأداء' مما سمح لنا بالتركيز على خدماتنا الأمنية الأساسية.",
        },
        {
          id: 2,
          title: "Oxygène Print - منصة التعاون الداخلي",
          subtitle: "تحسين التواصل بين الإدارات",
          context: "شركة طباعة واتصال مرئي تتطلب تحسين التواصل بين الإدارات مع توسع الفريق.",
          challenges: [
            "صوامع المعلومات بين الإدارات",
            "أدوات إدارة مشاريع مشتتة",
            "صعوبة تتبع التقدم في الوقت الفعلي",
            "ضعف التنسيق بين الفرق الإبداعية والإنتاج والخدمات اللوجستية",
          ],
          solution: "طورت IMBT Consulting منصة تعاون مخصصة مع إدارة مركزية للمشاريع، ومساحات تواصل في الوقت الفعلي، ومشاركة الملفات، وتخطيط متكامل.",
          results: [
            { metric: "25%", description: "زيادة الإنتاجية من خلال تنسيق أفضل للفريق" },
            { metric: "40%", description: "تقليل وقت إدارة المشاريع" },
            { metric: "تعاون", description: "تحسين التعاون بين الإدارات" },
            { metric: "وقت فعلي", description: "تتبع المهام في الوقت الفعلي مما يسمح بإدارة استباقية" },
          ],
          testimonial: "لقد أحدثت المنصة 'ثورة في طريقة عملنا. لقد اكتسبنا سلاسة وكفاءة، مع انعكاس التعاون المحسن في جودة الخدمة'.",
        },
        {
          id: 3,
          title: "Digitalisation.Services - تنفيذ نظام CRM",
          subtitle: "تحسين إدارة علاقات العملاء",
          context: "شركة استشارية في التحول الرقمي تحتاج إلى تحسين إدارة علاقات العملاء الداخلية رغم النمو السريع.",
          challenges: [
            "تتبع غير منظم لتفاعلات العملاء عبر قنوات مشتتة",
            "صعوبة في تحديد أولويات الفرص التجارية",
            "نقص الرؤية في خط أنابيب المبيعات",
            "عمليات إدارة مشاريع غير منظمة",
          ],
          solution: "نفذت IMBT Consulting نظام CRM مخصصاً مع تتبع مركزي لتفاعلات العملاء، وإدارة الفرص التجارية، وأدوات التعاون الداخلي، وأتمتة المهام، وتقارير الأداء.",
          results: [
            { metric: "40%", description: "تحسين إنتاجية المبيعات" },
            { metric: "35%", description: "تقليل وقت إدارة العملاء" },
            { metric: "رضا", description: "تحسين رضا العملاء من خلال تتبع دقيق" },
            { metric: "Pipeline", description: "زيادة الرؤية لخط أنابيب المبيعات لدعم القرارات الاستراتيجية" },
          ],
          testimonial: "لقد حول نظام CRM 'الطريقة التي ندير بها عملاءنا ومشاريعنا. لقد اكتسبنا الكفاءة ويمكننا تقديم تجربة أفضل للعملاء، وهو أمر أساسي للنمو'.",
        },
        {
          id: 4,
          title: "Cyris360 - تحسين التسويق الرقمي",
          subtitle: "استراتيجية متعددة القنوات للنمو عبر الإنترنت",
          context: "شركة حلول تكنولوجية متوسعة تفتقر إلى مناهج تسويقية متماسكة وقائمة على البيانات للنمو عبر الإنترنت.",
          challenges: [
            "غياب استراتيجية متعددة القنوات مع حملات مشتتة",
            "معدلات تحويل منخفضة رغم الاستثمار الإعلاني",
            "أدوات تحليلية محدودة",
            "رؤية منخفضة عبر الإنترنت",
          ],
          solution: "نشرت IMBT Consulting استراتيجية تسويق رقمي شاملة متعددة القنوات تتضمن تدقيق الحملات، وتحسين محركات البحث (SEO)، وإدارة الإعلانات المدفوعة، وإنشاء محتوى مخصص، وتنفيذ التحليلات، وأتمتة التسويق.",
          results: [
            { metric: "50%", description: "زيادة في العملاء المحتملين المؤهلين" },
            { metric: "35%", description: "تحسين معدلات التحويل" },
            { metric: "ROI", description: "زيادة في العائد على الاستثمار الإعلاني من خلال إدارة دقيقة للحملات" },
            { metric: "رؤية", description: "تعزيز الرؤية عبر الإنترنت مع وضع أفضل في محركات البحث" },
          ],
          testimonial: "سمحت لهم الاستراتيجية الرقمية بـ 'تعزيز التواجد عبر الإنترنت وتوليد نتائج ملموسة. تتبع الأداء في الوقت الفعلي يبقينا في دائرة المنافسة'.",
        },
      ],
    },
    admin: {
      dashboard: 'لوحة القيادة',
      manageReservationsDesc: 'إدارة الحجوزات والعملاء الخاصين بك',
      manageClients: 'إدارة العملاء',
      blogManagement: 'إدارة المدونة',
      statistics: 'الإحصائيات',
      settings: 'الإعدادات',
      totalReservations: 'إجمالي الحجوزات',
      activeClients: 'العملاء النشطون',
      confirmationRate: 'معدل التأكيد',
      averageDuration: 'متوسط المدة',
      totalRevenue: 'إجمالي الإيرادات',
      title: 'العنوان',
      author: 'الكاتب',
      views: 'المشاهدات',
      recentReservations: 'الحجوزات الأخيرة',
      client: 'العميل',
      service: 'الخدمة',
      dateTime: 'التاريخ والوقت',
      status: 'الحالة',
      actions: 'الإجراءات',
      viewDetails: 'عرض التفاصيل',
      confirm: 'تأكيد',
      cancel: 'إلغاء',
      noReservationsFound: 'لم يتم العثور على حجوزات',
      reservationDetails: 'تفاصيل الحجز',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      company: 'الشركة',
      date: 'التاريخ',
      time: 'الوقت',
      close: 'إغلاق',
      searchPlaceholder: 'بحث...',
      statusFilter: 'الحالة',
      allStatus: 'الكل',
      confirmedStatus: 'مؤكد',
      pendingStatus: 'قيد الانتظار',
      cancelledStatus: 'ملغى',
      viewSite: 'عرض الموقع',
      newArticle: 'مقال جديد',
      createPost: 'إنشاء مقال',
      editPost: 'تعديل المقال',
      deletePost: 'حذف المقال',
      confirmDelete: 'هل أنت متأكد من حذف هذا المقال؟',
      manageClientsTitle: 'إدارة العملاء',
      manageClientsDesc: 'إدارة قاعدة بيانات عملائك',
      newClient: 'عميل جديد',
      searchClientsPlaceholder: 'البحث بالاسم أو البريد الإلكتروني أو الشركة...',
      firstName: 'الاسم الأول',
      lastName: 'اللقب',
      confirmDeleteClient: 'هل أنت متأكد من حذف هذا العميل؟',
      create: 'إنشاء',
      update: 'تحديث',
      noClientsFound: 'لم يتم العثور على عملاء',
      pageOf: 'الصفحة {page} من {total}',
      clientDetails: 'تفاصيل العميل',
      editClient: 'تعديل العميل',
      addClient: 'إضافة عميل',
      position: 'المنصب',
      city: 'المدينة',
      country: 'البلد',
      address: 'العنوان',
      notes: 'ملاحظات',
      blogManagementTitle: 'إدارة المدونة',
      blogManagementDesc: 'إنشاء وإدارة مقالات مدونتك',
      totalArticles: 'إجمالي المقالات',
      published: 'المنشورة',
      drafts: 'المسودات',
      totalViews: 'إجمالي المشاهدات',
      basicInfo: 'معلومات أساسية',
      mainTitle: 'العنوان الرئيسي',
      subtitle: 'عنوان فرعي (اختياري)',
      slug: 'الرابط الثابت (Slug)',
      excerpt: 'مقتطف',
      featuredImage: 'الصورة البارزة (URL)',
      tags: 'العلامات',
      articleContent: 'محتوى المقال',
      addSection: 'قسم',
      addParagraph: 'فقرة',
      addList: 'قائمة',
      sectionTitle: 'عنوان القسم',
      listTitle: 'عنوان القائمة',
      listItemPlaceholder: 'عنصر القائمة...',
      save: 'حفظ',
      saving: 'جاري الحفظ...',
      successSave: 'تم حفظ المقال بنجاح',
      errorSave: 'خطأ في حفظ المقال',
      confirmDeletePost: 'هل أنت متأكد من حذف هذا المقال؟',
      articleSubtitlePlaceholder: 'اكتشف الاتجاهات الرئيسية...',
      articleTitlePlaceholder: 'أهم 5 اتجاهات...',
      articleSlugPlaceholder: 'اتجاهات-التحول-الرقمي-2025',
      articleExcerptPlaceholder: 'ملخص قصير سيظهر...',
      notPublished: 'غير منشور',
      statsTitle: 'الإحصائيات',
      statsDesc: 'نظرة عامة على نشاطك',
      thisWeek: 'هذا الأسبوع',
      thisMonth: 'هذا الشهر',
      perMonth: 'لكل شهر',
      popularServices: 'الخدمات الأكثر شعبية',
      monthlyEvolution: 'التطور الشهري',
      recentReservationsTitle: 'الحجوزات الأخيرة',
      topClients: 'أفضل العملاء',
      reservations: 'حجوزات',
      completedLabel: 'مكتملة',
      cancelledLabel: 'ملغاة',
      totalLabel: 'الإجمالي',
      upcoming: 'قادمة',
      settingsTitle: 'الإعدادات',
      settingsDesc: 'تكوين تطبيقك',
      saveSettings: 'حفظ',
      savingSettings: 'جاري الحفظ...',
      reset: 'إلغاء',
      successSettings: 'تم حفظ الإعدادات بنجاح',
      errorSettings: 'حدث خطأ أثناء الحفظ',
      generalSettings: 'الإعدادات العامة',
      notifications: 'التنبيهات',
      reservationsCategory: 'الحجوزات',
      securityNotice: 'ملاحظة أمنية',
      securityNoticeDesc: 'الإعدادات التي تحمل علامة "عام" يمكن الوصول إليها عبر واجهة برمجة التطبيقات العامة. تأكد من عدم عرض معلومات حساسة في هذه الإعدادات.',
      publicBadge: 'عام',
      enabled: 'مفعل',
      disabled: 'معطل',
    },
    contactPage: {
      title: 'اتصل بنا',
      subtitle: 'دعونا نتحدث عن',
      description: 'لديك أسئلة؟ اتصل بنا لمعرفة المزيد عن خدماتنا وكيف يمكننا مساعدتك.',
      info: {
        email: { title: "البريد الإلكتروني" },
        phone: { title: "الهاتف" },
        address: { title: "العنوان" },
        hours: { title: "ساعات العمل", value: "الاثنين-الجمعة: 9 صباحاً - 6 مساءً" },
      },
      form: {
        title: 'أرسل لنا رسالة',
        subtitle: 'سنرد عليك في غضون 24 ساعة',
        nameLabel: 'الاسم الكامل',
        emailLabel: 'البريد الإلكتروني',
        companyLabel: 'الشركة',
        subjectLabel: 'الموضوع',
        messageLabel: 'الرسالة',
        namePlaceholder: 'اسمك',
        emailPlaceholder: 'your@email.com',
        companyPlaceholder: 'شركتك',
        subjectPlaceholder: 'موضوع رسالتك',
        messagePlaceholder: 'صف مشروعك أو طلبك...',
        submitButton: 'إرسال الرسالة',
        submitting: 'جاري الإرسال...',
        successTitle: 'تم إرسال الرسالة!',
        successMessage: 'شكراً لرسالتك. سيتصل بك فريقنا قريباً جداً.',
        sendAnother: 'إرسال رسالة أخرى',
      },
    },
    errors: {
      somethingWrong: 'حدث خطأ ما',
      tryAgain: 'حاول مرة أخرى',
      notFound: 'الصفحة غير موجودة',
      unauthorized: 'غير مصرح',
      serverError: 'خطأ في الخادم',
    },
    privacyPolicy: {
      title: 'الخصوصية',
      subtitle: 'سياسة',
      description: 'خصوصيتك هي أولويتنا. اكتشف كيف نحمي ونستخدم بياناتك الشخصية.',
      protectionBadge: 'حماية البيانات',
      conformityBadge: 'متوافق مع GDPR',
      secureBadge: 'بيانات آمنة',
      transparencyBadge: 'شفافية كاملة',
      legalInfoTitle: 'معلومات قانونية',
      companyLabel: 'الشركة',
      managerLabel: 'المسؤول',
      addressLabel: 'العنوان',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'الهاتف',
      lastUpdateLabel: 'آخر تحديث',
      lastUpdateValue: '17 يوليو 2025',
      sections: [
        {
          title: "1. مسؤول معالجة البيانات",
          content: "IMBT Consulting هي الكيان المسؤول عن معالجة المعلومات الشخصية وفقاً للقانون التونسي رقم 2004-63 واللائحة العامة لحماية البيانات (GDPR) للاتحاد الأوروبي.",
        },
        {
          title: "2. جمع البيانات",
          content: "نحن نجمع المعلومات الضرورية بما في ذلك:",
          list: [
            "تفاصيل الهوية (الاسم، الشركة، المنصب)",
            "معلومات الاتصال (البريد الإلكتروني، الهاتف، العنوان)",
            "البيانات التقنية (عنوان IP، المتصفح، ملفات تعريف الارتباط)",
            "المعلومات المهنية (احتياجات الاستشارة، سجل الاتصال)",
          ],
        },
        {
          title: "3. أغراض المعالجة",
          content: "تستخدم البيانات من أجل:",
          list: [
            "الرد على طلبات الاتصال وعروض الأسعار",
            "تقديم خدمات الاستشارة والتطوير والتسويق الرقمي",
            "الإدارة الإدارية والتجارية",
            "الاتصالات المتعلقة بالخدمة (بموافقة)",
            "تحسين الموقع والخدمات",
          ],
        },
        {
          title: "4. الأساس القانوني",
          content: "تعتمد المعالجة على: الموافقة لاتصالات التسويق، تنفيذ العقد، الالتزامات القانونية والمصالح التجارية المشروعة.",
        },
        {
          title: "5. الاحتفاظ بالبيانات",
          content: "يتم الاحتفاظ بالمعلومات طوال مدة العلاقة التعاقدية، ولمدة تصل إلى 5 سنوات بعد الاتصال، أو لفترة أطول إذا كان ذلك مطلوباً قانوناً.",
        },
        {
          title: "6. مستلمو البيانات",
          content: "يمكن مشاركة المعلومات مع الموظفين والشركاء التقنيين والسلطات القانونية إذا لزم الأمر.",
        },
        {
          title: "7. الحقوق الفردية",
          content: "يمكن للمستخدمين الوصول إلى بياناتهم أو تصحيحها أو الاعتراض عليها أو حذفها أو نقلها أو سحب موافقتهم عليها.",
        },
        {
          title: "8. تدابير الأمن",
          content: "نحن ننفذ حماية تقنية وتنظيمية بما في ذلك التشفير والوصول المقيد.",
        },
        {
          title: "9. نقل البيانات الدولي",
          content: "تشمل التحويلات خارج تونس/الاتحاد الأوروبي ضمانات مناسبة عبر بنود تعاقدية وتقييمات كفاية الدولة.",
        },
        {
          title: "10. ملفات تعريف الارتباط (Cookies)",
          content: "يستخدم الموقع ملفات تعريف الارتباط للتحليلات والملاحة والتسويق، ويمكن إدارتها عبر إعدادات المتصفح.",
        },
        {
          title: "11. الشكاوى",
          content: "يمكن تقديم النزاعات إلى الهيئة الوطنية لحماية المعطيات الشخصية (INPDP) في تونس أو سلطات حماية البيانات المعنية في الاتحاد الأوروبي.",
        },
        {
          title: "12. تحديثات السياسة",
          content: "سيتم الإبلاغ عن التغييرات عبر الموقع الإلكتروني أو البريد الإلكتروني.",
        },
      ],
      ctaTitle: 'أسئلة حول بياناتك؟',
      ctaDescription: 'فريقنا متاح للإجابة على جميع أسئلتك المتعلقة بالخصوصية وحماية البيانات.',
      ctaButton: 'اتصل بنا',
    },
  },
}

export const languageNames: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
}
