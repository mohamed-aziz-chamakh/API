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

async function createAssignement(gateway_id, sensor_id) {
  return await db('assignement').insert({ gateway_id, sensor_id });
}

async function getAllAssignements() {
  return await db('assignement').select('*');
}

async function getAssignementByGatewayId(gateway_id) {
  return await db('assignement').where({ gateway_id }).select('sensor_id');
}

async function getAssignementBySensorId(sensor_id) {
  return await db('assignement').where({ sensor_id }).select('gateway_id');
}

async function deleteAssignement(gateway_id, sensor_id) {
  return await db('assignement').where({ gateway_id, sensor_id }).del();
}

module.exports = { createAssignement, getAllAssignements, getAssignementByGatewayId, getAssignementBySensorId, deleteAssignement };
