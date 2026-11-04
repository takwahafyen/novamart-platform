/**
 * Admin Seeder Script
 * Usage: node backend/scripts/seedAdmin.js
 *
 * Creates an admin user or promotes an existing user to admin.
 * Requires MONGO_URI and JWT_SECRET in .env
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.mjs';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@novamart.com';
    const existingUser = await User.findOne({ email: adminEmail });

    if (existingUser) {
      existingUser.isAdmin = true;
      await existingUser.save();
      console.log(`✅ User "${existingUser.email}" promoted to admin.`);
    } else {
      const admin = await User.create({
        firstName: 'Admin',
        lastName: 'NovaMart',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Admin@12345',
        isAdmin: true,
      });
      console.log(`✅ Admin user created: ${admin.email}`);
    }

    await mongoose.disconnect();
    console.log('✅ Done. Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
