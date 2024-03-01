const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'postgres'
  }
});

async function createAdmin(nom, prenom, mail, role) {
  return await db('admin').insert({ nom, prenom, mail, role });
}

async function getAllAdmins() {
  return await db('admin').select('*');
}

async function getAdminById(idadmin) {
  return await db('admin').where({ idadmin }).first();
}

async function updateAdmin(idadmin, nom, prenom, mail, role) {
  return await db('admin').where({ idadmin }).update({ nom, prenom, mail, role });
}

async function deleteAdmin(idadmin) {
  return await db('admin').where({ idadmin }).del();
}

module.exports = { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin };
