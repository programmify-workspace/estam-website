import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let transporter;

if (process.env.NODE_ENV === 'production') {
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_PROD_PORT,
    secure: true,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS
    }
  });
} else {
  // Development environment configuration
  transporter = nodemailer.createTransport({
    host: process.env.ZOHO_ADMIN_HOST,
    port: process.env.ZOHO_DEV_PORT,
    secure: false,
    auth: {
      user: process.env.ZOHO_ADMIN_EMAIL,
      pass: process.env.ZOHO_ADMIN_PASS
    }
  });
}

export default transporter;
