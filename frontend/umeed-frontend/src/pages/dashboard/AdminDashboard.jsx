import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-gray-800 text-white shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold">
          🌱 Umeed — Admin
        </h2>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-white text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Welcome, Admin! 👋
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">👥 Manage Users</h3>
            <p className="text-sm text-gray-600">
              View all suppliers and receivers
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition">
              Coming Soon
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">📦 Manage Listings</h3>
            <p className="text-sm text-gray-600">
              View and moderate food listings
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition">
              Coming Soon
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-lg font-semibold mb-2">📊 Analytics</h3>
            <p className="text-sm text-gray-600">
              Food waste statistics
            </p>
            <button className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition">
              Coming Soon
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}