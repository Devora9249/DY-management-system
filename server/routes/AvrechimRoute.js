const express = require("express")
const router = express.Router()
const controller = require("../controllers/AvrechimController")

router.get("/",controller.getAllAvrechim)
router.get("/",controller.getAvrechById)
router.post("/",controller.createAvrech)
router.delete("/:id",controller.deleteAvrech)
router.put("/:id",controller.updateAvrech)

module.exports = router