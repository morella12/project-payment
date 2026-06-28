export interface CardFormData {
  cardNumber: string;
  cvv: string;
  cardholderName: string;
  expirationMonth: string;
  expirationYear: string;
}

export interface FormErrors {
  cardNumber?: string;
  cvv?: string;
  cardholderName?: string;
  expirationMonth?: string;
  expirationYear?: string;
}

const CARD_NUMBER_REGEX = /^\d{16}$/;
const CVV_REGEX = /^\d{3}$/;
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'.-]{2,100}$/;

/**
 * Luhn algorithm — mirrors backend validation for consistent UX.
 */
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length !== 16) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function validateCardForm(data: CardFormData): FormErrors {
  const errors: FormErrors = {};
  const cardNumber = data.cardNumber.replace(/\s/g, '');

  if (!CARD_NUMBER_REGEX.test(cardNumber)) {
    errors.cardNumber = 'Card number must be exactly 16 digits';
  } else if (!luhnCheck(cardNumber)) {
    errors.cardNumber = 'Invalid card number';
  }

  if (!CVV_REGEX.test(data.cvv)) {
    errors.cvv = 'CVV must be exactly 3 digits';
  }

  if (!NAME_REGEX.test(data.cardholderName.trim())) {
    errors.cardholderName =
      'Enter a valid name (2–100 characters, letters only)';
  }

  const month = parseInt(data.expirationMonth, 10);
  const year = parseInt(data.expirationYear, 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (!month || month < 1 || month > 12) {
    errors.expirationMonth = 'Select a valid month';
  }

  if (!year || year < currentYear) {
    errors.expirationYear = 'Select a valid year';
  } else if (year === currentYear && month < currentMonth) {
    errors.expirationYear = 'Card has expired';
  }

  return errors;
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}
