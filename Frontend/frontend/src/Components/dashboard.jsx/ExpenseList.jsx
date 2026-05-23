import React from 'react'
import API from "../../Services/api"

const categoryIcons = {
  Income: '💰', Food: '🍜', Shopping: '🛍️', Accommodation: '🏠',
  Utilities: '⚡', Transportation: '🚗', 'Personal Care': '💆',
  Education: '📚', Entertainment: '🎬', 'Travels & Trips': '✈️',
  Miscellaneous: '📦',
}

const ExpenseList = ({ expenses, setExpenses, setTitle, setAmount, setCategory, setType, setEditID }) => {

  const handleDeleteExpense = async (expenseID) => {
    try {
      await API.delete(`/api/expenses/${expenseID}`)
      setExpenses(prev => prev.filter(exp => exp._id !== expenseID))
    } catch (error) { console.log(error.response?.data) }
  }

  const handleEditExpense = (exp) => {
    setTitle(exp.title)
    setAmount(exp.amount)
    setCategory(exp.category)
    setEditID(exp._id)
    setType(exp.type)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 backdrop-blur-sm mb-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1">Transaction Log</p>
          <h3 className="text-lg font-semibold text-slate-200">Expense List</h3>
        </div>
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-500">
          {expenses.length} entries
        </div>
      </div>

      {/* Column headers */}
      {expenses.length > 0 && (
        <div className="grid grid-cols-[1fr_120px_90px_100px_160px] px-3 pb-3 border-b border-white/[0.05] mb-2">
          {['TITLE', 'CATEGORY', 'TYPE', 'AMOUNT', 'ACTIONS'].map(h => (
            <span key={h} className="text-[9px] font-mono tracking-[0.15em] text-slate-700 uppercase">{h}</span>
          ))}
        </div>
      )}

      {/* Empty state */}
      {expenses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2 text-slate-700 font-mono">
          <div className="text-3xl">◈</div>
          <div className="text-xs tracking-widest">NO EXPENSES FOUND</div>
          <div className="text-[10px] text-slate-800">Add your first transaction above</div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {expenses.map((exp, idx) => (
            <div
              key={exp._id}
              className={`grid grid-cols-[1fr_120px_90px_100px_160px] items-center px-3 py-3 rounded-xl border border-transparent transition-all duration-150 hover:border-white/[0.06] ${idx % 2 === 0 ? 'bg-white/[0.015]' : ''}`}
            >
              {/* Title */}
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="text-base flex-shrink-0">{categoryIcons[exp.category] || '📦'}</span>
                <div className="overflow-hidden">
                  <div className="text-sm text-slate-300 font-mono truncate">{exp.title}</div>
                  {exp.date && (
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">{formatDate(exp.date)}</div>
                  )}
                </div>
              </div>

              {/* Category */}
              <div className="text-[10px] font-mono text-slate-600 truncate pr-2">{exp.category}</div>

              {/* Type badge */}
              <div>
                <span className={`text-[9px] font-mono tracking-wider px-2 py-1 rounded ${
                  exp.type === 'credit'
                    ? 'bg-emerald-400/10 border border-emerald-400/25 text-emerald-400'
                    : 'bg-rose-400/10 border border-rose-400/25 text-rose-400'
                }`}>
                  {exp.type === 'credit' ? '↑ IN' : '↓ OUT'}
                </span>
              </div>

              {/* Amount */}
              <div className={`text-sm font-bold font-mono tracking-tight ${exp.type === 'credit' ? 'text-emerald-400' : 'text-rose-400'}`}>
                {exp.type === 'credit' ? '+' : '-'}₹{Number(exp.amount).toLocaleString('en-IN')}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditExpense(exp)}
                  className="px-3 py-1.5 text-[11px] font-mono tracking-wide text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 hover:border-blue-400/40 transition-all duration-150"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDeleteExpense(exp._id)}
                  className="px-3 py-1.5 text-[11px] font-mono tracking-wide text-rose-400 bg-rose-500/8 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition-all duration-150"
                >
                  DEL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpenseList