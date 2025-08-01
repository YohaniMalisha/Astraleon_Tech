// server/models/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  package: { 
    type: Object, 
    required: true 
  },
  addOns: { 
    type: Array, 
    default: [] 
  },
  totalPrice: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);