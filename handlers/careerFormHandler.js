import transporter from '../utils/emailUtils.js'

// Logo path
const imgURL = 'https://estamuni.net/public/assets/images/logo/logo-dark.png'

// Configure Form Submission endpoints
const handleSubmitCareer = (req, res) => {
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
  
  
  };

  export default handleSubmitCareer