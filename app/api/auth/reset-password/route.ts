import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { query } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

interface ResetTokenRow {
  id: number
  account_type: 'user' | 'client'
  account_id: number
}

async function findValidToken(token: string): Promise<ResetTokenRow | null> {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

  const result = await query<ResetTokenRow>(
    `SELECT id, account_type, account_id
       FROM password_reset_tokens
      WHERE token_hash = $1
        AND used_at IS NULL
        AND expires_at > NOW()`,
    [tokenHash]
  )

  return result.rows[0] ?? null
}

/** Lets the reset page tell a valid link from an expired one before showing the form. */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.json({ valid: false }, { status: 400 })
  }

  try {
    const row = await findValidToken(token)
    return NextResponse.json({ valid: !!row })
  } catch (error) {
    // Treat any lookup failure as an invalid link so the page shows the
    // "request a new link" path instead of an error screen.
    console.error('Reset token validation error:', error)
    return NextResponse.json({ valid: false })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ error: 'Token et mot de passe requis' }, { status: 400 })
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 6 caractères' },
        { status: 400 }
      )
    }

    const row = await findValidToken(token)

    if (!row) {
      return NextResponse.json(
        { error: 'Ce lien de réinitialisation est invalide ou a expiré' },
        { status: 400 }
      )
    }

    const passwordHash = await hashPassword(password)
    const table = row.account_type === 'user' ? 'users' : 'clients'

    await query(`UPDATE ${table} SET password_hash = $1 WHERE id = $2`, [
      passwordHash,
      row.account_id,
    ])

    // Single use: burn the token so the same link cannot be replayed.
    await query('UPDATE password_reset_tokens SET used_at = NOW() WHERE id = $1', [row.id])

    return NextResponse.json({ message: 'Votre mot de passe a été réinitialisé avec succès' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
