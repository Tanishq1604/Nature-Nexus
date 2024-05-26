// routes/productRoutes.js
import express from 'express';
const router = express.Router();
import {Product }from '../db/connectDB.js'
import { v2 as cloudinary } from "cloudinary";



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


// Create a new product
router.post('/', async (req, res) => {
  let img= req.body.image;
  if (img) {
    const uploadedResponse = await cloudinary.uploader.upload(img);
    img = uploadedResponse.secure_url;
  }
  const product = new Product({
    seller: req.body.seller,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: img,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Middleware to get a product by ID
export default router;
