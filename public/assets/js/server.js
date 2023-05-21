const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle POST request for form submission
app.post('/submit_form', (req, res) => {
  // Extract form data from request body
  const { name, email, phone, message } = req.body;

  // Create reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'aregpaul@gmail.com', // Replace with your email address
      pass: 'Boluwatife19' // Replace with your email password
    }
  });

  // Define email options
  const mailOptions = {
    from: 'Your Name <aregpaul@gmail.com>', // Replace with your name and email address
    to: 'recipient-email@example.com', // Replace with the recipient's email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error);
      res.status(500).send('Error occurred while sending email.');
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).send('Email sent successfully.');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
