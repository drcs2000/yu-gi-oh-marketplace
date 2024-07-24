import { Router } from 'express';
import { addCard, deleteCard } from '../controllers/cardController';
import auth from '../middlewares/auth';

const router = Router();

router.post('/', auth, addCard);
router.delete('/:id', auth, deleteCard);

export default router;
