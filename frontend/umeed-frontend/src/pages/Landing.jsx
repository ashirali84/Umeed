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

      {/* HERO SECTION */}
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
            <button
              style={styles.primaryBtn}
              onClick={() => navigate('/register/supplier')}
            >
              🍽️ Donate Food
            </button>
            <button
              style={styles.secondaryBtn}
              onClick={() => navigate('/register/receiver')}
            >
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

      {/* STATS SECTION */}
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

      {/* WHO IS IT FOR */}
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

      {/* CTA SECTION */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to make a difference?</h2>
        <p style={styles.ctaSubtitle}>
          Join Umeed today and help us build a hunger-free India
        </p>
        <div style={styles.heroBtns}>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate('/register/supplier')}
          >
            Start Donating
          </button>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate('/register/receiver')}
          >
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

  // NAVBAR
  navbar: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '16px 48px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    position: 'sticky', top: 0, zIndex: 100,
  },
  logo: { margin: 0, color: '#16a34a', fontSize: '24px' },
  navLinks: { display: 'flex', gap: '12px', alignItems: 'center' },
  navBtn: {
    padding: '8px 20px', backgroundColor: '#16a34a',
    color: 'white', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontWeight: 'bold', fontSize: '14px',
  },
  navBtnOutline: {
    padding: '8px 20px', backgroundColor: 'transparent',
    color: '#16a34a', border: '2px solid #16a34a',
    borderRadius: '8px', cursor: 'pointer',
    fontWeight: 'bold', fontSize: '14px',
  },

  // HERO
  hero: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: '80px 48px',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    minHeight: '85vh',
  },
  heroContent: { maxWidth: '600px' },
  badge: {
    display: 'inline-block',
    backgroundColor: '#bbf7d0', color: '#166534',
    padding: '6px 16px', borderRadius: '999px',
    fontSize: '14px', fontWeight: 'bold', marginBottom: '20px',
  },
  heroTitle: {
    fontSize: '56px', fontWeight: '800',
    lineHeight: '1.2', marginBottom: '20px', color: '#1f2937',
  },
  highlight: { color: '#16a34a' },
  heroSubtitle: {
    fontSize: '18px', color: '#4b5563',
    lineHeight: '1.7', marginBottom: '36px',
  },
  heroBtns: { display: 'flex', gap: '16px', flexWrap: 'wrap' },
  primaryBtn: {
    padding: '14px 28px', backgroundColor: '#16a34a',
    color: 'white', border: 'none', borderRadius: '10px',
    fontSize: '16px', fontWeight: 'bold', cursor: 'pointer',
  },
  secondaryBtn: {
    padding: '14px 28px', backgroundColor: 'transparent',
    color: '#16a34a', border: '2px solid #16a34a',
    borderRadius: '10px', fontSize: '16px',
    fontWeight: 'bold', cursor: 'pointer',
  },
  heroIllustration: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  illustrationBox: {
    width: '280px', height: '280px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 20px 60px rgba(22, 163, 74, 0.2)',
  },
  bigEmoji: { fontSize: '120px' },

  // STATS
  statsSection: {
    display: 'flex', justifyContent: 'center',
    gap: '40px', flexWrap: 'wrap',
    padding: '60px 48px',
    backgroundColor: '#16a34a',
  },
  statCard: { textAlign: 'center', color: 'white' },
  statNumber: { fontSize: '48px', fontWeight: '800', margin: 0 },
  statLabel: { fontSize: '16px', opacity: 0.85, marginTop: '8px' },

  // HOW IT WORKS
  howSection: {
    padding: '80px 48px',
    backgroundColor: '#f9fafb',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '36px', fontWeight: '700',
    marginBottom: '48px', color: '#1f2937',
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px', maxWidth: '900px', margin: '0 auto',
  },
  stepCard: {
    backgroundColor: 'white', padding: '32px 24px',
    borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
  stepEmoji: { fontSize: '40px' },

  // FOR SECTION
  forSection: {
    padding: '80px 48px',
    backgroundColor: 'white',
    textAlign: 'center',
  },
  forGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px', maxWidth: '1000px', margin: '0 auto',
  },
  forCard: {
    backgroundColor: '#f0fdf4', padding: '32px 24px',
    borderRadius: '16px',
    border: '1px solid #bbf7d0',
  },

  // CTA
  ctaSection: {
    padding: '80px 48px', textAlign: 'center',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  },
  ctaTitle: { fontSize: '40px', fontWeight: '800', marginBottom: '16px' },
  ctaSubtitle: {
    fontSize: '18px', color: '#4b5563', marginBottom: '36px',
  },

  // FOOTER
  footer: {
    padding: '32px 48px', textAlign: 'center',
    backgroundColor: '#1f2937', color: 'white',
  },
  footerSub: { opacity: 0.6, fontSize: '14px', marginTop: '8px' },
}