import Navbar from '../Components/login/Navbar'
import LoginForm from '../Components/login/LoginForm'

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">

        {/* Background glows */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-amber-400/[0.03] blur-3xl"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/[0.04] blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-sm relative z-10">

          {/* Card */}
          <div className="bg-[#0f0f1a]/80 border border-white/[0.07] rounded-2xl px-9 py-10 backdrop-blur-xl shadow-2xl shadow-black/60">

            {/* Header */}
            <div className="mb-8">
              <p className="text-[10px] font-mono tracking-[0.2em] text-amber-400 uppercase mb-2">Welcome back</p>
              <h2 className="text-2xl font-semibold text-slate-100 leading-tight">
                Sign in to your<br />account
              </h2>
              <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-transparent rounded mt-4"></div>
            </div>

            <LoginForm />
          </div>

          <p className="text-center mt-5 text-[10px] font-mono tracking-widest text-slate-800">
            SECURED · ENCRYPTED · PRIVATE
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login