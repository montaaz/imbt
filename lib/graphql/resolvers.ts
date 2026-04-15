import { query } from '@/lib/db'
import { hashPassword, comparePassword, signToken, JWTPayload } from '@/lib/auth'
import { GraphQLError } from 'graphql'

interface Context {
  user?: JWTPayload & { userType: 'admin' | 'client' }
}

// Helper function to require authentication
function requireAuth(context: Context) {
  if (!context.user) {
    throw new GraphQLError('Not authenticated', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }
  return context.user
}

// Helper function to require admin role
function requireAdmin(context: Context) {
  const user = requireAuth(context)
  if (user.userType !== 'admin') {
    throw new GraphQLError('Admin access required', {
      extensions: { code: 'FORBIDDEN' },
    })
  }
  return user
}

export const resolvers = {
  Query: {
    // Admin authentication
    me: async (_: any, __: any, context: Context) => {
      const user = requireAdmin(context)
      const result = await query(
        'SELECT id, email, first_name, last_name, role, is_active, last_login, created_at, updated_at FROM users WHERE id = $1',
        [user.userId]
      )
      if (result.rows.length === 0) return null
      const row = result.rows[0]
      return {
        id: row.id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        role: row.role,
        isActive: row.is_active,
        lastLogin: row.last_login,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    // Client authentication
    myProfile: async (_: any, __: any, context: Context) => {
      const user = requireAuth(context)
      if (user.userType !== 'client') {
        throw new GraphQLError('Client access required', {
          extensions: { code: 'FORBIDDEN' },
        })
      }
      const result = await query(
        'SELECT * FROM clients WHERE id = $1',
        [user.userId]
      )
      if (result.rows.length === 0) return null
      const row = result.rows[0]
      return {
        id: row.id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        phone: row.phone,
        company: row.company,
        position: row.position,
        address: row.address,
        city: row.city,
        country: row.country,
        notes: row.notes,
        isActive: row.is_active,
        emailVerified: row.email_verified,
        lastLogin: row.last_login,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    // My reservations (for logged-in client)
    myReservations: async (_: any, __: any, context: Context) => {
      const user = requireAuth(context)
      if (user.userType !== 'client') {
        throw new GraphQLError('Client access required', {
          extensions: { code: 'FORBIDDEN' },
        })
      }
      const result = await query(
        `SELECT * FROM reservations WHERE client_id = $1 ORDER BY date DESC, time DESC`,
        [user.userId]
      )
      return result.rows.map((row: any) => ({
        id: row.id,
        clientId: row.client_id,
        clientName: row.client_name,
        clientEmail: row.client_email,
        clientPhone: row.client_phone,
        clientCompany: row.client_company,
        service: row.service,
        serviceName: row.service_name,
        date: row.date,
        time: row.time,
        duration: row.duration,
        status: row.status,
        message: row.message,
        adminNotes: row.admin_notes,
        assignedTo: row.assigned_to,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        confirmedAt: row.confirmed_at,
        cancelledAt: row.cancelled_at,
        completedAt: row.completed_at,
      }))
    },

    // Products
    products: async (_: any, { limit = 50, offset = 0, type, active }: any) => {
      let sql = 'SELECT * FROM products WHERE 1=1'
      const params: any[] = []
      let paramCount = 0

      if (type !== undefined) {
        paramCount++
        sql += ` AND product_type = $${paramCount}`
        params.push(type)
      }
      if (active !== undefined) {
        paramCount++
        sql += ` AND is_active = $${paramCount}`
        params.push(active)
      }

      sql += ' ORDER BY created_at DESC'

      paramCount++
      sql += ` LIMIT $${paramCount}`
      params.push(limit)

      paramCount++
      sql += ` OFFSET $${paramCount}`
      params.push(offset)

      const result = await query(sql, params)
      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        productType: row.product_type,
        price: parseFloat(row.price),
        currency: row.currency,
        duration: row.duration,
        isActive: row.is_active,
        imageUrl: row.image_url,
        features: row.features || [],
        metadata: row.metadata ? JSON.stringify(row.metadata) : null,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }))
    },

    product: async (_: any, { id }: any) => {
      const result = await query('SELECT * FROM products WHERE id = $1', [id])
      if (result.rows.length === 0) return null
      const row = result.rows[0]
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        productType: row.product_type,
        price: parseFloat(row.price),
        currency: row.currency,
        duration: row.duration,
        isActive: row.is_active,
        imageUrl: row.image_url,
        features: row.features || [],
        metadata: row.metadata ? JSON.stringify(row.metadata) : null,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    activeProducts: async () => {
      const result = await query(
        'SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC'
      )
      return result.rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        productType: row.product_type,
        price: parseFloat(row.price),
        currency: row.currency,
        duration: row.duration,
        isActive: row.is_active,
        imageUrl: row.image_url,
        features: row.features || [],
        metadata: row.metadata ? JSON.stringify(row.metadata) : null,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }))
    },

    // Purchases
    purchases: async (_: any, { limit = 50, offset = 0, status, clientId }: any, context: Context) => {
      requireAdmin(context)
      let sql = 'SELECT * FROM purchases WHERE 1=1'
      const params: any[] = []
      let paramCount = 0

      if (status !== undefined) {
        paramCount++
        sql += ` AND status = $${paramCount}`
        params.push(status)
      }
      if (clientId !== undefined) {
        paramCount++
        sql += ` AND client_id = $${paramCount}`
        params.push(clientId)
      }

      sql += ' ORDER BY created_at DESC'

      paramCount++
      sql += ` LIMIT $${paramCount}`
      params.push(limit)

      paramCount++
      sql += ` OFFSET $${paramCount}`
      params.push(offset)

      const result = await query(sql, params)
      return result.rows.map((row: any) => ({
        id: row.id,
        clientId: row.client_id,
        productId: row.product_id,
        productName: row.product_name,
        productType: row.product_type,
        quantity: row.quantity,
        unitPrice: parseFloat(row.unit_price),
        totalPrice: parseFloat(row.total_price),
        currency: row.currency,
        status: row.status,
        paymentMethod: row.payment_method,
        transactionId: row.transaction_id,
        trackingNumber: row.tracking_number,
        notes: row.notes,
        adminNotes: row.admin_notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        paidAt: row.paid_at,
        deliveredAt: row.delivered_at,
        cancelledAt: row.cancelled_at,
        refundedAt: row.refunded_at,
      }))
    },

    purchase: async (_: any, { id }: any, context: Context) => {
      requireAuth(context)
      const result = await query('SELECT * FROM purchases WHERE id = $1', [id])
      if (result.rows.length === 0) return null
      const row = result.rows[0]

      // Check if user has access to this purchase
      if (context.user!.userType === 'client' && row.client_id !== context.user!.userId) {
        throw new GraphQLError('Access denied', {
          extensions: { code: 'FORBIDDEN' },
        })
      }

      return {
        id: row.id,
        clientId: row.client_id,
        productId: row.product_id,
        productName: row.product_name,
        productType: row.product_type,
        quantity: row.quantity,
        unitPrice: parseFloat(row.unit_price),
        totalPrice: parseFloat(row.total_price),
        currency: row.currency,
        status: row.status,
        paymentMethod: row.payment_method,
        transactionId: row.transaction_id,
        trackingNumber: row.tracking_number,
        notes: row.notes,
        adminNotes: row.admin_notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        paidAt: row.paid_at,
        deliveredAt: row.delivered_at,
        cancelledAt: row.cancelled_at,
        refundedAt: row.refunded_at,
      }
    },

    myPurchases: async (_: any, __: any, context: Context) => {
      const user = requireAuth(context)
      if (user.userType !== 'client') {
        throw new GraphQLError('Client access required', {
          extensions: { code: 'FORBIDDEN' },
        })
      }
      const result = await query(
        'SELECT * FROM purchases WHERE client_id = $1 ORDER BY created_at DESC',
        [user.userId]
      )
      return result.rows.map((row: any) => ({
        id: row.id,
        clientId: row.client_id,
        productId: row.product_id,
        productName: row.product_name,
        productType: row.product_type,
        quantity: row.quantity,
        unitPrice: parseFloat(row.unit_price),
        totalPrice: parseFloat(row.total_price),
        currency: row.currency,
        status: row.status,
        paymentMethod: row.payment_method,
        transactionId: row.transaction_id,
        trackingNumber: row.tracking_number,
        notes: row.notes,
        adminNotes: row.admin_notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        paidAt: row.paid_at,
        deliveredAt: row.delivered_at,
        cancelledAt: row.cancelled_at,
        refundedAt: row.refunded_at,
      }))
    },
  },

  Mutation: {
    // Client signup
    clientSignup: async (_: any, { input }: any) => {
      const { email, password, firstName, lastName, phone, company, position, city, country } = input

      // Check if client already exists
      const existing = await query('SELECT id FROM clients WHERE email = $1', [email])
      if (existing.rows.length > 0) {
        throw new GraphQLError('Email already registered', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      // Hash password
      const passwordHash = await hashPassword(password)

      // Create client
      const result = await query(
        `INSERT INTO clients (email, password_hash, first_name, last_name, phone, company, position, city, country)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [email, passwordHash, firstName, lastName, phone, company, position, city, country || 'Tunisia']
      )

      const client = result.rows[0]

      // Generate token
      const token = signToken({
        userId: client.id,
        email: client.email,
        role: 'client',
      })

      return {
        token,
        client: {
          id: client.id,
          email: client.email,
          firstName: client.first_name,
          lastName: client.last_name,
          phone: client.phone,
          company: client.company,
          position: client.position,
          address: client.address,
          city: client.city,
          country: client.country,
          notes: client.notes,
          isActive: client.is_active,
          emailVerified: client.email_verified,
          lastLogin: client.last_login,
          createdAt: client.created_at,
          updatedAt: client.updated_at,
        },
      }
    },

    // Client login
    clientLogin: async (_: any, { email, password }: any) => {
      const result = await query(
        'SELECT * FROM clients WHERE email = $1',
        [email]
      )

      if (result.rows.length === 0) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }

      const client = result.rows[0]

      if (!client.password_hash) {
        throw new GraphQLError('Please complete signup first', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }

      const valid = await comparePassword(password, client.password_hash)
      if (!valid) {
        throw new GraphQLError('Invalid credentials', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      }

      if (!client.is_active) {
        throw new GraphQLError('Account is inactive', {
          extensions: { code: 'FORBIDDEN' },
        })
      }

      // Update last login
      await query('UPDATE clients SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [client.id])

      // Generate token
      const token = signToken({
        userId: client.id,
        email: client.email,
        role: 'client',
      })

      return {
        token,
        client: {
          id: client.id,
          email: client.email,
          firstName: client.first_name,
          lastName: client.last_name,
          phone: client.phone,
          company: client.company,
          position: client.position,
          address: client.address,
          city: client.city,
          country: client.country,
          notes: client.notes,
          isActive: client.is_active,
          emailVerified: client.email_verified,
          lastLogin: new Date(),
          createdAt: client.created_at,
          updatedAt: client.updated_at,
        },
      }
    },

    // Update client profile
    updateMyProfile: async (_: any, { input }: any, context: Context) => {
      const user = requireAuth(context)
      if (user.userType !== 'client') {
        throw new GraphQLError('Client access required', {
          extensions: { code: 'FORBIDDEN' },
        })
      }

      const { firstName, lastName, phone, company, position, address, city, country } = input

      const result = await query(
        `UPDATE clients SET
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          phone = COALESCE($3, phone),
          company = COALESCE($4, company),
          position = COALESCE($5, position),
          address = COALESCE($6, address),
          city = COALESCE($7, city),
          country = COALESCE($8, country)
         WHERE id = $9
         RETURNING *`,
        [firstName, lastName, phone, company, position, address, city, country, user.userId]
      )

      const client = result.rows[0]
      return {
        id: client.id,
        email: client.email,
        firstName: client.first_name,
        lastName: client.last_name,
        phone: client.phone,
        company: client.company,
        position: client.position,
        address: client.address,
        city: client.city,
        country: client.country,
        notes: client.notes,
        isActive: client.is_active,
        emailVerified: client.email_verified,
        lastLogin: client.last_login,
        createdAt: client.created_at,
        updatedAt: client.updated_at,
      }
    },

    // Create product (admin only)
    createProduct: async (_: any, { input }: any, context: Context) => {
      const user = requireAdmin(context)

      const { name, description, productType, price, currency, duration, isActive, imageUrl, features, metadata } = input

      const result = await query(
        `INSERT INTO products (name, description, product_type, price, currency, duration, is_active, image_url, features, metadata, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING *`,
        [
          name,
          description,
          productType,
          price,
          currency || 'TND',
          duration,
          isActive !== undefined ? isActive : true,
          imageUrl,
          features ? JSON.stringify(features) : null,
          metadata,
          user.userId,
        ]
      )

      const product = result.rows[0]
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        productType: product.product_type,
        price: parseFloat(product.price),
        currency: product.currency,
        duration: product.duration,
        isActive: product.is_active,
        imageUrl: product.image_url,
        features: product.features || [],
        metadata: product.metadata ? JSON.stringify(product.metadata) : null,
        createdBy: product.created_by,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      }
    },

    // Create purchase
    createPurchase: async (_: any, { input }: any, context: Context) => {
      requireAuth(context)

      const { clientId, productId, productName, productType, quantity, unitPrice, totalPrice, currency, paymentMethod, notes } = input

      const result = await query(
        `INSERT INTO purchases (client_id, product_id, product_name, product_type, quantity, unit_price, total_price, currency, payment_method, notes)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [clientId, productId, productName, productType, quantity, unitPrice, totalPrice, currency || 'TND', paymentMethod, notes]
      )

      const purchase = result.rows[0]
      return {
        id: purchase.id,
        clientId: purchase.client_id,
        productId: purchase.product_id,
        productName: purchase.product_name,
        productType: purchase.product_type,
        quantity: purchase.quantity,
        unitPrice: parseFloat(purchase.unit_price),
        totalPrice: parseFloat(purchase.total_price),
        currency: purchase.currency,
        status: purchase.status,
        paymentMethod: purchase.payment_method,
        transactionId: purchase.transaction_id,
        trackingNumber: purchase.tracking_number,
        notes: purchase.notes,
        adminNotes: purchase.admin_notes,
        createdAt: purchase.created_at,
        updatedAt: purchase.updated_at,
        paidAt: purchase.paid_at,
        deliveredAt: purchase.delivered_at,
        cancelledAt: purchase.cancelled_at,
        refundedAt: purchase.refunded_at,
      }
    },

    // Update purchase (admin only)
    updatePurchase: async (_: any, { id, input }: any, context: Context) => {
      requireAdmin(context)

      const { status, trackingNumber, adminNotes, transactionId } = input

      const result = await query(
        `UPDATE purchases SET
          status = COALESCE($1, status),
          tracking_number = COALESCE($2, tracking_number),
          admin_notes = COALESCE($3, admin_notes),
          transaction_id = COALESCE($4, transaction_id)
         WHERE id = $5
         RETURNING *`,
        [status, trackingNumber, adminNotes, transactionId, id]
      )

      if (result.rows.length === 0) {
        throw new GraphQLError('Purchase not found', {
          extensions: { code: 'NOT_FOUND' },
        })
      }

      const purchase = result.rows[0]
      return {
        id: purchase.id,
        clientId: purchase.client_id,
        productId: purchase.product_id,
        productName: purchase.product_name,
        productType: purchase.product_type,
        quantity: purchase.quantity,
        unitPrice: parseFloat(purchase.unit_price),
        totalPrice: parseFloat(purchase.total_price),
        currency: purchase.currency,
        status: purchase.status,
        paymentMethod: purchase.payment_method,
        transactionId: purchase.transaction_id,
        trackingNumber: purchase.tracking_number,
        notes: purchase.notes,
        adminNotes: purchase.admin_notes,
        createdAt: purchase.created_at,
        updatedAt: purchase.updated_at,
        paidAt: purchase.paid_at,
        deliveredAt: purchase.delivered_at,
        cancelledAt: purchase.cancelled_at,
        refundedAt: purchase.refunded_at,
      }
    },
  },

  // Field resolvers
  Client: {
    reservations: async (parent: any) => {
      const result = await query(
        'SELECT * FROM reservations WHERE client_id = $1 ORDER BY date DESC',
        [parent.id]
      )
      return result.rows.map((row: any) => ({
        id: row.id,
        clientId: row.client_id,
        clientName: row.client_name,
        clientEmail: row.client_email,
        clientPhone: row.client_phone,
        clientCompany: row.client_company,
        service: row.service,
        serviceName: row.service_name,
        date: row.date,
        time: row.time,
        duration: row.duration,
        status: row.status,
        message: row.message,
        adminNotes: row.admin_notes,
        assignedTo: row.assigned_to,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        confirmedAt: row.confirmed_at,
        cancelledAt: row.cancelled_at,
        completedAt: row.completed_at,
      }))
    },

    purchases: async (parent: any) => {
      const result = await query(
        'SELECT * FROM purchases WHERE client_id = $1 ORDER BY created_at DESC',
        [parent.id]
      )
      return result.rows.map((row: any) => ({
        id: row.id,
        clientId: row.client_id,
        productId: row.product_id,
        productName: row.product_name,
        productType: row.product_type,
        quantity: row.quantity,
        unitPrice: parseFloat(row.unit_price),
        totalPrice: parseFloat(row.total_price),
        currency: row.currency,
        status: row.status,
        paymentMethod: row.payment_method,
        transactionId: row.transaction_id,
        trackingNumber: row.tracking_number,
        notes: row.notes,
        adminNotes: row.admin_notes,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        paidAt: row.paid_at,
        deliveredAt: row.delivered_at,
        cancelledAt: row.cancelled_at,
        refundedAt: row.refunded_at,
      }))
    },
  },

  Purchase: {
    client: async (parent: any) => {
      const result = await query('SELECT * FROM clients WHERE id = $1', [parent.clientId])
      if (result.rows.length === 0) return null
      const row = result.rows[0]
      return {
        id: row.id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        phone: row.phone,
        company: row.company,
        position: row.position,
        address: row.address,
        city: row.city,
        country: row.country,
        notes: row.notes,
        isActive: row.is_active,
        emailVerified: row.email_verified,
        lastLogin: row.last_login,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    product: async (parent: any) => {
      if (!parent.productId) return null
      const result = await query('SELECT * FROM products WHERE id = $1', [parent.productId])
      if (result.rows.length === 0) return null
      const row = result.rows[0]
      return {
        id: row.id,
        name: row.name,
        description: row.description,
        productType: row.product_type,
        price: parseFloat(row.price),
        currency: row.currency,
        duration: row.duration,
        isActive: row.is_active,
        imageUrl: row.image_url,
        features: row.features || [],
        metadata: row.metadata ? JSON.stringify(row.metadata) : null,
        createdBy: row.created_by,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },
  },
}
