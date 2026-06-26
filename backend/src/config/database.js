const { Pool } = require('pg');

let pool;

/**
 * Builds the PostgreSQL connection string from environment variables.
 * DATABASE_URL takes precedence; otherwise DB_HOST, DB_PORT, DB_USER,
 * DB_PASSWORD and DB_NAME are used.
 */
function getConnectionString() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  const host = process.env.DB_HOST || 'localhost';
  const port = process.env.DB_PORT || '5432';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD;
  const database = process.env.DB_NAME || 'payment_db';

  if (!password) {
    throw new Error(
      'DB_PASSWORD environment variable is not set. Add your PostgreSQL password to backend/.env'
    );
  }

  const encodedPassword = encodeURIComponent(password);
  return `postgresql://${user}:${encodedPassword}@${host}:${port}/${database}`;
}

/**
 * Returns a singleton PostgreSQL connection pool.
 */
function getPool() {
  if (!pool) {
    const connectionString = getConnectionString();

    pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected PostgreSQL pool error:', err);
    });
  }

  return pool;
}

/**
 * Verifies database connectivity on startup.
 */
async function testConnection() {
  const client = await getPool().connect();
  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
}

module.exports = { getPool, testConnection, getConnectionString };
