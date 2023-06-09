const transporter = require('../utils/emailUtils')

// Logo path
const imgURL = 'https://estamuni.net/public/assets/images/logo/logo-dark.png'

// Configure Form Submission endpoints
const handleSubmitContact = (req, res) => {
    const { name, email, phone, message } = req.body
  
    // Send email to admin
    const mailOptions = {
      from:`Contact Us ${process.env.ZOHO_ADMIN_EMAIL}`,
      to: process.env.ZOHO_CONTACT_US_EMAIL,
      subject: 'New Message From Contact Page',
      html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Template</title>
        <style>
          /* Add your styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo img {
            max-width: 200px;
          }
          .content {
            margin-bottom: 30px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="${imgURL}" alt="Logo">
          </div>
          <div class="content">
            <h2>You have been contacted by ${name}</h2>
            <h3>Sender's Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Message:</strong> <br> ${message}</p>
          </div>
          <div class="footer">
            &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `
    };
  
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).render('500', { 
          title: 'Server Error', 
          message: 'Oops! Something went wrong!.' 
        });
        console.error('Error sending email:', error);
  
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Form submitted successfully' });
      }
    });
  
    // Send email to user 
  
    // Define the email content
    const emailContent = {
      from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
      to: email,
      subject: 'Thank You for Your Submission',
      html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Template</title>
        <style>
          /* Add your styles here */
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo img {
            max-width: 200px;
          }
          .content {
            margin-bottom: 30px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999999;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="${imgURL}" alt="Logo">
          </div>
          <div class="content">
            <h2>Thank You for Your Submission</h2>
            <p>Dear ${name},</p>
            <p>This is to acknowledge that we have recieved your message</p>
            <p>We will respond to you as soon as possible.</p>
            <p>Regards,
    
            <br><br>ESTAM University
            <br> 148, Von Adjavon, En face d'Eglise Gbiba Wiwe, Segbeya, Akpakpa
            <br>Cotonou, Benin Republic</p>
          </div>
          <div class="footer">
            &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved.
          </div>
        </div>
      </body>
      </html>
      `
    };
  
    // Send the email
    transporter.sendMail(emailContent, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully:', info.response);
      }
    });
  
  }

module.exports = handleSubmitContact