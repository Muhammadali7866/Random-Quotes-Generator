const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) create the transporterr
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "malik6034486@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // 2) define the email option
  const mailOptions = {
    from: "Random Quote App",
    sender: "Random app email",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) actually send the mail
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
module.exports = sendEmail;
