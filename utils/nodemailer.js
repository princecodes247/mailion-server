const nodemailer = require("nodemailer");

const emailService = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "princecodes247@gmail.com",
    pass: "gQAKs7CLVZyNf15t",
  },
});
module.exports = emailService;
