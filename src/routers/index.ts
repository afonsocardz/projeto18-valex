import {Router} from 'express';
import cardsRouter from './cardsRouter';
import paymentsRouter from './paymentRouter';
import rechargesRouter from './rechargeRouter';

const router = Router();

router.use('/cards', cardsRouter);
router.use('/recharges', rechargesRouter);
router.use('/payments', paymentsRouter);

export default router;