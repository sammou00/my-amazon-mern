import express from 'express';

import itemControllers from '../controllers/item.js';

const {
    getAllItems,
    getItem,
    getUserItems,
    createItem,
    updateItem,
    deleteItem
} = itemControllers;

const router = express.Router();

// routes
router.get('/items', getAllItems);
router.get('/items/:id', getItem);
router.get('/items/user/:id', getUserItems);
router.post('/items', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

export default router;
