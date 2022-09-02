import {Router} from 'express';
import { createCard, activateCard, blockCard, unblockCard } from '../controllers/cardsController';
import { validateCard } from '../middlewares/cardValidationMiddleware';

const router = Router();

router.post("/create", validateCard, createCard)
router.put('/activate', activateCard);
router.put('/block', blockCard);
router.put('/unblock', unblockCard);

export default router;