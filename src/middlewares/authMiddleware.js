const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.JWT_SECRET
async function authMiddleware(req, res, next){
    const token = req.headers.authorization
    if(!token){
        return res.status(400).json({error: "token not found"})
    }
    try {
        const tokenValid = jwt.verify(token, secret)
        if(!tokenValid){
            return res.status(400).json({error: "token has expired. signin again"})
        }
        req.user = tokenValid
        next()
    } catch (error) {
        return res.status(500).json({error: "something went wrong with the server"})
    }

}

module.exports = authMiddleware