const express = require("express");
const { handleAddExpenses, handleGetExpenses, handleDeleteExpenses, handleUpdateExpenses } = require("../controller/expense");
const router = express.Router();
const auth = require("../middleware/auth")

router.post("/add-expense", auth, handleAddExpenses)
router.get("/:userID", auth, handleGetExpenses)
router.delete("/:expenseID", auth, handleDeleteExpenses)
router.put("/:expenseID", auth, handleUpdateExpenses)


module.exports = router; 