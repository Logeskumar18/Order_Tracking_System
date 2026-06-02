import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import UserLogin from './pages/UserLogin'
import AdminLogin from './pages/AdminLogin'
import UserHome from './pages/UserHome'
import UserRegister from './pages/UserRegister'


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
          <Route path="/orders" element={<div style={{ textAlign: 'center', padding: '100px 20px' }}><h2>Orders Listing Page (Coming Soon)</h2></div>} />
          <Route path="/create-order" element={<div style={{ textAlign: 'center', padding: '100px 20px' }}><h2>Create Order Page (Coming Soon)</h2></div>} />
          <Route path="/dashboard" element={<div style={{ textAlign: 'center', padding: '100px 20px' }}><h2>Dashboard Page (Coming Soon)</h2></div>} />
          <Route path="/profile" element={<div style={{ textAlign: 'center', padding: '100px 20px' }}><h2>Profile Page (Coming Soon)</h2></div>} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
