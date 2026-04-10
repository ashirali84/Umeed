import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ReceiverDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">

      {/* Navbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between 
      px-4 sm:px-6 lg:px-8 py-4 
      bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white shadow-md">

        <h2 className="text-lg text-gray-200 sm:text-xl font-semibold">
          🌱 Umeed
        </h2>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm font-medium hover:bg-gray-500 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">

        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          Welcome, {user?.name}! 👋
        </h1>

        <p className="text-gray-600 mb-6">
          Role: Receiver
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/30 
          p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">

            <h3 className="text-lg font-semibold mb-2">🍱 Available Food</h3>
            <p className="text-sm text-gray-700">
              Browse nearby food donations
            </p>

            <button className="mt-4 px-4 py-2 
            bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 
            text-white rounded-lg text-sm hover:opacity-90 transition">
              Coming Soon
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/30 
          p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">

            <h3 className="text-lg font-semibold mb-2">📍 Map View</h3>
            <p className="text-sm text-gray-700">
              Find food donation points near you
            </p>

            <button className="mt-4 px-4 py-2 
            bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 
            text-white rounded-lg text-sm hover:opacity-90 transition">
              Coming Soon
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white/30 backdrop-blur-xl border border-white/30 
          p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">

            <h3 className="text-lg font-semibold mb-2">📋 My Requests</h3>
            <p className="text-sm text-gray-700">
              Track your food requests
            </p>

            <button className="mt-4 px-4 py-2 
            bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 
            text-white rounded-lg text-sm hover:opacity-90 transition">
              Coming Soon
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}