/**
 * migrate.js — Run once to create tables in Neon PostgreSQL
 * Usage: node migrate.js
 */
import { query } from './db.js';

const schema = `
-- ─── Orders Table ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id                TEXT PRIMARY KEY,
  status            TEXT NOT NULL DEFAULT 'pending',
  payment_method    TEXT NOT NULL DEFAULT 'cod',
  payment_status    TEXT NOT NULL DEFAULT 'pending',
  total_amount      NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_charge   NUMERIC(10,2) NOT NULL DEFAULT 0,
  gst_amount        NUMERIC(10,2) NOT NULL DEFAULT 0,
  order_mode        TEXT,
  table_number      TEXT,
  customer_name     TEXT NOT NULL,
  customer_phone    TEXT NOT NULL,
  customer_address  TEXT,
  customer_city     TEXT,
  customer_pincode  TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ
);

-- ─── Order Items Table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          SERIAL PRIMARY KEY,
  order_id    TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id     TEXT NOT NULL,
  name        TEXT NOT NULL,
  price       NUMERIC(10,2) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  image       TEXT,
  category    TEXT
);

-- ─── Menu Override Table (admin can update prices/availability) ──────────────
CREATE TABLE IF NOT EXISTS menu_overrides (
  item_id      TEXT PRIMARY KEY,
  name         TEXT,
  description  TEXT,
  price        NUMERIC(10,2),
  category     TEXT,
  image        TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_veg       BOOLEAN DEFAULT TRUE,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Indexes ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
`;

async function migrate() {
    console.log('🚀 Running database migration...\n');
    try {
        await query(schema);
        console.log('✅ Migration complete! Tables created:\n  - orders\n  - order_items\n  - menu_overrides\n');
    } catch (err) {
        console.error('❌ Migration failed:', err.message);
        process.exit(1);
    }
    process.exit(0);
}

migrate();
