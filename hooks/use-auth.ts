"use client"

import { useCallback, useEffect, useState } from "react"

export interface AuthUser {
  id?: number | string
  email: string
  name: string
  role: string
}

/** Fired whenever auth data changes in this tab (storage events only fire cross-tab). */
const AUTH_EVENT = "imbt-auth-change"

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null

  const token = localStorage.getItem("token") || localStorage.getItem("client_token")
  if (!token) return null

  // Admin/manager sessions store "user", client sessions store "client".
  const raw = localStorage.getItem("user") || localStorage.getItem("client")
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (!parsed?.email) return null
    return {
      id: parsed.id,
      email: parsed.email,
      name: parsed.name || parsed.email,
      role: parsed.role || "client",
    }
  } catch {
    return null
  }
}

export function clearAuth() {
  localStorage.removeItem("token")
  localStorage.removeItem("client_token")
  localStorage.removeItem("user")
  localStorage.removeItem("client")
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_EVENT))
}

/**
 * Reads the session from localStorage and keeps it in sync across components,
 * navigations and browser tabs. `loading` stays true until the first client-side
 * read so server and first client render match (no hydration mismatch).
 */
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    setUser(readStoredUser())
    setLoading(false)
  }, [])

  useEffect(() => {
    refresh()

    window.addEventListener(AUTH_EVENT, refresh)
    window.addEventListener("storage", refresh)
    window.addEventListener("focus", refresh)

    return () => {
      window.removeEventListener(AUTH_EVENT, refresh)
      window.removeEventListener("storage", refresh)
      window.removeEventListener("focus", refresh)
    }
  }, [refresh])

  const logout = useCallback(() => {
    clearAuth()
    setUser(null)
  }, [])

  return { user, loading, isAuthenticated: !!user, logout, refresh }
}
