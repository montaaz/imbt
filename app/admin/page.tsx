"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  MoreHorizontal,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AdminSidebar from "@/components/admin-sidebar"

// Mock data for reservations
const mockReservations = [
  {
    id: 1,
    client: "Jean Dupont",
    email: "jean@example.com",
    company: "TechCorp",
    service: "Transformation Digitale",
    date: "2025-06-10",
    time: "10:00",
    status: "confirmed",
    phone: "+33 6 12 34 56 78",
  },
  {
    id: 2,
    client: "Marie Martin",
    email: "marie@example.com",
    company: "StartupXYZ",
    service: "Développement Web",
    date: "2025-06-10",
    time: "14:00",
    status: "pending",
    phone: "+33 6 98 76 54 32",
  },
  {
    id: 3,
    client: "Pierre Bernard",
    email: "pierre@example.com",
    company: "InnovateCo",
    service: "Marketing Digital",
    date: "2025-06-11",
    time: "09:00",
    status: "confirmed",
    phone: "+33 6 11 22 33 44",
  },
  {
    id: 4,
    client: "Sophie Leroy",
    email: "sophie@example.com",
    company: "DigitalAgency",
    service: "Formation",
    date: "2025-06-11",
    time: "15:00",
    status: "cancelled",
    phone: "+33 6 55 66 77 88",
  },
  {
    id: 5,
    client: "Lucas Moreau",
    email: "lucas@example.com",
    company: "WebStudio",
    service: "Transformation Digitale",
    date: "2025-06-12",
    time: "11:00",
    status: "pending",
    phone: "+33 6 99 88 77 66",
  },
]

import { useLanguage } from "@/lib/i18n/language-context"
import NotificationBell from "@/components/notification-bell"

export default function AdminDashboard() {
  const router = useRouter()
  const { t, language, dir } = useLanguage()
  const locale = language === 'ar' ? 'ar-TN' : language === 'en' ? 'en-US' : 'fr-FR'
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null)
  const [reservations, setReservations] = useState(mockReservations)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReservation, setSelectedReservation] = useState<(typeof mockReservations)[0] | null>(null)

  const stats = [
    { label: t.admin.totalReservations, value: "156", change: "+12%", icon: Calendar },
    { label: t.admin.activeClients, value: "89", change: "+5%", icon: Users },
    { label: t.admin.confirmationRate, value: "94%", change: "+2%", icon: TrendingUp },
    { label: t.admin.averageDuration, value: language === 'ar' ? "1س 15د" : "1h15", change: language === 'ar' ? "-5دق" : "-5min", icon: Clock },
  ]

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.role !== "admin" && userData.role !== "manager") {
        router.push("/")
      } else {
        setUser(userData)
      }
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const updateReservationStatus = (id: number, status: string) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    setSelectedReservation(null)
  }

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
            <CheckCircle2 className={`h-3 w-3 inline ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            {t.admin.confirmedStatus}
          </span>
        )
      case "pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
            <Clock className={`h-3 w-3 inline ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            {t.admin.pendingStatus}
          </span>
        )
      case "cancelled":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
            <XCircle className={`h-3 w-3 inline ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
            {t.admin.cancelledStatus}
          </span>
        )
      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className={`${dir === 'rtl' ? 'lg:mr-64' : 'lg:ml-64'} p-4 sm:p-6 lg:p-10 pt-20 lg:pt-10`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">{t.admin.dashboard}</h1>
            <p className="text-foreground/60">{t.admin.manageReservationsDesc}</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <Link href="/">
              <Button variant="outline" className="bg-transparent">
                {t.admin.viewSite}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-medium text-accent">{stat.change}</span>
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reservations Table */}
        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{t.admin.recentReservations}</h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative">
                  <Search className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40`} />
                  <Input
                    placeholder={t.admin.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${dir === 'rtl' ? 'pr-10' : 'pl-10'} w-full sm:w-64 bg-muted border-0`}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-transparent">
                      <Filter className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                      {t.admin.statusFilter}
                      <ChevronDown className={`h-4 w-4 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>{t.admin.allStatus}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>{t.admin.confirmedStatus}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>{t.admin.pendingStatus}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>{t.admin.cancelledStatus}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`${dir === 'rtl' ? 'text-right' : 'text-left'} p-4 text-sm font-medium text-foreground/60`}>{t.admin.client}</th>
                  <th className={`${dir === 'rtl' ? 'text-right' : 'text-left'} p-4 text-sm font-medium text-foreground/60`}>{t.admin.service}</th>
                  <th className={`${dir === 'rtl' ? 'text-right' : 'text-left'} p-4 text-sm font-medium text-foreground/60`}>{t.admin.dateTime}</th>
                  <th className={`${dir === 'rtl' ? 'text-right' : 'text-left'} p-4 text-sm font-medium text-foreground/60`}>{t.admin.status}</th>
                  <th className={`${dir === 'rtl' ? 'text-right' : 'text-left'} p-4 text-sm font-medium text-foreground/60`}>{t.admin.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-border hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{reservation.client}</p>
                        <p className="text-sm text-foreground/60">{reservation.company}</p>
                      </div>
                    </td>
                    <td className="p-4 text-foreground/80">{reservation.service}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">
                          {new Date(reservation.date).toLocaleDateString(locale, {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-sm text-foreground/60">{reservation.time}</p>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(reservation.status)}</td>
                    <td className="p-4 text-center sm:text-start">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-lg hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={dir === 'rtl' ? "start" : "end"}>
                          <DropdownMenuItem onClick={() => setSelectedReservation(reservation)}>
                            <Eye className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                            {t.admin.viewDetails}
                          </DropdownMenuItem>
                          {reservation.status === "pending" && (
                            <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, "confirmed")}>
                              <CheckCircle2 className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                              {t.admin.confirm}
                            </DropdownMenuItem>
                          )}
                          {reservation.status !== "cancelled" && (
                            <DropdownMenuItem
                              onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                              className="text-destructive"
                            >
                              <XCircle className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                              {t.admin.cancel}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReservations.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-foreground/60">{t.admin.noReservationsFound}</p>
            </div>
          )}
        </div>
      </main>

      {/* Reservation Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedReservation(null)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card rounded-2xl border border-border p-8 max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-6">{t.admin.reservationDetails}</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.client}:</span>
                <span className="font-medium">{selectedReservation.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.email}:</span>
                <span>{selectedReservation.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.phone}:</span>
                <span>{selectedReservation.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.company}:</span>
                <span>{selectedReservation.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.service}:</span>
                <span>{selectedReservation.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.date}:</span>
                <span>
                  {new Date(selectedReservation.date).toLocaleDateString(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t.admin.time}:</span>
                <span>{selectedReservation.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/60">{t.admin.status}:</span>
                {getStatusBadge(selectedReservation.status)}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setSelectedReservation(null)} className="flex-1 bg-transparent">
                {t.admin.close}
              </Button>
              {selectedReservation.status === "pending" && (
                <Button
                  onClick={() => updateReservationStatus(selectedReservation.id, "confirmed")}
                  className="flex-1 glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0"
                >
                  {t.admin.confirm}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
