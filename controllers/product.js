import Product from '../models/product.js';

const productControllers = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getProduct: async (req, res) => {
        const { id } = req.params;

        try {
            const product = await Product.findOne({ _id: id });
            if (product) {
                return res.status(200).json(product);
            } else {
                return res.status(404).json({ msg: 'Product not found' });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req, res) => {
        const { title, description, category, price, image } = req.body;
        try {
            if (title && category && description && price && image) {
                const newProduct = new Product({
                    title,
                    category,
                    description,
                    price,
                    image
                });

                await newProduct.save();
                res.status(201).json(newProduct);
            } else {
                return res.status(400).json({ msg: 'All fields are required' });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { title, category, description, price, image } = req.body;
        try {
            if (title && category && description && price && image) {
                const updatedProduct = await Product.updateOne(
                    { _id: id },
                    {
                        title,
                        category,
                        description,
                        price,
                        image
                    }
                );

                if (updatedProduct.modifiedCount > 0) {
                    return res
                        .status(200)
                        .json({ msg: 'Product updated successfully' });
                } else {
                    return res.status(404).json({ msg: 'Product not found' });
                }
            } else {
                return res.status(400).json({ msg: 'All fields are required' });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedProduct = await Product.deleteOne({ _id: id });

            if (deletedProduct.deletedCount > 0) {
                return res
                    .status(200)
                    .json({ msg: 'Product deleted successfully' });
            } else {
                return res.status(404).json({ msg: 'Product not found' });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
};

export default productControllers;
