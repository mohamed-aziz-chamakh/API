const express = require('express');
const router = express.Router();
const sensorModel = require('../models/sensorModel');

router.post('/sensors', async (req, res) => {
  try {
    const { name, description, type ,status} = req.body;
    const newSensor = await sensorModel.createSensor(name, description, type,status);
    res.status(201).json(newSensor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create sensor' });
  }
});

router.get('/sensors', async (req, res) => {
  try {
    const sensors = await sensorModel.getAllSensors();
    res.json(sensors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch sensors' });
  }
});

router.get('/sensors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await sensorModel.getSensorById(id);
    if (!sensor) {
      return res.status(404).json({ error: 'Sensor not found' });
    }
    res.json(sensor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch sensor' });
  }
});

router.put('/sensors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, status } = req.body;
    await sensorModel.updateSensor(id, name, description, type,status);
    res.json({ message: 'Sensor updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update sensor' });
  }
});

router.delete('/sensors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await sensorModel.deleteSensor(id);
    res.json({ message: 'Sensor deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete sensor' });
  }
});

module.exports = router;
