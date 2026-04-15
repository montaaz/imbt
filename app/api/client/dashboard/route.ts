import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { getTokenFromRequest, getUserFromToken } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Get and verify token
    const token = getTokenFromRequest(request)
    const user = getUserFromToken(token)

    if (!user || (user.role !== 'client' && user.role !== 'user')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Try to get client from clients table first, then from users table
    let clientResult = await query(
      'SELECT * FROM clients WHERE id = $1',
      [user.userId]
    )

    // If not found in clients table, get from users table
    if (clientResult.rows.length === 0) {
      clientResult = await query(
        'SELECT id, email, first_name, last_name, NULL as phone, NULL as company, NULL as position, NULL as city, NULL as country, false as email_verified, last_login, created_at FROM users WHERE id = $1',
        [user.userId]
      )
    }

    if (clientResult.rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const client = clientResult.rows[0]

    // Get reservations
    const reservationsResult = await query(
      `SELECT * FROM reservations
       WHERE client_id = $1
       ORDER BY date DESC, time DESC`,
      [user.userId]
    )

    // Get purchases
    const purchasesResult = await query(
      `SELECT * FROM purchases
       WHERE client_id = $1
       ORDER BY created_at DESC`,
      [user.userId]
    )

    // Get statistics
    const statsResult = await query(
      `SELECT
        COUNT(*) FILTER (WHERE status = 'pending') as pending_reservations,
        COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_reservations,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_reservations,
        COUNT(*) FILTER (WHERE date >= CURRENT_DATE) as upcoming_reservations
       FROM reservations
       WHERE client_id = $1`,
      [user.userId]
    )

    const purchaseStatsResult = await query(
      `SELECT
        COUNT(*) as total_purchases,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_purchases,
        COUNT(*) FILTER (WHERE status = 'processing') as processing_purchases,
        SUM(total_price) FILTER (WHERE status = 'completed') as total_spent
       FROM purchases
       WHERE client_id = $1`,
      [user.userId]
    )

    return NextResponse.json({
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
        emailVerified: client.email_verified,
        lastLogin: client.last_login,
        createdAt: client.created_at,
      },
      reservations: reservationsResult.rows.map((row: any) => ({
        id: row.id,
        serviceName: row.service_name,
        service: row.service,
        date: row.date,
        time: row.time,
        duration: row.duration,
        status: row.status,
        message: row.message,
        createdAt: row.created_at,
        confirmedAt: row.confirmed_at,
        completedAt: row.completed_at,
      })),
      purchases: purchasesResult.rows.map((row: any) => ({
        id: row.id,
        productName: row.product_name,
        productType: row.product_type,
        quantity: row.quantity,
        totalPrice: parseFloat(row.total_price),
        currency: row.currency,
        status: row.status,
        trackingNumber: row.tracking_number,
        createdAt: row.created_at,
        paidAt: row.paid_at,
        deliveredAt: row.delivered_at,
      })),
      stats: {
        reservations: statsResult.rows[0],
        purchases: {
          ...purchaseStatsResult.rows[0],
          total_spent: purchaseStatsResult.rows[0].total_spent ? parseFloat(purchaseStatsResult.rows[0].total_spent) : 0,
        },
      },
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
