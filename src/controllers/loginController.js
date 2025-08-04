const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.Users;
const { sendOTP } = require("../utils/nodemailer");
const { generateOTP } = require("../utils/otpPwGenerator");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const { loginSchema } = require("../validations/userValidations");
const Joi = require("joi");

module.exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { cred, password } = req.body; // password shoule be stored into encryption format

  const isEmail = !Joi.string().email().validate(cred).error;
  console.log(isEmail)

  let userInDb;

  if (isEmail) {
    //
    userInDb = await Users.findOne({ where: { email: cred } });
  } else {
    userInDb = await Users.findOne({ where: { username: cred } });
  }

  if (!userInDb) {
    return res.status(400).json({ error: "user does not exist" });
  }

  if (userInDb.accStatus === "inactive") {
    // first check this validation then after remaining things
    const otpOnceAgain = generateOTP();
    await sendOTP(userInDb.email, otpOnceAgain);
    await redisClient.set(`otp:${userInDb.email}`, otpOnceAgain, {
      EX: 60 * 2,
    });

    const passwordValid = await bcrypt.compare(password, userInDb.password);

    if (!passwordValid) {
      return res.status(401).json({ error: "incorrect password" });
    }

    // user proper message entire project
    return res.status(403).json({
      "access unauthorzided":
        "user found but is inactive, otp sent to registered email. please find it and verify it to login and use features of this website.",
    });
  }

  // store only id if reuired then store role
  const token = jwt.sign(
    { id: userInDb.id, role: userInDb.role },
    secret //do not define here expire time
  );

  //   after successfull login kindly pass user information as well, except password
  return res.status(200).json({
    success: "login successful",
    token: token,
    userInfo: {
      name: userInDb.name,
      email: userInDb.email,
      username: userInDb.username,
      role: userInDb.role,
      company: userInDb.companyName,
    },
  });
};
