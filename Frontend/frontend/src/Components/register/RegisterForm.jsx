import { useState } from "react"
import API from "../../Services/api"

const RegisterForm = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/api/register", {
                name,
                email,
                password,
            });

            // alert("Registered Successfully");            
        } catch (error) {
             console.log(error.response);
             console.log(error.response.data);
             alert("Registration failed");
                }
                window.location.href = "/"
    }
  return (
    <div>
            <form onSubmit={handleRegister}  className='flex flex-col items-center text-white gap-4 ' >

            <input 
            type="text" 
            placeholder="Name" 
            onChange={(e)=>setName(e.target.value)} 
            className='border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
            />


            <input 
            type="email" 
            placeholder="Email" 
            onChange={(e)=>setEmail(e.target.value)} 
            className='border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm' 
            />


            <input 
            type="password" 
            placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)} 
            className='border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm' 
            />


            <button className='w-45 py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d]'>Register</button>
        </form>
    </div>
  )
}

export default RegisterForm