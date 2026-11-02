import express from 'express';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/User.mjs';
import Category from '../models/Category.js';

const router = express.Router();

// Endpoint to get dashboard data including product count per category
router.get('/dashboard-data', async (req, res) => {
    try {
        // Count documents for each model
        const orderCount = await Order.countDocuments();
        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const categoryCount = await Category.countDocuments();

        // Fetch product counts per category
        const categories = await Category.find();
        const productCountsByCategory = await Promise.all(categories.map(async (category) => {
            const count = await Product.countDocuments({ category: category._id });
            return { category: category.name, count }; // Ensure category name and count are provided
        }));

        // Get latest orders
        const orders = await Order.find().limit(10).sort({ date: -1 });

        // Send JSON response
        res.json({
            orderCount,
            productCount,
            userCount,
            categoryCount,
            productCountsByCategory,
            orders,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data' });
    }
});

export default router;
