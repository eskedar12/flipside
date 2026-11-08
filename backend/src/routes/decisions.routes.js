import { Router } from 'express';
import requireAuth from '../middleware/auth.js';
import {
  createDecision,
  getDecisions,
  deleteDecision,
  clearDecisions,
} from '../controllers/decisions.controller.js';

const router = Router();

router.use(requireAuth);

router.post('/', createDecision);
router.get('/', getDecisions);
router.delete('/', clearDecisions);
router.delete('/:id', deleteDecision);

export default router;