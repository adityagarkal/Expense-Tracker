import React, {useState } from 'react'
import API from "../../Services/api"

const AddExpense = ({ title, setTitle,
  amount, setAmount,
  category, setCategory,
  type, setType,
  editID, setEditID,
  expenses, setExpenses}) => {
    

  const userID = localStorage.getItem("userID")


     //--------------------------------- ADD EXPENSES -----------------------------------

     const handleAddExpense = async () => {
      
      if (!title || !amount || !category || !type) {
        alert("Please fill all fields")
        return
      }

      try {
        const res = await API.post("/api/expenses/add-expense", {
          title,
          amount,
          category,
          type,
          user: userID
        })
        
        setExpenses([...expenses, res.data])

        // alert("Added Succesfully")

        setTitle("")
        setAmount("")
        setCategory("")
        setType("debit")
        console.log("add function running");
        
      } catch (error) {
        console.log(error.response?.data);
      }
      console.log("btn Clicked!");
      
    }


    //--------------------------------- UPDATE EXPENSES -----------------------------------

    const handleUpdateExpense = async () => {
        

        if (!title || !amount || !category || !type) {
        alert("Please fill all fields")
        return 
      }

        try {
          await API.put(`/api/expenses/${editID}`, {
            title,
            amount,
            category,
            type
          })

          setExpenses(prev =>
            prev.map(exp =>
              exp._id === editID
                ? { ...exp, title, amount, category, type }
                : exp
            )
          )

          setEditID(null)

          setTitle("")
          setAmount("")
          setCategory("")
          setType("debit")

        } catch (error) {
          console.log(error.response?.data);
        }
      }

      
  return (
    <div className=' grid grid-cols-4 gap-3 p-5 rounded-xl bg-white/5 border border-white/10 shadow-md'>

      <div className='flex flex-col gap-2'>

        <div>
          <h3 className='font-bold'>Add/Edit Expense</h3>
        </div>
    
          <div>
            <input 
            type="text" 
            placeholder='Title' 
            value={title} 
            onChange={(e)=>setTitle(e.target.value)} 
             className='w-330 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
            />
          </div>

          <div>
            <input 
            type="number" 
            placeholder='Amount' 
            value={amount} 
            onChange={(e)=>setAmount(e.target.value)} 
             className='w-330 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
            />
          </div>

          <div className='flex flex-row gap-3'>

              <div>
                <select 
                value={type} 
                onChange={(e)=> setType(e.target.value)}
                className='w-163 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
                >

                  <option value="debit">debit</option>
                  <option value="credit">credit</option>

                </select>
              </div>

              <div>
                <select 
                name="Select Category" 
                value={category} 
                onChange={(e)=> setCategory(e.target.value)}
                className='w-164 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
                >  

                  <option value="All">All</option>
                  <option value="Income">Income</option>
                  <option value="Food">Food</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travels & Trips">Travels & Trips</option>
                  <option value="Miscellaneous">Miscellaneous</option>

                </select>
              </div>
          </div>

          <div>
            <button 
            type='button' 
            onClick={editID ? handleUpdateExpense : handleAddExpense }
            className='w-330 py-3 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8]'
            >

              {editID ? "update Expense" : "Add Expense"}
            
            </button>
          </div>
          
      </div>
        
    </div>
  )
}
 
export default AddExpense