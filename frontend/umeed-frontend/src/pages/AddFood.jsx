import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../api/axios'

export default function AddFood() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    item_name: '',
    person_name: '',
    contact_number: '',
    location: '',
    expiry_time: '',
    safety_declaration: false,
    food_image: null,
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleFileChange = (e) => {
    setForm({ ...form, food_image: e.target.files[0] })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.safety_declaration) {
      setError('Please confirm food is safe!')
      return
    }
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData()
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== '') {
        formData.append(key, form[key])
      }
    })

    // Auto fill from user
    if (!form.person_name) formData.set('person_name', user?.name || '')
    if (!form.contact_number) formData.set('contact_number', user?.contact || '')

    try {
      await API.post('/food/create/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setSuccess('Food Listed Successfully! ✅')
      setForm({
        item_name: '', person_name: '', contact_number: '',
        location: '', expiry_time: '', safety_declaration: false, food_image: null,
      })
      setTimeout(() => navigate('/dashboard/supplier'), 1500)
    } catch (err) {
      const data = err.response?.data
      const msg = Object.values(data || {}).flat().join(' ')
      setError(msg || 'Error submitting listing!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
        <div className="flex items-center gap-2 text-white font-bold text-xl cursor-pointer"
          onClick={() => navigate('/dashboard/supplier')}>
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

      {/* FORM */}
      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">📦 Add Food Listing</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in the details to list your surplus food</p>

          {success && (
            <div className="bg-green-50 border border-green-300 text-green-700 rounded-lg px-4 py-3 mb-4 text-center font-medium">
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-600 rounded-lg px-4 py-3 mb-4 text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Food Item Name *</label>
              <input
                name="item_name" value={form.item_name}
                onChange={handleChange} required
                placeholder="e.g. Biryani, Roti, Rice..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Your Name *</label>
              <input
                name="person_name" value={form.person_name}
                onChange={handleChange} required
                placeholder={user?.name || 'Full Name'}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Contact Number *</label>
              <input
                name="contact_number" value={form.contact_number}
                onChange={handleChange} required
                placeholder={user?.contact || 'Phone Number'}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Pickup Location *</label>
              <input
                name="location" value={form.location}
                onChange={handleChange} required
                placeholder="Enter pickup address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">⏰ Expiry Time *</label>
              <input
                type="datetime-local" name="expiry_time"
                value={form.expiry_time} onChange={handleChange} required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">📷 Food Image *</label>
              <input
                type="file" accept="image/*"
                onChange={handleFileChange} required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 bg-white"
              />
            </div>

            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-3">
              <input
                type="checkbox" name="safety_declaration"
                checked={form.safety_declaration}
                onChange={handleChange}
                id="safety" className="w-4 h-4 accent-green-600"
              />
              <label htmlFor="safety" className="text-sm text-gray-700 font-medium">
                ✅ I confirm this food is safe, hygienic & fit for consumption
              </label>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white font-bold rounded-xl text-base hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? '⏳ Submitting...' : '🍱 Submit Food Listing'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}