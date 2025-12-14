const express = require("express")
const router = express.Router()
const controller = require("../controllers/DonorsController")

router.get("/", controller.getAllDonors)
router.get("/:id", controller.getDonorById)
router.get("/:id/donations",controller.getDonationsById)
router.post("/:id", controller.createDonation)
router.post("/", controller.createDonor)
router.delete("/:id", controller.deleteDonor)
router.delete("/:id/donations/:donationId", controller.deleteDonation)
router.put("/:id", controller.updateDonor)

module.exports = router