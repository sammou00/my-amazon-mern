import express from 'express';

import paymentControllers from '../controllers/payment.js';

import verifyToken from '../middleware/verifyToken.js';

const { makePayment } = paymentControllers;

const router = express.Router();

// routes

router.post('/payment', verifyToken, makePayment);

export default router;
