const express = require('express');
const router = express.Router();
const compositionModel = require('../models/compositionModel');

router.post('/compositions', async (req, res) => {
  try {
    const { gateway_id, id_produit } = req.body;
    const newComposition = await compositionModel.createComposition(gateway_id, id_produit);
    res.status(201).json(newComposition);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create composition' });
  }
});

router.get('/compositions', async (req, res) => {
  try {
    const compositions = await compositionModel.getAllCompositions();
    res.json(compositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch compositions' });
  }
});

router.get('/compositions/gateway/:gateway_id', async (req, res) => {
  try {
    const { gateway_id } = req.params;
    const compositions = await compositionModel.getCompositionByGatewayId(gateway_id);
    res.json(compositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch compositions for gateway' });
  }
});

router.get('/compositions/produit/:id_produit', async (req, res) => {
  try {
    const { id_produit } = req.params;
    const compositions = await compositionModel.getCompositionByProduitId(id_produit);
    res.json(compositions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch compositions for produit' });
  }
});

module.exports = router;
