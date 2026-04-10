import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'

export default function RegisterReceiver() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    contact: '',
    location: '',
    has_disability: false,
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🌱 Umeed</h1>
        <h2 style={styles.title}>Receiver Registration</h2>
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
          <input style={styles.input} type="text" name="location"
            placeholder="Location / Area" value={formData.location}
            onChange={handleChange} required />

          <div style={styles.checkboxRow}>
            <input type="checkbox" name="has_disability"
              checked={formData.has_disability}
              onChange={handleChange} id="disability" />
            <label htmlFor="disability" style={styles.checkboxLabel}>
              I have a disability
            </label>
          </div>

          <button style={styles.btn} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register as Receiver'}
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
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f0fdf4',
  },
  card: {
    backgroundColor: 'white', padding: '40px',
    borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%', maxWidth: '400px',
  },
  logo: { textAlign: 'center', color: '#16a34a', marginBottom: '8px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '24px' },
  input: {
    width: '100%', padding: '12px', marginBottom: '16px',
    borderRadius: '8px', border: '1px solid #d1d5db',
    fontSize: '14px', boxSizing: 'border-box',
  },
  checkboxRow: {
    display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '8px'
  },
  checkboxLabel: { fontSize: '14px', color: '#374151' },
  btn: {
    width: '100%', padding: '12px', backgroundColor: '#16a34a',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '16px', cursor: 'pointer',
  },
  error: { color: 'red', textAlign: 'center', marginBottom: '12px' },
  link: { textAlign: 'center', marginTop: '12px', fontSize: '14px' },
}