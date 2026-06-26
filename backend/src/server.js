require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const cardsRouter = require('./routes/cards');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.use('/api/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.use(errorHandler);

async function start() {
  try {
    await testConnection();
    console.log('PostgreSQL connection established');
  } catch (error) {
    console.error('Failed to connect to PostgreSQL:', error.message);
    console.error('Ensure DATABASE_URL is set and the database is running.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

start();
