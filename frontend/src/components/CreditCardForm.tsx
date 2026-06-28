'use client';

import { FormEvent, useMemo, useState } from 'react';
import Modal from './Modal';
import { submitCard } from '@/services/api';
import {
  CardFormData,
  FormErrors,
  formatCardNumber,
  validateCardForm,
} from '@/utils/validation';

const INITIAL_FORM: CardFormData = {
  cardNumber: '',
  cvv: '',
  cardholderName: '',
  expirationMonth: '',
  expirationYear: '',
};

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const value = String(i + 1).padStart(2, '0');
  return { value, label: value };
});

function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 15 }, (_, i) => currentYear + i);
}

export default function CreditCardForm() {
  const [form, setForm] = useState<CardFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({ isOpen: false, type: 'success', title: '', message: '' });

  const yearOptions = useMemo(() => generateYearOptions(), []);

  function updateField(field: keyof CardFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const nextForm = { ...form, [field]: value };
      setErrors(validateCardForm(nextForm));
    }
  }

  function handleBlur(field: keyof CardFormData) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validateCardForm(form));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validateCardForm(form);
    setErrors(validationErrors);
    setTouched({
      cardNumber: true,
      cvv: true,
      cardholderName: true,
      expirationMonth: true,
      expirationYear: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await submitCard({
        cardNumber: form.cardNumber.replace(/\s/g, ''),
        cvv: form.cvv,
        cardholderName: form.cardholderName.trim(),
        expiration: form.expirationYear + '-' + form.expirationMonth + '-01',
      });

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Payment Saved',
        message: `${response.message}. Card ending in ${response.data.lastFour} was stored securely.`,
      });
      setForm(INITIAL_FORM);
      setTouched({});
      setErrors({});
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Submission Failed',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function fieldClassName(hasError: boolean) {
    return `w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
        : 'border-slate-200 focus:border-brand-500 focus:ring-brand-200'
    }`;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="cardNumber"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              value={form.cardNumber}
              onChange={(e) =>
                updateField('cardNumber', formatCardNumber(e.target.value))
              }
              onBlur={() => handleBlur('cardNumber')}
              className={fieldClassName(!!errors.cardNumber)}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="cardholderName"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Cardholder Name
            </label>
            <input
              id="cardholderName"
              type="text"
              autoComplete="cc-name"
              placeholder="John Doe"
              value={form.cardholderName}
              onChange={(e) => updateField('cardholderName', e.target.value)}
              onBlur={() => handleBlur('cardholderName')}
              className={fieldClassName(!!errors.cardholderName)}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-xs text-red-600">
                {errors.cardholderName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="expirationMonth"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Month
              </label>
              <select
                id="expirationMonth"
                autoComplete="cc-exp-month"
                value={form.expirationMonth}
                onChange={(e) => updateField('expirationMonth', e.target.value)}
                onBlur={() => handleBlur('expirationMonth')}
                className={fieldClassName(!!errors.expirationMonth)}
              >
                <option value="">MM</option>
                {MONTHS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
              {errors.expirationMonth && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.expirationMonth}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="expirationYear"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Year
              </label>
              <select
                id="expirationYear"
                autoComplete="cc-exp-year"
                value={form.expirationYear}
                onChange={(e) => updateField('expirationYear', e.target.value)}
                onBlur={() => handleBlur('expirationYear')}
                className={fieldClassName(!!errors.expirationYear)}
              >
                <option value="">YYYY</option>
                {yearOptions.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.expirationYear && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.expirationYear}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="cvv"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                maxLength={3}
                value={form.cvv}
                onChange={(e) =>
                  updateField('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))
                }
                onBlur={() => handleBlur('cvv')}
                className={fieldClassName(!!errors.cvv)}
              />
              {errors.cvv && (
                <p className="mt-1 text-xs text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-brand-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            'Submit Payment'
          )}
        </button>
      </form>

      <Modal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  );
}
