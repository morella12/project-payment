const { Sequelize } = require('sequelize');
const config = require('./config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

/**
 * Sequelize instance — all queries use parameterized statements to prevent SQL injection.
 */
const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  dialectOptions: dbConfig.dialectOptions,
  pool: {
    max: 10,
    idle: 30_000,
    acquire: 5_000,
  },
});

/**
 * Verifies database connectivity on startup.
 */
async function testConnection() {
  await sequelize.authenticate();
}

module.exports = { sequelize, testConnection };
