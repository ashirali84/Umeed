import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

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
      login(res.data.user, res.data.tokens)

      const role = res.data.user.role
      if (role === 'supplier') navigate('/dashboard/supplier')
      else if (role === 'receiver') navigate('/dashboard/receiver')
      else if (role === 'admin') navigate('/dashboard/admin')
    } catch (err) {
      setError('Invalid username or password!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans bg-white text-gray-800">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-6 border-b bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
        <h2 className="text-2xl font-bold text-gray-400 m-0">🌱 Umeed</h2>
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-gray-400 text-white font-bold rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register/supplier')}
            className="px-5 py-2 bg-gray-400 text-white font-bold rounded-lg text-sm hover:bg-gray-400  transition"
          >
            Join as Supplier
          </button>
          <button
            onClick={() => navigate('/register/receiver')}
            className="px-5 py-2 bg-gray-400 text-white font-bold rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Join as Receiver
          </button>
        </div>
      </nav>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 px-4 sm:px-6 lg:px-8">
      
      
      <div className="w-full max-w-md bg-gray-200  shadow-red-900 p-6 sm:p-8 rounded-xl shadow-lg">
        
        {/* Logo */}
        <h1 className="text-center text-5xl sm:text-2xl font-bold text-gray-700 mb-4">
          🌱 Umeed
        </h1>

        <h2 className="text-center text-gray-700 font-bold text-4xl sm:text-lg mb-10">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-3 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-900"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-900"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600  text-white rounded-lg text-sm sm:text-base font-medium hover:bg-violet-900 transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 space-y-2 font-bold text-center text-sm">
          <p>
            Supplier Registration?{' '}
            <Link
              to="/register/supplier"
              className="text-violet-900 hover:underline"
            >
              Register here
            </Link>
          </p>

          <p>
            Receiver Registration?{' '}
            <Link
              to="/register/receiver"
              className="text-red-800 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>

      </div>
    </div>
    </div>
  )
}