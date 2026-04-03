const express = require("express"); 
const Expense = require("../models/expense")


async function handleAddExpenses(req, res) {
    const {title, amount, category, user, type, date} = req.body

    if (!title || !amount || !category || !user || !type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
        title,
        amount,
        category,
        type,
        date,
        user
    })

    console.log("result", expense);
    
    return res.status(201).json(expense)
}

async function handleGetExpenses(req, res) {
    const {userID} = req.params

    const expenses = await Expense.find({ user: userID })
      .sort({ date: -1 });

    res.status(200).json({
      count: expenses.length,
      expenses,
    }) 
}

async function handleDeleteExpenses(req, res) {
    const {expenseID} = req.params

    const deleteExpenses = await Expense.findByIdAndDelete(expenseID)

    if (!deleteExpenses) {
        return res.status(404).json({ msg: "Transaction not Found!"})
    }

    return res.status(200).json({msg: " Transaction Deleted Successfully"})
}

async function handleUpdateExpenses(req, res) {
    const {expenseID} = req.params
    const {title, amount, category, type, date} = req.body

    const updateExpense = await Expense.findByIdAndUpdate(expenseID,
        {
            title,
            amount,
            category,
            date,
            type,
        },
        {new: true}
    )

    if (!updateExpense) {
        return res.status(404).json({msg: "Expense not Found"})
    }

    return res.status(200).json({msg: "Expense Updated Successfully"})
}

 module.exports = {
    handleAddExpenses, 
    handleGetExpenses,
    handleDeleteExpenses,
    handleUpdateExpenses,
 } 