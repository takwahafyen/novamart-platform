import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public — anyone can list categories
router.get('/', getCategories);

// Admin-only — create / update / delete categories
router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;
