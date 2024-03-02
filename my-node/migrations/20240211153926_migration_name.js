/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/

exports.up = function (knex) {
  return knex.schema
    .createTable('sensor', function (table) {
      table.increments('sensor_id').primary();
      table.string('name');
      table.text('description');
      table.string('type');
      table.enum('status', ['Active', 'Inactive', 'Error', 'Maintenance']).defaultTo('Inactive');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('gateway', function (table) {
      table.increments('gateway_id').primary();
      table.string('nom');
      table.string('adresse_ip');
      table.string('adresse_mac');
      table.string('type');
      table.enum('status', ['Online', 'Offline', 'Error', 'Maintenance']).defaultTo('Offline');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('admin', function (table) {
      table.increments('idadmin').primary();
      table.string('nom');
      table.string('prenom');
      table.string('mail');
      table.string('role');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('produit', function (table) {
      table.increments('idprod').primary();
      table.string('name');

      table.string('categorie');
      table.string('description');
      table.decimal('prix_unitaire', 10, 2);
      table.integer('quantite');
      table.enum('status', ['Disponible', 'En rupture de stock', 'En cours de réapprovisionnement']).defaultTo('Disponible');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('composition', function (table) {

      table.primary(['gateway_id', 'id_produit']);
      table.integer('gateway_id').unsigned().references('gateway_id').inTable('gateway').onDelete('CASCADE');
      table.integer('id_produit').unsigned().references('idprod').inTable('produit').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('assignement', function (table) {
      table.integer('gateway_id').unsigned();
      table.integer('sensor_id').unsigned();
      table.primary(['gateway_id', 'sensor_id']);
      table.foreign('gateway_id').references('gateway_id').inTable('gateway');
      table.foreign('sensor_id').references('sensor_id').inTable('sensor');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('collecte', function (table) {
      table.integer('sensor_id').unsigned();
      table.integer('gateway_id').unsigned();

      table.string('mesure');
      table.float('taux_erreur');
      table.string('unite');
      table.primary(['gateway_id', 'sensor_id']);
      table.foreign('sensor_id').references('sensor_id').inTable('sensor');

      table.foreign('gateway_id').references('gateway_id').inTable('gateway');

      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};


exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('collecte')
    .dropTableIfExists('assignement')
    .dropTableIfExists('composition')
    .dropTableIfExists('produit')
    .dropTableIfExists('admin')
    .dropTableIfExists('gateway')
    .dropTableIfExists('sensor');
};



exports.config = { transaction: false };