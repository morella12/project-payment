/**
 * Validates a credit card number using the Luhn algorithm (mod 10).
 *
 * Starting from the rightmost digit, every second digit is doubled.
 * If doubling produces a value greater than 9, subtract 9.
 * The sum of all digits must be divisible by 10.
 *
 * @param {string} cardNumber - Raw card number (digits only or with separators)
 * @returns {boolean}
 */
function luhnCheck(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');

  if (digits.length !== 16) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

module.exports = { luhnCheck };
