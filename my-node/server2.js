const express = require('express');
const knex = require('knex'); // Importez votre instance knex ici

const app = express();
app.use(express.json());

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'postgres',
  }
});

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const { categorie, description, prix_unitaire, quantite } = req.body;
    await db('produit').insert({ categorie, description, prix_unitaire, quantite });
    res.json("Success");
  } catch (error) {
    res.status(500).json({ error: 'Unable to create product' });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await db('produit').select('*');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch products' });
  }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await db('produit').where({ produit_id: id }).first();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch product' });
  }
});

// Update a product by ID
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { categorie, description, prix_unitaire, quantite } = req.body;
    await db('produit').where({ produit_id: id }).update({ categorie, description, prix_unitaire, quantite });
    res.json({ message: 'Product updated successfully' });
  } catch (error) { 
    res.status(500).json({ error: 'Unable to update product' });
  }
});

// Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db('produit').where({ produit_id: id }).del();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete product' });
  }
});

// Create a new admin
app.post('/admins', async (req, res) => {
    try {
      const { nom, prenom, mail, role } = req.body;
      await db('admin').insert({ nom, prenom, mail, role });
      res.json("Success");
    } catch (error) {
      res.status(500).json({ error: 'Unable to create admin' });
    }
  });
  
  // Get all admins
  app.get('/admins', async (req, res) => {
    try {
      const admins = await db('admin').select('*');
      res.json(admins);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch admins' });
    }
  });
  
  // Get a single admin by ID
  app.get('/admins/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const admin = await db('admin').where({ admin_id: id }).first();
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
      res.json(admin);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch admin' });
    }
  });
  
  // Update an admin by ID
  app.put('/admins/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, prenom, mail, role } = req.body;
      await db('admin').where({ admin_id: id }).update({ nom, prenom, mail, role });
      res.json({ message: 'Admin updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update admin' });
    }
  });
  
  // Delete an admin by ID
  app.delete('/admins/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db('admin').where({ admin_id: id }).del();
      res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete admin' });
    }
  });


  // Create a new gateway
app.post('/gateways', async (req, res) => {
    try {
      const { nom, model, manufacturer, firmware_version } = req.body;
      await db('gateway').insert({ nom, model, manufacturer, firmware_version });
      res.json("Success");
    } catch (error) {
      res.status(500).json({ error: 'Unable to create gateway' });
    }
  });
  
  // Get all gateways
  app.get('/gateways', async (req, res) => {
    try {
      const gateways = await db('gateway').select('*');
      res.json(gateways);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch gateways' });
    }
  });
  
  // Get a single gateway by ID
  app.get('/gateways/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const gateway = await db('gateway').where({ gateway_id: id }).first();
      if (!gateway) {
        return res.status(404).json({ error: 'Gateway not found' });
      }
      res.json(gateway);
    } catch (error) {
      res.status(500).json({ error: 'Unable to fetch gateway' });
    }
  });
  
  // Update a gateway by ID
  app.put('/gateways/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { nom, model, manufacturer, firmware_version } = req.body;
      await db('gateway').where({ gateway_id: id }).update({ nom, model, manufacturer, firmware_version });
      res.json({ message: 'Gateway updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to update gateway' });
    }
  });
  
  // Delete a gateway by ID
  app.delete('/gateways/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await db('gateway').where({ gateway_id: id }).del();
      res.json({ message: 'Gateway deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Unable to delete gateway' });
    }
  });
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });