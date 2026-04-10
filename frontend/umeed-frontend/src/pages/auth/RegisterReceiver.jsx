import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'
import LocationPicker from '../../components/LocationPicker'

export default function RegisterReceiver() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    contact: '',
    latitude: '',
    longitude: '',
    location: '',
    has_disability: false,
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  // Handle map location select
  const handleLocationSelect = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      location: `${lat},${lng}`,
    }))
  }

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate location
    if (!formData.latitude || !formData.longitude) {
      setError('Please select your location on the map!')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await API.post('/auth/register/receiver/', formData)
      login(res.data.user, res.data.tokens)
      navigate('/dashboard/receiver')
    } catch (err) {
      const data = err.response?.data
      const msg = Object.values(data || {}).flat().join(' ')
      setError(msg || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans bg-white text-gray-800">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-6 border-b bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
        <h2 className="text-2xl font-bold text-gray-200">🌱 Umeed</h2>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-gray-300 text-gray-800 font-bold rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate('/register/supplier')}
            className="px-5 py-2 bg-gray-300 text-gray-800 font-bold rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Join as Supplier
          </button>
        </div>
      </nav>

      {/* Form Section */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 px-4 sm:px-6 lg:px-8">

        {/* Gradient Shadow Wrapper */}
        <div className="relative w-full max-w-md sm:max-w-lg">

          {/* Gradient Shadow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 blur-xl opacity-40"></div>

          {/* Glass Card */}
          <div className="relative bg-white/20 backdrop-blur-xl border border-white/30 p-6 sm:p-8 rounded-2xl shadow-xl">

            <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              🌱 Umeed
            </h1>

            <h2 className="text-center text-gray-700 font-semibold text-lg mb-6">
              Receiver Registration
            </h2>

            {error && (
              <p className="text-red-500 text-center mb-3 text-sm">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 bg-white/40 border border-white/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-700"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 bg-white/40 border border-white/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-700"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 bg-white/40 border border-white/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-700"
              />

              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full px-3 py-3 bg-white/40 border border-white/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-700"
              />

              {/* Location Picker */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  📍 Select Your Location
                </p>

                <div className="rounded-lg overflow-hidden border">
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="has_disability"
                  checked={formData.has_disability}
                  onChange={handleChange}
                  id="disability"
                  className="w-4 h-4 accent-violet-700"
                />
                <label htmlFor="disability" className="text-sm text-gray-700">
                  I have a disability
                </label>
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Register as Receiver'}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm mt-4 text-gray-700">
              Already have account?{' '}
              <Link to="/login" className="text-indigo-700 hover:underline">
                Login here
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}