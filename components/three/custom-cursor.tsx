"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 1024) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    const ring = cursorRingRef.current

    if (!cursor || !dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
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

    // Animation loop
    const animate = () => {
      // Smooth follow for dot
      dotX += (mouseX - dotX) * 0.2
      dotY += (mouseY - dotY) * 0.2

      // Slower follow for ring
      ringX += (mouseX - ringX) * 0.08
      ringY += (mouseY - ringY) * 0.08

      if (dot) {
        dot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }

      if (ring) {
        ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }

      requestAnimationFrame(animate)
    }

    animate()

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
    <div ref={cursorRef} className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      {/* Main dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 ${
          isClicking
            ? "w-3 h-3 bg-accent"
            : isHovering
              ? "w-4 h-4 bg-primary mix-blend-difference"
              : "w-2 h-2 bg-foreground"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 rounded-full border-2 transition-all duration-300 ${
          isClicking
            ? "w-16 h-16 border-accent opacity-50"
            : isHovering
              ? "w-16 h-16 border-primary opacity-80"
              : "w-10 h-10 border-foreground/30 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Glow effect */}
      <div
        ref={(el) => {
          if (el && cursorDotRef.current) {
            // Follow the dot position for glow
          }
        }}
        className={`fixed top-0 left-0 rounded-full blur-xl transition-all duration-200 pointer-events-none ${
          isHovering ? "w-20 h-20 bg-primary/30" : "w-8 h-8 bg-primary/20"
        }`}
        style={{
          transform: cursorDotRef.current?.style.transform,
          willChange: "transform",
        }}
      />
    </div>
  )
}
