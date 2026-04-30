import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { hashPassword, signToken } from '@/lib/auth'

// Map service IDs to database enum values
const SERVICE_TYPE_MAP: Record<string, string> = {
  'transformation': 'conseil_transformation_digitale',
  'developpement': 'developpement_web',
  'formation': 'formations_digitales',
  'crm': 'crm_gestion',
  'erp': 'erp_gestion',
  'marketing': 'marketing_digital',
  // Also support full service IDs for compatibility
  'conseil-transformation-digitale': 'conseil_transformation_digitale',
  'developpement-gestion-it': 'developpement_web',
  'formations-digitales': 'formations_digitales',
  'crm-gestion-relation-client': 'crm_gestion',
  'erp-gestion-integree': 'erp_gestion',
  'marketing-digital': 'marketing_digital'
}

// POST new reservation (public endpoint - no authentication required)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { service, date, time, firstName, lastName, email, phone, company, message, password } = body

    // Validate required fields
    if (!service || !date || !time || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Service, date, heure, prénom, nom et email sont requis' },
        { status: 400 }
      )
    }

    // Validate password if provided
    if (password && password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    // Map service ID to database enum value
    const serviceType = SERVICE_TYPE_MAP[service]
    if (!serviceType) {
      return NextResponse.json(
        { error: 'Type de service invalide' },
        { status: 400 }
      )
    }

    // Get service name from the service ID
    const serviceNames: Record<string, string> = {
      'transformation': 'Transformation Digitale',
      'developpement': 'Développement Web',
      'formation': 'Formation',
      'crm': 'CRM - Gestion de la Relation Client',
      'erp': 'ERP - Gestion Intégrée',
      'marketing': 'Marketing Digital',
      // Also support full service IDs for compatibility
      'conseil-transformation-digitale': 'Conseil en Transformation Digitale',
      'developpement-gestion-it': 'Développement Web & Applications',
      'formations-digitales': 'Formations Digitales',
      'crm-gestion-relation-client': 'CRM - Gestion de la Relation Client',
      'erp-gestion-integree': 'ERP - Gestion Intégrée',
      'marketing-digital': 'Marketing Digital'
    }
    const serviceName = serviceNames[service]

    // Get duration based on service (default 30 minutes)
    const durations: Record<string, number> = {
      'transformation': 30,
      'developpement': 30,
      'formation': 30,
      'crm': 30,
      'erp': 30,
      'marketing': 30,
      // Also support full service IDs for compatibility
      'conseil-transformation-digitale': 90,
      'developpement-gestion-it': 60,
      'formations-digitales': 120,
      'crm-gestion-relation-client': 60,
      'erp-gestion-integree': 60,
      'marketing-digital': 60
    }
    const duration = durations[service] || 30

    // Start transaction
    try {
      // Check if client already exists
      const existingClient = await query(
        'SELECT id, password_hash FROM clients WHERE email = $1',
        [email]
      )

      let clientId: number
      let token: string | null = null
      let isNewAccount = false

      if (existingClient.rows.length > 0) {
        // Client exists, use existing ID
        clientId = existingClient.rows[0].id
        const hasPassword = existingClient.rows[0].password_hash

        // Update client information
        if (password && !hasPassword) {
          // Client didn't have password before, add it now
          const passwordHash = await hashPassword(password)
          await query(
            `UPDATE clients
             SET first_name = $1, last_name = $2, phone = $3, company = $4, password_hash = $5, updated_at = CURRENT_TIMESTAMP
             WHERE id = $6`,
            [firstName, lastName, phone || null, company || null, passwordHash, clientId]
          )

          // Generate token for new account
          token = signToken({
            userId: clientId,
            email: email,
            role: 'client',
          })
          isNewAccount = true
        } else {
          // Just update basic info
          await query(
            `UPDATE clients
             SET first_name = $1, last_name = $2, phone = $3, company = $4, updated_at = CURRENT_TIMESTAMP
             WHERE id = $5`,
            [firstName, lastName, phone || null, company || null, clientId]
          )
        }
      } else {
        // Create new client
        if (password) {
          // Hash password if provided
          const passwordHash = await hashPassword(password)
          const newClient = await query(
            `INSERT INTO clients (first_name, last_name, email, phone, company, password_hash)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [firstName, lastName, email, phone || null, company || null, passwordHash]
          )
          clientId = newClient.rows[0].id

          // Generate token for new account
          token = signToken({
            userId: clientId,
            email: email,
            role: 'client',
          })
          isNewAccount = true
        } else {
          // Create without password
          const newClient = await query(
            `INSERT INTO clients (first_name, last_name, email, phone, company)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id`,
            [firstName, lastName, email, phone || null, company || null]
          )
          clientId = newClient.rows[0].id
        }
      }

      // Create reservation
      const clientName = `${firstName} ${lastName}`
      const reservation = await query(
        `INSERT INTO reservations (
          client_id, client_name, client_email, client_phone, client_company,
          service, service_name, date, time, duration, status, message
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *`,
        [
          clientId,
          clientName,
          email,
          phone || null,
          company || null,
          serviceType,
          serviceName,
          date,
          time,
          duration,
          'pending',
          message || null
        ]
      )

      const response: any = {
        message: 'Réservation créée avec succès',
        reservation: reservation.rows[0],
        clientId
      }

      // Add token if account was created/updated with password
      if (token) {
        response.token = token
        response.isNewAccount = isNewAccount
      }

      return NextResponse.json(response, { status: 201 })
    } catch (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }
  } catch (error) {
    console.error('Error creating reservation:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la réservation' },
      { status: 500 }
    )
  }
}

// GET all reservations (requires authentication - for admin panel)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const isAvailabilityCheck = searchParams.get('availability') === 'true'
    const date = searchParams.get('date')

    if (isAvailabilityCheck) {
      if (!date) {
        return NextResponse.json({ error: 'Date requise' }, { status: 400 })
      }
      const result = await query(
        'SELECT time FROM reservations WHERE date = $1 AND status != $2',
        [date, 'cancelled']
      )
      return NextResponse.json({
        bookedSlots: result.rows.map(r => {
          // Normalize time format to HH:mm
          const time = r.time;
          return typeof time === 'string' && time.includes(':') 
            ? time.split(':').slice(0, 2).join(':') 
            : time;
        })
      })
    }

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status') || ''
    const search = searchParams.get('search') || ''
    const offset = (page - 1) * limit

    // Build query
    let queryText = `
      SELECT r.*, c.first_name as client_first_name, c.last_name as client_last_name
      FROM reservations r
      LEFT JOIN clients c ON r.client_id = c.id
      WHERE 1=1
    `
    const queryParams: any[] = []
    let paramCount = 1

    if (status) {
      queryText += ` AND r.status = $${paramCount}`
      queryParams.push(status)
      paramCount++
    }

    if (search) {
      queryText += ` AND (
        r.client_name ILIKE $${paramCount} OR
        r.client_email ILIKE $${paramCount} OR
        r.client_company ILIKE $${paramCount}
      )`
      queryParams.push(`%${search}%`)
      paramCount++
    }

    // Get total count
    const countResult = await query(
      queryText.replace(
        'SELECT r.*, c.first_name as client_first_name, c.last_name as client_last_name',
        'SELECT COUNT(*)'
      ),
      queryParams
    )
    const total = parseInt(countResult.rows[0].count)

    // Get paginated results
    queryText += ` ORDER BY r.date DESC, r.time DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`
    queryParams.push(limit, offset)

    const result = await query(queryText, queryParams)

    return NextResponse.json({
      reservations: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des réservations' },
      { status: 500 }
    )
  }
}
