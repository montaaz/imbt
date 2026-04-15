"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageSelector from "@/components/language-selector"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navItems = [
    { href: "/", label: t.common.home },
    { href: "/services", label: t.common.services },
    { href: "/a-propos", label: t.common.about },
    { href: "/blog", label: t.common.blog },
    {
      label: t.common.ourCabinet,
      submenu: [
        { href: "/etudes-de-cas", label: "Études de cas" },
        { href: "/politique-confidentialite", label: "Politique de confidentialité" },
      ]
    },
    { href: "/reservation", label: t.common.reservation },
    { href: "/contact", label: t.common.contact },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-6"}`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="relative group">
            <motion.span
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              IMBT
            </motion.span>
            <span className="text-foreground/60 text-sm ml-2 hidden sm:inline">{t.nav.consulting}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
                    {item.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl p-2 shadow-xl"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-3 rounded-xl text-sm hover:bg-accent/10 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={item.href} href={item.href} className="relative group">
                  <span
                    className={`text-sm font-medium transition-colors ${
                      pathname === item.href ? "text-foreground/70 hover:text-foreground" : "text-foreground/70 hover:text-foreground"
                    }`}
                    style={pathname === item.href ? { color: '#a80202' } : {}}
                  >
                    {item.label}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-[#a80202]"
                    initial={{ width: 0 }}
                    animate={{ width: pathname === item.href ? "100%" : 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSelector />
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm" className="hover:bg-[#a80202]/10">
                {t.common.login}
              </Button>
            </Link>
            <Link href="/reservation">
              <Button size="sm" className="bg-[#a80202] hover:bg-[#8a0101] text-white border-0">
                {t.common.reserve}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
            <motion.nav
              className="absolute right-0 top-0 bottom-0 w-80 bg-card p-8 pt-24 flex flex-col gap-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href || item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.submenu ? (
                    <div>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="text-2xl font-medium flex items-center gap-2 py-2 text-foreground/70 w-full"
                      >
                        {item.label}
                        <ChevronDown className={`h-5 w-5 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-4 mt-2 space-y-2 overflow-hidden"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setIsOpen(false)}
                                className={`text-lg block py-2 ${
                                  pathname === subItem.href ? "" : "text-foreground/60"
                                }`}
                                style={pathname === subItem.href ? { color: '#a80202' } : {}}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-medium block py-2 ${
                        pathname === item.href ? "" : "text-foreground/70"
                      }`}
                      style={pathname === item.href ? { color: '#a80202' } : {}}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <div className="mt-auto flex flex-col gap-3">
                <div className="mb-3">
                  <LanguageSelector />
                </div>
                <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full bg-transparent hover:bg-[#a80202]/10">
                    {t.common.login}
                  </Button>
                </Link>
                <Link href="/reservation" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#a80202] hover:bg-[#8a0101] text-white border-0">{t.common.reserve}</Button>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
