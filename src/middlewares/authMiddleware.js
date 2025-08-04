const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token not found or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // pass user info to next route
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
