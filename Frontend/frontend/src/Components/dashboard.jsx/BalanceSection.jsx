 import React from 'react'
 
 
const BalanceSection = ({expenses}) => {

    const totalIncome = expenses
    .filter(exp=> exp.type === "credit")
    .reduce((acc, curr) => acc + Number(curr.amount),0)

    const totalExpense = expenses
    .filter(exp=> exp.type === "debit")
    .reduce ((acc, curr) => acc + Number(curr.amount),0 )

    const balance = totalIncome - totalExpense
    
  return (
    <div>
        <div style={{ marginBottom: "20px" }} className='flex justify-evenly '>
        <h3 className='w-100 grid grid-cols-3 gap-4 p-5 rounded-xl bg-white/5 border border-white/10 shadow-md'>Total Income: ₹{totalIncome}</h3>
        <h3 className='w-100 grid grid-cols-3 gap-4 p-5 rounded-xl bg-white/5 border border-white/10 shadow-md'>Total Expense: ₹{totalExpense}</h3>
        <h3 className='w-100 grid grid-cols-3 gap-4 p-5 rounded-xl bg-white/5 border border-white/10 shadow-md'>Balance: ₹{balance} </h3>
       </div>
    </div>
  )
}

export default BalanceSection