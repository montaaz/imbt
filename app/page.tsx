"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
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

const CustomCursor = dynamic(() => import("@/components/three/custom-cursor"), {
  ssr: false,
})

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <Preloader onLoadingComplete={() => setIsLoading(false)} />
      <AnimatePresence>
        {!isLoading && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-background"
          >
            <ScrollExperience />
            <CustomCursor />
            <Navigation />
            <Hero />
            <ServicesPreview />
            <AboutPreview />
            <CTASection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
