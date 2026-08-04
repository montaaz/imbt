import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export interface Notification {
  id: string
  type: 'reservation' | 'client'
  sourceId: number
  title: string
  description: string
  status: string | null
  createdAt: string
  read: boolean
}

/** Only staff accounts may read admin notifications. */
function requireStaff(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return { error: NextResponse.json({ error: 'Non autorisé' }, { status: 401 }) }

  const decoded = verifyToken(token)
  if (!decoded) return { error: NextResponse.json({ error: 'Token invalide' }, { status: 401 }) }

  if (decoded.role !== 'admin' && decoded.role !== 'manager') {
    return { error: NextResponse.json({ error: 'Accès refusé' }, { status: 403 }) }
  }

  return { user: decoded }
}

/**
 * Notification feed for the admin dashboard.
 *
 * Items are derived from the underlying rows (recent reservations and newly
 * registered clients) and joined against `notification_reads`, so the list can
 * never disagree with the data it describes.
 */
export async function GET(request: NextRequest) {
  const auth = requireStaff(request)
  if (auth.error) return auth.error

  try {
    const userId = auth.user.userId
    const limit = Math.min(parseInt(request.nextUrl.searchParams.get('limit') || '15'), 50)

    const reservations = await query(
      `SELECT r.id,
              r.client_name,
              r.service_name,
              r.date,
              r.time,
              r.status::text AS status,
              r.created_at,
              (nr.id IS NOT NULL) AS read
         FROM reservations r
         LEFT JOIN notification_reads nr
           ON nr.source_type = 'reservation'
          AND nr.source_id = r.id
          AND nr.user_id = $1
        ORDER BY r.created_at DESC
        LIMIT $2`,
      [userId, limit]
    )

    const clients = await query(
      `SELECT c.id,
              c.first_name,
              c.last_name,
              c.company,
              c.created_at,
              (nr.id IS NOT NULL) AS read
         FROM clients c
         LEFT JOIN notification_reads nr
           ON nr.source_type = 'client'
          AND nr.source_id = c.id
          AND nr.user_id = $1
        ORDER BY c.created_at DESC
        LIMIT $2`,
      [userId, limit]
    )

    const items: Notification[] = [
      ...reservations.rows.map((r: any) => ({
        id: `reservation-${r.id}`,
        type: 'reservation' as const,
        sourceId: r.id,
        title: r.client_name,
        description: r.service_name,
        status: r.status,
        // `date`/`time` describe the appointment; `created_at` is when it landed.
        createdAt: new Date(r.created_at).toISOString(),
        read: r.read,
      })),
      ...clients.rows.map((c: any) => ({
        id: `client-${c.id}`,
        type: 'client' as const,
        sourceId: c.id,
        title: `${c.first_name ?? ''} ${c.last_name ?? ''}`.trim() || 'Nouveau client',
        description: c.company || '',
        status: null,
        createdAt: new Date(c.created_at).toISOString(),
        read: c.read,
      })),
    ]
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit)

    return NextResponse.json({
      notifications: items,
      unreadCount: items.filter((n) => !n.read).length,
    })
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}

/**
 * Marks notifications as read.
 * Body: { ids: string[] } with "type-id" keys, or { all: true }.
 */
export async function POST(request: NextRequest) {
  const auth = requireStaff(request)
  if (auth.error) return auth.error

  try {
    const userId = auth.user.userId
    const body = await request.json().catch(() => ({}))

    let pairs: Array<{ type: string; id: number }> = []

    if (body.all) {
      const [reservations, clients] = await Promise.all([
        query('SELECT id FROM reservations ORDER BY created_at DESC LIMIT 50'),
        query('SELECT id FROM clients ORDER BY created_at DESC LIMIT 50'),
      ])
      pairs = [
        ...reservations.rows.map((r: any) => ({ type: 'reservation', id: r.id })),
        ...clients.rows.map((c: any) => ({ type: 'client', id: c.id })),
      ]
    } else if (Array.isArray(body.ids)) {
      pairs = body.ids
        .map((raw: string) => {
          const [type, id] = String(raw).split('-')
          return { type, id: Number(id) }
        })
        .filter(
          (p: { type: string; id: number }) =>
            (p.type === 'reservation' || p.type === 'client') && Number.isInteger(p.id)
        )
    }

    if (pairs.length === 0) {
      return NextResponse.json({ error: 'Aucune notification indiquée' }, { status: 400 })
    }

    // ON CONFLICT keeps this idempotent — marking twice is harmless.
    const values = pairs.map((_, i) => `($1, $${i * 2 + 2}, $${i * 2 + 3})`).join(', ')
    const params: any[] = [userId]
    pairs.forEach((p) => params.push(p.type, p.id))

    await query(
      `INSERT INTO notification_reads (user_id, source_type, source_id)
       VALUES ${values}
       ON CONFLICT (user_id, source_type, source_id) DO NOTHING`,
      params
    )

    return NextResponse.json({ success: true, marked: pairs.length })
  } catch (error) {
    console.error('Notifications update error:', error)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
