import { Router } from 'express';
import { registerUser, getAllUsers, loginUser } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (require authentication)
router.get('/users', authenticateToken, getAllUsers);

export default router;
