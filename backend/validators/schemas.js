import { z } from 'zod';

// ─── User Schemas ───────────────────────────────────────────────

export const registerSchema = z.object({
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .trim(),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .trim(),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email format')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2).max(50).trim().optional(),
  lastName: z.string().min(2).max(50).trim().optional(),
  email: z.string().email('Invalid email format').toLowerCase().trim().optional(),
});

// ─── Product Schemas ────────────────────────────────────────────

export const addProductSchema = z.object({
  name: z
    .string({ required_error: 'Product name is required' })
    .min(2, 'Product name must be at least 2 characters')
    .max(200, 'Product name must be at most 200 characters')
    .trim(),
  brand: z
    .string({ required_error: 'Brand is required' })
    .min(1, 'Brand is required')
    .max(100)
    .trim(),
  quantity: z
    .string()
    .or(z.number())
    .transform(Number)
    .pipe(z.number().int().min(0, 'Quantity must be >= 0')),
  categoryId: z
    .string({ required_error: 'Category ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),
  description: z
    .string({ required_error: 'Description is required' })
    .min(10, 'Description must be at least 10 characters')
    .max(2000)
    .trim(),
  price: z
    .string()
    .or(z.number())
    .transform(Number)
    .pipe(z.number().positive('Price must be > 0')),
  countInStock: z
    .string()
    .or(z.number())
    .transform(Number)
    .pipe(z.number().int().min(0, 'Stock must be >= 0')),
});

export const updateProductSchema = addProductSchema.partial();

// ─── Order Schemas ──────────────────────────────────────────────

const orderItemSchema = z.object({
  productId: z
    .string({ required_error: 'Product ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  qty: z.number().int().min(1, 'Quantity must be at least 1'),
});

export const createOrderSchema = z.object({
  first_name: z.string().min(2).max(50).trim(),
  last_name: z.string().min(2).max(50).trim(),
  phone: z.string().regex(/^\d{8,15}$/, 'Phone must be 8-15 digits'),
  email: z.string().email('Invalid email format').toLowerCase().trim(),
  country: z.string().min(2).max(60).trim(),
  address: z.string().min(5).max(200).trim(),
  city: z.string().min(2).max(60).trim(),
  state: z.string().min(2).max(60).trim(),
  pincode: z.string().regex(/^\d{4,10}$/, 'Pincode must be 4-10 digits'),
  items: z.array(orderItemSchema).min(1, 'Order must contain at least 1 item'),
  paymentMethod: z.enum(['COD', 'Stripe', 'PayPal'], {
    errorMap: () => ({ message: 'Payment method must be COD, Stripe, or PayPal' }),
  }),
});

export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], {
    errorMap: () => ({ message: 'Invalid order status' }),
  }),
});

// ─── Category Schemas ───────────────────────────────────────────

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'Category name is required' })
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name must be at most 50 characters')
    .trim(),
});
