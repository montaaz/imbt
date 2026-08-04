"use client"

import { useEffect, useState } from "react"

/**
 * True when the device should run a reduced set of animations.
 *
 * Covers small screens (phones, where continuously animating large blurred
 * surfaces is the main cause of jank), low-core devices, and visitors who
 * asked for reduced motion.
 *
 * Starts as `false` so server and first client render agree; the real value
 * lands right after mount, before any expensive infinite animation matters.
 */
export function useLiteAnimations() {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px), (prefers-reduced-motion: reduce)")

    const evaluate = () => {
      const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4
      setLite(query.matches || lowPower)
    }

    evaluate()
    query.addEventListener("change", evaluate)
    return () => query.removeEventListener("change", evaluate)
  }, [])

  return lite
}
