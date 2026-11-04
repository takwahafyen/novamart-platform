import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/orders - Créer une nouvelle commande (authenticated users)
router.post('/', protect, createOrder);

// GET /api/orders - Obtenir toutes les commandes (admin only)
router.get('/', protect, admin, getOrders);

// GET /api/orders/:id - Obtenir une commande par ID (authenticated users)
router.get('/:id', protect, getOrderById);

// PUT /api/orders/:id - Mettre à jour une commande (admin only)
router.put('/:id', protect, admin, updateOrder);

// DELETE /api/orders/:id - Supprimer une commande (admin only)
router.delete('/:id', protect, admin, deleteOrder);

export default router;
