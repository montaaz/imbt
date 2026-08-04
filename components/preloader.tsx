"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "@/components/logo"

interface PreloaderProps {
  onLoadingComplete: () => void
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      clearInterval(interval)
      setProgress(100)
      setIsComplete(true)
      // Matches the exit transition below so content swaps in without a flash.
      setTimeout(onLoadingComplete, 300)
    }

    // Creep towards 90% while the page is still loading; real readiness (below)
    // is what actually dismisses the preloader.
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? prev : prev + 6))
    }, 40)

    if (document.readyState === "complete") {
      finish()
    } else {
      window.addEventListener("load", finish)
    }

    // Safety net so a slow third-party asset can never trap visitors here.
    const timeout = setTimeout(finish, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
      window.removeEventListener("load", finish)
    }
  }, [onLoadingComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                className="mb-8 flex justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Logo className="h-16 w-auto" />
              </motion.div>

              {/* Progress Bar */}
              <div className="relative w-64 h-1 bg-foreground/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Progress Text */}
              <motion.p
                className="mt-4 text-foreground/60 text-sm font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {progress}%
              </motion.p>
            </motion.div>

            {/* Animated Circles */}
            <motion.div
              className="absolute -inset-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full"
                  style={{
                    width: 100 + i * 60,
                    height: 100 + i * 60,
                    borderColor: i % 2 === 0 ? "rgba(99, 102, 241, 0.2)" : "rgba(20, 184, 166, 0.2)",
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
