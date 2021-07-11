// This file actually help us connect to postgreSQL database
const knex = require('knex');

// This is our postgreSQL config file
const knexfile = require('./knexfile');

// Export database
const db = knex(knexfile.development);
module.exports = db;