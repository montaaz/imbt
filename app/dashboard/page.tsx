'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/lib/i18n/language-context'
import {
  Calendar,
  Package,
  User,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Home
} from 'lucide-react'
import Link from 'next/link'

const ParticleField = dynamic(() => import('@/components/three/particle-field'), { ssr: false })

interface Reservation {
  id: number
  serviceName: string
  service: string
  date: string
  time: string
  duration: number
  status: string
  message?: string
  createdAt: string
  confirmedAt?: string
  completedAt?: string
}

interface Purchase {
  id: number
  productName: string
  productType: string
  quantity: number
  totalPrice: number
  currency: string
  status: string
  trackingNumber?: string
  createdAt: string
  paidAt?: string
  deliveredAt?: string
}

interface DashboardData {
  client: {
    id: number
    email: string
    firstName: string
    lastName: string
    phone?: string
    company?: string
    position?: string
    city?: string
    country?: string
    emailVerified: boolean
    lastLogin?: string
    createdAt: string
  }
  reservations: Reservation[]
  purchases: Purchase[]
  stats: {
    reservations: {
      pending_reservations: number
      confirmed_reservations: number
      completed_reservations: number
      upcoming_reservations: number
    }
    purchases: {
      total_purchases: number
      completed_purchases: number
      processing_purchases: number
      total_spent: number
    }
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboard()
  }, [])

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem('client_token')
      if (!token) {
        router.push('/auth/signin')
        return
      }

      const response = await fetch('/api/client/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.status === 401) {
        localStorage.removeItem('client_token')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        router.push('/auth/signin')
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const dashboardData = await response.json()
      setData(dashboardData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('client_token')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            {t.status.confirmed}
          </span>
        )
      case 'pending':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
            <Clock className="h-3 w-3 inline mr-1" />
            {t.status.pending}
          </span>
        )
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-500">
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            {t.status.completed}
          </span>
        )
      case 'cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
            <XCircle className="h-3 w-3 inline mr-1" />
            {t.status.cancelled}
          </span>
        )
      case 'processing':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
            <TrendingUp className="h-3 w-3 inline mr-1" />
            {t.status.processing}
          </span>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ParticleField />
        <div className="relative z-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ParticleField />
        <div className="relative z-10 max-w-md w-full mx-4">
          <div className="p-8 rounded-3xl glass glow-primary border border-border">
            <h2 className="text-2xl font-bold mb-4 text-destructive">{t.common.error}</h2>
            <p className="text-foreground/80 mb-6">{error}</p>
            <Button onClick={fetchDashboard} className="w-full glow-primary">
              {t.errors.tryAgain}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <main className="min-h-screen bg-background">
      <ParticleField />

      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold gradient-text">IMBT</span>
              <span className="text-sm text-foreground/60">Consulting</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Home className="h-4 w-4 mr-2" />
                  {t.common.home}
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm" className="bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                {t.common.logout}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              {t.dashboard.welcome}, {data.client.firstName}!
            </h1>
            <p className="text-foreground/60 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {data.client.email}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl glass glow-primary"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{data.stats.reservations.upcoming_reservations}</p>
              <p className="text-sm text-foreground/60">{t.dashboard.upcomingReservations}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl glass glow-primary"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{data.stats.reservations.completed_reservations}</p>
              <p className="text-sm text-foreground/60">{t.dashboard.completedReservations}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl glass glow-primary"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">{data.stats.purchases.total_purchases}</p>
              <p className="text-sm text-foreground/60">{t.dashboard.totalPurchases}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl glass glow-primary"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-accent" />
                </div>
              </div>
              <p className="text-3xl font-bold mb-1">
                {data.stats.purchases.total_spent.toFixed(2)} TND
              </p>
              <p className="text-sm text-foreground/60">{t.dashboard.totalSpent}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Tabs defaultValue="reservations" className="space-y-6">
            <TabsList className="glass p-1">
              <TabsTrigger value="reservations" className="data-[state=active]:bg-primary/20">
                <Calendar className="h-4 w-4 mr-2" />
                {t.dashboard.myReservations}
              </TabsTrigger>
              <TabsTrigger value="purchases" className="data-[state=active]:bg-primary/20">
                <Package className="h-4 w-4 mr-2" />
                {t.dashboard.myPurchases}
              </TabsTrigger>
              <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20">
                <User className="h-4 w-4 mr-2" />
                {t.dashboard.profile}
              </TabsTrigger>
            </TabsList>

            {/* Reservations Tab */}
            <TabsContent value="reservations" className="space-y-4">
              {data.reservations.length === 0 ? (
                <div className="p-12 rounded-3xl glass text-center">
                  <Calendar className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.dashboard.noReservations}</h3>
                  <p className="text-foreground/60 mb-6">{t.dashboard.noReservationsDesc}</p>
                  <Button onClick={() => router.push('/reservation')} className="glow-primary">
                    {t.dashboard.makeReservation}
                  </Button>
                </div>
              ) : (
                data.reservations.map((reservation, index) => (
                  <motion.div
                    key={reservation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl glass glow-primary"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{reservation.serviceName}</h3>
                        <p className="text-foreground/60 flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(reservation.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })} à {reservation.time}
                        </p>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    <div className="space-y-2 border-t border-border/30 pt-4">
                      <div className="flex items-center text-sm text-foreground/70">
                        <Clock className="h-4 w-4 mr-2" />
                        {t.dashboard.duration}: {reservation.duration} minutes
                      </div>
                      {reservation.message && (
                        <p className="text-sm text-foreground/70 pl-6">
                          {t.dashboard.message}: {reservation.message}
                        </p>
                      )}
                      <p className="text-xs text-foreground/50 pl-6">
                        {t.dashboard.createdOn}: {new Date(reservation.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>

            {/* Purchases Tab */}
            <TabsContent value="purchases" className="space-y-4">
              {data.purchases.length === 0 ? (
                <div className="p-12 rounded-3xl glass text-center">
                  <Package className="h-16 w-16 mx-auto text-foreground/30 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{t.dashboard.noPurchases}</h3>
                  <p className="text-foreground/60">{t.dashboard.noPurchasesDesc}</p>
                </div>
              ) : (
                data.purchases.map((purchase, index) => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-2xl glass glow-primary"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{purchase.productName}</h3>
                        <p className="text-foreground/60">
                          {purchase.quantity} × {purchase.totalPrice.toFixed(2)} {purchase.currency}
                        </p>
                      </div>
                      {getStatusBadge(purchase.status)}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border/30 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">{t.dashboard.type}:</span>
                        <Badge variant="outline" className="bg-card/50">{purchase.productType}</Badge>
                      </div>
                      {purchase.trackingNumber && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground/60">{t.dashboard.tracking}:</span>
                          <code className="text-xs bg-card/50 px-2 py-1 rounded font-mono">
                            {purchase.trackingNumber}
                          </code>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">{t.dashboard.total}:</span>
                        <span className="font-semibold text-primary">
                          {purchase.totalPrice.toFixed(2)} {purchase.currency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/60">{t.dashboard.ordered}:</span>
                        <span className="text-foreground/80">
                          {new Date(purchase.createdAt).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      {purchase.paidAt && (
                        <div className="flex items-center justify-between text-sm col-span-2">
                          <span className="text-foreground/60">{t.dashboard.paid}:</span>
                          <span className="text-accent">
                            {new Date(purchase.paidAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                      {purchase.deliveredAt && (
                        <div className="flex items-center justify-between text-sm col-span-2">
                          <span className="text-foreground/60">{t.dashboard.delivered}:</span>
                          <span className="text-green-500">
                            {new Date(purchase.deliveredAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="p-8 rounded-3xl glass glow-primary">
                <h2 className="text-2xl font-bold mb-6 gradient-text">{t.dashboard.profileInfo}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t.auth.firstName}
                    </label>
                    <p className="text-lg font-medium">{data.client.firstName}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t.auth.lastName}
                    </label>
                    <p className="text-lg font-medium">{data.client.lastName}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {t.auth.email}
                    </label>
                    <p className="text-lg font-medium">{data.client.email}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {t.auth.phone}
                    </label>
                    <p className="text-lg font-medium">{data.client.phone || t.dashboard.notProvided}</p>
                  </div>

                  {data.client.company && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {t.auth.company}
                      </label>
                      <p className="text-lg font-medium">{data.client.company}</p>
                    </div>
                  )}

                  {data.client.position && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                        <Briefcase className="h-4 w-4" />
                        {t.dashboard.position}
                      </label>
                      <p className="text-lg font-medium">{data.client.position}</p>
                    </div>
                  )}

                  {data.client.city && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {t.dashboard.city}
                      </label>
                      <p className="text-lg font-medium">{data.client.city}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/60 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {t.dashboard.country}
                    </label>
                    <p className="text-lg font-medium">{data.client.country || t.dashboard.notProvided}</p>
                  </div>
                </div>

                <div className="border-t border-border/30 pt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/60">{t.dashboard.emailVerified}</span>
                    {data.client.emailVerified ? (
                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">{t.dashboard.verified}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-destructive">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">{t.dashboard.notVerified}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-foreground/60">
                    {t.dashboard.memberSince}: {new Date(data.client.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>

                  {data.client.lastLogin && (
                    <p className="text-sm text-foreground/60">
                      {t.dashboard.lastLogin}: {new Date(data.client.lastLogin).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </main>
  )
}
