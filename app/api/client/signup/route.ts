import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { hashPassword, signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, phone, company, position, city, country } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if client already exists
    const existing = await query('SELECT id FROM clients WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create client
    const result = await query(
      `INSERT INTO clients (email, password_hash, first_name, last_name, phone, company, position, city, country)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, email, first_name, last_name, phone, company, position, city, country, is_active, email_verified, created_at`,
      [email, passwordHash, firstName, lastName, phone, company, position, city, country || 'Tunisia']
    )

    const client = result.rows[0]

    // Generate token
    const token = signToken({
      userId: client.id,
      email: client.email,
      role: 'client',
    })

    return NextResponse.json({
      token,
      client: {
        id: client.id,
        email: client.email,
        firstName: client.first_name,
        lastName: client.last_name,
        phone: client.phone,
        company: client.company,
        position: client.position,
        city: client.city,
        country: client.country,
        isActive: client.is_active,
        emailVerified: client.email_verified,
        createdAt: client.created_at,
      },
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
