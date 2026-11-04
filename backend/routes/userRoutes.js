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

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route — authenticated user can get their own profile
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});

// Admin-only routes
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;
