import express from 'express';

import userControllers from '../controllers/user.js';

import verifyToken from '../middleware/verifyToken.js';
import checkUser from '../middleware/checkUser.js';

const {
    register,
    login,
    logout,
    checkAdmin,
    getUser,
    forgetPassword,
    getAllUsers,
    changeRole
} = userControllers;

const router = express.Router();

// routes
router.get('/admin/:id', verifyToken, checkAdmin);
router.get('/users', verifyToken, checkUser, getAllUsers);
router.get('/users/:id', verifyToken, getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgetPassword/:id', verifyToken, forgetPassword);
router.put('/change', verifyToken, checkUser, changeRole);

export default router;
