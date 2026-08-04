import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { query } from '@/lib/db'

const TOKEN_TTL_MINUTES = 60

/**
 * Starts a password reset.
 *
 * Always responds with the same success message, whether or not the address
 * exists, so this endpoint cannot be used to discover registered emails.
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const genericResponse = NextResponse.json({
      message:
        'Si un compte existe pour cette adresse, un lien de réinitialisation vient d’être envoyé.',
    })

    // Staff accounts take priority, then customer accounts.
    let accountType: 'user' | 'client' | null = null
    let accountId: number | null = null

    const userResult = await query<{ id: number }>(
      'SELECT id FROM users WHERE LOWER(email) = $1 AND is_active = true',
      [normalizedEmail]
    )

    if (userResult.rows.length > 0) {
      accountType = 'user'
      accountId = userResult.rows[0].id
    } else {
      const clientResult = await query<{ id: number }>(
        'SELECT id FROM clients WHERE LOWER(email) = $1',
        [normalizedEmail]
      )
      if (clientResult.rows.length > 0) {
        accountType = 'client'
        accountId = clientResult.rows[0].id
      }
    }

    if (!accountType || accountId === null) {
      return genericResponse
    }

    // Invalidate any previous pending tokens for this address.
    await query(
      'UPDATE password_reset_tokens SET used_at = NOW() WHERE email = $1 AND used_at IS NULL',
      [normalizedEmail]
    )

    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
    const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000)

    await query(
      `INSERT INTO password_reset_tokens (token_hash, email, account_type, account_id, expires_at)
       VALUES ($1, $2, $3, $4, $5)`,
      [tokenHash, normalizedEmail, accountType, accountId, expiresAt]
    )

    const baseUrl =
      process.env.NEXTAUTH_URL || request.nextUrl.origin || 'https://imbt-consulting.com'
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`

    // TODO: send `resetUrl` by email once an SMTP/transactional provider is configured.
    // Until then the link is logged server-side so an administrator can deliver it.
    // Uses console.warn because production builds strip console.log.
    console.warn(`[password-reset] ${normalizedEmail} -> ${resetUrl}`)

    // In development only, return the link so the flow is testable end to end.
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        message:
          'Si un compte existe pour cette adresse, un lien de réinitialisation vient d’être envoyé.',
        devResetUrl: resetUrl,
      })
    }

    return genericResponse
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
