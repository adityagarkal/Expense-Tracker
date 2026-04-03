import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div className='bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white  '>
        
      { <Routes>
        <Route path= "/" element={< Login />} />
        <Route path= "/register" element={<Register />} />
        <Route path= "/dashboard" element={<Dashboard />} />
      </Routes> }
    </div>
  )
}
 
export default App

// flex items-center justify-center flex-col
