const express = require('express');
const router = express.Router();
const adminModel = require('../models/adminModel');

router.post('/admins', async (req, res) => {
  try {
    const { nom, prenom, mail, role } = req.body;
    const newAdmin = await adminModel.createAdmin(nom, prenom, mail, role);
    res.status(201).json(newAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create admin' });
  }
});

router.get('/admins', async (req, res) => {
  try {
    const admins = await adminModel.getAllAdmins();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch admins' });
  }
});

router.get('/admins/:idadmin', async (req, res) => {
  try {
    const { idadmin } = req.params;
    const admin = await adminModel.getAdminById(idadmin);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch admin' });
  }
});

router.put('/admins/:idadmin', async (req, res) => {
  try {
    const { idadmin } = req.params;
    const { nom, prenom, mail, role } = req.body;
    await adminModel.updateAdmin(idadmin, nom, prenom, mail, role);
    res.json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to update admin' });
  }
});

router.delete('/admins/:idadmin', async (req, res) => {
  try {
    const { idadmin } = req.params;
    await adminModel.deleteAdmin(idadmin);
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to delete admin' });
  }
});

module.exports = router;
