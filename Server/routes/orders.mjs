// Server/routes/orders.mjs
import express from 'express';
import { 
  createOrder, 
  getUserOrders 
} from '../controllers/orderController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

// Make sure these match exactly with the exported names
router.post('/', protect, createOrder);
router.get('/user/:userId', protect, getUserOrders);

export default router;