import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getMyOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { createOrderSchema, updateOrderStatusSchema } from '../validators/schemas.js';

const router = express.Router();

// POST /api/orders - Créer une nouvelle commande (authenticated users + Zod validation)
router.post('/', protect, validate(createOrderSchema), createOrder);

// GET /api/orders/myorders - Commandes de l'utilisateur connecté
router.get('/myorders', protect, getMyOrders);

// GET /api/orders - Obtenir toutes les commandes (admin only)
router.get('/', protect, admin, getOrders);

// GET /api/orders/:id - Obtenir une commande par ID (authenticated user or admin)
router.get('/:id', protect, getOrderById);

// PUT /api/orders/:id - Mettre à jour le statut d'une commande (admin only + Zod validation)
router.put('/:id', protect, admin, validate(updateOrderStatusSchema), updateOrder);

// DELETE /api/orders/:id - Supprimer une commande (admin only)
router.delete('/:id', protect, admin, deleteOrder);

export default router;
