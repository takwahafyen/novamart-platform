import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers); // GET all users
router.get('/:id', getUserById); // GET user by ID
router.put('/:id', updateUser); // UPDATE user
router.delete('/:id', deleteUser); // DELETE user

export default router;
