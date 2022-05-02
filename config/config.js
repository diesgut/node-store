require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbPortPg: process.env.DB_PORT_PG,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
}

module.exports = { config };
