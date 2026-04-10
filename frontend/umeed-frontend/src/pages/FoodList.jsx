import { useEffect, useState } from 'react'
import axios from 'axios'

export default function FoodList() {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/food/list/')
            .then(res => setFoods(res.data))
    }, [])

    return (
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
    )
}