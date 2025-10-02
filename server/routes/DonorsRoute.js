const express = require("express")
const router=express.Router()
const DonorsController = require("../controllers/DonorsController")

router.get("/getAllDonors",DonorsController.getAllDonors)
router.get("/getDonorById",DonorsController.getDonorById)
router.post("/addDonor",DonorsController.createDonor)
router.delete("/deleteDonor/:id",DonorsController.deleteDonor)
router.put("/updateDonor/:id",DonorsController.updateDonor)

module.exports = router