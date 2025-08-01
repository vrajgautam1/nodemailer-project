const express = require("express")
const router = express.Router()
const loginRouter = require("./login")
const registration = require("./registration")
const userFeatureRouter = require("./userFeatures")

router.use(loginRouter)
router.use(registration)
router.use(userFeatureRouter)

module.exports = router