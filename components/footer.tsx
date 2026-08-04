"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Youtube } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Logo from "@/components/logo"

/** lucide-react ships no TikTok glyph, so we inline the official mark. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.19v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.2-2.51v-3.2a5.79 5.79 0 0 0-.61-.04A5.79 5.79 0 0 0 4 15.31 5.79 5.79 0 0 0 9.79 21.1a5.79 5.79 0 0 0 5.79-5.79V9.01a7.45 7.45 0 0 0 4.35 1.39V7.21a4.28 4.28 0 0 1-3.33-1.39z" />
    </svg>
  )
}

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/imbt-consulting", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/imbt.consulting", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/IMBT.Consulting", label: "Facebook" },
  { icon: TikTokIcon, href: "https://www.tiktok.com/@imbt.consulting", label: "TikTok" },
  { icon: Youtube, href: "https://www.youtube.com/@IMBT-Consulting", label: "YouTube" },
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
              <Logo className="h-30 w-auto" />
            </Link>
            <p className="text-foreground/60 leading-relaxed mb-6 max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
                  Immeuble Omar bloc A bureau 3-2 Montplaisir 1073, Tunis, Tunisie
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
