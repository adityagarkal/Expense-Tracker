import React from 'react'
import API from "../../Services/api"

const ExpenseList = ({expenses,  
  setExpenses,
  setTitle,
  setAmount,
  setCategory,
  setType,
  setEditID}) => {


    //--------------------------------- DELETE EXPENSES -----------------------------------

    const handleDeleteExpense = async (expenseID) => {          

      try {
        const res = await API.delete(`/api/expenses/${expenseID}`)

        setExpenses(prev => prev.filter(exp => exp._id !== expenseID))
      } catch (error) {
        console.log(error.response?.data);
        
      }
      
    }
      
    //--------------------------------- EDIT BUTTON -----------------------------------

    const handleEditExpense = (expenses) => {
        setTitle(expenses.title)
        setAmount(expenses.amount)
        setCategory(expenses.category)
        setEditID(expenses._id)
        setType(expenses.type)
      }


  return (
    <div className='flex flex-col gap-4 justify-between p-3 rounded-lg bg-white/5 border border-white/10'>

      <div>
        <h3 className='font-bold '>Expense List</h3>
      </div>
      
      <div>
        {expenses.length === 0 ? (
          <p>No expenses found</p>
        ) : (
          expenses.map((exp) => (
            <div key={exp._id} className='flex justify-between  border border-gray-600 py-2 px-2'>

              <div>
                <p>{exp.title} - {exp.category} - {exp.type} ₹{exp.amount}</p>
              </div>

              <div className='flex gap-2'>
                <button 
              onClick={() => handleEditExpense(exp) }
              className='bg-gradient-to-r from-blue-500 to-indigo-600 w-20 py-1 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition-all duration-200'
              >
                Edit
              </button>


              <button 
              onClick={()=> handleDeleteExpense(exp._id)}
              className='bg-gradient-to-r from-blue-500 to-indigo-600 w-20 py-1 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition-all duration-200'
              >
                Delete
              </button>
              </div>
              
            </div>
          ))
        )}
      </div>  
    </div>
  )
}

export default ExpenseList