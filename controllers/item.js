import Item from '../models/Item.js';

const itemControllers = {
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getItem: async (req, res) => {
        const { id } = req.params;

        try {
            const item = await Item.findOne({ _id: id });

            if (item) {
                res.status(200).json(item);
            } else {
                res.status(404).json({ msg: 'Item not found' });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUserItems: async (req, res) => {
        const { id } = req.params;
        try {
            const items = await Item.find({ user_id: id });
            res.status(200).json(items);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createItem: async (req, res) => {
        const { title, description, category, price, quantity, user_id } =
            req.body;

        try {
            const newItem = new Item({
                title,
                description,
                category,
                price,
                quantity,
                user_id
            });

            await newItem.save();

            res.status(201).json(newItem);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateItem: async (req, res) => {
        const { id } = req.params;
        const { title, description, category, price, quantity } = req.body;

        try {
            const updatedItem = await Item.updateOne(
                { _id: id },
                {
                    title: title,
                    description: description,
                    category: category,
                    price: price,
                    quantity: quantity
                }
            );

            if (updatedItem.modifiedCount > 0) {
                res.status(200).json({ msg: 'Item updated successfully!' });
            } else {
                res.status(400).json({ msg: 'Item not found' });
            }
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    deleteItem: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedItem = await Item.deleteOne({ _id: id });

            if (deletedItem.deletedCount > 0) {
                res.status(200).json({ msg: 'Item deleted successfully!' });
            } else {
                res.status(400).json({ msg: 'Item not found' });
            }
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
};

export default itemControllers;
