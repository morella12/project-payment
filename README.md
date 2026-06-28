# Project Payment

A full-stack credit card payment processing application with encrypted storage, Luhn validation, and a modern React frontend.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | Node.js 20+, Express 4, Sequelize 6 |
| Database | PostgreSQL 14+                      |
| Frontend | Next.js 14+, React, Tailwind CSS    |
| Crypto   | Node.js built-in `crypto` module    |

## Prerequisites

- **Node.js** >= 20.0.0
- **PostgreSQL** >= 16
- **npm** >= 10

## Installation & Setup

### 1. Clone and install dependencies

```bash
git clone <https://github.com/morella12/project-payment.git>
cd project-payment

npm run install:all
```

### 2. Set up PostgreSQL

```sql
CREATE DATABASE payment_db;
```

### 3. Configure environment variables

**Backend** (`backend/.env`):

| Variable         | Description                                      |
| ---------------- | ------------------------------------------------ |
| `PORT`           | API server port (default: `3001`)                |
| `DB_HOST`        | PostgreSQL host (default: `localhost`)           |
| `DB_PORT`        | PostgreSQL port (default: `5432`)                |
| `DB_USER`        | PostgreSQL user (default: `postgres`)            |
| `DB_PASSWORD`    | **Your PostgreSQL password** (required)          |
| `DB_NAME`        | Database name (default: `payment_db`)            |
| `ENCRYPTION_KEY` | 32-byte key (64 hex chars) for AES-256-GCM       |
| `CORS_ORIGIN`    | Frontend URL allowed for CORS (default: `:3000`) |

Generate a secure encryption key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Frontend** (`frontend/.env.local`):

| Variable              | Description        | Default                  |
| --------------------- | ------------------ | ------------------------ |
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3001` |

### 4. Run migrations

```bash
npm run db:migrate && npm run db:seed
```

## Running the Application

```bash
# Development: start in one command 
npm run dev

# Production start (assumes migrations already applied)
npm start
```
### Backend (port 3001)

```bash
cd backend
npm run dev
```


### Frontend (port 3000)

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

| Method | Endpoint       | Description                    |
| ------ | -------------- | ------------------------------ |
| GET    | `/api/health`  | Health check with DB status    |
| POST   | `/api/cards`   | Store an encrypted credit card |

### Example: submit a card

```bash
curl -X POST http://localhost:3001/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "cardNumber": "4532015112830366",
    "cvv": "123",
    "cardholderName": "John Doe",
    "expirationMonth": 12,
    "expirationYear": 2028
  }'
```

### Why the `crypto` module?

- Ships with Node.js — no third-party crypto dependencies
- Backed by OpenSSL/BoringSSL, widely audited
- Supports modern authenticated encryption primitives

### Why AES-256-GCM?

- **AES-256** provides strong symmetric encryption for data at rest
- **GCM mode** adds authenticated encryption: any tampering with ciphertext is detected via the authentication tag
- Each encryption uses a unique 12-byte IV, preventing pattern analysis across records
- Output is stored as `base64(iv + authTag + ciphertext)`

The `ENCRYPTION_KEY` must be a 64-character hex string (32 bytes). Never commit real keys to version control.

## Luhn Algorithm

Card numbers are validated with the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) (mod 10) on both client and server:

1. Starting from the rightmost digit, double every second digit
2. If doubling exceeds 9, subtract 9
3. Sum all digits — the total must be divisible by 10

Implementation (`backend/src/utils/luhn.js`):

- Strips non-digit characters
- Iterates right-to-left with a `shouldDouble` toggle
- Returns `false` for non-16-digit numbers

The frontend mirrors this logic in `frontend/src/lib/validation.ts` for immediate user feedback before submission.

## Project Structure

```
project-payment/
├── backend/
│   ├── server.js              # Entry point (npm start)
│   ├── .sequelizerc           # Sequelize CLI paths
│   └── src/
│       ├── config/            # Database & Sequelize config
│       ├── migrations/        # Sequelize migrations
│       ├── models/            # Sequelize models
│       ├── routes/            # Express route handlers
│       ├── middleware/        # Validation & error handling
│       ├── services/          # Encryption service
│       └── utils/             # Luhn algorithm
├── frontend/
│   └── src/
│       ├── app/               # Next.js App Router pages
│       ├── components/        # React components
│       └── service/           # API client & validation
│       └── utils/             # Validation
├── README.md
└── TODO.md
```

## Security Notes

⚠️ **Educational purpose only.** Real payment processing requires PCI DSS compliance. Use certified processors (Stripe, Adyen) in production. 
