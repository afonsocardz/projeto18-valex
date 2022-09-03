import {Router} from 'express';
import { createCard, activateCard, blockCard, unblockCard, getCardBalance } from '../controllers/cardsController';
import { validateKey } from '../middlewares/apiKeyValidationMiddleware';
import { validateCard } from '../middlewares/cardValidationMiddleware';

const router = Router();

router.get("/balance/:id", getCardBalance);
router.post("/create", validateKey, validateCard, createCard)
router.put('/activate', activateCard);
router.put('/block', blockCard);
router.put('/unblock', unblockCard);

export default router;