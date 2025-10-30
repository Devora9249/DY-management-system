const express = require("express")
const router = express.Router()
const controller = require("../controllers/AvrechimController")

router.get("/",controller.getAllAvrechim)
// router.get("/:id",controller.getAvrechById)
router.get("/:id",controller.getMilgotAvrechById)
router.post("/",controller.createAvrech)
router.post("/:id",controller.addMilgaToAvrech)
router.delete("/:id",controller.deleteAvrech)
router.put("/:id",controller.updateAvrech)

module.exports = router 