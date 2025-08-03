const express = require("express")
const router = express.Router()
const registrationController = require("../controllers/registrationController")

router.post("/register", registrationController.register)
router.post("/verifyOtp", registrationController.verifyOtp)
router.post("/requestNewOtp", registrationController.requestNewOtp)

module.exports = router