import React from 'react'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/95 backdrop-blur-xl">
      <div className="flex items-center justify-between px-8 h-16">

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[#0a0a0f] font-black text-sm shadow-lg shadow-amber-500/20">
            B
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-100">BudgetBuddy</span>
          {/* <span className="text-[10px] font-mono tracking-widest text-amber-400 border border-amber-400/30 px-1.5 py-0.5 rounded">PRO</span> */}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"></div>
          <span className="text-[10px] font-mono tracking-widest text-slate-500">LIVE</span>
        </div>

      </div>
    </nav>
  )
}

export default Navbar