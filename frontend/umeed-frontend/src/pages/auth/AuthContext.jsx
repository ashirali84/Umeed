import { createContext, useContext, useState, useEffect } from 'react'
import API from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ localStorage se user restore karo on page refresh
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.clear()
      }
    }
    setLoading(false)
  }, [])

  // ✅ FIX: login function tokens properly save karta hai
  const login = (userData, tokens) => {
    if (tokens?.access) {
      localStorage.setItem('access_token', tokens.access)
    }
    if (tokens?.refresh) {
      localStorage.setItem('refresh_token', tokens.refresh)
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = async () => {
    try {
      await API.post('/auth/logout/')
    } catch {
      // ignore logout API error
    }
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
