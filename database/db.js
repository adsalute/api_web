const Sequelize = require('sequelize');
const env = require('../env/env');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;