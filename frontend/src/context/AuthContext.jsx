import { createContext, useEffect, useMemo, useState } from 'react'
import { STORAGE_KEYS } from '../utils/storage'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [])

  const login = (userData, token) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))

    if (token) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
    }

    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
