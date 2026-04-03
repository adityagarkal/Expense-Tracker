const mongoose = require("mongoose");
const User = require("./user");

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },
 
    type: {
        type: String,
        enum:["credit", "debit"],
        required: true,
    },

    category: { 
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
}, {timestamps: true}
);

const Expense = mongoose.model("Expense", expenseSchema)
module.exports = Expense;