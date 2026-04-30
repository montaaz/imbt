"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TextReveal, Counter, Magnetic } from "@/components/gsap/section-transitions"
import { useLanguage } from "@/lib/i18n/language-context"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { t, dir } = useLanguage()

  useEffect(() => {
    const slideFrom = dir === 'rtl' ? 60 : -60

    const ctx = gsap.context(() => {
      gsap.to(".about-ring", {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
        stagger: { each: 5 },
      })

      gsap.to(visualRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.fromTo(
        ".value-item",
        { x: slideFrom, opacity: 0, filter: "blur(5px)" },
        {
          x: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".values-container",
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [dir])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <div className="absolute top-10 right-10 sm:top-20 sm:right-20 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 sm:bottom-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-primary text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-5 block">{t.aboutSection.title}</span>
            <TextReveal
              text={t.aboutSection.subtitle}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6 md:mb-8 leading-tight"
            />
            <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10">
              {t.aboutSection.description}
            </p>

            {/* Values */}
            <div className="values-container space-y-3 sm:space-y-4 md:space-y-5 mb-8 sm:mb-10 md:mb-12">
              {t.aboutSection.values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-item flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl glass hover:bg-card/60 transition-all duration-300 group cursor-default"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <span className="text-foreground/80 text-sm sm:text-base font-medium group-hover:text-foreground transition-colors leading-tight">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            <Magnetic strength={0.3}>
              <Link href="/a-propos" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="group w-full sm:w-auto px-5 sm:px-6 md:px-8 py-5 sm:py-6 text-sm sm:text-base md:text-lg bg-[#a80202] hover:bg-[#8a0101] text-white border-0">
                  {t.aboutSection.learnMore}
                  <ArrowRight className={`h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-10 lg:mt-0"
          >
            <div ref={visualRef} className="relative">
              {/* Main visual */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass p-6 sm:p-8 md:p-10 glow-primary">
                <div className="aspect-square relative flex items-center justify-center">
                  <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 relative">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="about-ring absolute inset-0 border-2 rounded-full"
                        style={{
                          borderColor: i % 2 === 0 ? "rgba(99, 102, 241, 0.4)" : "rgba(20, 184, 166, 0.4)",
                          transform: `scale(${1 + i * 0.18})`,
                        }}
                      />
                    ))}

                    {/* Center logo */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl absolute" />
                      <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative shadow-2xl p-4">
                        <img src="/logo.png" alt="IMBT" className="w-full h-full object-contain" />
                      </div>
                    </div>

                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`star-${i}`}
                        className="absolute hidden sm:block"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 10 + i * 3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Star
                          className="text-accent fill-accent"
                          style={{
                            transform: `translate(${60 + i * 20}px, -50%)`,
                            width: 10 + i * 2,
                            height: 10 + i * 2,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4, ease: "backOut" }}
                className={`absolute p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl glass glow-accent hover:scale-105 transition-transform cursor-default -bottom-4 sm:-bottom-6 md:-bottom-8 ${dir === 'rtl' ? '-right-4 sm:-right-6 md:-right-8' : '-left-4 sm:-left-6 md:-left-8'}`}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black gradient-text mb-1 sm:mb-2">
                  <Counter end={10} suffix="+" duration={2.5} />
                </div>
                <div className="text-xs sm:text-sm text-foreground/60 font-medium leading-tight">{t.stats.experience}</div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5, ease: "backOut" }}
                className={`absolute px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-accent to-primary text-white text-xs sm:text-sm font-bold shadow-xl -top-3 sm:-top-4 md:-top-6 ${dir === 'rtl' ? '-left-3 sm:-left-4 md:-left-6' : '-right-3 sm:-right-4 md:-right-6'}`}
              >
                {t.aboutSection.certifiedExpert}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className={`absolute top-1/4 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl glass hover:scale-105 transition-transform cursor-default ${dir === 'rtl' ? '-left-6 sm:-left-8 md:-left-12' : '-right-6 sm:-right-8 md:-right-12'}`}
              >
                <div className="text-xl sm:text-2xl font-bold gradient-text">
                  <Counter end={150} suffix="+" duration={2} />
                </div>
                <div className="text-[10px] sm:text-xs text-foreground/50 leading-tight">{t.aboutSection.projectsDelivered}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
