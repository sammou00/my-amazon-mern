import express from 'express';

import paymentControllers from '../controllers/payment.js';

const { makePayment } = paymentControllers;

const router = express.Router();

// routes

router.post('/payment', makePayment);

export default router;
