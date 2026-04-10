import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

import Login from './pages/auth/Login'
import RegisterSupplier from './pages/auth/RegisterSupplier'
import RegisterReceiver from './pages/auth/RegisterReceiver'
import SupplierDashboard from './pages/dashboard/SupplierDashboard'
import ReceiverDashboard from './pages/dashboard/ReceiverDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import Landing from './pages/Landing'
import AddFood from './pages/AddFood'
import FoodList from './pages/FoodList'

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to="/login" />
  if (allowedRole && user.role !== allowedRole) return <Navigate to="/login" />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register/supplier" element={<RegisterSupplier />} />
      <Route path="/register/receiver" element={<RegisterReceiver />} />
      <Route path="/add-food" element={<AddFood />} />
      <Route path="/food-list" element={<FoodList />} />

      <Route path="/dashboard/supplier" element={
        <ProtectedRoute allowedRole="supplier">
          <SupplierDashboard />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/receiver" element={
        <ProtectedRoute allowedRole="receiver">
          <ReceiverDashboard />
        </ProtectedRoute>
      } />

      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}