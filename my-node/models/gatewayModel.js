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

async function createGateway(nom, adresse_ip, adresse_mac, type, status) {
  return await db('gateway').insert({ nom, adresse_ip, adresse_mac, type, status });
}

async function getAllGateways() {
  return await db('gateway').select('*');
}

async function getGatewayById(gateway_id) {
  return await db('gateway').where({ gateway_id }).first();
}

async function updateGateway(gateway_id, nom, adresse_ip, adresse_mac, type, status) {
  return await db('gateway').where({ gateway_id }).update({ nom, adresse_ip, adresse_mac, type, status });
}

async function deleteGateway(gateway_id) {
  return await db('gateway').where({ gateway_id }).del();
}

module.exports = { createGateway, getAllGateways, getGatewayById, updateGateway, deleteGateway };
