"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react"

const footerLinks = {
  services: [
    { label: "Transformation Digitale", href: "/services#transformation" },
    { label: "Développement Web", href: "/services#developpement" },
    { label: "Formation", href: "/services#formation" },
    { label: "CRM & ERP", href: "/services#crm" },
  ],
  company: [
    { label: "À Propos", href: "/a-propos" },
    { label: "Nos Valeurs", href: "/a-propos#valeurs" },
    { label: "Carrières", href: "/carrieres" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions Légales", href: "/mentions-legales" },
    { label: "Politique de Confidentialité", href: "/confidentialite" },
    { label: "CGV", href: "/cgv" },
  ],
}

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
]

export default function Footer() {
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-bold gradient-text">IMBT</span>
              <span className="text-foreground/60 ml-2">Consulting</span>
            </Link>
            <p className="text-foreground/60 leading-relaxed mb-6 max-w-sm">
              Votre partenaire stratégique pour libérer le plein potentiel de votre entreprise dans l'univers de la
              transformation digitale.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-foreground/60 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@imbt-consulting.com"
                  className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  contact@imbt-consulting.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+21654621308"
                  className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
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
            © {new Date().getFullYear()} IMBT Consulting. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-foreground/50 text-sm hover:text-primary transition-colors"
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
