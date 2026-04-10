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
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🌱 Umeed</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
      <div style={styles.content}>
        <h1 style={styles.welcome}>Welcome, {user?.name}! 👋</h1>
        <p style={styles.role}>Role: Receiver</p>
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>🍱 Available Food</h3>
            <p>Browse nearby food donations</p>
            <button style={styles.btn}>Coming Soon</button>
          </div>
          <div style={styles.card}>
            <h3>📍 Map View</h3>
            <p>Find food donation points near you</p>
            <button style={styles.btn}>Coming Soon</button>
          </div>
          <div style={styles.card}>
            <h3>📋 My Requests</h3>
            <p>Track your food requests</p>
            <button style={styles.btn}>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#eff6ff' },
  navbar: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 32px',
    backgroundColor: '#2563eb', color: 'white',
  },
  logo: { margin: 0, color: 'white' },
  logoutBtn: {
    padding: '8px 16px', backgroundColor: 'white',
    color: '#2563eb', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontWeight: 'bold',
  },
  content: { padding: '40px 32px' },
  welcome: { color: '#1e3a8a', marginBottom: '8px' },
  role: { color: '#6b7280', marginBottom: '32px' },
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: 'white', padding: '24px',
    borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  btn: {
    marginTop: '12px', padding: '10px 20px',
    backgroundColor: '#2563eb', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
  },
}