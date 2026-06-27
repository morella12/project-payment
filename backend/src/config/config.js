require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

/**
 * Sequelize CLI configuration.
 * Uses DATABASE_URL when set; otherwise builds a connection from DB_* variables.
 */
function buildDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'payment_db';

  const encodedPassword = encodeURIComponent(password);
  return `postgresql://${user}:${encodedPassword}@${host}:${port}/${database}`;
}

const shared = {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
};

module.exports = {
  development: {
    ...shared,
    url: buildDatabaseUrl(),
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
    },
  },
  test: {
    ...shared,
    url: process.env.TEST_DATABASE_URL || buildDatabaseUrl(),
  },
  production: {
    ...shared,
    url: buildDatabaseUrl(),
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
    },
  },
};
