import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

export default function ReceiverDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [myRequests, setMyRequests] = useState([])
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  // ✅ FIX: /food/my-requests/ — sirf is receiver ki requests
  const fetchMyRequests = async () => {
    setLoading(true)
    try {
      const res = await API.get('/food/my-requests/')
      setMyRequests(res.data)
    } catch (err) {
      console.error('Error fetching requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'requests') fetchMyRequests()
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍴</span>
          <h2 className="text-lg sm:text-xl font-bold">Umeed</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/80 hidden sm:block">
            👋 {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-2 px-4 sm:px-8 pt-6 pb-2 flex-wrap">
        {[
          { key: 'home', label: '🏠 Home' },
          { key: 'requests', label: '📋 My Requests' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-8 py-6">

        {/* HOME TAB */}
        {activeTab === 'home' && (
          <>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-gray-500 mb-6 text-sm">Role: Receiver</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">🍱 Available Food</h3>
                <p className="text-sm text-gray-700">Browse nearby food donations</p>
                <button
                  onClick={() => navigate('/food-list')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-lg text-sm hover:opacity-90 transition"
                >
                  View Food Listings
                </button>
              </div>

              <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">📋 My Requests</h3>
                <p className="text-sm text-gray-700">Track status of your food requests</p>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-lg text-sm hover:opacity-90 transition"
                >
                  View My Requests
                </button>
              </div>

              <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">📍 Map View</h3>
                <p className="text-sm text-gray-700">Find food points near you</p>
                <button className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg text-sm cursor-not-allowed transition">
                  Coming Soon
                </button>
              </div>
            </div>
          </>
        )}

        {/* MY REQUESTS TAB */}
        {activeTab === 'requests' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">📋 My Food Requests</h2>
              <button
                onClick={fetchMyRequests}
                className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 transition"
              >
                🔄 Refresh
              </button>
            </div>

            {loading && (
              <p className="text-center text-gray-500 py-10">⏳ Loading...</p>
            )}

            {!loading && myRequests.length === 0 && (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">📭</p>
                <p className="text-gray-500 mb-4">No requests made yet</p>
                <button
                  onClick={() => navigate('/food-list')}
                  className="px-6 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-xl text-sm font-bold hover:opacity-90"
                >
                  Browse Food
                </button>
              </div>
            )}

            <div className="space-y-4">
              {myRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-bold text-gray-800 text-lg">🍱 {req.food_name}</p>
                    <p className="text-sm text-gray-500 mt-1">📍 {req.food_location}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      🕐 Requested: {new Date(req.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                    req.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                    : req.status === 'accepted' ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                  }`}>
                    {req.status === 'pending' ? '⏳ Pending'
                      : req.status === 'accepted' ? '✅ Accepted'
                      : '❌ Rejected'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
