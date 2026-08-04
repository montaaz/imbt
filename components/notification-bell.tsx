"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Bell, Calendar, UserPlus, CheckCheck, Loader2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface Notification {
  id: string
  type: "reservation" | "client"
  sourceId: number
  title: string
  description: string
  status: string | null
  createdAt: string
  read: boolean
}

/** Refresh interval while the dashboard is open. */
const POLL_MS = 60_000

export default function NotificationBell() {
  const router = useRouter()
  const { t, dir, language } = useLanguage()
  const locale = language === "ar" ? "ar-TN" : language === "en" ? "en-US" : "fr-FR"

  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Notification[]>([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const load = useCallback(async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("failed")

      const data = await res.json()
      setItems(data.notifications ?? [])
      setUnread(data.unreadCount ?? 0)
      setError(false)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, POLL_MS)
    return () => clearInterval(id)
  }, [load])

  // Close on outside click and on Escape.
  useEffect(() => {
    if (!open) return

    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const markRead = async (ids: string[] | "all") => {
    const token = localStorage.getItem("token")
    if (!token) return

    // Update locally first so the panel responds immediately.
    setItems((prev) =>
      prev.map((n) => (ids === "all" || ids.includes(n.id) ? { ...n, read: true } : n))
    )
    setUnread((prev) => (ids === "all" ? 0 : Math.max(0, prev - ids.length)))

    try {
      await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(ids === "all" ? { all: true } : { ids }),
      })
    } catch {
      // Re-sync if the write failed, so the badge cannot drift.
      load()
    }
  }

  const openItem = (n: Notification) => {
    if (!n.read) markRead([n.id])
    setOpen(false)
    router.push(n.type === "reservation" ? "/admin" : "/admin/clients")
  }

  const relativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime()
    const mins = Math.round(diff / 60000)
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })

    if (Math.abs(mins) < 60) return rtf.format(-mins, "minute")
    const hours = Math.round(mins / 60)
    if (Math.abs(hours) < 24) return rtf.format(-hours, "hour")
    return rtf.format(-Math.round(hours / 24), "day")
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
        aria-label={t.admin.notifications}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span
            className={`absolute -top-1 ${dir === "rtl" ? "-left-1" : "-right-1"} min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[#a80202] text-white text-[10px] font-bold`}
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden ${
              dir === "rtl" ? "left-0" : "right-0"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-semibold text-sm">{t.admin.notifications}</p>
              {unread > 0 && (
                <button
                  onClick={() => markRead("all")}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  {t.admin.markAllRead}
                </button>
              )}
            </div>

            <div className="max-h-[24rem] overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-5 w-5 animate-spin text-foreground/40" />
                </div>
              ) : error ? (
                <p className="px-4 py-10 text-center text-sm text-foreground/60">
                  {t.errors.somethingWrong}
                </p>
              ) : items.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-foreground/60">
                  {t.admin.noNotifications}
                </p>
              ) : (
                items.map((n) => {
                  const Icon = n.type === "reservation" ? Calendar : UserPlus
                  return (
                    <button
                      key={n.id}
                      onClick={() => openItem(n)}
                      className={`w-full flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/60 transition-colors ${
                        dir === "rtl" ? "text-right" : "text-left"
                      } ${n.read ? "" : "bg-primary/5"}`}
                    >
                      <span className="mt-0.5 w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium truncate">
                          {n.type === "reservation" ? t.reservation.newReservation : t.admin.newClient}
                        </span>
                        <span className="block text-xs text-foreground/70 truncate">
                          {n.title}
                          {n.description ? ` · ${n.description}` : ""}
                        </span>
                        <span className="block text-[11px] text-foreground/45 mt-0.5">
                          {relativeTime(n.createdAt)}
                        </span>
                      </span>
                      {!n.read && (
                        <span className="mt-2 w-2 h-2 rounded-full bg-[#a80202] shrink-0" />
                      )}
                    </button>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
