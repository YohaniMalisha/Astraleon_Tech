// server/controllers/authController.mjs
import crypto from 'crypto';
import { sendVerificationEmail } from '../services/emailService.mjs';

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationExpires,
      isVerified: false
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};