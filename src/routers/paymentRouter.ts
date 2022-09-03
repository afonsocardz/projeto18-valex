import {Router} from 'express';
import { createPayment } from '../controllers/paymentController';
import { validateAmount } from '../middlewares/amountValidationMiddleware';

const router = Router();

router.post('/', validateAmount, createPayment);

export default router;