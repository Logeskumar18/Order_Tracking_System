import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import UserHome from './pages/UserHome'
import UserRegister from './pages/UserRegister'
import AdminDashboard from './pages/AdminDashboard'
import CreateOrder from './pages/CreateOrder'
import OrderList from './pages/OrderList'
import OrderDetails from './pages/OrderDetails'


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-home" element={<UserHome />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create-order" element={<CreateOrder />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
