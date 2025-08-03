const express = require("express")
const router = express.Router()
const auth = require("../middlewares/authMiddleware")
const userFeatureController = require("../controllers/userFeatureController")

/**
 * @swagger
 * /update/{id}:
 *   post:
 *     summary: Update user profile (only self)
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Profile updated
 *       403:
 *         description: Unauthorized
 */
router.post("/update/:id", auth, userFeatureController.updateProfile);


module.exports = router