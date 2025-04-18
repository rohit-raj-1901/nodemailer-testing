const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Route to trigger email
app.get("/send-mail", async (req, res) => {
  try {
    // Create test SMTP account
    const testAccount = await nodemailer.createTestAccount();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email details
    const mailOptions = {
      from: '"Rohit 👨‍💻" <no-reply@example.com>',
      to: "xyz@gmail.com",
      subject: "Hello from Nodemailer",
      text: "This is a test email using Ethereal for dev/testing.",
      attachments: [
        {
          filename: "sample.jpeg",
          path: "sample.jpeg", // make sure this file exists
        },
      ],
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
    res.send(`Email sent! Preview it here: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Email failed to send.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
