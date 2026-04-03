const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes")
const expenseRoutes = require('./routes/expenseRoutes')
const {connectMongoDB} = require("./connection")

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json())

// Middleware -  
  
app.use(express.urlencoded({ extended: false}))

// Connection -
connectMongoDB("mongodb://127.0.0.1:27017/Expense_Tracker_App");

// Routes -
app.use('/api', userRoutes)
app.use('/api/expenses', expenseRoutes)

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}!`))    