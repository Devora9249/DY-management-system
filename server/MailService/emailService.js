const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendEmail(to, subject, html) {  
  const info = await transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html
  });
  console.log(`✅ מייל נשלח ל-${to}`);
  return info;
}


module.exports = { sendEmail };
