// Bring your dependencies to your app
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

const passport = require('./utils/passportUtils')
const session = require('express-session');
const bcrypt = require('bcrypt');
// const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
const PDFDocument = require('pdfkit');
const passwordGenerator = require('password-generator');
const fs = require('fs');

const pool = require('./database');

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



//////////////////////////////////////////////////////////////////


app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 30 * 24 * 60 * 60 * 1000 // Session duration in milliseconds (30 days)
    }
}))
app.use(passport.initialize());
app.use(passport.session());
//////////////////////////////////////////////////////////////////



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


const imgURL = 'https://estamuni.net/assets/images/logo/logo-dark.png'

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
  
  if(name === 'RobertNet') {
      return res.status(400).send('Spam submission detected.');
  }

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


////////////////// Trying something ///////////////////////
// const users = [
//   {
//     id: 1,
//     username: 'user1',
//     password: '$2b$10$M1ZrROt21POyK90EJpXco.Qzyx87NE.EV0PVoKHdNt1AsaQIjrdWi', // hashed password: "password"
//   },$2b$10$L6ymgTJ7Mbspglnenaz.KuLX7.gpymgZjXTJWLGPP.0SGP8Mkq7zq
// $2b$10$4K8L7wTPThzuZa10y4NbRe89HrrXHeFsl6dnsUjn1kqvyAEoVUqY6
// ];

// Passport Configuration

// Configure passport LocalStrategy


// Middleware to check if user is authenticated
const {isAuthenticated, preventLoginAccess} = require("./authenticate-admin");




// Admit applicant
app.post("/admit-applicant", isAuthenticated,async (req, res) => {
  const { id, first_name, middle_name, last_name, dob, gender, email, phone, country, state, course, application_type, transfer_level, ssce_certificate, birth_certificate, photo_passport, passport } = req.body;

  try {
    // Delete applicant from applicants database table
    const deleteSql = "DELETE FROM applicants WHERE id = ?";
    const [deleteResult, deleteFields] = await pool.query(deleteSql, id);
    console.log(deleteResult);

    let level;

    if(application_type === "New Student"){
      level = 100
    } else if(application_type === "Direct Entry"){
        level = 200
    } else if(application_type === "Transfer Student"){
      if(transfer_level === "100L"){
        level = 100
      } else if(transfer_level === "200L"){
        level = 200
      }else if(transfer_level === "300L"){
        level = 300
      } else {
        level = 100  // if the applicant is a transfer student and doesn't enter his/her level
      }
    }

    // Add applicant to student table
    const insertSQL =  "INSERT INTO students (first_name, middle_name, last_name, dob, gender, email, phone, country, state, course, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Convert the provided DOB to a string in "yyyy-mm-dd" format
    const dobFormatted = new Date(dob).toISOString().split('T')[0];

    const [insertResult, insertField] = await pool.query(insertSQL, [
      first_name,
      middle_name,
      last_name,
      dobFormatted,
      gender,
      email,
      phone,
      country,
      state,
      course,
      level
    ]);

    console.log(insertResult);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const admissionDate = new Date().toLocaleDateString(undefined, options);
    console.log(admissionDate)

    const mailOptions = {
      from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
      to: email,
      subject: 'Provisional Admission Offer',
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Email Template</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px; margin:0; padding:20px;">
          <header class="header" style="padding:0 0 10px 0; margin:0 auto; border-bottom: 2px solid black; font-size: 14px; line-height:22px;">
            <h3 style="padding:0; margin:0; ; text-align:center">ECOLE SUPÉRIEURE DES TECHNOLOGIES AVANCÉES ET DE MANAGEMENT</h3>
            <h3 style="padding:0; margin:0; ; text-align:center">(ESTAM UNIVERSITY)</h3>
            <h3 style="padding:0; margin:0; ; text-align:center">AUTH:</h3>
            <h3 style="padding:0; margin:0; ; text-align:center">N°049/MESRS/CAB/DC/SGM/DPP/DGES/DEPES/SA</h3>
            <h3 style="padding:0; margin:0; text-align:center">MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA  RECHERCHE SCIENTIFIQUE, REPUBLIQUE DU BENIN</h3>
          </header>
          
          <section style="padding:30px 0 0 0;">
          
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;"><b>Date:</b> ${admissionDate}</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Dear ${first_name}${ ' ' + middle_name} ${last_name},</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Congratulations! We are pleased to inform you that you have been granted a provisional admission to Ecole Supérieure des Technologies Avancées et de Management (ESTAM University) to study <b>${course}</b> (${level}L) for the academic year starting in September 2023.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Your application and supporting documents have undergone a meticulous evaluation by our admissions committee, and we are delighted with your outstanding academic achievements and potential. We believe that your unique talents and abilities will make a significant contribution to our diverse and vibrant student community.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">To secure your place at ESTAM University, we kindly request you to pay the admission/registration fee of <b>₦35,000</b> to the following school account:</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;"><b>Bank Name:</b> First Bank </p>
                  <p style="line-height:20px; padding:0; margin:0;"><b>Bank Account:</b> 2034850600</p>
                  <p style="line-height:20px; padding:0; margin:0;"><b>Account Holder Name:</b> Ecole ESTAM Educational Services</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Please ensure that you include your full name and the reference "Admission Fee [Your Name]" when making the payment. This will enable us to promptly identify your transaction.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">After making the payment, kindly send a copy of the payment receipt to admissions@estamuni.net or submit it in person to the school's administration office during working hours (Monday to Friday, 9:00 AM to 5:00 PM). Upon receipt of the payment and confirmation of the transaction, we will proceed with the final steps of your enrollment.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Additionally, an official admission letter will be issued to you, this letter serves as official confirmation of your admission, signed by the Director of Admissions of ESTAM University.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Please ensure you make this payment within the next <b>10 days</b> to secure your admission. If you encounter any difficulties with the payment process or require any assistance, please do not hesitate to contact our admission office at the following numbers:</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;"><b>Benin:</b> +229 98 59 72 34 (WhatsApp)</p>
                <p style="line-height:20px; padding:0; margin:0;"><b>Nigeria:</b> +234 806 688 4850</p>
              </div>

              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Alternatively, you may reach us via email at info@estamuni.net. Our team is here to support and guide you through this exciting process.</p>
              </div>

              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">We look forward to warmly welcoming you to our esteemed academic community and eagerly anticipate the positive impact you will make through your contributions to our academic and extracurricular activities.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Once again, congratulations on your admission to ESTAM University. We extend our best wishes to you as you embark on an enriching educational journey with us.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Sincerely,</p>
              </div>

              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Office of Admissions </p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Ecole Supérieure des Technologies Avancées et de Management </p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Ayelawadje kajakumo en fance eglise Gbigbo wiiwe, Cotonou, Republic of Benin</p>
                  <p style="line-height:20px; padding:0; margin:0;">Benin: +229 98 59 72 34 </p>
                  <p style="line-height:20px; padding:0; margin:0;">Nigeria: +234 806 688 4850 </p>
                  <p style="line-height:20px; padding:0; margin:0;">admissions@estamuni.net</p>
              </div>
          
          </section>
        </body>
      </html>
        `
    };

    // Send email with attachment
    transporter.sendMail({
      ...mailOptions,
      retry: 10
    }, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });


    console.log('ssce_certificate:', ssce_certificate);
    console.log('birth_certificate:', birth_certificate);
    console.log('photo_passport:', photo_passport);
    console.log('passport:', passport);


    // Delete files associated with rejected applicant
    if(ssce_certificate !== ""){
      fs.unlink(`public/uploads/applicants/${ssce_certificate}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(birth_certificate !== ""){
      fs.unlink(`public/uploads/applicants/${birth_certificate}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(photo_passport !== ""){
      fs.unlink(`public/uploads/applicants/${photo_passport}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(passport !== ""){
      fs.unlink(`public/uploads/applicants/${passport}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    res.redirect('/admin-dashboard');

  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while processing the request.");
  }
});




// Reject applicant

app.post("/reject-applicant", async (req, res) => {
  try {
    const {id} = req.body

    const sql = "SELECT * FROM applicants WHERE id = ?";
    const [result, field] = await pool.query(sql, id)
    console.log(result)

    const {
      first_name,
      middle_name,
      last_name,
      gender,
      dob,
      email,
      phone,
      nationality,
      address,
      city,
      country,
      state,
      nok_name,
      nok_address,
      nok_city,
      nok_country,
      nok_state,
      nok_email,
      nok_relationship,
      primary_name,
      secondary_name,
      additional_school,
      course,
      application_type,
      transfer_level,
      start_date,
      ssce_certificate,
      birth_certificate,
      photo_passport,
      passport,
      hobbies_interest,
      referrer,
      created_at
    } = result[0]; // Assuming your result is an array with a single object

    // Convert the provided DOB to a string in "yyyy-mm-dd" format
    const dobFormatted = new Date(dob).toISOString().split('T')[0];
    
    // Use these variables in your insert query
    const insertSQL =  "INSERT INTO rejects (first_name, middle_name, last_name, gender, dob, email, phone, nationality, address, city, country, state, nok_name, nok_address, nok_city, nok_country, nok_state, nok_email, nok_relationship, primary_name, secondary_name, additional_school, course, application_type, transfer_level, start_date, ssce_certificate, birth_certificate, photo_passport, passport, hobbies_interest, referrer, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const insertResult = await pool.query(insertSQL, [
      first_name,
      middle_name,
      last_name,
      gender,
      dobFormatted,
      email,
      phone,
      nationality,
      address,
      city,
      country,
      state,
      nok_name,
      nok_address,
      nok_city,
      nok_country,
      nok_state,
      nok_email,
      nok_relationship,
      primary_name,
      secondary_name,
      additional_school,
      course,
      application_type,
      transfer_level,
      start_date,
      ssce_certificate,
      birth_certificate,
      photo_passport,
      passport,
      hobbies_interest,
      referrer,
      created_at
    ]);

  // Delete applicant from applicants database table
  const deleteSql = "DELETE FROM applicants WHERE id = ?";
  const [deleteResult, deleteFields] = await pool.query(deleteSql, id);
  console.log(deleteResult);


  const mailOptions = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: email,
    subject: 'Admission Decision',
    text: `Dear ${first_name},\n\nWe hope this letter finds you well. We appreciate your interest in ESTAM Uuiversity and the time and effort you invested in your application to the ${course} program. After careful consideration of your application and a thorough review of all aspects, we regret to inform you that we are unable to offer you admission for the 2023/2024 intake. \n\nWe understand that receiving this news may be disappointing, but please know that our admission process is highly competitive and we receive applications from many exceptional candidates. Our decision is not a reflection of your abilities or potential, but rather a result of the limited number of available spots.\n\nWe want to thank you for considering ESTAM University for your higher education journey. We believe that you possess unique qualities and potential that will serve you well in your future endeavors. We encourage you to continue pursuing your academic and personal goals with the same dedication and determination you demonstrated in your application.\n\nIf you have questions about our decision or would like feedback on your application, please do not hesitate to contact us. We are here to support you and provide any information you may need.\n\nWe wish you all the best in your educational pursuits and hope you find success and fulfillment in your chosen path.\n\n\nSincerely,\nThe Admissions Team,\nESTAM University`
  }

  // Send email
  transporter.sendMail({
    ...mailOptions,
    retry: 10
  }, (error, info) => {
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });

  res.redirect('/admin-dashboard/rejected-applications')
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while processing the request.");
  }
  
})


// Admit applicant
app.post("/admit-reject", isAuthenticated,async (req, res) => {
  const { id, first_name, middle_name, last_name, dob, gender, email, phone, country, state, course, application_type, transfer_level, ssce_certificate, birth_certificate, photo_passport, passport } = req.body;

  try {
    // Delete applicant from applicants database table
    const deleteSql = "DELETE FROM rejects WHERE id = ?";
    const [deleteResult, deleteFields] = await pool.query(deleteSql, id);
    console.log(deleteResult);

    let level;

    if(application_type === "New Student"){
      level = 100
    } else if(application_type === "Direct Entry"){
        level = 200
    } else if(application_type === "Transfer Student"){
      if(transfer_level === "100L"){
        level = 100
      } else if(transfer_level === "200L"){
        level = 200
      }else if(transfer_level === "300L"){
        level = 300
      } else {
        level = 100  // if the applicant is a transfer student and doesn't enter his/her level
      }
    }

    // Add applicant to student table
    const insertSQL =  "INSERT INTO students (first_name, middle_name, last_name, dob, gender, email, phone, country, state, course, level) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Convert the provided DOB to a string in "yyyy-mm-dd" format
    const dobFormatted = new Date(dob).toISOString().split('T')[0];

    const [insertResult, insertField] = await pool.query(insertSQL, [
      first_name,
      middle_name,
      last_name,
      dobFormatted,
      gender,
      email,
      phone,
      country,
      state,
      course,
      level
    ]);

    console.log(insertResult);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const admissionDate = new Date().toLocaleDateString(undefined, options);
    console.log(admissionDate)


    const mailOptions = {
      from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
      to: email,
      subject: 'Provisional Admission Offer',
      html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Email Template</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px; margin:0; padding:20px;">
          <header class="header" style="padding:0 0 10px 0; margin:0 auto; border-bottom: 2px solid black; font-size: 14px; line-height:22px;">
            <h3 style="padding:0; margin:0; ; text-align:center">ECOLE SUPÉRIEURE DES TECHNOLOGIES AVANCÉES ET DE MANAGEMENT</h3>
            <h3 style="padding:0; margin:0; ; text-align:center">(ESTAM UNIVERSITY)</h3>
            <h3 style="padding:0; margin:0; ; text-align:center">AUTH:</h3>
            <h3 style="padding:0; margin:0; ; text-align:center">N°049/MESRS/CAB/DC/SGM/DPP/DGES/DEPES/SA</h3>
            <h3 style="padding:0; margin:0; text-align:center">MINISTERE DE L'ENSEIGNEMENT SUPERIEUR ET DE LA  RECHERCHE SCIENTIFIQUE, REPUBLIQUE DU BENIN</h3>
          </header>
          
          <section style="padding:30px 0 0 0;">
          
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;"><b>Date:</b> ${admissionDate}</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Dear ${first_name}${ ' ' + middle_name} ${last_name},</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Congratulations! We are pleased to inform you that you have been granted a provisional admission to Ecole Supérieure des Technologies Avancées et de Management (ESTAM University) to study <b>${course}</b> (${level}L) for the academic year starting in September 2023.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Your application and supporting documents have undergone a meticulous evaluation by our admissions committee, and we are delighted with your outstanding academic achievements and potential. We believe that your unique talents and abilities will make a significant contribution to our diverse and vibrant student community.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">To secure your place at ESTAM University, we kindly request you to pay the admission/registration fee of <b>₦35,000</b> to the following school account:</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;"><b>Bank Name:</b> First Bank </p>
                  <p style="line-height:20px; padding:0; margin:0;"><b>Bank Account:</b> 2034850600</p>
                  <p style="line-height:20px; padding:0; margin:0;"><b>Account Holder Name:</b> Ecole ESTAM Educational Services</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Please ensure that you include your full name and the reference "Admission Fee [Your Name]" when making the payment. This will enable us to promptly identify your transaction.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">After making the payment, kindly send a copy of the payment receipt to admissions@estamuni.net or submit it in person to the school's administration office during working hours (Monday to Friday, 9:00 AM to 5:00 PM). Upon receipt of the payment and confirmation of the transaction, we will proceed with the final steps of your enrollment.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Additionally, an official admission letter will be issued to you, this letter serves as official confirmation of your admission, signed by the Director of Admissions of ESTAM University.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Please ensure you make this payment within the next <b>10 days</b> to secure your admission. If you encounter any difficulties with the payment process or require any assistance, please do not hesitate to contact our admission office at the following numbers:</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;"><b>Benin:</b> +229 98 59 72 34 (WhatsApp)</p>
                <p style="line-height:20px; padding:0; margin:0;"><b>Nigeria:</b> +234 806 688 4850</p>
              </div>

              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Alternatively, you may reach us via email at info@estamuni.net. Our team is here to support and guide you through this exciting process.</p>
              </div>

              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">We look forward to warmly welcoming you to our esteemed academic community and eagerly anticipate the positive impact you will make through your contributions to our academic and extracurricular activities.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Once again, congratulations on your admission to ESTAM University. We extend our best wishes to you as you embark on an enriching educational journey with us.</p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Sincerely,</p>
              </div>

              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Office of Admissions </p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Ecole Supérieure des Technologies Avancées et de Management </p>
              </div>
              
              <div style="margin-bottom: 20px; font-size:14px;">
                <p style="line-height:20px; padding:0; margin:0;">Ayelawadje kajakumo en fance eglise Gbigbo wiiwe, Cotonou, Republic of Benin</p>
                  <p style="line-height:20px; padding:0; margin:0;">Benin: +229 98 59 72 34 </p>
                  <p style="line-height:20px; padding:0; margin:0;">Nigeria: +234 806 688 4850 </p>
                  <p style="line-height:20px; padding:0; margin:0;">admissions@estamuni.net</p>
              </div>
          
          </section>
        </body>
      </html>
        `
    };

    // Send email with attachment
    transporter.sendMail({
      ...mailOptions,
      retry: 10
    }, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    console.log('ssce_certificate:', ssce_certificate);
    console.log('birth_certificate:', birth_certificate);
    console.log('photo_passport:', photo_passport);
    console.log('passport:', passport);


    // Delete files associated with rejected applicant
    if(ssce_certificate !== ""){
      fs.unlink(`public/uploads/applicants/${ssce_certificate}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(birth_certificate !== ""){
      fs.unlink(`public/uploads/applicants/${birth_certificate}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(photo_passport !== ""){
      fs.unlink(`public/uploads/applicants/${photo_passport}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(passport !== ""){
      fs.unlink(`public/uploads/applicants/${passport}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    res.redirect('/admin-dashboard/rejected-applications');

  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while processing the request.");
  }
});


// Send admission letter
app.post("/send-admission-letter", isAuthenticated, async (req, res) => {
  const { id, first_name, middle_name, last_name, email, course, level, currentUsername, currentPassword } = req.body;

  let username;
  let password;
  

  try {

    // Check if username or password is already set
  if(currentUsername === "" && currentPassword === ""){
    username = `${first_name.toLowerCase()}${last_name.toLowerCase()}@estamuni.net`;
    password = passwordGenerator(8, false);

    // Add username and password to student table
    const insertUserSQL = "UPDATE students SET username = ?, password = ? WHERE id = ?"; 

    const [insertUserResult, insertUserField] = await pool.query(insertUserSQL, [
      username,
      password,
      id
    ]);
    console.log(insertUserResult);
  } else {
    username = currentUsername
    password = currentPassword

  }

     /*
    // for backdating
    const fullYear = new Date().getFullYear();
    let currentYear;
    
    if (level >= 100 && level <= 300) {
      currentYear = fullYear - Math.floor(level / 100);
    }
    
    const septemberFirst = new Date(currentYear, 8, 1); // September is month 8 (0-indexed)
    const dayOfWeek = septemberFirst.getDay();
    const daysUntilSecondMonday = dayOfWeek <= 1 ? 8 - dayOfWeek : 15 - dayOfWeek;
    const secondMonday = new Date(septemberFirst);
    secondMonday.setDate(daysUntilSecondMonday);
    
    const admissionDate = secondMonday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    console.log(admissionDate);
    */

    // set admission date to every second monday of september (temporary)
    const currentYear = new Date().getFullYear();
    const septemberFirst = new Date(currentYear, 8, 1); // September is month 8 (0-indexed)
    const dayOfWeek = septemberFirst.getDay();
    const daysUntilSecondMonday = dayOfWeek <= 1 ? 8 - dayOfWeek : 15 - dayOfWeek;
    const secondMonday = new Date(septemberFirst);
    secondMonday.setDate(daysUntilSecondMonday);

    const admissionDate = secondMonday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const admissionLetterPath = 'path-to-your-admission-letter.pdf';
    const admissionDoc = new PDFDocument({
      margin: 40 // Adjust margin as needed
    });

    // Pipe the PDF to a writable stream and save it to a file
    const admissionStream = fs.createWriteStream(admissionLetterPath);
    admissionDoc.pipe(admissionStream);

    const pdfWidth = 612; // Standard width of a PDF page in points (8.5 inches)
    const imageWidth = 250; // Width of your image
    const xPosition = (pdfWidth - imageWidth) / 2; // Calculate the X position to center the image

    // Header
    admissionDoc.image('./public/assets/images/logo/logo-dark.png', xPosition, admissionDoc.y, { width: imageWidth });
    admissionDoc.moveDown();
    admissionDoc.font('Helvetica-Bold');
    admissionDoc.fontSize(12).text('ECOLE SUPÉRIEURE DES TECHNOLOGIES AVANCÉES ET DE MANAGEMENT', {align: 'center'});
    admissionDoc.font('Helvetica');
    admissionDoc.moveDown(0.1);
    admissionDoc.fontSize(10).text('AUTH: N°049/MESRS/CAB/DC/SGM/DPP/DGES/DEPES/SA', {align: 'center'});
    admissionDoc.moveDown(0.3);
    admissionDoc.fontSize(10).text('MINISTERE DE L\'ENSEIGNEMENT SUPERIEUR', {align: 'center'});
    admissionDoc.moveDown(0.1);
    admissionDoc.fontSize(10).text('ET DE LA RECHERCHE SCIENTIFIQUE,', {align: 'center'});
    admissionDoc.moveDown(0.1);
    admissionDoc.fontSize(10).text('REPUBLIQUE DU BENIN', {align: 'center'});

    admissionDoc.moveDown();
    // Draw bottom border line
    const startY = admissionDoc.y;
    const lineWidth = 1; // Adjust the line width as needed
    admissionDoc.lineWidth(lineWidth).moveTo(40, startY).lineTo(572, startY).stroke();

    // Content
    admissionDoc.fontSize(11);
    admissionDoc.moveDown(2);

    admissionDoc.font('Helvetica-Bold');
    admissionDoc.text(`Date: ${admissionDate}`, { align: 'right' });
    admissionDoc.font('Helvetica');

    admissionDoc.moveDown();
    admissionDoc.text(`Dear, `, { continued: true });
    admissionDoc.font('Helvetica-Bold'); // Set the font style to bold
    admissionDoc.text(`${first_name}${' ' + middle_name} ${last_name}`);


    admissionDoc.moveDown();
    admissionDoc.font('Helvetica-Bold');
    admissionDoc.text('LETTER OF ADMISSION', { align: 'center' });

    admissionDoc.moveDown();
    admissionDoc.font('Helvetica');
    admissionDoc.text('We are pleased to inform you that you have been offered a provisional admission into the department of ', { continued: true, lineGap: 2 });
    admissionDoc.font('Helvetica-Bold'); // Set the font style to bold
    admissionDoc.text(`${course} `, { continued: true, lineGap: 2  });
    admissionDoc.font('Helvetica'); // Reset the font style to regular
    admissionDoc.text('on the following terms and conditions:', { lineGap: 2 }); // Move to the next line

    admissionDoc.moveDown();

    admissionDoc.text('1. You shall be required to appear for registration in person on the stated date of resumption.', { align: 'left', lineGap: 2  })
    admissionDoc.moveDown(0.4);
    admissionDoc.text('2. At the point of registration, you shall be required to produce the original copies of the following documents:', { align: 'left', lineGap: 2  })
    admissionDoc.moveDown(0.2);
    admissionDoc.text('a. Evidence of payment of the fees and other charges.', { align: 'left', lineGap: 2  })

    admissionDoc.text('b. O’ level result(s) (not more than two sittings).', { align: 'left', lineGap: 2  })

    admissionDoc.text('c. Four passport-sized photographs with a white background.', { align: 'left', lineGap: 2  })

    admissionDoc.text('d. International/ECOWAS passport for your travels and NYSC mobilization.', { align: 'left', lineGap: 2  })

    admissionDoc.text('e. Birth Certificate.', { align: 'left' })
    admissionDoc.moveDown(0.4);
    admissionDoc.text('3. Students from countries with eight-semester university program design will run two (2) summer semesters compulsory.', { align: 'left', lineGap: 2  })


    admissionDoc.moveDown();
    admissionDoc.text('This offer of admission is tentative and contingent upon a candidate meeting all the requirements and conditions for admission as stipulated in the admission letter.', { align: 'left', lineGap: 2  });

    admissionDoc.moveDown();
    admissionDoc.text(`For a candidate who may not have obtained the requisite qualifying result for registration and final year clearance, his or her admission shall remain provisional until such results (containing the necessary grades) and such clearance requirements are submitted.`, { align: 'left', lineGap: 2  });

    admissionDoc.moveDown();
    admissionDoc.text(`By acceptance of this offer of admission in compliance with all registration requirements, it is construed that you have accepted to abide by all the rules and regulations issued by the University authority from time to time. Non-observance of any of the conditions, rules, and regulations may result in your expulsion from the University.`, { align: 'left', lineGap: 2  });

    admissionDoc.moveDown();
    admissionDoc.text('', { align: 'left' });

    admissionDoc.moveDown();
    admissionDoc.text('Yours sincerely,', { align: 'left' });

     // Calculate the position based on the text width
     const textWidth = admissionDoc.widthOfString('Yours sincerely,');
     const xSignPosition = 100 - textWidth;
 
     admissionDoc.image('./public/assets/images/sign.png', xSignPosition, admissionDoc.y, { width: 100 });
    
    admissionDoc.font('Helvetica-Bold');
    admissionDoc.text('ABDULLAHI AHMED LAWAL, ACIFC', { align: 'left' });
    admissionDoc.font('Helvetica');
    admissionDoc.text('DIRECTOR OF ADMISSIONS', { align: 'left' });

    admissionDoc.end();

    admissionStream.on('finish', () => {
    console.log('PDF created successfully:', admissionLetterPath);
    });





    const returningStudentTuitionPath = 'Returning_Student_Tuition.pdf';
    const returningStudentTuitionDoc = new PDFDocument({
      margin: 20 // Adjust margin as needed
    });

    // Pipe the PDF to a writable stream and save it to a file
    const returningStudentTuitionStream = fs.createWriteStream(returningStudentTuitionPath);
    returningStudentTuitionDoc.pipe(returningStudentTuitionStream);

  
    const returningStudentTuitionDocXPosition = (pdfWidth - 500) / 2; // Calculate the X position to center the image
  // Header
  returningStudentTuitionDoc.image('./public/assets/images/logo/logo-dark.png', xPosition, returningStudentTuitionDoc.y, { width: imageWidth });
  returningStudentTuitionDoc.moveDown();
  returningStudentTuitionDoc.font('Helvetica-Bold');
  returningStudentTuitionDoc.fontSize(12).text('ECOLE SUPÉRIEURE DES TECHNOLOGIES AVANCÉES ET DE MANAGEMENT', {align: 'center'});
  returningStudentTuitionDoc.font('Helvetica');
  returningStudentTuitionDoc.moveDown(0.1);
  returningStudentTuitionDoc.fontSize(10).text('AUTH: N°049/MESRS/CAB/DC/SGM/DPP/DGES/DEPES/SA', {align: 'center'});
  returningStudentTuitionDoc.moveDown(0.3);
  returningStudentTuitionDoc.fontSize(10).text('MINISTERE DE L\'ENSEIGNEMENT SUPERIEUR', {align: 'center'});
  returningStudentTuitionDoc.moveDown(0.1);
  returningStudentTuitionDoc.fontSize(10).text('ET DE LA RECHERCHE SCIENTIFIQUE,', {align: 'center'});
  returningStudentTuitionDoc.moveDown(0.1);
  returningStudentTuitionDoc.fontSize(10).text('REPUBLIQUE DU BENIN', {align: 'center'});

  returningStudentTuitionDoc.moveDown();
  // Draw bottom border line
  returningStudentTuitionDoc.lineWidth(lineWidth).moveTo(30, returningStudentTuitionDoc.y).lineTo(582, returningStudentTuitionDoc.y).stroke();

  returningStudentTuitionDoc.fontSize(10);
  returningStudentTuitionDoc.moveDown(3);

  returningStudentTuitionDoc.font('Helvetica-Bold');
  returningStudentTuitionDoc.text('APPROVED TUITION FEES FOR RETURNING STUDENTS', {align: 'center'});
  returningStudentTuitionDoc.moveDown(0.5);
  returningStudentTuitionDoc.text('200 & 300 LEVEL', {align: 'center' });

  returningStudentTuitionDoc.font('Helvetica');
  returningStudentTuitionDoc.moveDown(2);

  returningStudentTuitionDoc.font('Helvetica-Bold');
  returningStudentTuitionDoc.text('NAIRA', returningStudentTuitionDocXPosition, returningStudentTuitionDoc.y, { align: 'right', width: 500  });

  returningStudentTuitionDoc.moveDown(0.5);
  returningStudentTuitionDoc.font('Helvetica');

  const items = [
    { name: 'TUITION FEE', price: '175,000' },
    { name: 'EXAMINATION', price: '10,000' },
    { name: 'INTERNET', price: '10,000' },
    { name: 'INTENSIVE FRENCH', price: '10,000' },
    { name: 'RETURNING FEE', price: '10,000' },
    { name: 'COURSE FORM', price: '5,000' }
  ];

  for (const item of items) {
    returningStudentTuitionDoc.text(`${item.name}`, returningStudentTuitionDocXPosition, returningStudentTuitionDoc.y, { continued: true, align: 'left',  width: 500 });
    returningStudentTuitionDoc.text(`${item.price}`, { align: 'right', lineGap: 4 });
  }
  returningStudentTuitionDoc.font('Helvetica-Bold');
  returningStudentTuitionDoc.text(`TOTAL      220,000`, returningStudentTuitionDocXPosition, returningStudentTuitionDoc.y, { align: 'right', lineGap: 4,  width: 500 });
  returningStudentTuitionDoc.font('Helvetica');




  returningStudentTuitionDoc.moveDown();
  returningStudentTuitionDoc.font('Helvetica-Bold');
  returningStudentTuitionDoc.text('PRACTICALS', returningStudentTuitionDocXPosition, returningStudentTuitionDoc.y, { underline: true, align: 'left', width: 500  });

  returningStudentTuitionDoc.moveDown(0.5);
  returningStudentTuitionDoc.font('Helvetica');

  const items1 = [
    { name: 'COMPUTER SCIENCE', price: '10,000' },
    { name: 'COMPUTER SOFTWARE DEVELOPMENT', price: '10,000' },
    { name: 'INFORMATION TECHNOLOGY', price: '10,000' },
    { name: 'MASS COMMUNICATION', price: '10,000' }
  ];


  for (const item of items1) {
    returningStudentTuitionDoc.text(`${item.name}`, returningStudentTuitionDocXPosition, returningStudentTuitionDoc.y, { continued: true, align: 'left',  width: 500 });
    returningStudentTuitionDoc.text(`${item.price}`, { align: 'right', lineGap: 4 });
  }


  returningStudentTuitionDoc.end();


  returningStudentTuitionStream.on('finish', () => {
    console.log(`PDF saved to ${returningStudentTuitionPath}`);
  });

  returningStudentTuitionStream.on('error', (err) => {
    console.error('Error saving PDF:', err);
  });


  ////////




  const tuitionFeePath = 'Student_Tuition.pdf';
    const tuitionFeeDoc = new PDFDocument({
      margin: 20 // Adjust margin as needed
    });

    // Pipe the PDF to a writable stream and save it to a file
    const tuitionFeeStream = fs.createWriteStream(tuitionFeePath);
    tuitionFeeDoc.pipe(tuitionFeeStream);

  
    const tuitionFeeDocXPosition = (pdfWidth - 500) / 2; // Calculate the X position to center the image
  // Header
  tuitionFeeDoc.image('./public/assets/images/logo/logo-dark.png', xPosition, tuitionFeeDocXPosition.y, { width: imageWidth });
  tuitionFeeDoc.moveDown();
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.fontSize(12).text('ECOLE SUPÉRIEURE DES TECHNOLOGIES AVANCÉES ET DE MANAGEMENT', {align: 'center'});
  tuitionFeeDoc.font('Helvetica');
  tuitionFeeDoc.moveDown(0.1);
  tuitionFeeDoc.fontSize(10).text('AUTH: N°049/MESRS/CAB/DC/SGM/DPP/DGES/DEPES/SA', {align: 'center'});
  tuitionFeeDoc.moveDown(0.3);
  tuitionFeeDoc.fontSize(10).text('MINISTERE DE L\'ENSEIGNEMENT SUPERIEUR', {align: 'center'});
  tuitionFeeDoc.moveDown(0.1);
  tuitionFeeDoc.fontSize(10).text('ET DE LA RECHERCHE SCIENTIFIQUE,', {align: 'center'});
  tuitionFeeDoc.moveDown(0.1);
  tuitionFeeDoc.fontSize(10).text('REPUBLIQUE DU BENIN', {align: 'center'});

  tuitionFeeDoc.moveDown();
  // Draw bottom border line
  tuitionFeeDoc.lineWidth(lineWidth).moveTo(30, tuitionFeeDoc.y).lineTo(582, tuitionFeeDoc.y).stroke();

  tuitionFeeDoc.fontSize(10);
  tuitionFeeDoc.moveDown(1);

  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text('APPROVED TUITION FEES FOR STUDENTS', {align: 'center'});
  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.text('100 LEVEL', {align: 'center' });

  tuitionFeeDoc.font('Helvetica');
  tuitionFeeDoc.moveDown(0.5);

  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text('NAIRA', tuitionFeeDocXPosition, tuitionFeeDoc.y, { align: 'right', width: 500  });
  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica');

  const tuitionItems = [
    { name: 'ADMISSION FORM', price: '5,000' },
    { name: 'ADMISSION PROCESSING & REGISTRATION', price: '35,000' },
    { name: 'TUITION FEE', price: '175,000' },
    { name: 'EXAMINATION', price: '10,000' },
    { name: 'INTERNET', price: '10,000' },
    { name: 'INTENSIVE FRENCH', price: '10,000' },
    { name: 'MATRICULATION', price: '10,000' },
    { name: 'ACCEPTANCE FEE', price: '10,000' },
    { name: 'UNIFORM, ID CARD & COURSE FORM', price: '25,000' }
  ];

  for (const item of tuitionItems) {
    tuitionFeeDoc.text(`${item.name}`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { continued: true, align: 'left',  width: 500 });
    tuitionFeeDoc.text(`${item.price}`, { align: 'right', lineGap: 2 });
  }
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text(`TOTAL      290,000`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { align: 'right', lineGap: 2,  width: 500 });
  tuitionFeeDoc.font('Helvetica');




  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text('200 Level', tuitionFeeDocXPosition, tuitionFeeDoc.y, { align: 'center', lineGap: 2,width: 500  });

  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica');

  const tuitionItems1 = [
    { name: 'ADMISSION FORM', price: '5,000' },
    { name: 'ADMISSION PROCESSING & REGISTRATION', price: '35,000' },
    { name: 'TUITION FEE', price: '175,000' },
    { name: 'TRANSFER FEE', price: '40,000' },
    { name: 'EXAMINATION', price: '10,000' },
    { name: 'INTERNET', price: '10,000' },
    { name: 'INTENSIVE FRENCH', price: '10,000' },
    { name: 'ACCEPTANCE FEE', price: '10,000' },
    { name: 'UNIFORM, ID CARD & COURSE FORM', price: '25,000' }
  ];


  for (const item of tuitionItems1) {
    tuitionFeeDoc.text(`${item.name}`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { continued: true, align: 'left',  width: 500 });
    tuitionFeeDoc.text(`${item.price}`, { align: 'right', lineGap: 2});
  }
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text(`TOTAL      320,000`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { align: 'right', lineGap: 2,  width: 500 });
  tuitionFeeDoc.font('Helvetica');


  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text('300 Level', tuitionFeeDocXPosition, tuitionFeeDoc.y, { align: 'center', lineGap: 2, width: 500  });

  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica');

  const tuitionItems2 = [
    { name: 'ADMISSION FORM', price: '5,000' },
    { name: 'ADMISSION PROCESSING & REGISTRATION', price: '35,000' },
    { name: 'TUITION FEE', price: '175,000' },
    { name: 'TRANSFER FEE', price: '40,000' },
    { name: 'EXAMINATION', price: '10,000' },
    { name: 'INTERNET', price: '10,000' },
    { name: 'INTENSIVE FRENCH', price: '10,000' },
    { name: 'ACCEPTANCE FEE', price: '20,000' },
    { name: 'UNIFORM, ID CARD & COURSE FORM', price: '25,000' }
  ];


  for (const item of tuitionItems2) {
    tuitionFeeDoc.text(`${item.name}`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { continued: true, align: 'left',  width: 500 });
    tuitionFeeDoc.text(`${item.price}`, { align: 'right', lineGap: 2 });
  }
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text(`TOTAL      330,000`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { align: 'right', lineGap: 2,  width: 500 });
  tuitionFeeDoc.font('Helvetica');


  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text('PRACTICALS', tuitionFeeDocXPosition, tuitionFeeDoc.y, { underline: true, align: 'left', width: 500  });

  tuitionFeeDoc.moveDown(0.5);
  tuitionFeeDoc.font('Helvetica');

  const tuitionItems3 = [
    { name: 'COMPUTER SCIENCE', price: '10,000' },
    { name: 'INFORMATION TECHNOLOGY', price: '10,000' },
    { name: 'MASS COMMUNICATION', price: '10,000' }
  ];


  for (const item of tuitionItems3) {
    tuitionFeeDoc.text(`${item.name}`, tuitionFeeDocXPosition, tuitionFeeDoc.y, { continued: true, align: 'left',  width: 500 });
    tuitionFeeDoc.text(`${item.price}`, { align: 'right', lineGap: 2 });
  }
  tuitionFeeDoc.font('Helvetica-Bold');
  tuitionFeeDoc.text('HOSTEL FEES', tuitionFeeDocXPosition, tuitionFeeDoc.y, { continued: true, align: 'left',  width: 500 });
  tuitionFeeDoc.text('85,000 PER SEMESTER', { align: 'right', lineGap: 2 });




  tuitionFeeDoc.end();


  tuitionFeeStream.on('finish', () => {
    console.log(`PDF saved to ${tuitionFeePath}`);
  });

  tuitionFeeStream.on('error', (err) => {
    console.error('Error saving PDF:', err);
  });

    const mailOptions = {
      from: `ESTAM University <${process.env.ZOHO_ADMIN_EMAIL}>`,
      to: email,
      subject: 'Admission Letter',
      text: `We're delighted you've chosen ESTAM University. Our expert faculty, cutting-edge technologies, and practical curriculum will provide you with excellent learning opportunities no matter what your field of study.\n\nAttached are your:\n- Offer of Admission (Letter of Acceptance) to ESTAM University.\n- School fees breakdown.\n\nPlease review your letter carefully as it contains important information about next steps.\n\nTo access the student portal, visit this site, www.estamuni.net/student-login\nBelow is your username and password to gain access to the school dashboard:\n\nUsername: ${username}\nPassword: ${password}\n\nFor more information:\nEmail: admissions@estamuni.net\nWhatsApp: +22964989194\n\nWe look forward to seeing you on campus.`,
      attachments: [
        {
          filename: 'Admission_Letter.pdf',
          path: admissionLetterPath
        },
        {
          filename: 'Returning_Student_Tuition.pdf',
          path: returningStudentTuitionPath
        },
        {
          filename: 'Student_Tuition_Fees.pdf',
          path: tuitionFeePath
        }
      ]
    };

    // Send email with attachment
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        req.flash('error', 'Error sending admission letter.');
      } else {
        console.log('Email sent:', info.response);
        req.flash('success', 'Admission Letter Sent');
      }

      // Delete the PDF file after sending email
      fs.unlink(admissionLetterPath, (err) => {
        if (err) throw err;
        console.log('PDF file deleted successfully.');
      });

      // Delete the PDF file after sending email
      fs.unlink(returningStudentTuitionPath, (err) => {
        if (err) throw err;
        console.log('PDF file deleted successfully.');
      });

      // Delete the PDF file after sending email
      fs.unlink(tuitionFeePath, (err) => {
        if (err) throw err;
        console.log('PDF file deleted successfully.');
      });

    });



    // Add applicant to student table
    const insertSQL =  "UPDATE students SET is_verified = ? WHERE id = ?";

    // Convert the provided DOB to a string in "yyyy-mm-dd" format
    const verified = 1;

    const [insertResult, insertField] = await pool.query(insertSQL, [verified, id]);


  res.redirect(`/admin-dashboard/students/${id}`);

  } catch (error) {
    console.log('Error:', error);
    req.flash('error', 'An error occurred while processing the request.');
    res.status(500).redirect(`/admin-dashboard/students/${id}`);
  }
});






app.post("/delete-applicant", async (req, res) => {
  try {
    const {id, ssce_certificate, birth_certificate, photo_passport, passport} = req.body;

    // Delete applicant from applicants database table
    const deleteSql = "DELETE FROM rejects WHERE id = ?";
    const [deleteResult, deleteFields] = await pool.query(deleteSql, id);
    console.log(deleteResult);

    console.log('ssce_certificate:', ssce_certificate);
    console.log('birth_certificate:', birth_certificate);
    console.log('photo_passport:', photo_passport);
    console.log('passport:', passport);


    // Delete files associated with rejected applicant
    if(ssce_certificate !== ""){
      fs.unlink(`public/uploads/applicants/${ssce_certificate}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(birth_certificate !== ""){
      fs.unlink(`public/uploads/applicants/${birth_certificate}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(photo_passport !== ""){
      fs.unlink(`public/uploads/applicants/${photo_passport}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    if(passport !== ""){
      fs.unlink(`public/uploads/applicants/${passport}`, (err) => {
          if (err) {
              console.error('Error deleting file:', err);
          } else {
              console.log('File deleted successfully');
          }
      });
    }

    res.redirect('/admin-dashboard/rejected-applications')
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while processing the request.");
  }
});




app.post('/change-admin-password', isAuthenticated, async (req, res) => {
  try {
      const { currentPassword, newPassword, newPasswordRetype} = req.body;
      const id = req.user.id;

      // Get the admin's current information
      const [adminResult, adminField] = await pool.query('SELECT * FROM admins WHERE id = ?', id);
      const admin = adminResult[0];


      // Compare the provided old password with the stored hash
      const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, admin.password);

      if (!isCurrentPasswordCorrect) {
          req.flash('currentPasswordError', 'Incorrect  password');
          return res.redirect('/admin-dashboard/admin-settings');
      }

      if(newPassword !== newPasswordRetype){

        req.flash('newPasswordError', "Please re-enter the new password exactly as before");
        return res.redirect('/admin-dashboard/admin-settings');
        
      } 

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the password in the database
      await pool.query('UPDATE admins SET password = ? WHERE id = ?', [hashedNewPassword, id]);

      req.flash('success', 'Password updated successfully');
      return res.redirect('/admin-dashboard/admin-settings');
      
  } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., send an error response
      res.status(500).send("An error occurred while processing the request.");
  }
});



///////////////////////////////////////////////////////////


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


