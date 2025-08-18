const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verifyUrl = `${process.env.BASE_URL}/verify-email/${token}`;

    const mailOptions = {
      from: `"Astraleon Tech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 40px;">
            <h1 style="color: #1e3a8a;">Welcome to Astraleon Tech!</h1>
            <p style="font-size: 16px; line-height: 1.5;">
              Thank you for registering. Please click the button below to verify your email address and activate your account.
            </p>
            <a href="${verifyUrl}" style="background-color: #4338ca; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; font-size: 16px; font-weight: bold;">
              Verify Email Address
            </a>
            <p style="margin-top: 30px; font-size: 12px; color: #777;">
              If you did not create an account, no further action is required.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // This prevents the entire registration process from failing if the email fails to send
    // In a production app, you might want to handle this more robustly (e.g., queue the email)
  }
};

module.exports = { sendVerificationEmail };
