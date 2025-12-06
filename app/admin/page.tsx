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
  LogOut,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

const stats = [
  { label: "Réservations totales", value: "156", change: "+12%", icon: Calendar },
  { label: "Clients actifs", value: "89", change: "+5%", icon: Users },
  { label: "Taux de confirmation", value: "94%", change: "+2%", icon: TrendingUp },
  { label: "Durée moyenne", value: "1h15", change: "-5min", icon: Clock },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null)
  const [reservations, setReservations] = useState(mockReservations)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReservation, setSelectedReservation] = useState<(typeof mockReservations)[0] | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.role !== "admin") {
        router.push("/")
      } else {
        setUser(userData)
      }
    } else {
      router.push("/auth/signin")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

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
            <CheckCircle2 className="h-3 w-3 inline mr-1" />
            Confirmé
          </span>
        )
      case "pending":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
            <Clock className="h-3 w-3 inline mr-1" />
            En attente
          </span>
        )
      case "cancelled":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
            <XCircle className="h-3 w-3 inline mr-1" />
            Annulé
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
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-6 hidden lg:block">
        <Link href="/" className="flex items-center gap-2 mb-10">
          <span className="text-2xl font-bold gradient-text">IMBT</span>
          <span className="text-xs text-foreground/50">Admin</span>
        </Link>

        <nav className="space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
          >
            <Calendar className="h-5 w-5" />
            Réservations
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 hover:bg-muted w-full text-left">
            <Users className="h-5 w-5" />
            Clients
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 hover:bg-muted w-full text-left">
            <TrendingUp className="h-5 w-5" />
            Statistiques
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/60 hover:bg-muted w-full text-left">
            <Settings className="h-5 w-5" />
            Paramètres
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 rounded-xl bg-muted mb-4">
            <p className="font-medium text-sm">{user.name}</p>
            <p className="text-xs text-foreground/50">Administrateur</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-foreground/60">Gérez vos réservations et clients</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-card border border-border hover:bg-muted">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
            <Link href="/">
              <Button variant="outline" className="bg-transparent">
                Voir le site
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
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Réservations récentes</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 bg-muted border-0"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      Statut
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>Tous</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>Confirmés</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("pending")}>En attente</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>Annulés</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-sm font-medium text-foreground/60">Client</th>
                  <th className="text-left p-4 text-sm font-medium text-foreground/60">Service</th>
                  <th className="text-left p-4 text-sm font-medium text-foreground/60">Date & Heure</th>
                  <th className="text-left p-4 text-sm font-medium text-foreground/60">Statut</th>
                  <th className="text-left p-4 text-sm font-medium text-foreground/60">Actions</th>
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
                          {new Date(reservation.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-sm text-foreground/60">{reservation.time}</p>
                      </div>
                    </td>
                    <td className="p-4">{getStatusBadge(reservation.status)}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-lg hover:bg-muted">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedReservation(reservation)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          {reservation.status === "pending" && (
                            <DropdownMenuItem onClick={() => updateReservationStatus(reservation.id, "confirmed")}>
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Confirmer
                            </DropdownMenuItem>
                          )}
                          {reservation.status !== "cancelled" && (
                            <DropdownMenuItem
                              onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                              className="text-destructive"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Annuler
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
              <p className="text-foreground/60">Aucune réservation trouvée</p>
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
            <h3 className="text-xl font-bold mb-6">Détails de la réservation</h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-foreground/60">Client:</span>
                <span className="font-medium">{selectedReservation.client}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Email:</span>
                <span>{selectedReservation.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Téléphone:</span>
                <span>{selectedReservation.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Entreprise:</span>
                <span>{selectedReservation.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Service:</span>
                <span>{selectedReservation.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Date:</span>
                <span>
                  {new Date(selectedReservation.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Heure:</span>
                <span>{selectedReservation.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/60">Statut:</span>
                {getStatusBadge(selectedReservation.status)}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button variant="outline" onClick={() => setSelectedReservation(null)} className="flex-1 bg-transparent">
                Fermer
              </Button>
              {selectedReservation.status === "pending" && (
                <Button
                  onClick={() => updateReservationStatus(selectedReservation.id, "confirmed")}
                  className="flex-1 glow-primary"
                >
                  Confirmer
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
