const express = require("express");
const controller = require("../controllers/LinksController");

const router = express.Router();

router.get("/", controller.getAllLinks);
router.post("/", controller.addLink);
router.delete("/:id", controller.deleteLink);
// router.put("/:id", controller.updateLink);

module.exports = router;