import { STORAGE_KEYS } from './storage'

export const tokenStorage = {
  getToken: () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
  setToken: (token) => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),
  removeToken: () => localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  },
  setUser: (user) => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  removeUser: () => localStorage.removeItem(STORAGE_KEYS.USER),
  clear: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  },
}
