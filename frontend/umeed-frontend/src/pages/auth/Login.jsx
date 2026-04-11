import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await API.post('/auth/login/', formData)

      // ✅ FIX: res.data.tokens ab available hai
      const { user, tokens } = res.data
      login(user, tokens)

      // Role ke hisaab se redirect
      if (user.role === 'supplier') navigate('/dashboard/supplier')
      else if (user.role === 'receiver') navigate('/dashboard/receiver')
      else if (user.role === 'admin') navigate('/dashboard/admin')
      else navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.error || 'Invalid username or password!'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans bg-white text-gray-800">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-6 border-b bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <span className="text-2xl" role="img" aria-label="fork-and-spoon">🍴</span>
          <span className="font-sans tracking-wide">Umeed</span>
        </div>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-white/20 text-white font-bold rounded-lg text-sm hover:bg-white/30 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register/supplier')}
            className="px-5 py-2 bg-white/20 text-white font-bold rounded-lg text-sm hover:bg-white/30 transition"
          >
            Join as Supplier
          </button>
          <button
            onClick={() => navigate('/register/receiver')}
            className="px-5 py-2 bg-white/20 text-white font-bold rounded-lg text-sm hover:bg-white/30 transition"
          >
            Join as Receiver
          </button>
        </div>
      </nav>

      {/* LOGIN FORM */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white shadow-xl p-6 sm:p-8 rounded-2xl">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl" role="img" aria-label="fork-and-spoon">🍴</span>
            <span className="font-sans text-gray-700 font-bold text-xl tracking-wide">Umeed</span>
          </div>

          <h2 className="text-gray-800 font-bold text-2xl mb-6">
            Login to your account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Logging in...' : 'Login'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-5 space-y-2 text-center text-sm">
            <p className="text-gray-600">
              Supplier Registration?{' '}
              <Link to="/register/supplier" className="text-violet-700 font-semibold hover:underline">
                Register here
              </Link>
            </p>
            <p className="text-gray-600">
              Receiver Registration?{' '}
              <Link to="/register/receiver" className="text-red-700 font-semibold hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
