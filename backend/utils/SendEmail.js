const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "starknethhofficial@gmail.com",
    pass: "aobo rody dkvo gsbz",
  },
});
async function sendEmail(to, subject, html, cc) {
  const mailOptions = {
    from: "starknethhofficial@gmail.com",
    to: to,
    cc: cc,
    subject: subject,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email", error);
  }
}

module.exports = sendEmail;
