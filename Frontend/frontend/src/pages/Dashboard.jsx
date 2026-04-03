import React, { useEffect, useState } from 'react'
import API from "../Services/api"
import Navbar from '../Components/login/Navbar'
import BalanceSection from '../Components/dashboard.jsx/BalanceSection'
import Chart from '../Components/dashboard.jsx/chart'
import AddExpense from '../Components/dashboard.jsx/AddExpense'
import SearchSort from '../Components/dashboard.jsx/SearchSort'
import ExpenseList from '../Components/dashboard.jsx/ExpenseList'


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


    //---------------------------------FETCH EXPENSES-----------------------------------

    useEffect(() => {
      const fetchExpenses = async () => {
        try {
          const res = await API.get(`/api/expenses/${userID}`)
          setExpenses(res.data.expenses)
        } catch (error) {
          console.log("Error Fetching Expense: ", error.response?.data);
        }

      }
      
      if (userID) {
        fetchExpenses()
      }
    }, [userID])


    //--------------------------------- FILTER + SEARCH + SORT -----------------------------------

    const filteredExpenses = expenses

    .filter(exp => {
      if (filterCategory === "All") return true
      return exp.category === filterCategory
    })

    .filter(exp =>
      exp.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.date) - new Date(a.date)
      }

      if (sortOption === "oldest") {
        return new Date(a.date) - new Date(b.date)
      }

      if (sortOption === "high") {
        return b.amount - a.amount
      }

      if (sortOption === "low") {
        return a.amount - b.amount
      }

      return 0
    })
 
    
    return (

      <div className='flex flex-col gap-6 h-full'>


        {/* ---------------------------------NAVBAR----------------------------------- */}


          <div>
            <Navbar />
          </div>


        {/* ---------------------------------BALANCE SECTION----------------------------------- */}


          <div className='flex flex-col gap-4'>
            <BalanceSection expenses={expenses} />
          


        {/* ---------------------------------CHART SECTION ----------------------------------- */}


          
            <Chart expenses={expenses} />
          


        {/* ----------------------------------ADD/UPDATEFORM ------------------------------ */}
         

          
            <AddExpense title={title}
            setTitle={setTitle}
            amount={amount}
            setAmount={setAmount}
            category={category}
            setCategory={setCategory}
            type={type}          
            setType={setType}
            editID={editID}
            setEditID={setEditID}
            expenses={expenses}
            setExpenses={setExpenses}/>
         


        {/* ----------------------------------SEARCH + SORT..(completed) -----------------------------------  */}


          
            <SearchSort expenses={expenses} filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOption={sortOption}
            setSortOption={setSortOption}/>
          


        {/* ----------------------------------EXPENSE LIST---------------------------------- */}


          
            <ExpenseList expenses={filteredExpenses}
            setExpenses={setExpenses}
            setTitle={setTitle}
            setAmount={setAmount}
            setCategory={setCategory}
            setType={setType}
            editID={editID}
            setEditID={setEditID}/>       
          
          </div>


      </div>
    )
  }


  export default Dashboard
  