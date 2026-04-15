'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

interface GoogleSignInButtonProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

declare global {
  interface Window {
    google?: any
  }
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  useEffect(() => {
    if (!clientId) return

    // Load Google Identity Services script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => {
      setIsReady(true)
      initializeGoogleSignIn()
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [clientId])

  const initializeGoogleSignIn = () => {
    if (!window.google || !clientId) return

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: handleCredentialResponse,
    })
  }

  const handleCredentialResponse = async (response: any) => {
    setIsLoading(true)
    try {
      // Decode JWT to get user info
      const base64Url = response.credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
      const userInfo = JSON.parse(jsonPayload)

      // Send to our backend
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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

      // Store token
      localStorage.setItem('client_token', data.token)
      localStorage.setItem(
        'client',
        JSON.stringify({
          id: data.client.id,
          email: data.client.email,
          name: `${data.client.firstName} ${data.client.lastName}`,
        })
      )

      // Success callback
      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Google sign-in error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed'
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    if (!window.google || !isReady) return
    window.google.accounts.id.prompt()
  }

  if (!clientId) {
    return (
      <div className="w-full p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-sm text-center">
        ⚠️ Google sign-in non configuré. Ajoutez NEXT_PUBLIC_GOOGLE_CLIENT_ID à .env.local
      </div>
    )
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300"
      onClick={handleClick}
      disabled={isLoading || !isReady}
    >
      {isLoading ? (
        <>
          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin mr-2" />
          Connexion...
        </>
      ) : (
        <>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuer avec Google
        </>
      )}
    </Button>
  )
}
