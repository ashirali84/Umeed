import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="font-sans bg-white text-gray-800">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-4 sm:py-6 border-b bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
         <div class="flex items-center gap-2 text-white font-bold text-xl">
          <span class="text-2xl" role="img" aria-label="fork-and-spoon">
            🍴
          </span>

          <span class="font-sans tracking-wide">
            Umeed
          </span>
        </div> 
        <div className="flex gap-3 items-center">
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-gray-400 text-white font-bold rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register/supplier')}
            className="px-5 py-2 bg-gray-400 text-white font-bold rounded-lg text-sm hover:bg-gray-400  transition"
          >
            Join as Supplier
          </button>
          <button
            onClick={() => navigate('/register/receiver')}
            className="px-5 py-2 bg-gray-400 text-white font-bold rounded-lg text-sm hover:bg-gray-400 transition"
          >
            Join as Receiver
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="flex items-center justify-between px-12 py-20 min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
        <div className="max-w-xl  ml-20">
          
          <h1 className="text-6xl font-extrabold leading-tight mb-5 text-gray-800">
            Surplus Food,<br />
            <span className="text-red-900">Not Wasted.</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-9">
            Umeed connects restaurants, households, and individuals
            with surplus food to those who need it most —
            reducing waste, fighting hunger, one meal at a time.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate('/register/supplier')}
              className="px-7 py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white font-bold rounded-xl text-base hover:bg-gray-500 transition"
            >
              🍽️ Donate Food
            </button>
            <button
              onClick={() => navigate('/register/receiver')}
              className="px-7 py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600  text-white font-bold rounded-xl text-base hover:bg-green-50 transition"
            >
              🤲 Receive Food
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mr-20">
          <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-red-950">
            {/* <span className="text-9xl">🍱</span> */}
            <img className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-red-950" src="umeed_logo.png" alt="🍱" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="flex justify-center gap-10 flex-wrap px-12 py-16 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600">
        <div className="text-center text-white">
          <h2 className="text-5xl font-extrabold m-0">78M+</h2>
          <p className="text-base opacity-80 mt-2">Tonnes of food wasted in India yearly</p>
        </div>
        <div className="text-center text-white">
          <h2 className="text-5xl font-extrabold m-0">20Cr+</h2>
          <p className="text-base opacity-80 mt-2">Indians go to bed hungry every day</p>
        </div>
        <div className="text-center text-white">
          <h2 className="text-5xl font-extrabold m-0">40%</h2>
          <p className="text-base opacity-80 mt-2">Food produced never reaches a plate</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-12 py-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">How Umeed Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { emoji: '📝', title: 'Register', desc: 'Sign up as a Supplier or Receiver in under 2 minutes' },
            { emoji: '📦', title: 'List or Browse', desc: 'Suppliers list surplus food. Receivers browse nearby listings.' },
            { emoji: '📍', title: 'Locate', desc: 'Find food donation points on the live map near you' },
            { emoji: '🤝', title: 'Connect', desc: 'Coordinate pickup and reduce food waste together' },
          ].map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
              <span className="text-4xl">{step.emoji}</span>
              <h3 className="text-lg font-bold mt-3 mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="px-12 py-20 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Who is Umeed for?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { emoji: '🏪', title: 'Restaurants & Caterers', desc: 'Donate your daily surplus food instead of throwing it away' },
            { emoji: '🏠', title: 'Households', desc: 'Have leftover food from events or celebrations? Share it!' },
            { emoji: '🏥', title: 'Shelters & NGOs', desc: 'Receive food donations directly from nearby suppliers' },
            { emoji: '👤', title: 'Individuals in Need', desc: 'Find free or affordable food available near your location' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-400 border p-8 rounded-2xl hover:shadow-md transition">
              <span className="text-4xl">{item.emoji}</span>
              <h3 className="text-lg font-bold mt-3 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-12 py-20 text-center bg-gradient-to-br from-gray-200 to-gray-300">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Ready to make a difference?</h2>
        <p className="text-lg text-gray-500 mb-9">
          Join Umeed today and help us build a hunger-free India
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => navigate('/register/supplier')}
            className="px-7 py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white font-bold rounded-xl text-base transition"
          >
            Start Donating
          </button>
          <button
            onClick={() => navigate('/register/receiver')}
            className="px-7 py-3 bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-gray-200 font-bold rounded-xl text-base hover:bg-gray-500 transition"
          >
            Find Food Near Me
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-12 py-8 text-center bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 text-white">
        <p className="font-medium">🌱 Umeed — Spreading Hope, One Meal at a Time</p>
        <p className="text-sm opacity-60 mt-2">Made with ❤️ at HackHorizon 2K26 · ARKA JAIN University</p>
      </footer>

    </div>
  )
}