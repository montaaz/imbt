"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle2, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TextReveal, Counter, Magnetic } from "@/components/gsap/section-transitions"

gsap.registerPlugin(ScrollTrigger)

const values = [
  "Approche personnalisée pour chaque client",
  "Technologies de pointe et innovation",
  "Accompagnement dans la transformation digitale",
  "Excellence opérationnelle et performance",
]

export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
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
        { x: -60, opacity: 0, filter: "blur(5px)" },
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
  }, [])

  return (
    <section ref={sectionRef} className="py-40 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-5 block">À Propos</span>
            <TextReveal
              text="Votre partenaire pour la transformation digitale"
              className="text-4xl sm:text-5xl font-bold mb-8"
            />
            <p className="text-foreground/60 text-lg leading-relaxed mb-10">
              IMBT Consulting est votre partenaire stratégique pour libérer le plein potentiel de votre entreprise. Nous
              vous accompagnons dans l'atteinte de vos objectifs, tout en vous aidant à naviguer dans l'univers complexe
              de la transformation digitale.
            </p>

            {/* Values */}
            <div className="values-container space-y-5 mb-12">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-item flex items-center gap-4 p-4 rounded-xl glass hover:bg-card/60 transition-all duration-300 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground/80 font-medium group-hover:text-foreground transition-colors">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>

            <Magnetic strength={0.3}>
              <Link href="/a-propos">
                <Button size="lg" className="group px-8 py-6 text-lg">
                  En savoir plus sur nous
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div ref={visualRef} className="relative">
              {/* Main visual */}
              <div className="relative rounded-3xl overflow-hidden glass p-10 glow-primary">
                <div className="aspect-square relative flex items-center justify-center">
                  <div className="w-80 h-80 relative">
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
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-xl absolute" />
                      <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative shadow-2xl">
                        <span className="text-4xl font-black text-white tracking-tight">IMBT</span>
                      </div>
                    </div>

                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={`star-${i}`}
                        className="absolute"
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
                            transform: `translate(${80 + i * 25}px, -50%)`,
                            width: 12 + i * 2,
                            height: 12 + i * 2,
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
                className="absolute -bottom-8 -left-8 p-8 rounded-2xl glass glow-accent hover:scale-105 transition-transform cursor-default"
              >
                <div className="text-4xl font-black gradient-text mb-2">
                  <Counter end={10} suffix="+" duration={2.5} />
                </div>
                <div className="text-sm text-foreground/60 font-medium">Années d'expérience</div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5, ease: "backOut" }}
                className="absolute -top-6 -right-6 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-white text-sm font-bold shadow-xl"
              >
                Certifié Expert
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="absolute top-1/4 -right-12 p-5 rounded-xl glass hover:scale-105 transition-transform cursor-default"
              >
                <div className="text-2xl font-bold gradient-text">
                  <Counter end={150} suffix="+" duration={2} />
                </div>
                <div className="text-xs text-foreground/50">Projets livrés</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
