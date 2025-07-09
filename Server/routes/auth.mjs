import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.mjs';

const router = express.Router();

router.get('/verify/:token', async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

export default router;