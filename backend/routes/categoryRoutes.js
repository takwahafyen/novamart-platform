import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { categorySchema } from '../validators/schemas.js';

const router = express.Router();

// Public — anyone can list categories
router.get('/', getCategories);

// Admin-only — create / update / delete categories with Zod validation
router.post('/', protect, admin, validate(categorySchema), createCategory);
router.put('/:id', protect, admin, validate(categorySchema), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

export default router;
