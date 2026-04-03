import React, { useState } from 'react'
import API from "../../Services/api"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    
    const handleLogin = async (e) => {
        e.preventDefault();    

        try {
            const res = await API.post("/api/login", {
                email,
                password
            });

            console.log(res.data);

            localStorage.setItem("userID", res.data.user.id)     // store userID in localstorage

            // alert("Login Successful")

            window.location.href = "/dashboard"
        } catch (error) {
            console.log(error.response?.data);
            alert("Invalid Credentials")
            }
        }

    const redirectToRegister = (e) => {
        e.preventDefault();
        window.location.href = "/register"
        } 
  return (
        
        <div>
        <form onSubmit={handleLogin} className='flex flex-col items-center text-white gap-4 '>
                
            <input 
            type="email" 
            placeholder='Email'
            onChange={(e)=>setEmail(e.target.value)}
            className='border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
            />

            <input 
            type="password" 
            placeholder='Password'
            onChange={(e)=>setPassword(e.target.value)}
            className='border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
            />

            <button className='w-45 py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8]'>Login</button>

            <div className="flex items-center gap-3 w-130">
  
            <div className="flex-1 h-[1px] bg-gray-600"></div>

              <p className="text-gray-400 text-sm whitespace-nowrap">
                Don’t have an account?
              </p>

              <div className="flex-1 h-[1px] bg-gray-600"></div>

            </div>
            
            <button onClick={redirectToRegister} className='w-40 py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition-all duration-200' >Create new account</button>
        </form>
        </div>
  )
}

export default LoginForm