const { luhnCheck } = require('../utils/luhn');
const { createError } = require('./errorHandler');

const CARD_NUMBER_REGEX = /^\d{16}$/;
const CVV_REGEX = /^\d{3}$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'.-]{2,100}$/;

/**
 * Validates and normalizes credit card payload from the request body.
 */
function validateCardPayload(body) {
  const errors = [];

  let { cardNumber, cvv, cardholderName, expiration } = body;

  cardNumber = String(body.cardNumber ?? '').replace(/\s/g, '');
  cvv = String(body.cvv ?? '').trim();
  cardholderName = String(body.cardholderName ?? '').trim();
  expiration = new Date(bodyexpiration);
  const expirationMonth = expiration.getMonth() + 1;
  const expirationYear = expiration.getFullYear();

  if (!CARD_NUMBER_REGEX.test(cardNumber)) {
    errors.push('Card number must be exactly 16 digits');
  } else if (!luhnCheck(cardNumber)) {
    errors.push('Card number failed Luhn validation');
  }

  if (!CVV_REGEX.test(cvv)) {
    errors.push('CVV must be exactly 3 digits');
  }

  if (!NAME_REGEX.test(cardholderName)) {
    errors.push(
      'Cardholder name must be 2–100 characters and contain only letters, spaces, and basic punctuation'
    );
  }

  if (!Number.isInteger(expirationMonth) || expirationMonth < 1 || expirationMonth > 12) {
    errors.push('Expiration month must be between 1 and 12');
  }

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (!Number.isInteger(expirationYear) || expirationYear < currentYear) {
    errors.push('Expiration year is invalid or in the past');
  } else if (
    expirationYear === currentYear &&
    expirationMonth < currentMonth
  ) {
    errors.push('Card has expired');
  }

  if (errors.length > 0) {
    throw createError('Validation failed', 400, errors);
  }

  return {
    cardNumber,
    cvv,
    cardholderName,
    expiration,
  };
}

module.exports = { validateCardPayload };
