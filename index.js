// Bring your dependencies to your app
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Require route manager
const routeManager = require('./routeManager');
const homeRoute = require('./routes/homeRoutes');
const handleSubmitApply = require('./handlers/applyFormHandler');
const upload = require('./utils/fileUtils');
const transporter = require('./utils/emailUtils')

// Initialize your handlebar engine
const engine = exphbs.engine;

// Initialize your express app
const app = express();

// Call env config method
dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));


// Use the routes in your app
app.use('/', homeRoute);
app.use('/', routeManager);


const imgURL = 'https://estamuni.net/public/assets/images/logo/logo-dark.png'

// Configure Form Submission endpoints
app.post('/submit-research', (req, res) => {
  const { name, email, title, abstract, discipline } = req.body

  // Send email to admin
  const mailOptions = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: process.env.ZOHO_ADMIN_EMAIL,
    subject: 'New Research Proposal from ' + name,
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
          <h2>Research Proposal by ${name}</h2>
          <h3>Details of Research Proposal</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Title of Research Proposal:</strong> <br> ${title}</p>
          <p><strong>Abstract:</strong> <br> ${abstract}</p>
          <p><strong>Relevant Discipline or Department:</strong> <br> ${discipline}</p>
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
      res.status(500).render('500', { title: 'Server Error' });
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
          <p>This is to acknowledge that we have received your research proposal. 
          We greatly appreciate your interest in our research publications.</p>
          <p>We will respond to you as soon as possible.</p>

          <p>Best Regards,
  
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
});

app.post('/submit-career', (req, res) => {
  const { name, email, phone, message } = req.body

  // send email to career services' email
  const mailOptions = {
    from: `Career Services ${process.env.ZOHO_CAREER_SERVICES_EMAIL}`,
    to: process.env.ZOHO_CAREER_SERVICES_EMAIL,
    subject: 'New Career Services Request from ' + name,
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
          <h2>Career Service Request from ${name}</h2>
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
      res.status(500).render('500', { title: 'Server Error' });
      console.error('Error sending email:', error);

    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Form submitted successfully' });
    }
  });

  // Send email to user 

  // Define the email content
  const emailContent = {
    from: `ESTAM University ${process.env.ZOHO_CAREER_SERVICES_EMAIL}`,
    to: email,
    subject: 'Thank You for Your Message',
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
          <h2>Thank You for Your Message</h2>
          <p>Dear ${name},</p>
          <p>This is to acknowledge that we have received your message. 
          We greatly appreciate your interest in our career services.</p>
          <p>Our dedicated career services team is reviewing your message, and one of our career counselors will contact you shortly to provide assistance and guidance.</p>
          <p>We understand the importance of your career goals, and we assure you that we will make every effort to respond to your inquiry promptly.</p>
          <p>Thank you for reaching out to us. Your trust in our services is valued.</p>

          <p>Best Regards,
  
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


});

app.post('/submit-contact', (req, res) => {
  const { name, email, phone, honeypot, anotherhiddenfield, message } = req.body

   // Check hidden fields for values (indicating spam)
   if (honeypot || anotherhiddenfield) {
    return res.status(400).send('Spam submission detected.');
  }

  // Send email to admin
  const mailOptions = {
    from:`Contact Us ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: process.env.ZOHO_CONTACT_US_EMAIL,
    subject: `New Message From ${name}`,
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
      res.status(500).render('500', { title: 'Server Error' });
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

    
});

app.post('/submit-apply', upload.fields([
  {name:'photo_passport'}, 
  {name: 'passport'}, 
  {name: 'ssce_certificate'},
  {name: 'birth_certificate'}
]), handleSubmitApply);


// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: 'Server Error' });
});

// Set your port to listen to enviroment port or 3000
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});