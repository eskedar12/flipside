import { Router } from 'express';
import requireAuth from '../middleware/auth.js';
import {
  createDecision,
  getDecisions,
  deleteDecision,
} from '../controllers/decisions.controller.js';

const router = Router();

router.use(requireAuth);

router.post('/', createDecision);
router.get('/', getDecisions);
router.delete('/:id', deleteDecision);

export default router;