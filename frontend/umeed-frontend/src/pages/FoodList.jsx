import { useEffect, useState } from 'react'
import axios from 'axios'

export default function FoodList() {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/food/list/')
            .then(res => setFoods(res.data))
    }, [])

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
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {foods.map(food => (
                <div key={food.id} className="border p-4 rounded shadow">
                    <img
                        src={`http://127.0.0.1:8000${food.food_image}`}
                        className="h-40 w-full object-cover"
                    />
                    <h3 className="font-bold">{food.item_name}</h3>
                    <p>{food.location}</p>
                    <p>{food.contact_number}</p>
                </div>
            ))}
        </div>
        </div>
    )
}