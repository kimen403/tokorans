const nodemailer = require("nodemailer");
require("dotenv").config();

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: "Notes Apps",
      to: targetEmail,
      subject: "Ekspor Catatan",
      text: "Terlampir hasil dari ekspor catatan",
    };
    console.log(message);
    this._transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        console.log("Server is ready to take our messages");
      }
    });
    try {
      return this._transporter.sendMail(message);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MailSender;
