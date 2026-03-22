import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

// Helper for DB queries
const query = (text, params) => pool.query(text, params);

// ─── Health Check ──────────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
    try {
        await query('SELECT 1');
        res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
    } catch (err) {
        res.status(500).json({ status: 'error', db: 'disconnected', error: err.message });
    }
});

// ─── Orders ──────────────────────────────────────────────────────────────────
app.get('/api/orders', async (_req, res) => {
    try {
        const result = await query(`
            SELECT o.*,
                   json_agg(json_build_object(
                     'id', oi.item_id,
                     'name', oi.name,
                     'price', oi.price::float,
                     'quantity', oi.quantity,
                     'image', oi.image,
                     'category', oi.category
                   )) AS items
            FROM orders o
            LEFT JOIN order_items oi ON oi.order_id = o.id
            GROUP BY o.id
            ORDER BY o.created_at DESC
        `);
        res.json(result.rows.map(row => ({
            ...row,
            totalAmount: parseFloat(row.total_amount),
            deliveryCharge: parseFloat(row.delivery_charge),
            gstAmount: parseFloat(row.gst_amount),
            customerDetails: {
                name: row.customer_name,
                phone: row.customer_phone,
                address: row.customer_address,
                city: row.customer_city,
                pincode: row.customer_pincode,
            },
            items: row.items?.filter(Boolean) ?? [],
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', async (req, res) => {
    const { id, items, customerDetails, totalAmount, deliveryCharge, gstAmount, status, paymentMethod, paymentStatus, orderMode, tableNumber } = req.body;
    try {
        await query(
            `INSERT INTO orders (id, status, payment_method, payment_status, total_amount, delivery_charge, gst_amount, order_mode, table_number, customer_name, customer_phone, customer_address, customer_city, customer_pincode)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
            [id, status, paymentMethod, paymentStatus, totalAmount, deliveryCharge, gstAmount, orderMode, tableNumber, customerDetails.name, customerDetails.phone, customerDetails.address, customerDetails.city, customerDetails.pincode]
        );
        for (const item of items) {
            await query(
                `INSERT INTO order_items (order_id, item_id, name, price, quantity, image, category)
                 VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                [id, item.id, item.name, item.price, item.quantity, item.image || '', item.category || '']
            );
        }
        res.status(201).json({ success: true, id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await query('UPDATE orders SET status=$1, updated_at=NOW() WHERE id=$2', [status, id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ─── Menu Overrides ───────────────────────────────────────────────────────────
app.get('/api/menu-overrides', async (_req, res) => {
    try {
        const result = await query('SELECT * FROM menu_overrides');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/menu-overrides/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { name, description, price, category, image, is_available, is_veg } = req.body;
    try {
        await query(
            `INSERT INTO menu_overrides (item_id, name, description, price, category, image, is_available, is_veg, updated_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
             ON CONFLICT (item_id) DO UPDATE SET
             name=EXCLUDED.name, description=EXCLUDED.description, price=EXCLUDED.price,
             category=EXCLUDED.category, image=EXCLUDED.image, is_available=EXCLUDED.is_available,
             is_veg=EXCLUDED.is_veg, updated_at=NOW()`,
            [itemId, name, description, price, category, image, is_available, is_veg]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default app;
