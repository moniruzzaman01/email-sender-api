require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5001;
const app = express();
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};
const transporter = nodemailer.createTransport(mg(auth));

const mailSend = () => {
  transporter.sendMail(
    {
      from: "moniruzzamanshakib04@gmail.com",
      to: "moniruzzamanshakib04@gmail.com", // An array if you have multiple recipients.
      cc: "",
      bcc: "",
      subject: "Hey you, awesome!",
      //   replyTo: "reply2this@company.com",
      //You can use "html:" to send HTML email content. It's magic!
      html: "<b>Wow first mail sended!!!</b>",
      //You can use "text:" to send plain-text content. It's oldschool!
      text: "Mailgun rocks, pow pow!",
    },
    (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        console.log(`Response: ${info}`);
      }
    }
  );
};

const run = async () => {
  app.get("/send", async (req, res) => {
    mailSend();
    res.send("sendmail api hitted!!!");
  });
};
run();

app.get("/", async (req, res) => {
  res.send("server is running");
});
app.listen(port, () => {
  console.log(`listening from ${port}`);
});
