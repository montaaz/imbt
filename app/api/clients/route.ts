import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET all clients
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    // Get query parameters for pagination and search
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const offset = (page - 1) * limit

    // Build query with search
    let queryText = `
      SELECT id, first_name, last_name, email, phone, company, position,
             city, country, is_active, created_at, updated_at
      FROM clients
      WHERE 1=1
    `
    const queryParams: any[] = []
    let paramCount = 1

    if (search) {
      queryText += ` AND (
        first_name ILIKE $${paramCount} OR
        last_name ILIKE $${paramCount} OR
        email ILIKE $${paramCount} OR
        company ILIKE $${paramCount}
      )`
      queryParams.push(`%${search}%`)
      paramCount++
    }

    // Get total count
    const countResult = await query(
      queryText.replace('SELECT id, first_name, last_name, email, phone, company, position, city, country, is_active, created_at, updated_at', 'SELECT COUNT(*)')
        .replace(`LIMIT $${paramCount} OFFSET $${paramCount + 1}`, ''),
      queryParams
    )
    const total = parseInt(countResult.rows[0].count)

    // Get paginated results
    queryText += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`
    queryParams.push(limit, offset)

    const result = await query(queryText, queryParams)

    return NextResponse.json({
      clients: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des clients' }, { status: 500 })
  }
}

// POST new client
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const body = await request.json()
    const { firstName, lastName, email, phone, company, position, address, city, country, notes } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: 'Prénom, nom et email sont requis' }, { status: 400 })
    }

    // Check if email already exists
    const existingClient = await query('SELECT id FROM clients WHERE email = $1', [email])
    if (existingClient.rows.length > 0) {
      return NextResponse.json({ error: 'Un client avec cet email existe déjà' }, { status: 400 })
    }

    // Insert new client
    const result = await query(
      `INSERT INTO clients (first_name, last_name, email, phone, company, position, address, city, country, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [firstName, lastName, email, phone || null, company || null, position || null, address || null, city || null, country || 'Tunisia', notes || null]
    )

    return NextResponse.json({ client: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du client' }, { status: 500 })
  }
}

// PUT update client
export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const body = await request.json()
    const { id, firstName, lastName, email, phone, company, position, address, city, country, notes, isActive } = body

    // Validate required fields
    if (!id || !firstName || !lastName || !email) {
      return NextResponse.json({ error: 'ID, prénom, nom et email sont requis' }, { status: 400 })
    }

    // Check if email is used by another client
    const existingClient = await query('SELECT id FROM clients WHERE email = $1 AND id != $2', [email, id])
    if (existingClient.rows.length > 0) {
      return NextResponse.json({ error: 'Un autre client utilise déjà cet email' }, { status: 400 })
    }

    // Update client
    const result = await query(
      `UPDATE clients
       SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5,
           position = $6, address = $7, city = $8, country = $9, notes = $10, is_active = $11
       WHERE id = $12
       RETURNING *`,
      [firstName, lastName, email, phone, company, position, address, city, country, notes, isActive !== undefined ? isActive : true, id]
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ client: result.rows[0] })
  } catch (error) {
    console.error('Error updating client:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du client' }, { status: 500 })
  }
}

// DELETE client
export async function DELETE(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID du client requis' }, { status: 400 })
    }

    // Delete client (this will also delete related reservations due to CASCADE)
    const result = await query('DELETE FROM clients WHERE id = $1 RETURNING id', [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Client supprimé avec succès' })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression du client' }, { status: 500 })
  }
}
