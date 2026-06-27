const express = require('express');
const { CreditCard } = require('../models');
const { encrypt } = require('../services/encryption');
const { validateCardPayload } = require('../middleware/validateCard');
const { createError } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * POST /api/cards
 * Validates, encrypts, and stores a credit card record via Sequelize.
 */
router.post('/', async (req, res, next) => {
  try {
    const validated = validateCardPayload(req.body);

    const card = await CreditCard.create({
      cardNumber: encrypt(validated.cardNumber),
      cvv: encrypt(validated.cvv),
      cardholderName: validated.cardholderName,
      expiration: validated.expiration,
    });

    res.status(201).json({
      success: true,
      message: 'Credit card stored successfully',
      data: {
        id: card.id,
        cardholderName: card.cardholderName,
        expiration: card.expiration,
        createdAt: card.createdAt,
        lastFour: validated.cardNumber.slice(-4),
      },
    });
  } catch (error) {
    if (error.name === 'SequelizeDatabaseError' && error.parent?.code === '42P01') {
      return next(
        createError(
          'Database table not found. Run migrations with: npm run db:migrate',
          503
        )
      );
    }
    next(error);
  }
});

module.exports = router;
