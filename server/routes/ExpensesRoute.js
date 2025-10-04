const express = require("express");
const controller = require("../controllers/ExpensesController");

const router = express.Router();

router.get("/", controller.getAllExpenses);
router.get("/:id", controller.getExpenseById);
router.post("/", controller.createExpense);
router.delete("/:id", controller.deleteExpense);
router.put("/:id", controller.updateExpense);

module.exports = router;
// דגכעיחלךסכבעיחצמנהעיח