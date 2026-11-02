import express from 'express';
import { addProduct, getProducts, deleteProduct, updateProduct, getProductById, getProductsByCategory } from '../controllers/productController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.array('images', 10), addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/category/:categoryName', getProductsByCategory); // Route for getting products by category
router.delete('/:id', deleteProduct);
router.put('/:id', upload.array('images', 10), updateProduct);

export default router;
