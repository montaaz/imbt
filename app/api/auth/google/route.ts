import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, firstName, lastName, emailVerified, googleId } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Check if client already exists
    const existingClient = await query(
      'SELECT id, email, first_name, last_name FROM clients WHERE email = $1',
      [email]
    )

    let clientId: number

    if (existingClient.rows.length > 0) {
      // Client exists, update last login
      clientId = existingClient.rows[0].id
      await query(
        'UPDATE clients SET last_login = CURRENT_TIMESTAMP, email_verified = $1 WHERE id = $2',
        [emailVerified, clientId]
      )
    } else {
      // Create new client (no password needed for Google auth)
      const newClient = await query(
        `INSERT INTO clients (first_name, last_name, email, email_verified)
         VALUES ($1, $2, $3, $4)
         RETURNING id`,
        [firstName, lastName, email, emailVerified]
      )
      clientId = newClient.rows[0].id
    }

    // Update last login
    await query(
      'UPDATE clients SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [clientId]
    )

    // Generate JWT token
    const token = signToken({
      userId: clientId,
      email: email,
      role: 'client',
    })

    return NextResponse.json({
      token,
      client: {
        id: clientId,
        email,
        firstName,
        lastName,
        emailVerified,
      },
    })
  } catch (error) {
    console.error('Google auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
