import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { signToken, comparePassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Try to get user from users table first
    let result = await query(
      'SELECT id, email, password_hash, first_name, last_name, role, is_active FROM users WHERE email = $1',
      [email]
    )

    let userType: 'user' | 'client' = 'user'
    let user: any = null

    if (result.rows.length > 0) {
      // Found in users table
      user = result.rows[0]
      userType = 'user'
    } else {
      // Try clients table
      result = await query(
        'SELECT id, email, password_hash, first_name, last_name, is_active FROM clients WHERE email = $1',
        [email]
      )

      if (result.rows.length > 0) {
        user = result.rows[0]
        user.role = 'client' // Clients have 'client' role
        userType = 'client'
      }
    }

    // No user found in either table
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if password exists
    if (!user.password_hash) {
      return NextResponse.json(
        { error: 'No password set for this account. Please reset your password.' },
        { status: 401 }
      )
    }

    // Check if user is active
    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      )
    }

    // Verify password
    const isValid = await comparePassword(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Update last login in the appropriate table
    if (userType === 'user') {
      await query(
        'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      )
    } else {
      await query(
        'UPDATE clients SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
        [user.id]
      )
    }

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Return user data and token
    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
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
