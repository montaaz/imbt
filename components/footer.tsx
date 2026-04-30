"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/imbt-consulting", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/imbt.consulting", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/IMBT.Consulting", label: "Facebook" },
]

export default function Footer() {
  const { t, dir } = useLanguage()

  const footerLinks = {
    services: [
      { label: t.footer.digitalTransformation, href: "/services#transformation" },
      { label: t.footer.webDevelopment, href: "/services#developpement" },
      { label: t.footer.training, href: "/services#formation" },
      { label: t.footer.crmErp, href: "/services#crm" },
    ],
    company: [
      { label: t.footer.about, href: "/a-propos" },
      { label: t.footer.ourValues, href: "/a-propos#valeurs" },
      { label: t.footer.caseStudies, href: "/etudes-de-cas" },
      { label: t.common.contact, href: "/contact" },
    ],
    legal: [
      { label: t.footer.privacyPolicy, href: "/politique-confidentialite" },
      { label: t.footer.legalNotice, href: "/mentions-legales" },
      { label: t.footer.termsConditions, href: "/cgv" },
    ],
  }
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img src="/logo.png" alt="IMBT Consulting" className="h-30 w-auto" />
            </Link>
            <p className="text-foreground/60 leading-relaxed mb-6 max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:text-primary-foreground transition-colors"
                  style={{
                    transition: 'background-color 0.3s, color 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#a80202'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ''
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.footer.services}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#a80202'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.footer.company}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/60 transition-colors"
                    onMouseEnter={(e) => e.currentTarget.style.color = '#a80202'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@imbt-consulting.com"
                  className="flex items-center gap-2 text-foreground/60 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#a80202'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <Mail className="h-4 w-4" />
                  contact@imbt-consulting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+21654621308"
                  className="flex items-center gap-2 text-foreground/60 transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#a80202'}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <Phone className="h-4 w-4" />
                  +21654621308
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-foreground/60">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  Tunis, Tunisia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-foreground/50 text-sm">
            © {new Date().getFullYear()} IMBT Consulting. {t.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground/50 text-sm transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.color = '#a80202'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
