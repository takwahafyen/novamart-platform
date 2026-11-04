import express from 'express';
import { addProduct, getProducts, deleteProduct, updateProduct, getProductById, getProductsByCategory } from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();

// --- Multer configuration with security ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

// Public routes — anyone can browse products
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:categoryName', getProductsByCategory);

// Admin-only routes — CRUD operations
router.post('/', protect, admin, upload.array('images', 10), addProduct);
router.put('/:id', protect, admin, upload.array('images', 10), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
