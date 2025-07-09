// server/services/emailService.mjs
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email, token) => {
  try {
    const verificationUrl = `${process.env.BASE_URL}/verify-email/${token}`;
    const templatePath = path.join(__dirname, '../templates/verification-email.ejs');
    
    const html = await ejs.renderFile(templatePath, { 
      verificationUrl,
      supportEmail: 'support@astraleon.tech'
    });

    await transporter.sendMail({
      from: `Astraleon Tech <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify Your Email Address',
      html
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};