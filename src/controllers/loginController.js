const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.Users;
const { sendOTP } = require("../utils/nodemailer");
const { generateOTP } = require("../utils/otpPwGenerator");
require("dotenv").config()
const secret = process.env.JWT_SECRET

    module.exports.login = async (req, res) => {
    const { cred, password } = req.body;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cred);

    let userInDb;

    if (isEmail) {
        userInDb = await Users.findOne({ where: { email: cred } });
    } else {
        userInDb = await Users.findOne({ where: { username: cred } });
    }

    if (!userInDb) {
        return res.status(400).json({ error: "user does not exist" });
    }

    if (password !== userInDb.password) {
        return res.status(401).json({ error: "incorrect password" });
    }

    if (userInDb.accStatus === "inactive") {
        const otpOnceAgain = generateOTP();
        await sendOTP(userInDb.email, otpOnceAgain);
        await redisClient.set(`otp:${userInDb.email}`, otpOnceAgain, { EX: 60 * 2 })
        return res
        .status(200)
        .json({
            "user found but inactive":
            "user found but is inactive, otp sent to registered email. please find it and verify it to login and use features of this website.",
        });
    }

    const token = jwt.sign({email: userInDb.email, id:userInDb.id, role:userInDb.role}, secret, {expiresIn:"1d"} )

    return res.status(200).json({success: "login successful", token:token})
    };
