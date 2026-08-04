'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { notifyAuthChange } from '@/hooks/use-auth'

interface GoogleSignInButtonProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    google?: any
  }
}

/** True when Google OAuth is configured, so callers can hide "OR" separators. */
export const isGoogleSignInEnabled = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const GSI_SRC = 'https://accounts.google.com/gsi/client'

/**
 * Loads the Google Identity Services script once per page and resolves when
 * it is ready. The script is shared, so it is never removed on unmount —
 * doing so would break any other sign-in button still mounted.
 */
let gsiPromise: Promise<void> | null = null

function loadGsiScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.google?.accounts?.id) return Promise.resolve()

  if (!gsiPromise) {
    gsiPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSI_SRC}"]`)
      if (existing) {
        existing.addEventListener('load', () => resolve())
        existing.addEventListener('error', () => reject(new Error('GSI script failed to load')))
        return
      }

      const script = document.createElement('script')
      script.src = GSI_SRC
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => {
        gsiPromise = null
        reject(new Error('GSI script failed to load'))
      }
      document.head.appendChild(script)
    })
  }

  return gsiPromise
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  // Keep callbacks in a ref so the GSI callback always sees the latest props
  // without needing to re-initialize the library.
  const handlersRef = useRef({ onSuccess, onError })
  useEffect(() => {
    handlersRef.current = { onSuccess, onError }
  }, [onSuccess, onError])

  const handleCredentialResponse = useCallback(
    async (response: any) => {
      setIsLoading(true)
      try {
        // Decode the ID token payload to read the profile claims.
        const base64Url = response.credential.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        const userInfo = JSON.parse(jsonPayload)

        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userInfo.email,
            firstName: userInfo.given_name,
            lastName: userInfo.family_name,
            emailVerified: userInfo.email_verified,
            googleId: userInfo.sub,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed')
        }

        localStorage.setItem('client_token', data.token)
        localStorage.setItem(
          'client',
          JSON.stringify({
            id: data.client.id,
            email: data.client.email,
            name: `${data.client.firstName} ${data.client.lastName}`,
          })
        )

        notifyAuthChange()

        if (handlersRef.current.onSuccess) {
          handlersRef.current.onSuccess()
        } else {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Google sign-in error:', error)
        const message = error instanceof Error ? error.message : 'Google sign-in failed'
        handlersRef.current.onError?.(message)
      } finally {
        setIsLoading(false)
      }
    },
    [router]
  )

  useEffect(() => {
    if (!clientId) return

    let cancelled = false

    loadGsiScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.google?.accounts?.id) return

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        })

        // Render Google's own button. Unlike `prompt()` (One Tap), this always
        // opens the account chooser on click — One Tap is silently suppressed
        // by browsers that block third-party cookies or if it was dismissed.
        window.google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'center',
          width: containerRef.current.offsetWidth || 320,
        })
      })
      .catch((error) => {
        console.error('Google sign-in unavailable:', error)
      })

    // GSI reports an unauthorized origin only to the console, and renders
    // nothing. Surface an actionable hint in development instead.
    const originCheck = setTimeout(() => {
      if (cancelled || process.env.NODE_ENV !== 'development') return
      if (containerRef.current && containerRef.current.childElementCount === 0) {
        console.warn(
          `[Google Sign-In] The button did not render. Add "${window.location.origin}" to ` +
            '"Authorized JavaScript origins" for this OAuth client at ' +
            'https://console.cloud.google.com/apis/credentials, then hard-refresh.'
        )
      }
    }, 3000)

    return () => {
      cancelled = true
      clearTimeout(originCheck)
    }
  }, [clientId, handleCredentialResponse])

  // Google OAuth is optional. When no client ID is configured we render nothing
  // rather than exposing a setup warning to end users — email/password signup
  // remains fully functional.
  if (!clientId) {
    return null
  }

  return (
    <div className="w-full">
      {/* Google replaces this node with its own rendered button. */}
      <div ref={containerRef} className="flex justify-center [color-scheme:light]" />
      {isLoading && (
        <div className="mt-2 flex items-center justify-center text-sm text-foreground/60">
          <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
          Connexion...
        </div>
      )}
    </div>
  )
}
