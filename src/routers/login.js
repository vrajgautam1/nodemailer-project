const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController")

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login using email or username and password
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cred:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: User does not exist
 *       401:
 *         description: Incorrect password
 *       403:
 *         description: Account inactive
 */
router.post("/login", loginController.login);


module.exports = router