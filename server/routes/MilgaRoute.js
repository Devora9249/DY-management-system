const express = require("express");
const router = express.Router();
const controller = require("../controllers/MilgaController");

router.get("/", controller.getAllMilgas);
router.get("/:id", controller.getMilgaById);
router.post("/", controller.createMilga);
router.delete("/:id", controller.deleteMilga);
router.put("/:id", controller.updateMilga);

module.exports = router;
