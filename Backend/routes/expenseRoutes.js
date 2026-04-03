const express = require("express");
const { handleAddExpenses, handleGetExpenses, handleDeleteExpenses, handleUpdateExpenses } = require("../controller/expense");
const router = express.Router();

router.post("/add-expense", handleAddExpenses)
router.get("/:userID", handleGetExpenses)
router.delete("/:expenseID", handleDeleteExpenses)
router.put("/:expenseID", handleUpdateExpenses)


module.exports = router; 