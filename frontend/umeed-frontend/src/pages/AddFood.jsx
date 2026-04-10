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
    <div className="p-6 max-w-lg mx-auto">
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

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>

      </form>
    </div>
  )
}