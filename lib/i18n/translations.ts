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
    }
    development: {
      title: string
      description: string
    }
    marketing: {
      title: string
      description: string
    }
    crm: {
      title: string
      description: string
    }
    erp: {
      title: string
      description: string
    }
    training: {
      title: string
      description: string
    }
  }

  // About Section
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
    email: string
    password: string
    firstName: string
    lastName: string
    phone: string
    company: string
    rememberMe: string
    forgotPassword: string
    noAccount: string
    createAccount: string
    alreadyHaveAccount: string
    invalidCredentials: string
    accountDeactivated: string
    passwordTooShort: string
    adminSpace: string
    clientSpace: string
    managerSpace: string
    allRolesSpace: string
    signInButton: string
    signUpButton: string
    signingIn: string
    signingUp: string
    confirmPassword: string
    passwordsMismatch: string
    minCharacters: string
    acceptTerms: string
    termsAndConditions: string
    privacyPolicy: string
    or: string
    joinIMBT: string
    demoAccountsAvailable: string
    administrator: string
    manager: string
    client: string
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
    manageReservations: string
    manageClients: string
    blogManagement: string
    statistics: string
    settings: string
    recentReservations: string
    viewSite: string
    newArticle: string
    createPost: string
    editPost: string
    deletePost: string
    confirmDelete: string
  }

  // Blog
  blog: {
    title: string
    subtitle: string
    readArticle: string
    shareOn: string
    relatedArticles: string
    tags: string
  }

  // Contact
  contactPage: {
    title: string
    subtitle: string
    name: string
    email: string
    subject: string
    message: string
    send: string
    address: string
    phone: string
    emailLabel: string
    hours: string
  }

  // Errors
  errors: {
    somethingWrong: string
    tryAgain: string
    notFound: string
    unauthorized: string
    serverError: string
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
      },
      development: {
        title: 'Développement Web & Applications',
        description: 'Nous créons des sites web performants et adaptés à votre activité avec des technologies de pointe.',
      },
      marketing: {
        title: 'Marketing Digital',
        description: 'Optimisation des campagnes digitales et stratégie marketing omnicanal pour une meilleure performance.',
      },
      crm: {
        title: 'CRM & Gestion Client',
        description: 'Implémentation de systèmes de gestion de la relation client pour optimiser votre acquisition et fidélisation.',
      },
      erp: {
        title: 'ERP & Gestion Intégrée',
        description: 'Mise en place de systèmes de gestion intégrés pour une meilleure efficacité opérationnelle.',
      },
      training: {
        title: 'Formations Digitales',
        description: 'Des programmes complets pour maîtriser les outils et technologies digitales, du débutant à l\'avancé.',
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
      manageReservations: 'Gérez vos réservations et clients',
      manageClients: 'Gestion des clients',
      blogManagement: 'Gestion du blog',
      statistics: 'Statistiques',
      settings: 'Paramètres',
      recentReservations: 'Réservations récentes',
      viewSite: 'Voir le site',
      newArticle: 'Nouvel Article',
      createPost: 'Créer un article',
      editPost: 'Modifier l\'article',
      deletePost: 'Supprimer l\'article',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet article ?',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Actualités et conseils en transformation digitale',
      readArticle: 'Lire l\'article',
      shareOn: 'Partager sur',
      relatedArticles: 'Articles similaires',
      tags: 'Tags',
    },
    contactPage: {
      title: 'Contactez-nous',
      subtitle: 'Nous sommes là pour répondre à vos questions',
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer',
      address: 'Adresse',
      phone: 'Téléphone',
      emailLabel: 'Email',
      hours: 'Horaires',
    },
    errors: {
      somethingWrong: 'Une erreur est survenue',
      tryAgain: 'Réessayer',
      notFound: 'Page non trouvée',
      unauthorized: 'Non autorisé',
      serverError: 'Erreur serveur',
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
      },
      development: {
        title: 'Web & Application Development',
        description: 'We create high-performance websites tailored to your business with cutting-edge technologies.',
      },
      marketing: {
        title: 'Digital Marketing',
        description: 'Optimization of digital campaigns and omnichannel marketing strategy for better performance.',
      },
      crm: {
        title: 'CRM & Customer Management',
        description: 'Implementation of customer relationship management systems to optimize your acquisition and retention.',
      },
      erp: {
        title: 'ERP & Integrated Management',
        description: 'Implementation of integrated management systems for better operational efficiency.',
      },
      training: {
        title: 'Digital Training',
        description: 'Comprehensive programs to master digital tools and technologies, from beginner to advanced.',
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
      manageReservations: 'Manage your reservations and clients',
      manageClients: 'Client management',
      blogManagement: 'Blog management',
      statistics: 'Statistics',
      settings: 'Settings',
      recentReservations: 'Recent reservations',
      viewSite: 'View site',
      newArticle: 'New Article',
      createPost: 'Create article',
      editPost: 'Edit article',
      deletePost: 'Delete article',
      confirmDelete: 'Are you sure you want to delete this article?',
    },
    blog: {
      title: 'Blog',
      subtitle: 'News and advice on digital transformation',
      readArticle: 'Read article',
      shareOn: 'Share on',
      relatedArticles: 'Related articles',
      tags: 'Tags',
    },
    contactPage: {
      title: 'Contact us',
      subtitle: 'We are here to answer your questions',
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send',
      address: 'Address',
      phone: 'Phone',
      emailLabel: 'Email',
      hours: 'Hours',
    },
    errors: {
      somethingWrong: 'Something went wrong',
      tryAgain: 'Try again',
      notFound: 'Page not found',
      unauthorized: 'Unauthorized',
      serverError: 'Server error',
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
      },
      development: {
        title: 'تطوير الويب والتطبيقات',
        description: 'نقوم بإنشاء مواقع ويب عالية الأداء مصممة خصيصًا لنشاطك التجاري بتقنيات متطورة.',
      },
      marketing: {
        title: 'التسويق الرقمي',
        description: 'تحسين الحملات الرقمية واستراتيجية التسويق متعددة القنوات لأداء أفضل.',
      },
      crm: {
        title: 'إدارة علاقات العملاء وإدارة العملاء',
        description: 'تطبيق أنظمة إدارة علاقات العملاء لتحسين الاستحواذ والاحتفاظ.',
      },
      erp: {
        title: 'أنظمة الإدارة المتكاملة',
        description: 'تطبيق أنظمة إدارة متكاملة لكفاءة تشغيلية أفضل.',
      },
      training: {
        title: 'التدريب الرقمي',
        description: 'برامج شاملة لإتقان الأدوات والتقنيات الرقمية، من المبتدئ إلى المتقدم.',
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
    admin: {
      dashboard: 'لوحة التحكم',
      manageReservations: 'إدارة حجوزاتك وعملائك',
      manageClients: 'إدارة العملاء',
      blogManagement: 'إدارة المدونة',
      statistics: 'الإحصائيات',
      settings: 'الإعدادات',
      recentReservations: 'الحجوزات الأخيرة',
      viewSite: 'عرض الموقع',
      newArticle: 'مقال جديد',
      createPost: 'إنشاء مقال',
      editPost: 'تعديل المقال',
      deletePost: 'حذف المقال',
      confirmDelete: 'هل أنت متأكد أنك تريد حذف هذا المقال؟',
    },
    blog: {
      title: 'المدونة',
      subtitle: 'أخبار ونصائح حول التحول الرقمي',
      readArticle: 'اقرأ المقال',
      shareOn: 'شارك على',
      relatedArticles: 'مقالات ذات صلة',
      tags: 'العلامات',
    },
    contactPage: {
      title: 'اتصل بنا',
      subtitle: 'نحن هنا للإجابة على أسئلتك',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'الرسالة',
      send: 'إرسال',
      address: 'العنوان',
      phone: 'الهاتف',
      emailLabel: 'البريد الإلكتروني',
      hours: 'ساعات العمل',
    },
    errors: {
      somethingWrong: 'حدث خطأ ما',
      tryAgain: 'حاول مرة أخرى',
      notFound: 'الصفحة غير موجودة',
      unauthorized: 'غير مصرح',
      serverError: 'خطأ في الخادم',
    },
  },
}

export const languageNames: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
  ar: 'العربية',
}
