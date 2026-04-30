"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Edit2, Trash2, Mail, Phone, Building2, MapPin, Eye, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"
import { PhoneInput } from "@/components/ui/phone-input"

interface Client {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  company: string | null
  position: string | null
  address: string | null
  city: string | null
  country: string | null
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

import { useLanguage } from "@/lib/i18n/language-context"

export default function ClientsPage() {
  const router = useRouter()
  const { t, dir, language } = useLanguage()
  const [clients, setClients] = useState<Client[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    address: "",
    city: "",
    country: language === 'ar' ? "تونس" : "Tunisia",
    notes: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    fetchClients()
  }, [pagination.page, search])

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      const response = await fetch(
        `/api/clients?page=${pagination.page}&limit=${pagination.limit}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin")
          return
        }
        throw new Error(t.common.error)
      }

      const data = await response.json()
      setClients(data.clients)
      setPagination(data.pagination)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching clients:", error)
      setError(t.common.error)
      setIsLoading(false)
    }
  }

  const handleAdd = () => {
    setModalMode("add")
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      address: "",
      city: "",
      country: language === 'ar' ? "تونس" : "Tunisia",
      notes: "",
    })
    setShowModal(true)
  }

  const handleEdit = (client: Client) => {
    setModalMode("edit")
    setSelectedClient(client)
    setFormData({
      firstName: client.first_name,
      lastName: client.last_name,
      email: client.email,
      phone: client.phone || "",
      company: client.company || "",
      position: client.position || "",
      address: client.address || "",
      city: client.city || "",
      country: client.country || (language === 'ar' ? "تونس" : "Tunisia"),
      notes: client.notes || "",
    })
    setShowModal(true)
  }

  const handleView = (client: Client) => {
    setModalMode("view")
    setSelectedClient(client)
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      const url = modalMode === "add" ? "/api/clients" : "/api/clients"
      const method = modalMode === "add" ? "POST" : "PUT"
      const body = modalMode === "add" ? formData : { ...formData, id: selectedClient?.id }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t.common.error)
        return
      }

      setShowModal(false)
      fetchClients()
    } catch (error) {
      console.error("Error saving client:", error)
      setError(t.common.error)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm(t.admin.confirmDeleteClient)) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      const response = await fetch(`/api/clients?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(t.common.error)
      }

      fetchClients()
    } catch (error) {
      console.error("Error deleting client:", error)
      setError(t.common.error)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPagination({ ...pagination, page: 1 })
    fetchClients()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <AdminSidebar />
      <div className={`${dir === 'rtl' ? 'lg:mr-64' : 'lg:ml-64'} p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8`}>
        <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.admin.manageClientsTitle}</h1>
              <p className="text-foreground/60">{t.admin.manageClientsDesc}</p>
            </div>
            <Button onClick={handleAdd} className="glow-primary w-full sm:w-auto bg-[#a80202] text-white hover:bg-[#8a0101] border-0">
              <Plus className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t.admin.newClient}
            </Button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              {error}
            </div>
          )}

          <div className="mb-6 glass glow-primary rounded-2xl p-6">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                <Input
                  type="text"
                  placeholder={t.admin.searchClientsPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`${dir === 'rtl' ? 'pr-10' : 'pl-10'} bg-card/50 border-border/50`}
                />
              </div>
              <Button type="submit" className="bg-primary/20 text-primary hover:bg-primary/30 border-0">{t.common.search}</Button>
            </form>
          </div>

          <div className="glass glow-primary rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className={`px-4 sm:px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-semibold`}>{t.admin.client}</th>
                    <th className={`px-4 sm:px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-semibold hidden sm:table-cell`}>{t.admin.email}</th>
                    <th className={`px-4 sm:px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-semibold hidden md:table-cell`}>{t.admin.phone}</th>
                    <th className={`px-4 sm:px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-semibold hidden lg:table-cell`}>{t.admin.company}</th>
                    <th className={`px-4 sm:px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-semibold hidden xl:table-cell`}>{t.admin.city}</th>
                    <th className={`px-4 sm:px-6 py-4 ${dir === 'rtl' ? 'text-left' : 'text-right'} text-sm font-semibold`}>{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <motion.tr
                      key={client.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-border/30 hover:bg-accent/10 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div className="font-medium">{`${client.first_name} ${client.last_name}`}</div>
                        {client.position && (
                          <div className="text-sm text-foreground/60">{client.position}</div>
                        )}
                        <div className="sm:hidden text-xs text-foreground/50 mt-1">{client.email}</div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-foreground/40" />
                          {client.email}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                        {client.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-foreground/40" />
                            {client.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                        {client.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4 text-foreground/40" />
                            {client.company}
                          </div>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden xl:table-cell">
                        {client.city && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-foreground/40" />
                            {client.city}
                          </div>
                        )}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className={`flex items-center ${dir === 'rtl' ? 'justify-start' : 'justify-end'} gap-1 sm:gap-2`}>
                          <button
                            onClick={() => handleView(client)}
                            className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
                            title={t.common.view}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(client)}
                            className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
                            title={t.common.edit}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(client.id)}
                            className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            title={t.common.delete}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {clients.length === 0 && (
              <div className="text-center py-12 text-foreground/60">{t.admin.noClientsFound}</div>
            )}

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 p-6 border-t border-border/50">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                >
                  {t.common.previous}
                </Button>
                <span className="text-sm text-foreground/60">
                  {t.admin.pageOf.replace('{page}', pagination.page.toString()).replace('{total}', pagination.totalPages.toString())}
                </span>
                <Button
                  variant="outline"
                  disabled={pagination.page === pagination.totalPages}
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                >
                  {t.common.next}
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass glow-primary rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {modalMode === "add" && t.admin.addClient}
                {modalMode === "edit" && t.admin.editClient}
                {modalMode === "view" && t.admin.clientDetails}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {modalMode === "view" && selectedClient ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.firstName}</Label>
                    <p className="font-medium">{selectedClient.first_name}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.lastName}</Label>
                    <p className="font-medium">{selectedClient.last_name}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.email}</Label>
                    <p className="font-medium">{selectedClient.email}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.phone}</Label>
                    <p className="font-medium">{selectedClient.phone || "—"}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.company}</Label>
                    <p className="font-medium">{selectedClient.company || "—"}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.position}</Label>
                    <p className="font-medium">{selectedClient.position || "—"}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.city}</Label>
                    <p className="font-medium">{selectedClient.city || "—"}</p>
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.country}</Label>
                    <p className="font-medium">{selectedClient.country || "—"}</p>
                  </div>
                </div>
                {selectedClient.address && (
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.address}</Label>
                    <p className="font-medium">{selectedClient.address}</p>
                  </div>
                )}
                {selectedClient.notes && (
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label className="text-foreground/60">{t.admin.notes}</Label>
                    <p className="font-medium">{selectedClient.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label htmlFor="firstName">{t.admin.firstName} *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                    />
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label htmlFor="lastName">{t.admin.lastName} *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                    />
                  </div>
                </div>

                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <Label htmlFor="email">{t.admin.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                  />
                </div>

                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <Label htmlFor="phone">{t.admin.phone}</Label>
                  <PhoneInput
                    id="phone"
                    value={formData.phone as any}
                    onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                    defaultCountry="FR"
                    className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label htmlFor="company">{t.admin.company}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                    />
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label htmlFor="position">{t.admin.position}</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                    />
                  </div>
                </div>

                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <Label htmlFor="address">{t.admin.address}</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label htmlFor="city">{t.admin.city}</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                    />
                  </div>
                  <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                    <Label htmlFor="country">{t.admin.country}</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className={`${dir === 'rtl' ? 'text-right' : 'text-left'} bg-card/50 border-border/50`}
                    />
                  </div>
                </div>

                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <Label htmlFor="notes">{t.admin.notes}</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className={`w-full px-3 py-2 bg-card/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" className="flex-1 glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0">
                    {modalMode === "add" ? t.admin.create : t.admin.update}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-transparent"
                  >
                    {t.common.cancel}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
      </div>
    </div>
  )
}
