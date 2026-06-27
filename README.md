# Project Payment

A full-stack credit card payment processing application with encrypted storage, Luhn validation, and a modern React frontend.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Backend  | Node.js 20+, Express 4, Sequelize 6 |
| Database | PostgreSQL 14+                      |

## Prerequisites

- **Node.js** >= 20.0.0
- **PostgreSQL** >= 16
- **npm** >= 10

## Installation

### 1. Clone and install dependencies

```bash
git clone <https://github.com/morella12/project-payment.git>
cd project-payment
```

### 2. Set up PostgreSQL

Create a database for the application:

```sql
CREATE DATABASE payment_db;
```
Run Sequelize migrations from the `backend` directory:

```bash
cd backend
npm run db:migrate

# Run seeders (when available)
npm run db:seed
```

### 3. Configure environment variables

**Backend** — copy the example file and edit values:

```bash
cp backend/.env.example backend/.env
```

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

> You can also set `DATABASE_URL` directly — it overrides the `DB_*` variables.

