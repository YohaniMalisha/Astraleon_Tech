// Server/controllers/orderController.mjs
import Order from "../models/order.mjs";
import User from "../models/user.js";
import { sendOrderConfirmation } from "../services/emailService.mjs";

// Named exports that match your import
export const createOrder = async (req, res) => {
  try {
    const { userEmail, package: pkg, addOns, totalPrice } = req.body;

    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const order = await Order.create({
      user: user._id,
      package: pkg,
      addOns,
      totalPrice,
      status: "pending",
    });

    await sendOrderConfirmation(user.email, order);

    res.status(201).json({
      success: true,
      order: {
        id: order._id,
        package: order.package,
        addOns: order.addOns,
        totalPrice: order.totalPrice,
        status: order.status,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).sort("-createdAt");

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders",
    });
  }
};

// Add this if you need default export too
export default {
  createOrder,
  getUserOrders,
};
