import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={styles.wrapper}>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>🌱 Umeed</h2>
        <div style={styles.navLinks}>
          <button style={styles.navBtn} onClick={() => navigate('/login')}>Login</button>
          <button style={styles.navBtnOutline} onClick={() => navigate('/register/supplier')}>
            Join as Supplier
          </button>
          <button style={styles.navBtnOutline} onClick={() => navigate('/register/receiver')}>
            Join as Receiver
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>🇮🇳 Made for India</span>
          <h1 style={styles.heroTitle}>
            Surplus Food,<br />
            <span style={styles.highlight}>Not Wasted.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Umeed connects restaurants, households, and individuals
            with surplus food to those who need it most —
            reducing waste, fighting hunger, one meal at a time.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.primaryBtn} onClick={() => navigate('/register/supplier')}>
              🍽️ Donate Food
            </button>
            <button style={styles.secondaryBtn} onClick={() => navigate('/register/receiver')}>
              🤲 Receive Food
            </button>
          </div>
        </div>

        <div style={styles.heroIllustration}>
          <div style={styles.illustrationBox}>
            <span style={styles.bigEmoji}>🍱</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>78M+</h2>
          <p style={styles.statLabel}>Tonnes of food wasted in India yearly</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>20Cr+</h2>
          <p style={styles.statLabel}>Indians go to bed hungry every day</p>
        </div>
        <div style={styles.statCard}>
          <h2 style={styles.statNumber}>40%</h2>
          <p style={styles.statLabel}>Food produced never reaches a plate</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howSection}>
        <h2 style={styles.sectionTitle}>How Umeed Works</h2>
        <div style={styles.stepsGrid}>
          <div style={styles.stepCard}>
            <span style={styles.stepEmoji}>📝</span>
            <h3>Register</h3>
            <p>Sign up as a Supplier or Receiver in under 2 minutes</p>
          </div>
          <div style={styles.stepCard}>
            <span style={styles.stepEmoji}>📦</span>
            <h3>List or Browse</h3>
            <p>Suppliers list surplus food. Receivers browse nearby listings.</p>
          </div>
          <div style={styles.stepCard}>
            <span style={styles.stepEmoji}>📍</span>
            <h3>Locate</h3>
            <p>Find food donation points on the live map near you</p>
          </div>
          <div style={styles.stepCard}>
            <span style={styles.stepEmoji}>🤝</span>
            <h3>Connect</h3>
            <p>Coordinate pickup and reduce food waste together</p>
          </div>
        </div>
      </section>

      {/* FOR SECTION */}
      <section style={styles.forSection}>
        <h2 style={styles.sectionTitle}>Who is Umeed for?</h2>
        <div style={styles.forGrid}>
          <div style={styles.forCard}>
            <span style={styles.stepEmoji}>🏪</span>
            <h3>Restaurants & Caterers</h3>
            <p>Donate your daily surplus food instead of throwing it away</p>
          </div>
          <div style={styles.forCard}>
            <span style={styles.stepEmoji}>🏠</span>
            <h3>Households</h3>
            <p>Have leftover food from events or celebrations? Share it!</p>
          </div>
          <div style={styles.forCard}>
            <span style={styles.stepEmoji}>🏥</span>
            <h3>Shelters & NGOs</h3>
            <p>Receive food donations directly from nearby suppliers</p>
          </div>
          <div style={styles.forCard}>
            <span style={styles.stepEmoji}>👤</span>
            <h3>Individuals in Need</h3>
            <p>Find free or affordable food available near your location</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to make a difference?</h2>
        <p style={styles.ctaSubtitle}>
          Join Umeed today and help us build a hunger-free India
        </p>
        <div style={styles.heroBtns}>
          <button style={styles.primaryBtn} onClick={() => navigate('/register/supplier')}>
            Start Donating
          </button>
          <button style={styles.secondaryBtn} onClick={() => navigate('/register/receiver')}>
            Find Food Near Me
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>🌱 Umeed — Spreading Hope, One Meal at a Time</p>
        <p style={styles.footerSub}>Made with ❤️ at HackHorizon 2K26 · ARKA JAIN University</p>
      </footer>

    </div>
  )
}

const styles = {
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: '#ffffff',
    color: '#1f2937',
  },

  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 48px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    position: 'sticky',
    top: 0,
  },

  logo: {
    margin: 0,
    color: '#190b30',
    fontSize: '30px',
    fontWeight: '900',
  },

  navLinks: { display: 'flex', gap: '12px' },

  navBtn: {
    padding: '10px 22px',
    background: 'linear-gradient(135deg, #110820, #2c0b0b)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
  },

  navBtnOutline: {
    padding: '10px 22px',
    background: 'transparent',
    color: '#140b23',
    border: '2px solid #150929',
    borderRadius: '10px',
    fontWeight: '700',
  },

  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '80px 48px',
    background: 'linear-gradient(135deg, #646464, #968f8f)',
  },

  heroTitle: {
    fontSize: '64px',
    fontWeight: '900',
  },

  highlight: {
    color: '#110721',
  },

  primaryBtn: {
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #1a0935, #400e0e)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontWeight: '800',
  },

  secondaryBtn: {
    padding: '16px 32px',
    border: '2px solid #200f3c',
    color: '#180832',
    borderRadius: '12px',
    fontWeight: '700',
  },

  statsSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '60px',
    background: 'linear-gradient(135deg, #6d28d9, #7f1d1d)',
    color: 'white',
  },

  statNumber: {
    fontSize: '56px',
    fontWeight: '900',
  },

  sectionTitle: {
    fontSize: '44px',
    fontWeight: '800',
  },

  footer: {
    padding: '32px',
    backgroundColor: '#1f2937',
    color: 'white',
    textAlign: 'center',
  },
}
