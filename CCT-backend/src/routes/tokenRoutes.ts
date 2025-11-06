import { Router } from 'express';
import { registerToken, getAllTokenRegistrations, getTokenRegistrationById } from '../controllers/tokenController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Token registration routes
router.post('/register', authenticateToken, registerToken);
router.get('/registrations', authenticateToken, getAllTokenRegistrations);
router.get('/registrations/:id', authenticateToken, getTokenRegistrationById);

// Mock endpoints (no authentication required)
router.post('/register-mock', registerToken);
router.get('/registrations-mock', getAllTokenRegistrations);
router.get('/registrations-mock/:id', getTokenRegistrationById);

export default router;
