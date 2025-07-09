// Server/routes/admin.js (using default export)
import express from 'express';
import { 
  getOrders, 
  updateOrderStatus 
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/orders', getOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/orders', adminController.getOrders);
router.put('/orders/:id/status', adminController.updateOrderStatus);
router.get('/orders/stats', adminController.getOrderStats);

export default router;  // Default export