const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

// Create transporter (for Gmail - use OAuth2 in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email templates directory
const templatesDir = path.join(__dirname, '../templates/emails');

/**
 * Send order confirmation to client
 */
const sendOrderConfirmation = async (order, userEmail) => {
  try {
    const html = await ejs.renderFile(
      path.join(templatesDir, 'order-confirmation.ejs'),
      { order }
    );

    await transporter.sendMail({
      from: `"Your Company Name" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Your Order Confirmation',
      html
    });
  } catch (error) {
    console.error('Confirmation email failed:', error);
    throw error;
  }
};

/**
 * Send order notification to admin
 */
const sendAdminNotification = async (order) => {
  try {
    const html = await ejs.renderFile(
      path.join(templatesDir, 'admin-notification.ejs'),
      { order }
    );

    await transporter.sendMail({
      from: `"Order System" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Order Received - ${order.package.name}`,
      html
    });
  } catch (error) {
    console.error('Admin notification failed:', error);
    throw error;
  }
};

module.exports = {
  sendOrderConfirmation,
  sendAdminNotification
};