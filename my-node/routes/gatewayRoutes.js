const express = require('express');
const router = express.Router();
const gatewayModel = require('../models/gatewayModel');

router.post('/gateways', async (req, res) => {
  try {
    const { nom, adresse_ip, adresse_mac, type, status } = req.body;
    const newGateway = await gatewayModel.createGateway(nom, adresse_ip, adresse_mac, type, status);
    res.status(201).json(newGateway);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create gateway' });
  }
});

router.get('/gateways', async (req, res) => {
  try {
    const gateways = await gatewayModel.getAllGateways();
    res.json(gateways);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch gateways' });
  }
});

router.get('/gateways/:gateway_id', async (req, res) => {
  try {
    const { gateway_id } = req.params;
    const gateway = await gatewayModel.getGatewayById(gateway_id);
    if (!gateway) {
      return res.status(404).json({ error: 'Gateway not found' });
    }
    res.json(gateway);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch gateway' });
  }
});

router.put('/gateways/:gateway_id', async (req, res) => {
  try {
    const { gateway_id } = req.params;
    const { nom, adresse_ip, adresse_mac, type, status } = req.body;
    await gatewayModel.updateGateway(gateway_id, nom, adresse_ip, adresse_mac, type, status);
    res.json({ message: 'Gateway updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update gateway' });
  }
});

router.delete('/gateways/:gateway_id', async (req, res) => {
  try {
    const { gateway_id } = req.params;
    await gatewayModel.deleteGateway(gateway_id);
    res.json({ message: 'Gateway deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete gateway' });
  }
});

module.exports = router;
