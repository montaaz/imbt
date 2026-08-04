"use client"

/**
 * IMBT logo.
 *
 * logo-dark.png  -> white wordmark, readable on dark backgrounds
 * logo-light.png -> black wordmark, readable on light backgrounds
 *
 * Both files have transparent backgrounds, so neither shows a box on a
 * coloured surface.
 *
 * By default the pair is rendered and toggled with CSS, so the correct one is
 * visible immediately on first paint (no theme-resolution flash, no hydration
 * mismatch). Pass `variant="onColor"` for logos sitting on a saturated brand
 * surface — those stay dark in both themes, so the white wordmark always wins.
 *
 * Intrinsic width/height are set to reserve space and avoid layout shift.
 */
export default function Logo({
  className = "",
  alt = "IMBT Consulting",
  variant = "auto",
}: {
  className?: string
  alt?: string
  /** "auto" follows the theme; "onColor" always uses the white wordmark. */
  variant?: "auto" | "onColor"
}) {
  if (variant === "onColor") {
    return <img src="/logo-dark.png" alt={alt} width={408} height={160} className={className} />
  }

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
