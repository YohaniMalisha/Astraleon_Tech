const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send a verification email with a clickable link.
 * @param {string} to - The recipient's email address.
 * @param {string} token - The unique verification token.
 */
const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.BASE_URL}/verify-email/${token}`;

  const mailOptions = {
    from: `"Astraleon Tech" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify Your Email - Astraleon Tech",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${verifyUrl}" target="_blank">${verifyUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
