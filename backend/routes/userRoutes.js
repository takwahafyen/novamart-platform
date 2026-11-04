import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema, updateUserSchema } from '../validators/schemas.js';

const router = express.Router();

// Public routes with Zod validation
router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);

// Protected route — authenticated user can get their own profile
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

// Admin-only routes
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, validate(updateUserSchema), updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;
