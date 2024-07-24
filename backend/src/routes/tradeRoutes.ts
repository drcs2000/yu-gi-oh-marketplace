import { Router } from 'express';
import { createTrade, deleteTrade, acceptTrade } from '../controllers/tradeController';
import auth from '../middlewares/auth';

const router = Router();

router.post('/', auth, createTrade);
router.delete('/:id', auth, deleteTrade);
router.put('/:id/accept', auth, acceptTrade);

export default router;
