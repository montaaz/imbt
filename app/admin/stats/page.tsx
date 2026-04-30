"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"

interface OverviewStats {
  totalReservations: number
  pendingReservations: number
  confirmedReservations: number
  cancelledReservations: number
  completedReservations: number
  upcomingReservations: number
  reservationsLastWeek: number
  reservationsLastMonth: number
  totalClients: number
  newClientsThisMonth: number
  totalRevenue: number
  monthlyRevenue: number
}

interface ServicePopularity {
  service: string
  service_name: string
  reservation_count: string
  completed_count: string
  avg_duration: string
}

interface RecentReservation {
  id: number
  client_name: string
  client_email: string
  service_name: string
  date: string
  time: string
  status: string
  created_at: string
}

interface MonthlyReservation {
  month: string
  count: string
  completed: string
  cancelled: string
}

interface TopClient {
  id: number
  first_name: string
  last_name: string
  company: string | null
  reservation_count: string
  completed_count: string
}

import { useLanguage } from "@/lib/i18n/language-context"

export default function StatsPage() {
  const router = useRouter()
  const { t, dir, language } = useLanguage()
  const [overview, setOverview] = useState<OverviewStats | null>(null)
  const [servicePopularity, setServicePopularity] = useState<ServicePopularity[]>([])
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>([])
  const [monthlyReservations, setMonthlyReservations] = useState<MonthlyReservation[]>([])
  const [topClients, setTopClients] = useState<TopClient[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      const response = await fetch("/api/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin")
          return
        }
        throw new Error(t.common.error)
      }

      const data = await response.json()
      setOverview(data.overview)
      setServicePopularity(data.servicePopularity)
      setRecentReservations(data.recentReservations)
      setMonthlyReservations(data.monthlyReservations)
      setTopClients(data.topClients)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching stats:", error)
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
      confirmed: "bg-blue-500/20 text-blue-500 border-blue-500/30",
      completed: "bg-green-500/20 text-green-500 border-green-500/30",
      cancelled: "bg-red-500/20 text-red-500 border-red-500/30",
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {t.status[status as keyof typeof t.status] || status}
      </span>
    )
  }

  if (isLoading || !overview) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    {
      title: t.admin.totalReservations,
      value: overview.totalReservations,
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      change: `+${overview.reservationsLastWeek} ${t.admin.thisWeek}`,
      positive: true,
    },
    {
      title: t.admin.activeClients,
      value: overview.totalClients,
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      change: `+${overview.newClientsThisMonth} ${t.admin.thisMonth}`,
      positive: true,
    },
    {
      title: t.status.pending,
      value: overview.pendingReservations,
      icon: Clock,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    },
    {
      title: t.status.completed,
      value: overview.completedReservations,
      icon: CheckCircle,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: t.admin.totalRevenue,
      value: `${overview.totalRevenue.toLocaleString()} TND`,
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400/10",
      change: `${overview.monthlyRevenue.toLocaleString()} TND/${t.admin.perMonth}`,
      positive: true,
    },
    {
      title: t.admin.upcoming,
      value: overview.upcomingReservations,
      icon: TrendingUp,
      color: "text-indigo-400",
      bgColor: "bg-indigo-400/10",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex" dir={dir}>
      <AdminSidebar />
      <main className={`flex-1 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 ${dir === 'rtl' ? 'lg:mr-64' : 'lg:ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`mb-6 sm:mb-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.admin.statsTitle}</h1>
              <p className="text-foreground/60">{t.admin.statsDesc}</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass glow-primary rounded-2xl p-6 border-white/5"
                >
                  <div className={`flex items-start justify-between mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    {stat.change && (
                      <div className="flex items-center gap-1 text-sm">
                        {stat.positive ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <h3 className={`text-foreground/60 text-sm mb-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{stat.title}</h3>
                  <p className={`text-3xl font-bold mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{stat.value}</p>
                  {stat.change && <p className={`text-xs text-foreground/50 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{stat.change}</p>}
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Service Popularity */}
              <motion.div
                initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass glow-primary rounded-2xl p-6 border-white/5"
              >
                <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">{t.admin.popularServices}</h2>
                </div>
                <div className="space-y-4">
                  {servicePopularity.map((service, index) => (
                    <div key={`${service.service}-${index}`} className="space-y-2">
                      <div className={`flex items-center justify-between text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <span className="font-medium">{service.service_name}</span>
                        <span className="text-foreground/60">{service.reservation_count} {t.admin.reservations}</span>
                      </div>
                      <div className="h-2 bg-accent/20 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${(parseInt(service.reservation_count) / (parseInt(servicePopularity[0]?.reservation_count) || 1)) * 100}%`,
                          }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className={`h-full bg-gradient-to-r from-primary to-accent rounded-full ${dir === 'rtl' ? 'origin-right float-right' : ''}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Monthly Trend */}
              <motion.div
                initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass glow-primary rounded-2xl p-6 border-white/5"
              >
                <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <TrendingUp className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-bold">{t.admin.monthlyEvolution}</h2>
                </div>
                <div className="space-y-4">
                  {monthlyReservations.map((month) => (
                    <div key={month.month} className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <span className="text-sm font-medium">{month.month}</span>
                      <div className={`flex items-center gap-4 text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <span className="text-green-500">{month.completed} {t.admin.completedLabel}</span>
                        <span className="text-red-500">{month.cancelled} {t.admin.cancelledLabel}</span>
                        <span className="font-bold">{month.count} {t.admin.totalLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Reservations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass glow-primary rounded-2xl p-6 border-white/5"
              >
                <h2 className={`text-xl font-bold mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t.admin.recentReservationsTitle}</h2>
                <div className="space-y-4">
                  {recentReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="p-4 rounded-xl bg-accent/5 border border-white/5 hover:border-primary/50 transition-colors"
                    >
                      <div className={`flex items-start justify-between mb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                          <p className="font-medium">{reservation.client_name}</p>
                          <p className="text-sm text-foreground/60">{reservation.service_name}</p>
                        </div>
                        {getStatusBadge(reservation.status)}
                      </div>
                      <div className={`flex items-center gap-4 text-xs text-foreground/50 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                        <span>{new Date(reservation.date).toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-FR')}</span>
                        <span>{reservation.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top Clients */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass glow-primary rounded-2xl p-6 border-white/5"
              >
                <h2 className={`text-xl font-bold mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{t.admin.topClients}</h2>
                <div className="space-y-4">
                  {topClients.map((client, index) => (
                    <div
                      key={client.id}
                      className={`flex items-center gap-4 p-4 rounded-xl bg-accent/5 border border-white/5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <p className="font-medium">{`${client.first_name} ${client.last_name}`}</p>
                        {client.company && <p className="text-sm text-foreground/60">{client.company}</p>}
                      </div>
                      <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                        <p className="font-bold">{client.reservation_count}</p>
                        <p className="text-xs text-foreground/60">{t.admin.reservations}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
