import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'
import LocationPicker from '../../components/LocationPicker'

export default function RegisterSupplier() {
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
    supplier_type: 'common',
    restaurant_name: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLocationSelect = (lat, lng) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      location: `${lat},${lng}`,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.latitude || !formData.longitude) {
      setError('Please select your location on the map!')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/register/supplier/', formData)
      login(res.data.user, res.data.tokens)
      navigate('/dashboard/supplier')
    } catch (err) {
      const data = err.response?.data
      const msg = Object.values(data || {}).flat().join(' ')
      setError(msg || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🌱 Umeed</h1>
        <h2 style={styles.title}>Supplier Registration</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input style={styles.input} type="text" name="name"
            placeholder="Full Name" value={formData.name}
            onChange={handleChange} required />
          <input style={styles.input} type="text" name="username"
            placeholder="Username" value={formData.username}
            onChange={handleChange} required />
          <input style={styles.input} type="password" name="password"
            placeholder="Password" value={formData.password}
            onChange={handleChange} required />
          <input style={styles.input} type="text" name="contact"
            placeholder="Contact Number" value={formData.contact}
            onChange={handleChange} required />

          <select style={styles.input} name="supplier_type"
            value={formData.supplier_type} onChange={handleChange}>
            <option value="common">Common Man</option>
            <option value="restaurant">Restaurant</option>
          </select>

          {formData.supplier_type === 'restaurant' && (
            <input style={styles.input} type="text" name="restaurant_name"
              placeholder="Restaurant Name" value={formData.restaurant_name}
              onChange={handleChange} required />
          )}

          {/* MAP LOCATION PICKER */}
          <p style={styles.label}>📍 Select Your Location</p>
          <LocationPicker onLocationSelect={handleLocationSelect} />

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register as Supplier'}
          </button>
        </form>
        <p style={styles.link}>
          Already have account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0fdf4',
    padding: '40px 16px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '480px',
  },
  logo: { textAlign: 'center', color: '#16a34a', marginBottom: '8px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '24px' },
  label: {
    fontSize: '14px', fontWeight: 'bold',
    color: '#374151', marginBottom: '8px',
  },
  input: {
    width: '100%', padding: '12px', marginBottom: '16px',
    borderRadius: '8px', border: '1px solid #d1d5db',
    fontSize: '14px', boxSizing: 'border-box',
  },
  btn: {
    width: '100%', padding: '12px', backgroundColor: '#16a34a',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '16px', cursor: 'pointer', marginTop: '16px',
  },
  error: { color: 'red', textAlign: 'center', marginBottom: '12px' },
  link: { textAlign: 'center', marginTop: '12px', fontSize: '14px' },
}