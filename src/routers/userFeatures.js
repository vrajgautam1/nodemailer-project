const express = require("express")
const router = express.Router()
const auth = require("../middlewares/authMiddleware")
const userFeatureController = require("../controllers/userFeatureController")

router.post("/update/:id", auth, userFeatureController.updateProfile)

module.exports = router