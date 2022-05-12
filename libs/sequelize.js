const { Sequelize } = require("sequelize");
const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
/*
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true //logging: console.log
});
*/
const sequelize = new Sequelize(`${config.dbName}`,USER,`${PASSWORD}`, {
  host: `${config.dbHost}`,
  dialect: 'mysql',
  port: `${config.dbPort}`,
  logging: true //logging: console.log
});

setupModels(sequelize);

sequelize.sync(); //lee los modelos y con los schemas crea las tablas

module.exports = {models: sequelize.models, Sequelize};

