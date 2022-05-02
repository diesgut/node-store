const { Pool } = require('pg');
const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgress://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
/*
const pool = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  user: USER,
  password: PASSWORD,
});
*/
const pool = new Pool({ connectionString:URI });

module.exports = pool;


