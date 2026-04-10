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
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>🌱 Umeed — Admin</h2>
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
      <div style={styles.content}>
        <h1 style={styles.welcome}>Welcome, Admin! 👋</h1>
        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>👥 Manage Users</h3>
            <p>View all suppliers and receivers</p>
            <button style={styles.btn}>Coming Soon</button>
          </div>
          <div style={styles.card}>
            <h3>📦 Manage Listings</h3>
            <p>View and moderate food listings</p>
            <button style={styles.btn}>Coming Soon</button>
          </div>
          <div style={styles.card}>
            <h3>📊 Analytics</h3>
            <p>Food waste statistics</p>
            <button style={styles.btn}>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#fafafa' },
  navbar: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 32px',
    backgroundColor: '#1f2937', color: 'white',
  },
  logo: { margin: 0, color: 'white' },
  logoutBtn: {
    padding: '8px 16px', backgroundColor: 'white',
    color: '#1f2937', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontWeight: 'bold',
  },
  content: { padding: '40px 32px' },
  welcome: { color: '#1f2937', marginBottom: '32px' },
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
    backgroundColor: '#1f2937', color: 'white',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
  },
}