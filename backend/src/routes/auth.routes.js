import {router} from 'express';
import { register } from '../controllers/auth.controller.js';

const router = router();

router.post('/register', register);

export default router;
