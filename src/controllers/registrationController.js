const db = require("../models");
const Users = db.Users;
const { RegisterSchema } = require("../validations/userValidations");
const { sendOTP, sendPassword } = require("../utils/nodemailer");
const redisClient = require("../../config/redisClient");
const {generateOTP, generatePassword} = require("../utils/otpPwGenerator");
const bcrypt = require("bcrypt")

module.exports.register = async (req, res) => {
  let { error } = RegisterSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  let { name, username, email, companyName } = req.body;
  console.log(req.body)

  try {
    const userExists = await Users.findOne({
      where: { email: email },
    });


    console.log(userExists)

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

    console.log(userCreated)
    console.log("user created in the database. now sending email");

    const randomNumberOTP = generateOTP();
    await sendOTP(email, randomNumberOTP);

    await redisClient.set(`otp:${email}`, randomNumberOTP, {
      EX: 60 * 10,
    });
    console.log("otp stored successfully in redis server");

   return res.status(200).json({
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

    let accPassword = generatePassword()
    let encryptedPassword = bcrypt.hash(accPassword, 5)

    await Users.update({password: encryptedPassword},{where:{id:userInDb.id}})

    await sendPassword(email, accPassword)

    return res
      .status(200)
      .json({ success: "OTP verified. User is now active.", checkEmail: "please check your email once again to receive your account password." });
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
    }else if(userInDb.accStatus === "active"){
        return res.status(400).json({userActive: "user already exists and no need for a new otp"})
    }

    const otpExists = await redisClient.get(`otp:${email}`)
    const ttl = await redisClient.ttl(`otp:${email}`);


    if(otpExists){
        return res.status(400).json({error: `please request a new otp after ${ttl} seconds`})
    }

    const randomNumberOTP = otpGenerator(); //first send email to user
    await sendOTP(email, randomNumberOTP);
    await redisClient.set(`otp:${email}`, randomNumberOTP, {EX: 60*2});
    return res
      .status(200)
      .json({
        success:
          "otp sent successfully please check your email and verify it within 2 mins",
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};
