import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

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

    // Get overall statistics from the view
    const statsResult = await query('SELECT * FROM reservation_stats')
    const stats = statsResult.rows[0]

    // Get service popularity
    const servicePopularityResult = await query('SELECT * FROM service_popularity')
    const servicePopularity = servicePopularityResult.rows

    // Get total clients
    const clientsResult = await query('SELECT COUNT(*) as total_clients FROM clients WHERE is_active = true')
    const totalClients = parseInt(clientsResult.rows[0].total_clients)

    // Get new clients this month
    const newClientsResult = await query(
      "SELECT COUNT(*) as new_clients FROM clients WHERE created_at >= date_trunc('month', CURRENT_DATE)"
    )
    const newClientsThisMonth = parseInt(newClientsResult.rows[0].new_clients)

    // Get reservations by status
    const statusResult = await query(`
      SELECT status, COUNT(*) as count
      FROM reservations
      GROUP BY status
    `)
    const reservationsByStatus = statusResult.rows

    // Get recent reservations (last 10)
    const recentReservationsResult = await query(`
      SELECT id, client_name, client_email, service_name, date, time, status, created_at
      FROM reservations
      ORDER BY created_at DESC
      LIMIT 10
    `)
    const recentReservations = recentReservationsResult.rows

    // Get reservations by month (last 6 months)
    const monthlyReservationsResult = await query(`
      SELECT
        TO_CHAR(date, 'YYYY-MM') as month,
        COUNT(*) as count,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled
      FROM reservations
      WHERE date >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY TO_CHAR(date, 'YYYY-MM')
      ORDER BY month DESC
    `)
    const monthlyReservations = monthlyReservationsResult.rows

    // Get top clients by reservations
    const topClientsResult = await query(`
      SELECT
        c.id,
        c.first_name,
        c.last_name,
        c.company,
        COUNT(r.id) as reservation_count,
        COUNT(r.id) FILTER (WHERE r.status = 'completed') as completed_count
      FROM clients c
      LEFT JOIN reservations r ON c.id = r.client_id
      GROUP BY c.id, c.first_name, c.last_name, c.company
      HAVING COUNT(r.id) > 0
      ORDER BY reservation_count DESC
      LIMIT 10
    `)
    const topClients = topClientsResult.rows

    // Calculate revenue (if we had pricing, this would be actual revenue)
    // For now, we'll use a placeholder calculation
    const avgRevenuePerReservation = 500 // Example: 500 TND per reservation
    const totalRevenue = parseInt(stats.completed_reservations) * avgRevenuePerReservation
    const monthlyRevenue = Math.round(totalRevenue / 12) // Approximate monthly revenue

    return NextResponse.json({
      overview: {
        totalReservations: parseInt(stats.total_reservations),
        pendingReservations: parseInt(stats.pending_reservations),
        confirmedReservations: parseInt(stats.confirmed_reservations),
        cancelledReservations: parseInt(stats.cancelled_reservations),
        completedReservations: parseInt(stats.completed_reservations),
        upcomingReservations: parseInt(stats.upcoming_reservations),
        reservationsLastWeek: parseInt(stats.reservations_last_week),
        reservationsLastMonth: parseInt(stats.reservations_last_month),
        totalClients,
        newClientsThisMonth,
        totalRevenue,
        monthlyRevenue,
      },
      servicePopularity,
      reservationsByStatus,
      recentReservations,
      monthlyReservations,
      topClients,
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json({ error: 'Erreur lors de la récupération des statistiques' }, { status: 500 })
  }
}
