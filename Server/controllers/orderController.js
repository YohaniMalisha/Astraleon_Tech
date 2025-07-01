const { sendOrderConfirmation, sendAdminNotification } = require('../services/emailService');

exports.createOrder = async (req, res) => {
  try {
    const { package, addOns, totalPrice, userEmail } = req.body;

    // 1. Save to database (implement your database logic here)
    // const order = await Order.create({ ... });

    // 2. Send emails
    await sendOrderConfirmation({ package, addOns, totalPrice }, userEmail);
    await sendAdminNotification({ package, addOns, totalPrice, userEmail });

    res.status(201).json({
      success: true,
      message: 'Order created successfully'
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};