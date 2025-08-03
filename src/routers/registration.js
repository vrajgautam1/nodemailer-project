const express = require("express")
const router = express.Router()
const registrationController = require("../controllers/registrationController")

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user and send OTP
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: User already exists
 */
router.post("/register", registrationController.register);

/**
 * @swagger
 * /verifyOtp:
 *   post:
 *     summary: Verify user OTP
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: OTP verified
 *       401:
 *         description: Incorrect OTP
 *       410:
 *         description: OTP expired
 */
router.post("/verifyOtp", registrationController.verifyOtp);

/**
 * @swagger
 * /requestNewOtp:
 *   post:
 *     summary: Request a new OTP if user is inactive
 *     tags:
 *       - Registration
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent again
 *       400:
 *         description: OTP already requested
 */
router.post("/requestNewOtp", registrationController.requestNewOtp);


module.exports = router