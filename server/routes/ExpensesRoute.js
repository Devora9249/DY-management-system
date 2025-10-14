const express = require("express");
const controller = require("../controllers/ExpenseController");

const router = express.Router();

router.get("/", controller.getAllExpenses);
router.get("/:id", controller.getExpenseById);
router.post("/", controller.addExpense);
router.delete("/:id", controller.deleteExpense);
router.put("/:id", controller.updateExpense);

module.exports = router;