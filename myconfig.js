'use strict';

async function createDatabase() {
  const config = require(process.cwd() + '/knexfile.ts');
  config.connection.database = null;
  const knex = require('knex')(config);

  await knex.raw('CREATE DATABASE IF NOT EXISTS loja');
  await knex.destroy();
}

createDatabase();