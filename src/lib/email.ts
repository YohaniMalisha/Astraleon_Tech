import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

export async function sendVerificationEmail(email: string) {
  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${generateToken()}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verify Your Astraleon Tech Account',
    html: `
      <h1>Welcome to Astraleon Tech!</h1>
      <p>Click below to verify your email:</p>
      <a href="${verificationLink}" style="background:#2563eb;color:white;padding:12px 24px;border-radius:4px;text-decoration:none">
        Verify Email
      </a>
    `
  });
}