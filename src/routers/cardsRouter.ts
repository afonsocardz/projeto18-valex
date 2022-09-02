import {Router} from 'express';
import { createCard } from '../controllers/cardsController';
import { validateCard } from '../middlewares/cardValidationMiddleware';

const router = Router();

router.post("/create", validateCard, createCard)

export default router;