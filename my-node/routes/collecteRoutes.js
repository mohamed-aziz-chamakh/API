const express = require('express');
const router = express.Router();
const collecteModel = require('../models/collecteModel');

router.post('/collectes', async (req, res) => {
  try {
    const { sensor_id, gateway_id, mesure, taux_erreur, unite } = req.body;
    const newCollecte = await collecteModel.createCollecte(sensor_id, gateway_id, mesure, taux_erreur, unite);
    res.status(201).json(newCollecte);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create collecte' });
  }
});

router.get('/collectes', async (req, res) => {
  try {
    const collectes = await collecteModel.getAllCollectes();
    res.json(collectes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch collectes' });
  }
});

router.get('/collectes/sensor/:sensor_id', async (req, res) => {
  try {
    const { sensor_id } = req.params;
    const collectes = await collecteModel.getCollectesBySensorId(sensor_id);
    res.json(collectes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch collectes for sensor' });
  }
});

router.get('/collectes/gateway/:gateway_id', async (req, res) => {
  try {
    const { gateway_id } = req.params;
    const collectes = await collecteModel.getCollectesByGatewayId(gateway_id);
    res.json(collectes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch collectes for gateway' });
  }
});

module.exports = router;
