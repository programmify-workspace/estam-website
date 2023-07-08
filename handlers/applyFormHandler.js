const transporter = require('../utils/emailUtils.js');
const pool = require('../database.js');

// Logo path
const imgURL = 'https://estamuni.net/public/assets/images/logo/logo-dark.png';

// Configure Form Submission endpoints
const handleSubmitApply = (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    gender,       // select option
    dob,
    email,
    phone,
    nationality,  // select option
    address,
    city,
    country,      // select option
    state,        // select option
    nok_name,
    nok_address,
    nok_city,
    nok_country,  // select option
    nok_state,    // select option
    nok_email,
    nok_relationship,
    primary_name,
    secondary_name,
    additional_school,
    course,             // select option
    start_date,
    application_type,  // select option
    transfer_level,    // select option
    hobbies_interest,
    referrer
  } = req.body

    // Trim whitespace from input values
    const trimmedFirstName = first_name.trim();
    const trimmedMiddleName = middle_name.trim();
    const trimmedLastName = last_name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedNokEmail = nok_email.trim();

    // Media Files
    const photo_passport = req.files['photo_passport'][0].filename;
    const passport = req.files['passport'][0].filename;
    const birth_certificate = req.files['birth_certificate'][0].filename;
    const ssce_certificate = req.files['ssce_certificate'][0].filename;

    const photoPassportFilePath = req.files['photo_passport'][0].path;
    const passportFilePath = req.files['passport'][0].path;
    const birthCertificateFilePath = req.files['birth_certificate'][0].path;
    const ssceCertificateFilePath = req.files['ssce_certificate'][0].path;

     // Insert Form data into table
  const sql =
  'INSERT INTO applicants (first_name, middle_name, last_name, gender, dob, email, phone, nationality, address, city, country, state, nok_name, nok_address, nok_city, nok_country, nok_state, nok_email, nok_relationship, primary_name, secondary_name, additional_school, course, application_type, transfer_level, start_date, ssce_certificate, birth_certificate, photo_passport, passport, hobbies_interest, referrer) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  const values = [trimmedFirstName, trimmedMiddleName, trimmedLastName, gender, dob, trimmedEmail, trimmedPhone,, nationality, address, city, country, state, nok_name, nok_address, nok_city, nok_country, nok_state, trimmedNokEmail,, nok_relationship, primary_name, secondary_name, additional_school, course, application_type, transfer_level, start_date, ssce_certificate, birth_certificate, photo_passport, passport, hobbies_interest, referrer];


    // Execute the query
    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.send('An error occurred while inserting the data.');
        } else {
            console.log('Data inserted successfully.');
            res.send('Data inserted successfully.');
        }
    });

    // send email to career services' email
    const mailOptions = {
        from: `ESTAM Admissions ${process.env.ZOHO_ADMIN_EMAIL}`,
        to: process.env.ZOHO_ADMISSIONS_EMAIL,
        subject: 'New Admission Application Recieved',
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
                      }
    
                      .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 4px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                      }
    
                      .email-section {
                        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
                        padding: 20px;
                        background: #f1f4f6;
                        margin-bottom: 20px;
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
                        <h2>Application For Admission </h2>
                        <div class="email-section">
                          <h3>Personal Details:</h3>
                          <p>
                            <strong>Name:</strong> ${last_name} ${middle_name} ${first_name}
                          </p>
                          <p>
                            <strong>Gender:</strong> ${gender} | <strong>Nationality:</strong> ${nationality}
                          </p>
                          <p>
                            <strong>Date of Birth:</strong> ${dob}
                          </p>
                          <p>
                            <strong>Address:</strong>
                            <br>${address}, ${city}, ${state}, ${country}
                          </p>
                          <p>
                            <strong>Email:</strong> ${email}
                          </p>
                          <p>
                            <strong>Phone Number:</strong> ${phone}
                          </p>
                          <p>
                            <strong>State Date:</strong> ${start_date}
                          </p>
                        </div>
                        <div class="email-section">
                            <h3>Next of Kin Details:</h3>
                        <p>
                          <strong>Name:</strong> ${nok_name}
                        </p>
                        <p>
                          <strong>address:</strong>
                          <br> ${nok_address}, ${nok_city}, ${nok_state}, ${nok_country}
                        </p>
                        <p>
                          <strong>Email:</strong> ${nok_email}
                        </p>
                        <p>
                          <strong>Relationship:</strong> ${nok_relationship}
                        </p>
                        </div>
                        <div class="email-section">
                            <h3>Educational Background:</h3>
                        <p>
                          <strong>Primary School Name:</strong> ${primary_name}
                        </p>
                        <p>
                          <strong>Secondary School Name:</strong> ${secondary_name}
                        </p>
                        <p>
                          <strong>Additional School Name:</strong> ${additional_school}
                        </p>
                        </div>
                        <div class="email-section">
                            <h3>Program Information:</h3>
                        <p>
                          <strong>Course of Study:</strong> ${course}
                        </p>
                        <p>
                          <strong>Application_type:</strong> ${application_type}
                        </p>
                        <p>
                          <strong>Transfer Level:</strong> ${transfer_level}
                        </p>
                        </div>
                        <div class="email-section">
                            <h3>Additional Information:</h3>
                        <p>
                          <strong>Referrer:</strong> ${referrer}
                        </p>
                        <p>
                          <strong>Hobbies, Activities, Interest:</strong> ${hobbies_interest}
                        </p>
                        </div>
                      </div>
                      <div class="footer"> &copy; 2023 <a href="https://estamuni.net">ESTAM University</a>. All rights reserved. </div>
                    </div>
                  </body>
                </html>
                `,
        attachments: [
            {
                filename: photo_passport,
                path: photoPassportFilePath
            },
            {
                filename: passport,
                path: passportFilePath
            },
            {
                filename: birth_certificate,
                path: birthCertificateFilePath
            },
            {
                filename: ssce_certificate,
                path: ssceCertificateFilePath
            }
        ]
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).render('500', {
                title: 'Server Error',
                message: 'Oops! Something went wrong!',
            });
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Application submitted successfully' });
        }
    });

    // Send email to user 
    const emailContent = {
        from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
        to: email,
        subject: 'Thank you for submitting your application to ESTAM University!',
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
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
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
            <h3>Dear ${first_name},</h3>
            
            <p>Thank you for taking the time to submit your application form for admission to ESTAM University. We appreciate your interest in our institution and the opportunity to review your application.</p>
            
            <p>At ESTAM University, we strive to provide a nurturing and stimulating learning environment, offering a wide range of programs designed to empower students like you to achieve their academic and career goals.</p>
            
            <p>We want to assure you that your application is important to us, and our dedicated admissions team will carefully review the information you have provided. We understand the significance of this decision in shaping your future, and we want to ensure a thorough and fair evaluation process.</p>
            
            <p>Here are the next steps you can expect:</p>
            
            <ol>
              <li>Application Review: Our admissions team will carefully review your application materials, including academic transcripts, test scores, personal statements, and recommendation letters.</li>
            
              <li>Application Status Update: Once your application has been thoroughly reviewed, we will provide you with a status update. Please allow us some time to process your application, as we receive a high volume of submissions.</li>
            
              <li>Additional Information: If there are any missing or incomplete documents in your application, we will contact you promptly to request the necessary information. We want to ensure that your application receives a comprehensive evaluation.</li>
            
              <li>Notification of Decision: We understand that waiting for an admission decision can be an anxious time. Rest assured that we are committed to notifying you of the decision as soon as possible. You will receive a formal communication regarding the outcome of your application.</li>
            </ol>

            <p>We encourage you to explore our website for more information about ESTAM University, our programs, campus life, and student resources. If you have any questions or need further assistance, please do not hesitate to reach out to our admissions team at admissions@estamuni.net</p>
            
            <p>Thank you once again for choosing ESTAM University for your educational journey. We wish you the best of luck with your application review and look forward to the possibility of welcoming you as a valued member of our university community.</p>
            
            <p>Best regards,</p>
            
            
            <p>
              <br>Admissions Office,
              <br>ESTAM University,
              <br> 148, Von Adjavon, En face d'Eglise Gbiba Wiwe, Segbeya, Akpakpa
              <br>Cotonou, Benin Republic</p>
            </p>
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
    transporter.sendMail(emailContent, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });

};

// Export the handleSubmitApply function
module.exports = handleSubmitApply;