'use client'

/**
 * DEPRECATED: This component is no longer needed.
 * Use GoogleSignInButton from '@/components/google-signin-button-simple' instead.
 *
 * The simple version uses Google Identity Services directly without requiring
 * the @react-oauth/google npm package.
 */

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  console.warn('GoogleAuthProvider is deprecated. Use google-signin-button-simple instead.')
  return <>{children}</>
}
