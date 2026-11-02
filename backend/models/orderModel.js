import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true, match: /\d{8}/ },
  email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true, match: /\d{4}/ },
  cartItems: [{
    title: { type: String, required: true },
    qty: { type: Number, required: true, min: 1 },
    total: { type: Number, required: true, min: 0 },
  }],
  cartTotal: { type: Number, required: true, min: 0 },
  paymentMethod: { type: String, required: true },
  orderStatus: { type: String, default: 'Pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
