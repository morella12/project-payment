'use client';

interface ModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
}

export default function Modal({
  isOpen,
  type,
  title,
  message,
  onClose,
}: ModalProps) {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full mb-4 ${
              isSuccess
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {isSuccess ? (
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>

          <h2
            id="modal-title"
            className="text-xl font-semibold text-slate-900 mb-2"
          >
            {title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            {message}
          </p>

          <button
            type="button"
            onClick={onClose}
            className={`w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isSuccess
                ? 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
                : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            }`}
          >
            {isSuccess ? 'Done' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
}
