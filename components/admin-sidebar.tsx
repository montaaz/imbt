"use client"

import { Calendar, Users, TrendingUp, Settings, LogOut, Menu, X, FileText } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { useLanguage } from "@/lib/i18n/language-context"
import { ModeToggle } from "@/components/mode-toggle"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, dir } = useLanguage()
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  const navItems = [
    { href: "/admin", icon: Calendar, label: t.admin.dashboard },
    { href: "/admin/clients", icon: Users, label: t.admin.manageClients },
    { href: "/admin/blog", icon: FileText, label: t.admin.blogManagement },
    { href: "/admin/stats", icon: TrendingUp, label: t.admin.statistics },
    { href: "/admin/settings", icon: Settings, label: t.admin.settings },
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between mb-10">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="IMBT Consulting" className="h-8 w-auto" />
          <span className="text-xs text-foreground/50">Admin</span>
        </Link>
        <ModeToggle />
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/60 hover:bg-muted"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className={`absolute bottom-6 ${dir === 'rtl' ? 'right-6 left-6' : 'left-6 right-6'}`}>
        <div className="p-4 rounded-xl bg-muted mb-4">
          <p className="font-medium text-sm">{user?.name || "Admin"}</p>
          <p className="text-xs text-foreground/50">{user?.role === 'admin' ? t.auth.administrator : t.auth.manager}</p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="w-full bg-transparent">
          <LogOut className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
          {t.common.logout}
        </Button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`fixed top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} z-50 p-2 rounded-xl bg-card border border-border lg:hidden`}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className={`fixed ${dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} top-0 bottom-0 w-64 bg-card border-border p-6 hidden lg:block z-40`}>
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: dir === 'rtl' ? 280 : -280 }}
              animate={{ x: 0 }}
              exit={{ x: dir === 'rtl' ? 280 : -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed ${dir === 'rtl' ? 'right-0 border-l' : 'left-0 border-r'} top-0 bottom-0 w-64 bg-card border-border p-6 z-50 lg:hidden`}
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
