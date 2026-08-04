"use client"

import { motion } from "framer-motion"
import { CheckCircle, TrendingUp, Users, Target, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function EtudesDeCasPage() {
  const router = useRouter()
  const { t, dir } = useLanguage()

  return (
    <div className="min-h-screen bg-background" dir={dir}>
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft className={`h-5 w-5 group-hover:-translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              <span>{t.caseStudiesPage.hero.back}</span>
            </button>

            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <span className="text-primary font-semibold">{t.caseStudiesPage.hero.badge}</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {t.caseStudiesPage.hero.title} <span className="gradient-text">{t.caseStudiesPage.hero.subtitle}</span>
              </h1>
              <p className="text-xl text-foreground/70 mb-8">
                {t.caseStudiesPage.hero.description}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-32">
            {t.caseStudiesPage.items.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                      <span className={`font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
                        {t.caseStudiesPage.sections.studyNumber}{study.id}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{study.title}</h2>
                    <p className="text-xl text-foreground/70 mb-8">{study.subtitle}</p>

                    {/* Context */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        {t.caseStudiesPage.sections.context}
                      </h3>
                      <p className="text-foreground/80">{study.context}</p>
                    </div>

                    {/* Challenges */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3">{t.caseStudiesPage.sections.challenges}</h3>
                      <ul className="space-y-2">
                        {study.challenges.map((challenge, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                            <span className="text-foreground/80">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div className="mb-8 p-6 rounded-2xl glass glow-primary">
                      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent" />
                        {t.caseStudiesPage.sections.solution}
                      </h3>
                      <p className="text-foreground/80">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="glass glow-primary rounded-3xl p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="h-6 w-6 text-accent" />
                        <h3 className="text-2xl font-bold">{t.caseStudiesPage.sections.results}</h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        {study.results.map((result, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center p-6 rounded-2xl bg-accent/10 border border-accent/20"
                          >
                            <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
                              {result.metric}
                            </div>
                            <div className="text-sm text-foreground/70">{result.description}</div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial */}
                      <div className={`relative p-6 rounded-2xl bg-muted/50 ${dir === 'rtl' ? 'border-r-4' : 'border-l-4'} border-primary`}>
                        <Users className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} h-8 w-8 text-primary/20`} />
                        <p className="text-foreground/80 italic relative z-10">"{study.testimonial}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass glow-primary rounded-3xl p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t.caseStudiesPage.sections.ctaTitle}
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              {t.caseStudiesPage.sections.ctaDescription}
            </p>
            <Link href="/contact">
              <Button size="lg" className="glow-primary group bg-[#a80202] hover:bg-[#8a0101] border-0 text-white">
                {t.caseStudiesPage.sections.ctaButton}
                <ArrowRight className={`ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180 mr-2 ml-0' : ''}`} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
