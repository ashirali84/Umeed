import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

export default function FoodList() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [requestedIds, setRequestedIds] = useState([])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    API.get('/food/list/')
      .then((res) => setFoods(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleRequest = async (id) => {
    try {
      await API.post(`/food/request/${id}/`, {})
      setRequestedIds((prev) => [...prev, id])
      alert('Request Sent Successfully! ✅')
    } catch (err) {
      const msg = err.response?.data?.error || 'Error sending request!'
      alert(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
        <div
          className="flex items-center gap-2 text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate('/dashboard/receiver')}
        >
          <span className="text-2xl">🍴</span>
          <span>Umeed</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm font-medium hover:bg-gray-500 transition"
        >
          Logout
        </button>
      </nav>

      {/* CONTENT */}
      <div className="px-4 sm:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">🍱 Available Food Listings</h1>
        <p className="text-gray-500 text-sm mb-6">Browse surplus food available near you</p>

        {loading && (
          <div className="text-center py-20 text-gray-500 text-lg">⏳ Loading listings...</div>
        )}

        {!loading && foods.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🍽️</p>
            <p className="text-gray-500 text-lg">No food listings available right now</p>
            <p className="text-gray-400 text-sm mt-2">Check back later!</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <div className="h-48 bg-gray-100 overflow-hidden">
                {food.food_image_url ? (
                  <img
                    src={food.food_image_url}
                    alt={food.item_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🍱
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{food.item_name}</h3>

                <div className="space-y-1 text-sm text-gray-500 mb-3">
                  <p>📍 {food.location}</p>
                  <p>📞 {food.contact_number}</p>
                  <p>👤 {food.person_name}</p>
                </div>

                {/* Time Left Badge */}
                <div className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${
                  food.time_left === 'Expired'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  ⏰ {food.time_left}
                </div>

                {/* Request Button */}
                {food.time_left !== 'Expired' && (
                  <button
                    onClick={() => handleRequest(food.id)}
                    disabled={requestedIds.includes(food.id)}
                    className={`w-full py-2 rounded-xl text-sm font-bold transition ${
                      requestedIds.includes(food.id)
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white hover:opacity-90'
                    }`}
                  >
                    {requestedIds.includes(food.id) ? '✅ Requested' : '🤲 Request Food'}
                  </button>
                )}

                {food.time_left === 'Expired' && (
                  <div className="w-full py-2 rounded-xl text-sm font-bold text-center bg-red-100 text-red-500">
                    ❌ Expired
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}