import React, { useState } from 'react'
import API from "../../Services/api"

const inputBase = "w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:border-amber-400/50 focus:bg-amber-400/[0.03]"
const labelBase = "block text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1.5"

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await API.post("/api/login", { email, password })

      // SAVE TOKEN
      localStorage.setItem("token", res.data.token)

      // SAVE USER ID
      localStorage.setItem(
        "userID",
        res.data.user.id
      )
      window.location.href = "/dashboard"
    } catch (error) {
      console.log(error.response?.data)
      alert("Invalid Credentials")
    } finally {
      setLoading(false)
    }
  }

  const redirectToRegister = (e) => {
    e.preventDefault()
    window.location.href = "/register"
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">

      <div>
        <label className={labelBase}>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className={inputBase}
        />
      </div>

      <div>
        <label className={labelBase}>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className={inputBase}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-[#0a0a0f] font-bold text-sm tracking-wider font-mono transition-opacity duration-200 hover:opacity-85 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'AUTHENTICATING...' : 'SIGN IN →'}
      </button>

      <div className="flex items-center gap-3 my-1">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[11px] font-mono text-slate-600">OR</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <button
        onClick={redirectToRegister}
        className="w-full py-3 rounded-xl border border-white/[0.08] text-slate-400 text-sm font-mono tracking-wider hover:border-amber-400/30 hover:text-amber-400 transition-all duration-200"
      >
        CREATE ACCOUNT
      </button>

    </form>
  )
}

export default LoginForm