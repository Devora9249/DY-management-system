// 📁 routes/integrationRoutes.js
const express = require("express");
const router = express.Router();
const { getFinancialIntegration } = require("../controllers/IntegrationController");

router.get("/", getFinancialIntegration);

module.exports = router;
