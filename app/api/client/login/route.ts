import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { comparePassword, signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find client
    const result = await query(
      'SELECT * FROM clients WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const client = result.rows[0]

    // Check if client has a password (registered account)
    if (!client.password_hash) {
      return NextResponse.json(
        { error: 'Please complete signup first' },
        { status: 400 }
      )
    }

    // Verify password
    const valid = await comparePassword(password, client.password_hash)
    if (!valid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if account is active
    if (!client.is_active) {
      return NextResponse.json(
        { error: 'Account is inactive. Please contact support.' },
        { status: 403 }
      )
    }

    // Update last login
    await query('UPDATE clients SET last_login = CURRENT_TIMESTAMP WHERE id = $1', [client.id])

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
        lastLogin: new Date(),
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
