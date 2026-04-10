import { useState } from 'react'
import axios from 'axios'

export default function AddFood() {
  const [form, setForm] = useState({
    item_name: '',
    person_name: '',
    contact_number: '',
    location: '',
    safety_declaration: false,
    food_image: null
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleFileChange = (e) => {
    setForm({
      ...form,
      food_image: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    Object.keys(form).forEach(key => {
      formData.append(key, form[key])
    })

    try {
      await axios.post('http://127.0.0.1:8000/api/food/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      alert('Food Listed Successfully ✅')
    } catch (err) {
      console.error(err)
      alert('Error ❌')
    }
  }

  return (
    <div className=' min-h-screen bg-gradient-to-br from-gray-200 to-gray-300'>
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
          // onClick={handleLogout}
          className="px-4 py-2 bg-gray-400 text-white rounded-lg text-sm font-medium hover:bg-gray-500 transition"
        >
          Logout
        </button>
        </div>
      </nav>

    <div className="p-6 mx-auto w-full mt-10 max-w-md sm:max-w-lg bg-gray-200  shadow-red-900 p-6 sm:p-8 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add Food Listing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="item_name" placeholder="Item Name" onChange={handleChange} className="w-full p-2 border" />

        <input name="person_name" placeholder="Your Name" onChange={handleChange} className="w-full p-2 border" />

        <input name="contact_number" placeholder="Contact Number" onChange={handleChange} className="w-full p-2 border" />

        <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border" />

        <input type="file" onChange={handleFileChange} className="w-full" />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="safety_declaration" onChange={handleChange} />
          Food is safe & hygienic
        </label>

        <button className="mt-4 px-4 py-2 
            bg-gradient-to-r from-violet-800 via-red-900 to-indigo-600 
            text-white rounded-lg text-sm hover:opacity-90 transition">
              Submit
            </button>

      </form>
    </div>
    </div>
  )
}