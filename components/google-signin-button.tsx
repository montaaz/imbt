'use client'

/**
 * DEPRECATED: This component requires @react-oauth/google npm package.
 * Use GoogleSignInButton from '@/components/google-signin-button-simple' instead.
 *
 * The simple version uses Google Identity Services directly without requiring
 * any npm package installation.
 *
 * This file is kept for backward compatibility but will just render nothing.
 */

import { Button } from '@/components/ui/button'

interface GoogleSignInButtonProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function GoogleSignInButton({ onSuccess, onError }: GoogleSignInButtonProps) {
  console.warn('This GoogleSignInButton is deprecated. Use google-signin-button-simple instead.')

  return (
    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-sm">
      ⚠️ Google sign-in requires package installation. Please use the simple version instead.
    </div>
  )
}
