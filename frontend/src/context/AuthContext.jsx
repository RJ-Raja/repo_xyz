import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { authService } from '../services/authService'
import { tokenStorage } from '../utils/tokenStorage'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = tokenStorage.getUser()

    if (storedUser) {
      setUser(storedUser)
    }

    setIsLoading(false)
  }, [])

  const login = useCallback((userData, token) => {
    if (token) {
      tokenStorage.setToken(token)
    }

    tokenStorage.setUser(userData)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    tokenStorage.clear()
    setUser(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    const response = await authService.profile()
    tokenStorage.setUser(response.user)
    setUser(response.user)
    return response.user
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      refreshProfile,
    }),
    [user, isLoading, login, logout, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
