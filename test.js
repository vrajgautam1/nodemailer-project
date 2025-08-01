// let maxnum = 99999
// let minnum = 10000

// console.log(Math.floor(Math.random() * (maxnum-minnum+1)+minnum))

// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const password = process.env.ACC_PW;
// const fs = require("fs")
// const htmlTemplate = fs.readFileSync("./htmlFormat.txt", "utf-8")
// const final = htmlTemplate.replace("${otp}", "otp")

// console.log(final)


// Create a test account or replace with real credentials.
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "gautamvraj1999@gmail.com",
//     pass: password,
//   },
// });

// // Wrap in an async IIFE so we can use await.
// async function sendOTP(to, otp) {
//   try {
//     const obj = {
//       from: '"Vraj Gautam" <gautamvraj1999@gmail.com>',
//       to: to,
//       subject: "OTP for registration",
//       text: otp, // plain‑text body
//       html: htmlTemplate,
//     };

//     const info = await transporter.sendMail(obj);
//     console.log("Message sent:", info.messageId);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

// module.exports = { sendOTP };
