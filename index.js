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
  const { name, email, phone, message } = req.body

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
  const { id, first_name, middle_name, last_name, dob, gender, email, phone, country, state, course, application_type, transfer_level } = req.body;

  try {
    // Delete applicant from applicants database table
    const deleteSql = "DELETE FROM applicants WHERE id = ?";
    const [deleteResult, deleteFields] = await pool.query(deleteSql, [id]);
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

    // Create a PDF document
    const doc = new PDFDocument();

    // Pipe the PDF output to a file
    const admissionLetterPath = 'path-to-your-admission-letter.pdf';
    const writeStream = fs.createWriteStream(admissionLetterPath);
    doc.pipe(writeStream);

    // Add content to the PDF
    doc.fontSize(14).text(`Congratulations on Your Admission to ESTAM University!\n\n`, { align: 'center' });
    doc.fontSize(12).text(`Dear ${first_name},\n\n`);
    doc.text(`We are pleased to inform you that you have been provisionally admitted to the ${course} at ESTAM University for the academic year 2023.\n\n`);
    doc.text(`If you have any questions or need further assistance, please don't hesitate to contact our admissions office at admissions@sampleuniversity.edu.\n\n`);
    doc.text(`Once again, congratulations on your admission, and we look forward to welcoming you to ESTAM University!\n\n`);
    doc.text('Sincerely,\n');
    doc.text('The Admissions Team\n');

    // End the PDF and send it to the response
    doc.end();

    const mailOptions = {
      from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
      to: email,
      subject: 'Provisional Admission Offer',
      text: 'Congratulations on Your Admission!',
      attachments: [
        {
          filename: 'Provisional_Admission_Letter.pdf',
          path: admissionLetterPath
        }
      ]
    };

    // Send email with attachment
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

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
    const [result, field] = await pool.query(sql, [id])
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
  const [deleteResult, deleteFields] = await pool.query(deleteSql, [id]);
  console.log(deleteResult);


  const mailOptions = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: email,
    subject: 'Admission Decision',
    text: `Dear ${first_name},\n\nWe hope this letter finds you well. We appreciate your interest in ESTAM Uuiversity and the time and effort you invested in your application to the ${course} program. After careful consideration of your application and a thorough review of all aspects, we regret to inform you that we are unable to offer you admission for the 2023/2024 intake. \n\nWe understand that receiving this news may be disappointing, but please know that our admission process is highly competitive and we receive applications from many exceptional candidates. Our decision is not a reflection of your abilities or potential, but rather a result of the limited number of available spots.\n\nWe want to thank you for considering ESTAM University for your higher education journey. We believe that you possess unique qualities and potential that will serve you well in your future endeavors. We encourage you to continue pursuing your academic and personal goals with the same dedication and determination you demonstrated in your application.\n\nIf you have questions about our decision or would like feedback on your application, please do not hesitate to contact us. We are here to support you and provide any information you may need.\n\nWe wish you all the best in your educational pursuits and hope you find success and fulfillment in your chosen path.\n\n\nSincerely,\nThe Admissions Team,\nESTAM University`
  }

  // Send email with attachment
  transporter.sendMail(mailOptions, (error, info) => {
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
  const { id, first_name, middle_name, last_name, dob, gender, email, phone, country, state, course, application_type, transfer_level } = req.body;

  try {
    // Delete applicant from applicants database table
    const deleteSql = "DELETE FROM rejects WHERE id = ?";
    const [deleteResult, deleteFields] = await pool.query(deleteSql, [id]);
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

    // Create a PDF document
    const doc = new PDFDocument();

    // Pipe the PDF output to a file
    const admissionLetterPath = 'path-to-your-admission-letter.pdf';
    const writeStream = fs.createWriteStream(admissionLetterPath);
    doc.pipe(writeStream);

    // Add content to the PDF
    doc.fontSize(14).text(`Congratulations on Your Admission to ESTAM University!\n\n`, { align: 'center' });
    doc.fontSize(12).text(`Dear ${first_name},\n\n`);
    doc.text(`We are pleased to inform you that you have been provisionally admitted to the ${course} at ESTAM University for the academic year 2023.\n\n`);
    doc.text(`If you have any questions or need further assistance, please don't hesitate to contact our admissions office at admissions@sampleuniversity.edu.\n\n`);
    doc.text(`Once again, congratulations on your admission, and we look forward to welcoming you to ESTAM University!\n\n`);
    doc.text('Sincerely,\n');
    doc.text('The Admissions Team\n');

    // End the PDF and send it to the response
    doc.end();

    const mailOptions = {
      from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
      to: email,
      subject: 'Provisional Admission Offer',
      text: 'Congratulations on Your Admission!',
      attachments: [
        {
          filename: 'Provisional_Admission_Letter.pdf',
          path: admissionLetterPath
        }
      ]
    };

    // Send email with attachment
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.redirect('/admin-dashboard/rejected-applications');

  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while processing the request.");
  }
});


app.post("/delete-applicant", async (req, res) => {
  try {
    const {id} = req.body;

    // Delete applicant from applicants database table
    const deleteSql = "DELETE FROM rejects WHERE id = ?";
    const [deleteResult, deleteFields] = await pool.query(deleteSql, [id]);
    console.log(deleteResult);

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
      const [adminResult, adminField] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
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