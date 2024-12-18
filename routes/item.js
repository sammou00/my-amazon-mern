import express from 'express';

import itemControllers from '../controllers/item.js';

import verifyToken from '../middleware/verifyToken.js';

const {
    getAllItems,
    getItem,
    getUserItems,
    createItem,
    updateItem,
    deleteItem,
    deleteUserItems
} = itemControllers;

const router = express.Router();

// routes
router.get('/items', verifyToken, getAllItems);
router.get('/items/exist/:id', verifyToken, getItem);
router.get('/items/user/:id', verifyToken, getUserItems);
router.post('/items', verifyToken, createItem);
router.put('/items/:id', verifyToken, updateItem);
router.delete('/items/:id', verifyToken, deleteItem);
router.delete('/items/user/:id', verifyToken, deleteUserItems);

export default router;
