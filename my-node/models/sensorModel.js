const knex = require('knex');

const db = knex({
    client: 'pg', // specify your database client (e.g., 'pg' for PostgreSQL, 'mysql' for MySQL)
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123',
      database: 'postgres'
    }
  });

async function createSensor(name, description, type, status) {
  return await db('sensor').insert({ name, description, type,status });
}

async function getAllSensors() {
  return await db('sensor').select('*');
}

async function getSensorById(id) {
  return await db('sensor').where({ sensor_id: id }).first();
}

async function updateSensor(id, name, description, type,status) {
  return await db('sensor').where({ sensor_id: id }).update({ name, description, type, status });
}

async function deleteSensor(id) {
  return await db('sensor').where({ sensor_id: id }).del();
}

module.exports = { createSensor, getAllSensors, getSensorById, updateSensor, deleteSensor };