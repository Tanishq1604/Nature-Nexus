// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {Product }from '../db/connectDB.js'
const cloudinary = require('cloudinary').v2;



// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Create a new product
router.post('/', async (req, res) => {
  const product = new Product({
    seller: req.body.seller,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to get a product by ID
async function getProduct(req, res, next) {
  try {
   const  product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.product = product;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

 
  next();
}

module.exports = router;
