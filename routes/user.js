import express from 'express';

import userControllers from '../controllers/user.js';

import verifyToken from '../middleware/verifyToken.js';

const { register, login, logout, checkAdmin, getUser } = userControllers;

const router = express.Router();

// routes
router.get('/admin/:id', verifyToken, checkAdmin);
router.get('/users/:id', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
