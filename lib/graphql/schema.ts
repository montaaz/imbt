export const typeDefs = `#graphql
  scalar DateTime

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: UserRole!
    isActive: Boolean!
    lastLogin: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    company: String
    position: String
    address: String
    city: String
    country: String!
    notes: String
    isActive: Boolean!
    emailVerified: Boolean!
    lastLogin: DateTime
    createdAt: DateTime!
    updatedAt: DateTime!
    reservations: [Reservation!]
    purchases: [Purchase!]
  }

  type Reservation {
    id: ID!
    clientId: ID
    clientName: String!
    clientEmail: String!
    clientPhone: String
    clientCompany: String
    service: ServiceType!
    serviceName: String!
    date: String!
    time: String!
    duration: Int!
    status: ReservationStatus!
    message: String
    adminNotes: String
    assignedTo: ID
    assignedUser: User
    createdAt: DateTime!
    updatedAt: DateTime!
    confirmedAt: DateTime
    cancelledAt: DateTime
    completedAt: DateTime
  }

  type Setting {
    id: ID!
    key: String!
    value: String
    category: String!
    description: String
    isPublic: Boolean!
    updatedBy: ID
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Stats {
    totalReservations: Int!
    pendingReservations: Int!
    confirmedReservations: Int!
    cancelledReservations: Int!
    completedReservations: Int!
    upcomingReservations: Int!
    reservationsLastWeek: Int!
    reservationsLastMonth: Int!
    totalClients: Int!
    activeClients: Int!
    newClientsThisMonth: Int!
  }

  type ServiceStats {
    service: ServiceType!
    serviceName: String!
    reservationCount: Int!
    completedCount: Int!
    avgDuration: Float
  }

  type Product {
    id: ID!
    name: String!
    description: String
    productType: ProductType!
    price: Float!
    currency: String!
    duration: Int
    isActive: Boolean!
    imageUrl: String
    features: [String!]
    metadata: String
    createdBy: ID
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Purchase {
    id: ID!
    clientId: ID!
    client: Client
    productId: ID
    product: Product
    productName: String!
    productType: ProductType!
    quantity: Int!
    unitPrice: Float!
    totalPrice: Float!
    currency: String!
    status: PurchaseStatus!
    paymentMethod: String
    transactionId: String
    trackingNumber: String
    notes: String
    adminNotes: String
    createdAt: DateTime!
    updatedAt: DateTime!
    paidAt: DateTime
    deliveredAt: DateTime
    cancelledAt: DateTime
    refundedAt: DateTime
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type ClientAuthPayload {
    token: String!
    client: Client!
  }

  enum UserRole {
    admin
    manager
    agent
  }

  enum ProductType {
    service
    formation
    consultation
    software
    other
  }

  enum PurchaseStatus {
    pending
    processing
    completed
    cancelled
    refunded
  }

  enum ServiceType {
    conseil_transformation_digitale
    developpement_web
    formations_digitales
    crm_gestion
    erp_gestion
    marketing_digital
  }

  enum ReservationStatus {
    pending
    confirmed
    cancelled
    completed
  }

  input ClientInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    company: String
    position: String
    address: String
    city: String
    country: String
    notes: String
  }

  input ReservationInput {
    clientName: String!
    clientEmail: String!
    clientPhone: String
    clientCompany: String
    service: ServiceType!
    serviceName: String!
    date: String!
    time: String!
    duration: Int
    message: String
  }

  input UpdateReservationInput {
    status: ReservationStatus
    adminNotes: String
    assignedTo: ID
    date: String
    time: String
  }

  input ProductInput {
    name: String!
    description: String
    productType: ProductType!
    price: Float!
    currency: String
    duration: Int
    isActive: Boolean
    imageUrl: String
    features: [String!]
    metadata: String
  }

  input PurchaseInput {
    clientId: ID!
    productId: ID
    productName: String!
    productType: ProductType!
    quantity: Int!
    unitPrice: Float!
    totalPrice: Float!
    currency: String
    paymentMethod: String
    notes: String
  }

  input UpdatePurchaseInput {
    status: PurchaseStatus
    trackingNumber: String
    adminNotes: String
    transactionId: String
  }

  input ClientSignupInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String
    company: String
    position: String
    city: String
    country: String
  }

  type Query {
    # Authentication
    me: User
    myProfile: Client

    # Users
    users: [User!]!
    user(id: ID!): User

    # Clients
    clients(limit: Int, offset: Int, search: String): [Client!]!
    client(id: ID!): Client
    clientByEmail(email: String!): Client

    # Reservations
    reservations(
      limit: Int
      offset: Int
      status: ReservationStatus
      service: ServiceType
      dateFrom: String
      dateTo: String
    ): [Reservation!]!
    reservation(id: ID!): Reservation
    upcomingReservations: [Reservation!]!
    myReservations: [Reservation!]!

    # Products
    products(limit: Int, offset: Int, type: ProductType, active: Boolean): [Product!]!
    product(id: ID!): Product
    activeProducts: [Product!]!

    # Purchases
    purchases(limit: Int, offset: Int, status: PurchaseStatus, clientId: ID): [Purchase!]!
    purchase(id: ID!): Purchase
    myPurchases: [Purchase!]!

    # Settings
    settings(category: String): [Setting!]!
    setting(key: String!): Setting
    publicSettings: [Setting!]!

    # Statistics
    stats: Stats!
    serviceStats: [ServiceStats!]!
  }

  type Mutation {
    # Admin Authentication
    login(email: String!, password: String!): AuthPayload!
    changePassword(currentPassword: String!, newPassword: String!): Boolean!

    # Client Authentication
    clientSignup(input: ClientSignupInput!): ClientAuthPayload!
    clientLogin(email: String!, password: String!): ClientAuthPayload!
    updateMyProfile(input: ClientInput!): Client!

    # Clients (Admin only)
    createClient(input: ClientInput!): Client!
    updateClient(id: ID!, input: ClientInput!): Client!
    deleteClient(id: ID!): Boolean!

    # Reservations
    createReservation(input: ReservationInput!): Reservation!
    updateReservation(id: ID!, input: UpdateReservationInput!): Reservation!
    confirmReservation(id: ID!): Reservation!
    cancelReservation(id: ID!, reason: String): Reservation!
    completeReservation(id: ID!): Reservation!
    deleteReservation(id: ID!): Boolean!

    # Products
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!

    # Purchases
    createPurchase(input: PurchaseInput!): Purchase!
    updatePurchase(id: ID!, input: UpdatePurchaseInput!): Purchase!
    deletePurchase(id: ID!): Boolean!

    # Settings
    updateSetting(key: String!, value: String!): Setting!
    createSetting(key: String!, value: String!, category: String!, description: String, isPublic: Boolean): Setting!
  }
`
