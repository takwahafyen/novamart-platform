import mongoose from 'mongoose';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

/**
 * Create a new order
 * - Validates that all products exist and have enough stock
 * - Calculates cart total SERVER-SIDE (never trusts the client)
 * - Decrements stock atomically
 * - Links order to authenticated user
 */
export const createOrder = async (req, res) => {
  let session = null;
  let useTransaction = false;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
    useTransaction = true;
  } catch (err) {
    // Standalone MongoDB does not support transactions; proceed without session
    session = null;
    useTransaction = false;
  }

  try {
    const { items, first_name, last_name, phone, email, country, address, city, state, pincode, paymentMethod } = req.body;

    const productIds = items.map((item) => item.productId);
    const query = Product.find({ _id: { $in: productIds } });
    const products = useTransaction ? await query.session(session) : await query;

    // Verify all products exist
    if (products.length !== productIds.length) {
      const foundIds = products.map((p) => p._id.toString());
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      if (useTransaction) await session.abortTransaction();
      return res.status(400).json({
        message: 'Some products were not found',
        missingProductIds: missingIds,
      });
    }

    // Build cart items and calculate total server-side
    const cartItems = [];
    let cartTotal = 0;

    for (const item of items) {
      const product = products.find((p) => p._id.toString() === item.productId);

      // Check stock availability
      if (product.countInStock < item.qty) {
        if (useTransaction) await session.abortTransaction();
        return res.status(400).json({
          message: `Insufficient stock for "${product.name}". Available: ${product.countInStock}, Requested: ${item.qty}`,
        });
      }

      const itemTotal = Number((product.price * item.qty).toFixed(2));
      cartItems.push({
        product: product._id,
        title: product.name,
        price: product.price,
        qty: item.qty,
        total: itemTotal,
      });
      cartTotal += itemTotal;

      // Decrement stock
      product.countInStock -= item.qty;
      if (useTransaction) {
        await product.save({ session });
      } else {
        await product.save();
      }
    }

    cartTotal = Number(cartTotal.toFixed(2));

    // Create order with server-calculated total
    const order = new Order({
      user: req.user._id,
      first_name,
      last_name,
      phone,
      email,
      country,
      address,
      city,
      state,
      pincode,
      cartItems,
      cartTotal,
      paymentMethod,
      orderStatus: 'Pending',
    });

    const createdOrder = useTransaction ? await order.save({ session }) : await order.save();

    if (useTransaction) {
      await session.commitTransaction();
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    if (useTransaction && session) {
      await session.abortTransaction();
    }
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

// Get all orders (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName email').sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID (owner or admin)
export const getOrderById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (!req.user.isAdmin && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin only)
export const updateOrder = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = req.body.orderStatus;
    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete order by ID (admin only)
export const deleteOrder = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
