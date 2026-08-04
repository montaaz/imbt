"use client"

/**
 * Theme-aware logo.
 *
 * logo-dark.png  -> white wordmark, readable on dark backgrounds
 * logo-light.png -> black wordmark, readable on light backgrounds
 *
 * Both are rendered and toggled with CSS so the correct one is visible
 * immediately on first paint (no theme-resolution flash, no hydration mismatch).
 * Intrinsic width/height are set to reserve space and avoid layout shift.
 */
export default function Logo({
  className = "",
  alt = "IMBT Consulting",
}: {
  className?: string
  alt?: string
}) {
  return (
    <>
      <img
        src="/logo-light.png"
        alt={alt}
        width={408}
        height={160}
        className={`${className} block dark:hidden`}
      />
      <img
        src="/logo-dark.png"
        alt={alt}
        width={408}
        height={160}
        className={`${className} hidden dark:block`}
      />
    </>
  )
}
