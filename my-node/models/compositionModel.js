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

async function createComposition(gateway_id, id_produit) {
  return await db('composition').insert({ gateway_id, id_produit });
}

async function getAllCompositions() {
  return await db('composition').select('*');
}

async function getCompositionByGatewayId(gateway_id) {
  return await db('composition').where({ gateway_id }).select('id_produit');
}

async function getCompositionByProduitId(id_produit) {
  return await db('composition').where({ id_produit }).select('gateway_id');
}

module.exports = { createComposition, getAllCompositions, getCompositionByGatewayId, getCompositionByProduitId };
