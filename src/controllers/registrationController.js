const db = require("../models");
const Users = db.Users;
const { RegisterSchema } = require("../validations/userValidations");
const { sendOTP } = require("../utils/nodemailer");
const redisClient = require("../../config/redisClient");
const otpGenerator = require("../utils/generateOTP")

module.exports.register = async (req, res) => {
  let { error } = RegisterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  let { name, username, email, companyName } = req.body;

  try {
    const userExists = await Users.findOne({
      where: { email: email },
    });

    if (userExists) {
      {
        if (userExists.accStatus === "active") {
          return res
            .status(409)
            .json({ please_login: "user already exists and is active" });
        } else {
          return res.status(403).json({
            user_inactive:
              "please request OTP and verify it to activate your account",
          });
        }
      }
    }

    const userCreated = await Users.create({
      name: name,
      username: username,
      email: email,
      companyName: companyName,
    });

    console.log("user created in the database. now sending email");

    const randomNumberOTP = otpGenerator();
    await sendOTP(email, randomNumberOTP);

    await redisClient.set(`otp:${email}`, randomNumberOTP, {
      EX: 60 * 10,
    });
    console.log("otp stored successfully in redis server");

    res.status(200).json({
      user_created: "user created successfully",
      email_sent: "email sent successfully",
      data: userCreated,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.message || "something went wrong" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const userInDb = await Users.findOne({ where: { email } });
    if (!userInDb) {
      return res
        .status(404)
        .json({ error: "User not found. Please register." });
    }

    const otpInServer = await redisClient.get(`otp:${email}`);

    if (!otpInServer) {
      return res
        .status(410)
        .json({ error: "OTP expired. Please request a new one." });
    }

    if (otpInServer !== otp) {
      return res.status(401).json({ error: "Incorrect OTP." });
    }

    await userInDb.update({ accStatus: "active" });
    return res
      .status(200)
      .json({ success: "OTP verified. User is now active." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports.requestNewOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const userInDb = await Users.findOne({ where: { email } });
    if (!userInDb) {
      return res
        .status(404)
        .json({ error: "User not found. Please register." });
    }

    const randomNumberOTP = otpGenerator()
    await sendOTP(email, randomNumberOTP);


  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
