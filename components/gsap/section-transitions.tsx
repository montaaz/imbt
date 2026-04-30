"use client"

import { useEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from "@/lib/i18n/language-context"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  animation?: "fade" | "slide" | "scale" | "rotate" | "blur" | "split"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  stagger?: number
}

export function SectionTransition({
  children,
  className = "",
  animation = "fade",
  direction = "up",
  delay = 0,
  duration = 1,
  stagger = 0.1,
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const element = sectionRef.current
    const childElements = element.querySelectorAll(":scope > *")

    const getInitialState = () => {
      switch (animation) {
        case "slide":
          return {
            opacity: 0,
            x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
          }
        case "scale":
          return { opacity: 0, scale: 0.5 }
        case "rotate":
          return { opacity: 0, rotation: direction === "left" ? -45 : 45, scale: 0.8 }
        case "blur":
          return { opacity: 0, filter: "blur(20px)" }
        case "split":
          return { opacity: 0, y: 50, rotationX: 45 }
        default:
          return { opacity: 0, y: 30 }
      }
    }

    const getFinalState = () => {
      switch (animation) {
        case "slide":
          return { opacity: 1, x: 0, y: 0 }
        case "scale":
          return { opacity: 1, scale: 1 }
        case "rotate":
          return { opacity: 1, rotation: 0, scale: 1 }
        case "blur":
          return { opacity: 1, filter: "blur(0px)" }
        case "split":
          return { opacity: 1, y: 0, rotationX: 0 }
        default:
          return { opacity: 1, y: 0 }
      }
    }

    // Set initial state
    gsap.set(childElements.length > 0 ? childElements : element, getInitialState())

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    })

    tl.to(childElements.length > 0 ? childElements : element, {
      ...getFinalState(),
      duration,
      delay,
      stagger: childElements.length > 0 ? stagger : 0,
      ease: "power3.out",
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [animation, direction, delay, duration, stagger])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

// Parallax wrapper
interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    gsap.to(elementRef.current, {
      y: () => speed * 200,
      ease: "none",
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === elementRef.current) {
          trigger.kill()
        }
      })
    }
  }, [speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Text reveal animation
interface TextRevealProps {
  text: string
  className?: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

export function TextReveal({ text, className = "", as: Component = "h2" }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { dir } = useLanguage()
  const isRtl = dir === "rtl"

  useEffect(() => {
    if (!containerRef.current) return

    if (isRtl) {
      // Arabic: animate the whole element, not individual chars
      gsap.set(containerRef.current, { opacity: 0, y: 60 })
      gsap.to(containerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    } else {
      const chars = containerRef.current.querySelectorAll(".char")
      gsap.set(chars, { opacity: 0, y: 100, rotateX: -90 })
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.5,
        stagger: 0.02,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [text, isRtl])

  if (isRtl) {
    // Arabic: render as plain text — no per-character spans
    return (
      <div ref={containerRef} className="overflow-hidden perspective-1000">
        <Component className={className}>{text}</Component>
      </div>
    )
  }

  const words = text.split(" ")

  return (
    <div ref={containerRef} className="overflow-hidden perspective-1000">
      <Component className={className}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-[0.25em]">
            {word.split("").map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="char inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </span>
            ))}
          </span>
        ))}
      </Component>
    </div>
  )
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode
  className?: string
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return

    const scrollWidth = scrollRef.current.scrollWidth
    const viewportWidth = window.innerWidth

    gsap.to(scrollRef.current, {
      x: -(scrollWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollRef} className="flex">
        {children}
      </div>
    </div>
  )
}

// Counter animation
interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function Counter({ end, suffix = "", prefix = "", duration = 1.5, className = "" }: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const countRef = useRef({ value: 0 })

  useEffect(() => {
    if (!counterRef.current) return

    gsap.to(countRef.current, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === counterRef.current) {
          trigger.kill()
        }
      })
    }
  }, [end, suffix, prefix, duration])

  return (
    <span ref={counterRef} className={className}>
      {prefix}0{suffix}
    </span>
  )
}

// Magnetic hover effect
interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!magneticRef.current) return

    const element = magneticRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.2,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: "elastic.out(1, 0.3)",
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [strength])

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  )
}
