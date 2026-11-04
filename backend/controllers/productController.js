import mongoose from 'mongoose';
import Product from '../models/productModel.js';
import Category from '../models/Category.js';

export const addProduct = async (req, res) => {
  try {
    const { name, brand, quantity, categoryId, description, price, countInStock } = req.body;
    let images = (req.files && req.files.length > 0)
      ? req.files.map(file => `/uploads/${file.filename}`)
      : (Array.isArray(req.body.images) ? req.body.images : (req.body.images ? [req.body.images] : ['/assets/images/placeholder.png']));

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }

    const categoryDoc = await Category.findById(categoryId);
    if (!categoryDoc) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const product = new Product({
      name,
      images,
      brand,
      quantity,
      category: categoryDoc._id,
      description,
      price,
      countInStock,
      reviews: [],
      rating: 0,
      numReviews: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error.message);
    res.status(500).json({ message: 'Failed to get products', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const { name, brand, quantity, categoryId, description, price, countInStock } = req.body;
    const newImages = (req.files && req.files.length > 0) ? req.files.map(file => `/uploads/${file.filename}`) : [];

    product.name = name || product.name;
    product.images = newImages.length ? newImages : product.images;
    product.brand = brand || product.brand;
    product.quantity = quantity || product.quantity;
    product.category = categoryId || product.category;
    product.description = description || product.description;
    product.price = price || product.price;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error.message);
    res.status(500).json({ message: 'Failed to get product by ID', error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const categoryDoc = await Category.findOne({ name: categoryName });
    if (!categoryDoc) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const products = await Product.find({ category: categoryDoc._id });
    res.json(products);
  } catch (error) {
    console.error("Error getting products by category:", error.message);
    res.status(500).json({ message: 'Failed to get products by category', error: error.message });
  }
};
