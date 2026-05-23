
import React, { useState } from 'react'
import API from "../../Services/api"

const inputBase = "w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-100 text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:border-amber-400/40 focus:bg-amber-400/[0.02]"
const labelBase = "block text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1.5"

const categories = ["Income", "Food", "Shopping", "Accommodation", "Utilities", "Transportation", "Personal Care", "Education", "Entertainment", "Travels & Trips", "Miscellaneous"]

const AddExpense = ({ title, setTitle, amount, setAmount, category, setCategory, type, setType, editID, setEditID, expenses, setExpenses }) => {
  const userID = localStorage.getItem("userID")

  const handleAddExpense = async () => {
    if (!title || !amount || !category || !type) return alert("Please fill all fields")
    try {
      const res = await API.post("/api/expenses/add-expense", { title, amount, category, type, user: userID })
      setExpenses([...expenses, res.data])
      setTitle(""); setAmount(""); setCategory(""); setType("debit")
    } catch (error) { console.log(error.response?.data) }
  }

  const handleUpdateExpense = async () => {
    if (!title || !amount || !category || !type) return alert("Please fill all fields")
    try {
      await API.put(`/api/expenses/${editID}`, { title, amount, category, type })
      setExpenses(prev => prev.map(exp => exp._id === editID ? { ...exp, title, amount, category, type } : exp))
      setEditID(null); setTitle(""); setAmount(""); setCategory(""); setType("debit")
    } catch (error) { console.log(error.response?.data) }
  }

  const handleCancel = () => {
    setEditID(null); setTitle(""); setAmount(""); setCategory(""); setType("debit")
  }

  return (
    <div className={`rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 ${editID ? 'bg-amber-400/[0.03] border-amber-400/25 shadow-lg shadow-amber-500/5' : 'bg-white/[0.02] border-white/[0.07]'}`}>

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1">
            {editID ? 'Editing Entry' : 'New Entry'}
          </p>
          <h3 className="text-lg font-semibold text-slate-200">
            {editID ? 'Update Expense' : 'Add Expense'}
          </h3>
        </div>
        {editID && (
          <button
            onClick={handleCancel}
            className="text-[11px] font-mono tracking-wide text-rose-400 border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 rounded-lg hover:bg-rose-400/20 transition-all duration-150"
          >
            ✕ CANCEL
          </button>
        )}
      </div>

      {/* Form */}
      <div className="grid grid-cols-2 gap-3">

        {/* Title */}
        <div className="col-span-2">
          <label className={labelBase}>Title</label>
          <input
            type="text"
            placeholder="e.g. Grocery run, Netflix sub..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputBase}
          />
        </div>

        {/* Amount */}
        <div>
          <label className={labelBase}>Amount (₹)</label>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputBase}
          />
        </div>

        {/* Type */}
        <div>
          <label className={labelBase}>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={`${inputBase} cursor-pointer`}
          >
            <option value="debit" className="bg-[#0a0a0f]">Debit (Expense)</option>
            <option value="credit" className="bg-[#0a0a0f]">Credit (Income)</option>
          </select>
        </div>

        {/* Category */}
        <div className="col-span-2">
          <label className={labelBase}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputBase} cursor-pointer`}
          >
            <option value="" disabled className="bg-[#0a0a0f]">Select a category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-[#0a0a0f]">{cat}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <div className="col-span-2 mt-1">
          <button
            type="button"
            onClick={editID ? handleUpdateExpense : handleAddExpense}
            className={`w-full py-3 rounded-xl font-bold text-sm tracking-wider font-mono transition-opacity duration-200 hover:opacity-85 ${
              editID
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-[#0a0a0f]'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white'
            }`}
          >
            {editID ? '✓ UPDATE EXPENSE' : '+ ADD EXPENSE'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddExpense