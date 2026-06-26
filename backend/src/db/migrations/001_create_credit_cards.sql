-- Credit cards table: PAN and CVV are stored encrypted (AES-256-GCM).
CREATE TABLE IF NOT EXISTS credit_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_number_encrypted TEXT NOT NULL,
  cvv_encrypted TEXT NOT NULL,
  cardholder_name VARCHAR(255) NOT NULL,
  expiration_month SMALLINT NOT NULL CHECK (expiration_month BETWEEN 1 AND 12),
  expiration_year SMALLINT NOT NULL CHECK (expiration_year >= 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credit_cards_created_at ON credit_cards (created_at DESC);
