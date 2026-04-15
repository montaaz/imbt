"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const cursorGlowRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 1024) return

    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    const glow = cursorGlowRef.current

    if (!dot || !ring || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      // Instant position update - no animation loop needed
      const transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`

      if (dot) {
        dot.style.transform = transform
      }
      if (ring) {
        ring.style.transform = transform
      }
      if (glow) {
        glow.style.transform = transform
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Track hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hoverable")
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => setIsHovering(false)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Main dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 rounded-full ${
          isClicking
            ? "w-3 h-3"
            : isHovering
              ? "w-4 h-4 mix-blend-difference"
              : "w-2 h-2 bg-foreground"
        }`}
        style={{
          willChange: "transform",
          transition: "width 0.15s ease, height 0.15s ease",
          backgroundColor: isClicking || isHovering ? '#a80202' : ''
        }}
      />

      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full border-2 ${
          isClicking
            ? "w-16 h-16 opacity-50"
            : isHovering
              ? "w-16 h-16 opacity-80"
              : "w-10 h-10 border-foreground/30 opacity-100"
        }`}
        style={{
          willChange: "transform",
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
          borderColor: isClicking || isHovering ? '#a80202' : ''
        }}
      />

      {/* Glow effect */}
      <div
        ref={cursorGlowRef}
        className={`fixed top-0 left-0 rounded-full blur-xl pointer-events-none ${
          isHovering ? "w-20 h-20" : "w-8 h-8"
        }`}
        style={{
          willChange: "transform",
          transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
          backgroundColor: isHovering ? 'rgba(168, 2, 2, 0.3)' : 'rgba(168, 2, 2, 0.2)'
        }}
      />
    </div>
  )
}
