import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

// POST /api/orders - Créer une nouvelle commande
router.post('/', createOrder);

// GET /api/orders - Obtenir toutes les commandes
router.get('/', getOrders);

// GET /api/orders/:id - Obtenir une commande par ID
router.get('/:id', getOrderById);

// PUT /api/orders/:id - Mettre à jour une commande par ID
router.put('/:id', updateOrder);

// DELETE /api/orders/:id - Supprimer une commande par ID
router.delete('/:id', deleteOrder);

export default router;
