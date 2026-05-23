import { useState } from "react"
import API from "../../Services/api"

const inputBase = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:border-amber-400/50 focus:bg-amber-400/[0.03]"
const labelBase = "block text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1.5"

const RegisterForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await API.post("/api/register", { name, email, password })
    } catch (error) {
      console.log(error.response?.data)
      alert("Registration failed")
    } finally {
      setLoading(false)
      window.location.href = "/"
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">

      <div>
        <label className={labelBase}>Full Name</label>
        <input type="text" placeholder="John Doe" onChange={(e) => setName(e.target.value)} className={inputBase} />
      </div>

      <div>
        <label className={labelBase}>Email Address</label>
        <input type="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} className={inputBase} />
      </div>

      <div>
        <label className={labelBase}>Password</label>
        <input type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} className={inputBase} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-600 text-[#0a0a0f] font-bold text-sm tracking-wider font-mono transition-opacity duration-200 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
      </button>

      <p className="text-center text-xs font-mono text-slate-600">
        Already have an account?{' '}
        <a href="/" className="text-amber-400 hover:underline">Sign in</a>
      </p>

    </form>
  )
}

export default RegisterForm