"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import ServicesPreview from "@/components/sections/services-preview"
import AboutPreview from "@/components/sections/about-preview"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/footer"
import Preloader from "@/components/preloader"

const ScrollExperience = dynamic(() => import("@/components/three/scroll-experience"), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  // The page is always mounted (so markup is parsed and painted while the
  // preloader overlay is still up); only the 3D backdrop waits, since it is
  // decorative and the most expensive thing on the page.
  return (
    <>
      <Preloader onLoadingComplete={() => setIsLoading(false)} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-background"
      >
        {!isLoading && <ScrollExperience />}
        <Navigation />
        <Hero />
        <ServicesPreview />
        <AboutPreview />
        <CTASection />
        <Footer />
      </motion.main>
    </>
  )
}
