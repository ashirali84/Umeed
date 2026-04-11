import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

export default function SupplierDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [myListings, setMyListings] = useState([])
  const [requests, setRequests] = useState([])
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  // ✅ FIX: /food/my-listings/ — sirf is supplier ki listings
  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await API.get('/food/my-listings/')
      setMyListings(res.data)
    } catch (err) {
      console.error('Error fetching listings:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const res = await API.get('/food/requests/')
      setRequests(res.data)
    } catch (err) {
      console.error('Error fetching requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'listings') fetchListings()
    if (activeTab === 'requests') fetchRequests()
  }, [activeTab])

  // ✅ FIX: Delete endpoint ab enabled hai
  const handleDelete = async (id) => {
    if (!window.confirm('Is food listing ko delete karna chahte hain?')) return
    try {
      await API.delete(`/food/delete/${id}/`)
      setMyListings((prev) => prev.filter((f) => f.id !== id))
    } catch (err) {
      alert('Delete karne mein error aaya!')
    }
  }

  const handleUpdateRequest = async (reqId, status) => {
    try {
      await API.post(`/food/request/update/${reqId}/`, { status })
      fetchRequests()
    } catch (err) {
      alert('Request update karne mein error aaya!')
    }
  }

  // Time left helper
  const getTimeLeft = (expiryTime) => {
    if (!expiryTime) return 'No expiry set'
    const diff = new Date(expiryTime) - new Date()
    if (diff <= 0) return 'Expired'
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    if (hours > 24) return `${Math.floor(hours / 24)} days left`
    if (hours > 0) return `${hours}h ${minutes}m left`
    return `${minutes}m left`
  }

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
          { key: 'listings', label: '📋 My Listings' },
          { key: 'requests', label: '📥 Requests' },
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
            <p className="text-gray-500 mb-6 text-sm">Role: Supplier</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">📦 Donate Food</h3>
                <p className="text-sm text-gray-700">List your surplus food for donation</p>
                <button
                  onClick={() => navigate('/add-food')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-lg text-sm hover:opacity-90 transition"
                >
                  Add Food Listing
                </button>
              </div>

              <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">📋 My Listings</h3>
                <p className="text-sm text-gray-700">View & manage your active food listings</p>
                <button
                  onClick={() => setActiveTab('listings')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-lg text-sm hover:opacity-90 transition"
                >
                  View Listings
                </button>
              </div>

              <div className="bg-white/30 backdrop-blur-xl border border-white/30 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2">📥 Food Requests</h3>
                <p className="text-sm text-gray-700">Accept or reject receiver requests</p>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-lg text-sm hover:opacity-90 transition"
                >
                  View Requests
                </button>
              </div>
            </div>
          </>
        )}

        {/* MY LISTINGS TAB */}
        {activeTab === 'listings' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">📋 My Food Listings</h2>
              <button
                onClick={() => navigate('/add-food')}
                className="px-4 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-xl text-sm font-bold hover:opacity-90"
              >
                + Add New
              </button>
            </div>

            {loading && <p className="text-center text-gray-500 py-10">⏳ Loading...</p>}

            {!loading && myListings.length === 0 && (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">📭</p>
                <p className="text-gray-500 mb-4">No listings yet. Add your first food listing!</p>
                <button
                  onClick={() => navigate('/add-food')}
                  className="px-6 py-2 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white rounded-xl text-sm font-bold hover:opacity-90"
                >
                  + Add Food
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((food) => {
                const timeLeft = getTimeLeft(food.expiry_time)
                const isExpired = timeLeft === 'Expired'
                return (
                  <div key={food.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="h-40 bg-gray-100">
                      {food.food_image_url ? (
                        <img
                          src={food.food_image_url}
                          alt={food.item_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🍱</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{food.item_name}</h3>
                      <p className="text-sm text-gray-500">📍 {food.location}</p>
                      <p className={`text-xs font-bold mt-2 ${isExpired ? 'text-red-500' : 'text-orange-500'}`}>
                        ⏰ {timeLeft}
                      </p>
                      <button
                        onClick={() => handleDelete(food.id)}
                        className="mt-3 w-full py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold hover:bg-red-100 transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">📥 Food Requests</h2>
              <button
                onClick={fetchRequests}
                className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-100 transition"
              >
                🔄 Refresh
              </button>
            </div>

            {loading && <p className="text-center text-gray-500 py-10">⏳ Loading...</p>}

            {!loading && requests.length === 0 && (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">📭</p>
                <p className="text-gray-500">No requests yet</p>
              </div>
            )}

            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="font-bold text-gray-800 text-lg">🍱 {req.food_name}</p>
                    <p className="text-sm text-gray-600 mt-1">👤 {req.receiver_name} (@{req.receiver_username})</p>
                    {req.receiver_contact && (
                      <p className="text-sm text-gray-500">📞 {req.receiver_contact}</p>
                    )}
                    <p className="text-sm text-gray-400">📍 {req.food_location}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      🕐 {new Date(req.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                      : req.status === 'accepted' ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-600'
                    }`}>
                      {req.status.toUpperCase()}
                    </span>
                    {req.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateRequest(req.id, 'accepted')}
                          className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition"
                        >
                          ✅ Accept
                        </button>
                        <button
                          onClick={() => handleUpdateRequest(req.id, 'rejected')}
                          className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
