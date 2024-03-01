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

async function createProduct(categorie, description, prix_unitaire, quantite, status) {
  return await db('produit').insert({ categorie, description, prix_unitaire, quantite, status });
}

async function getAllProducts() {
  return await db('produit').select('*');
}

async function getProductById(idprod) {
  return await db('produit').where({ idprod }).first();
}

async function updateProduct(idprod, categorie, description, prix_unitaire, quantite, status) {
  return await db('produit').where({ idprod }).update({ categorie, description, prix_unitaire, quantite, status });
}

async function deleteProduct(idprod) {
  return await db('produit').where({ idprod }).del();
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };