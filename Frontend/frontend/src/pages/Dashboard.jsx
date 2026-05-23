import React, { useEffect, useState } from 'react'
import API from "../Services/api"
import Navbar from '../Components/login/Navbar'
import BalanceSection from '../Components/dashboard.jsx/BalanceSection'
import Chart from '../Components/dashboard.jsx/chart'
import AddExpense from '../Components/dashboard.jsx/AddExpense'
import SearchSort from '../Components/dashboard.jsx/SearchSort'
import ExpenseList from '../Components/dashboard.jsx/ExpenseList'
import logoutBTN from '../Components/dashboard.jsx/logoutBTN'

const Dashboard = () => {
  const [expenses, setExpenses] = useState([])
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [type, setType] = useState("debit")
  const [editID, setEditID] = useState(null)
  const [filterCategory, setFilterCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("newest")
  const userID = localStorage.getItem("userID")

  useEffect(() => {

    // GET TOKEN

  const token = localStorage.getItem("token");

  // IF TOKEN NOT PRESENT

  if (!token) {

    // REDIRECT TO LOGIN

    window.location.href = "/";

    return;
  }

  // FETCH EXPENSE:
    const fetchExpenses = async () => {
      try {
        const res = await API.get(`/api/expenses/${userID}`)
        setExpenses(res.data.expenses)
      } catch (error) {
        console.log("Error Fetching Expense: ", error.response?.data)
      }
    }
    if (userID) fetchExpenses()
  }, [userID])

  const filteredExpenses = expenses
    .filter(exp => filterCategory === "All" ? true : exp.category === filterCategory)
    .filter(exp => exp.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.date) - new Date(a.date)
      if (sortOption === "oldest") return new Date(a.date) - new Date(b.date)
      if (sortOption === "high") return b.amount - a.amount
      if (sortOption === "low") return a.amount - b.amount
      return 0
    })

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-5">

        {/* Page title */}
        <div className="flex justify-between items-end pb-1 border-b border-white/[0.04]">
          <div>
            <p className="text-[10px] font-mono tracking-[0.2em] text-slate-600 uppercase mb-1.5">Financial Overview</p>
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Dashboard</h1>
          </div>
          <p className="text-[11px] font-mono text-slate-700">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <button
            onClick={logoutBTN}
            className="px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-mono tracking-wider hover:bg-red-500/20 transition-all duration-200"
          >
            LOGOUT
          </button>
        </div>

        {/* Balance Cards */}
        <BalanceSection expenses={expenses} />

        {/* Chart + Add Expense */}
        <div className="grid grid-cols-2 gap-5">
          <Chart expenses={expenses} />
          <AddExpense
            title={title} setTitle={setTitle}
            amount={amount} setAmount={setAmount}
            category={category} setCategory={setCategory}
            type={type} setType={setType}
            editID={editID} setEditID={setEditID}
            expenses={expenses} setExpenses={setExpenses}
          />
        </div>

        {/* Search & Sort */}
        <SearchSort
          filterCategory={filterCategory} setFilterCategory={setFilterCategory}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          sortOption={sortOption} setSortOption={setSortOption}
          expenses={expenses}
        />

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          setExpenses={setExpenses}
          setTitle={setTitle}
          setAmount={setAmount}
          setCategory={setCategory}
          setType={setType}
          editID={editID}
          setEditID={setEditID}
        />

      </div>
    </div>
  )
}

export default Dashboard