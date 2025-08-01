const nodemailer = require("nodemailer");
require("dotenv").config();
const password = process.env.ACC_PW;
const fs = require("fs");
const path = require("path");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "gautamvraj1999@gmail.com",
    pass: password,
  },
});

// Wrap in an async IIFE so we can use await.
async function sendOTP(to, otp) {
  try {
    const emailTemplate = fs.readFileSync(
      path.join(__dirname, "emailTemplate.txt"),
      "utf-8"
    );
    const emailBody = emailTemplate.replace("${otp}", otp);

    const obj = {
      from: '"Vraj Gautam" <gautamvraj1999@gmail.com>',
      to: to,
      subject: "OTP for registration",
      text: String(otp), // plain‑text body
      html: emailBody,
    };

    const info = await transporter.sendMail(obj);
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = { sendOTP };

// const emailTemplate = fs.readFileSync(path.join(__dirname, "emailTemplate.txt"))
// const emailBody = emailTemplate.replace("${otp}", "otp")
