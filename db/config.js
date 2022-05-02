const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

module.exports = {
  development: {
    "username": USER,
    "password": PASSWORD,
    "database": config.dbName,
    "host": config.dbHost,
    "port": config.dbPortPg,
    "dialect": "postgres"
  }
}
