const express = require("express")
const router = express.Router()
const controller = require("../controllers/DebtsController")

router.get("/",controller.getAllDebts)
router.post("/",controller.addDebt)
// router.post("/:id",controller.addMilgaToAvrech)
// router.delete("/:id",controller.deleteAvrech)
router.put("/:id",controller.updateDebt)

module.exports = router 