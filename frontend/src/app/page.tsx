import CreditCardForm from '@/components/CreditCardForm';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg flex flex-col items-center">
        
        <header className="w-full text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
            Payment
          </h1> 
          
          <div className="flex justify-center w-full">
            <ol className="flex items-center w-full max-w-md space-x-4 mb-4">
              
              <li className="flex w-full items-center text-fg-brand after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-subtle after:border-4 after:inline-block after:ms-4 after:rounded-full">
                <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
                  <svg 
                    className="w-5 h-5 text-fg-brand"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </span>
              </li>

              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-brand-subtle after:border-4 after:inline-block after:ms-4 after:rounded-full">
                <span className="flex items-center justify-center w-10 h-10 bg-brand-softer rounded-full lg:h-12 lg:w-12 shrink-0">
                  <svg 
                    className="w-5 h-5 text-fg-brand"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path 
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                    />
                  </svg>
                </span>
              </li>

              <li className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 bg-brand-600 text-white rounded-full lg:h-12 lg:w-12 shrink-0 shadow-lg shadow-brand-600/20">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </span>
              </li>

            </ol>
          </div>
        </header>

        <div className="w-full">
          <CreditCardForm />
        </div>
        
      </div>
    </main>
  );
}