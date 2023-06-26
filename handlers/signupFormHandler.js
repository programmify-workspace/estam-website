import bcrypt from 'bcrypt';
import transporter from '../utils/emailUtils.js';
import pool from '../database.js';

function generateVerificationCode(length = 6) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

const imgURL = 'https://estamuni.net/public/assets/images/logo/logo-dark.png'

function sendVerificationEmail(email, verificationCode, fullname) {
  const mailOptions = {
    from: `ESTAM University ${process.env.ZOHO_ADMIN_EMAIL}`,
    to: email,
    subject: 'Your verification code',
    html: `
    <div style="font-family: Arial, sans-serif; margin: 0 auto; max-width: 600px;">
    <div class="logo" style="margin-bottom: 30px; text-align: center;">
      <img src="${imgURL}" style="max-width: 200px;" alt="Logo">
    </div>
    <p style="color: #2b2b2b; font-size: 16px; line-height: 1.5;">Dear ${fullname},</p>
    <p style="color: #2b2b2b; font-size: 16px; line-height: 1.5;">Thank you for signing up at ESTAM University. Please verify your email by entering the verification code below:</p>
    <div style="background-color: #f4f4f4; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
      <p style="color: #2b2b2b; font-size: 20px; font-weight: bold; margin-bottom: 10px;">Verification Code:</p>
      <p id="verificationCode" style="color: #2b2b2b; font-size: 24px; margin: 0; padding: 10px 20px; background-color: #ffffff; border: 1px solid #dcdcdc; border-radius: 4px; display: inline-block;">${verificationCode}</p>
    </div>
    <p style="color: #2b2b2b; font-size: 16px; line-height: 1.5;">Thank you for choosing ESTAM University.</p>
    <p style="color: #2b2b2b; font-size: 16px; line-height: 1.5;">Best regards,</p>
    <p style="color: #2b2b2b; font-size: 16px; line-height: 1.5;">ESTAM University Team</p>
  </div>
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
        reject(error);
      } else {
        console.log('Verification email sent successfully');
        resolve(info);
      }
    });
  });
}

const handleSubmitSignup = async (req, res, next) => {
  const { fullname, email, password } = req.body;
  try {
    // Check if student exists in the database already
    let [student] = await pool.query('SELECT * FROM students WHERE email = ?', [email]);

    if (student[0]) {
      return res.status(422).json({ error: 'Email already exists. Please choose a different email address.' });
    } else {
      // Hash Password using bcrypt
      const saltRounds = 8;
      const hashPassword = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, hashPassword);

      // Generate Verification Code
      const verificationCode = generateVerificationCode();
      // Store student in database if all condition is met
      const newStudent = `INSERT INTO students (name, email, password, verification_code) VALUES (?, ?, ?, ?)`;
      const values = [fullname, email, hashedPassword, verificationCode];
      const result = await pool.query(newStudent, values);

      // Send verification code to user
      //sendVerificationEmail(email, verificationCode, fullname)

      res.render('login'); 
    }
  } catch (err) {
    next(err);
  }
};

export default handleSubmitSignup;