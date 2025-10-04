const express = require("express")
const router = express.Router()
const controller = require("../controllers/DonorsController")

router.get("/", controller.getAllDonors)
router.get("/:id", controller.getDonorById)
router.post("/", controller.createDonor)
router.delete("/:id", controller.deleteDonor)
router.put("/:id", controller.updateDonor)

module.exports = router