import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../../api/axios'

export default function AdminDashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [listings, setListings] = useState([])
  const [activeTab, setActiveTab] = useState('home')
  const [loading, setLoading] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }

  // ✅ FIX: Admin API endpoints ab enabled hain backend mein
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await API.get('/admin-api/users/')
      setUsers(res.data)
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchListings = async () => {
    setLoading(true)
    try {
      const res = await API.get('/admin-api/listings/')
      setListings(res.data)
    } catch (err) {
      console.error('Error fetching listings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'users') fetchUsers()
    if (activeTab === 'listings') fetchListings()
  }, [activeTab])

  const suppliers = users.filter((u) => u.role === 'supplier')
  const receivers = users.filter((u) => u.role === 'receiver')

  const getTimeLeft = (expiryTime) => {
    if (!expiryTime) return 'No expiry'
    const diff = new Date(expiryTime) - new Date()
    if (diff <= 0) return 'Expired'
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours > 24) return `${Math.floor(hours / 24)} days left`
    return `${hours}h left`
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-gray-800 text-white shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌱</span>
          <h2 className="text-lg font-bold">Umeed — Admin Panel</h2>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-2 px-4 sm:px-8 pt-6 pb-2 flex-wrap">
        {[
          { key: 'home', label: '🏠 Home' },
          { key: 'users', label: '👥 Users' },
          { key: 'listings', label: '📦 Listings' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === tab.key
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="px-4 sm:px-8 py-6">

        {/* HOME */}
        {activeTab === 'home' && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard 👋</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <p className="text-4xl font-extrabold text-violet-700">{suppliers.length || '—'}</p>
                <p className="text-gray-500 mt-2 font-medium">Total Suppliers</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <p className="text-4xl font-extrabold text-indigo-600">{receivers.length || '—'}</p>
                <p className="text-gray-500 mt-2 font-medium">Total Receivers</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <p className="text-4xl font-extrabold text-green-600">{listings.length || '—'}</p>
                <p className="text-gray-500 mt-2 font-medium">Total Listings</p>
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setActiveTab('users')}
                className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition"
              >
                👥 View All Users
              </button>
              <button
                onClick={() => setActiveTab('listings')}
                className="px-5 py-2 bg-gray-800 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition"
              >
                📦 View All Listings
              </button>
            </div>
          </>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">👥 All Users ({users.length})</h2>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition"
              >
                🔄 Refresh
              </button>
            </div>
            {loading && <p className="text-center text-gray-500 py-10">⏳ Loading...</p>}
            <div className="overflow-x-auto rounded-2xl shadow-md">
              <table className="w-full bg-white overflow-hidden">
                <thead className="bg-gray-800 text-white text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Username</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Contact</th>
                    <th className="px-4 py-3 text-left">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t hover:bg-gray-50 text-sm">
                      <td className="px-4 py-3 font-medium">{u.name}</td>
                      <td className="px-4 py-3 text-gray-500">{u.username}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          u.role === 'supplier'
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{u.contact || '—'}</td>
                      <td className="px-4 py-3 text-gray-500">{u.location || '—'}</td>
                    </tr>
                  ))}
                  {!loading && users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-gray-400">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* LISTINGS */}
        {activeTab === 'listings' && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">📦 All Food Listings ({listings.length})</h2>
              <button
                onClick={fetchListings}
                className="px-4 py-2 bg-white text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition"
              >
                🔄 Refresh
              </button>
            </div>
            {loading && <p className="text-center text-gray-500 py-10">⏳ Loading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((food) => {
                const timeLeft = getTimeLeft(food.expiry_time)
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
                      <h3 className="font-bold text-gray-800">{food.item_name}</h3>
                      <p className="text-sm text-gray-500">📍 {food.location}</p>
                      <p className="text-sm text-gray-500">👤 {food.person_name}</p>
                      <p className={`text-xs font-bold mt-2 ${
                        timeLeft === 'Expired' ? 'text-red-500' : 'text-orange-500'
                      }`}>
                        ⏰ {timeLeft}
                      </p>
                    </div>
                  </div>
                )
              })}
              {!loading && listings.length === 0 && (
                <div className="col-span-3 text-center py-16 text-gray-400">
                  <p className="text-4xl mb-2">📭</p>
                  No listings found
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
