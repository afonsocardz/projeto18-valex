import {Router} from 'express';
import { rechargeCard } from '../controllers/rechargeController';
import { validateKey } from '../middlewares/apiKeyValidationMiddleware';
import { validateAmount } from '../middlewares/amountValidationMiddleware';

const router = Router();

router.post('/', validateKey, validateAmount, rechargeCard);

export default router;