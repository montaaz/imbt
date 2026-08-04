"use client"

import { useEffect } from "react"
import { gsap } from "gsap"

/**
 * Tames infinitely-looping GSAP tweens on phones, low-core devices and for
 * visitors who asked for reduced motion.
 *
 * The decorative sections each start their own `repeat: -1` loops (rotating
 * rings, floating particles, pulsing glows). Individually they are cheap, but
 * together they keep the compositor busy every frame, which is what makes
 * scrolling feel laggy on mobile.
 *
 * Rather than patching GSAP's API, this walks the globalTimeline's children and
 * stops the repeating ones, then keeps watching for any started later. Entrance
 * animations do not repeat, so they are left untouched.
 */
export default function GsapPerformanceGuard() {
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1023px), (prefers-reduced-motion: reduce)")
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4

    if (!query.matches && !lowPower) return

    const settleLoopingTweens = () => {
      gsap.globalTimeline.getChildren(true, true, true).forEach((tween: any) => {
        if (typeof tween.repeat === "function" && tween.repeat() === -1) {
          // Send it to its resting state and stop burning frames on it.
          tween.progress(1).pause()
        }
      })
    }

    // Sections mount over several frames, so sweep a few times as they appear.
    settleLoopingTweens()
    const timers = [100, 400, 1200, 2500].map((ms) => setTimeout(settleLoopingTweens, ms))

    return () => timers.forEach(clearTimeout)
  }, [])

  return null
}
