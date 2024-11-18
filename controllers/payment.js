import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import Stripe from 'stripe';

// construct path
const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// load environment variables
dotenv.config({ path: path.join(PATH, '..', '.env') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const paymentControllers = {
    makePayment: async (req, res) => {
        const { amount } = req.body;
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'usd'
            });
            res.status(200).send({ clientSecret: paymentIntent.client_secret });
        } catch (err) {
            res.status(400).send({ err: err.message });
        }
    }
};

export default paymentControllers;
