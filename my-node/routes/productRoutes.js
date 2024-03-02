const express = require('express');
const router = express.Router();
const productModel = require('../models/productModel');

router.post('/products', async (req, res) => {
  try {
    const { name,categorie, description, prix_unitaire, quantite, status } = req.body;
    const newProduct = await productModel.createProduct(name,categorie, description, prix_unitaire, quantite, status);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create product' });
  }
});

router.get('/products', async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch products' });
  }
});

router.get('/products/:idprod', async (req, res) => {
  try {
    const { idprod } = req.params;
    const product = await productModel.getProductById(idprod);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch product' });
  }
});

router.put('/products/:idprod', async (req, res) => {
  try {
    const { idprod } = req.params;
    const { name,categorie, description, prix_unitaire, quantite, status } = req.body;
    await productModel.updateProduct(idprod,name, categorie, description, prix_unitaire, quantite, status);
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update product' });
  }
});

router.delete('/products/:idprod', async (req, res) => {
  try {
    const { idprod } = req.params;
    await productModel.deleteProduct(idprod);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete product' });
  }
});

module.exports = router;
