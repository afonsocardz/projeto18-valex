import {Router} from 'express';
import { createCard, activateCard } from '../controllers/cardsController';
import { validateCard } from '../middlewares/cardValidationMiddleware';

const router = Router();

router.post("/", validateCard, createCard)
router.put('/', activateCard);

export default router;