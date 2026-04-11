import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,  // ✅ FIX: cookies send karne ke liye zaroori
})

// ✅ FIX: localStorage se token bhi bhejo (dual support)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default API
