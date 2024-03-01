const express = require('express');
const router = express.Router();
const assignementModel = require('../models/assignementModel');

router.post('/assignements', async (req, res) => {
  try {
    const { gateway_id, sensor_id } = req.body;
    const newAssignement = await assignementModel.createAssignement(gateway_id, sensor_id);
    res.status(201).json(newAssignement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create assignement' });
  }
});

router.get('/assignements', async (req, res) => {
  try {
    const assignements = await assignementModel.getAllAssignements();
    res.json(assignements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch assignements' });
  }
});

router.get('/assignements/gateway/:gateway_id', async (req, res) => {
  try {
    const { gateway_id } = req.params;
    const assignements = await assignementModel.getAssignementByGatewayId(gateway_id);
    res.json(assignements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch assignements for gateway' });
  }
});

router.get('/assignements/sensor/:sensor_id', async (req, res) => {
  try {
    const { sensor_id } = req.params;
    const assignements = await assignementModel.getAssignementBySensorId(sensor_id);
    res.json(assignements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch assignements for sensor' });
  }
});

router.delete('/assignements/:gateway_id/:sensor_id', async (req, res) => {
  try {
    const { gateway_id, sensor_id } = req.params;
    await assignementModel.deleteAssignement(gateway_id, sensor_id);
    res.json({ message: 'Assignement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete assignement' });
  }
});

module.exports = router;
