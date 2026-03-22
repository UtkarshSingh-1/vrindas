import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*' }));
app.use(express.json());

// ─── Health Check ──────────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
    try {
        await query('SELECT 1');
        res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
    } catch {
        res.status(500).json({ status: 'error', db: 'disconnected' });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
//  ORDERS
// ═══════════════════════════════════════════════════════════════════════════

/** GET /api/orders — list all orders newest first */
app.get('/api/orders', async (_req, res) => {
    try {
        const ordersResult = await query(`
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

        const orders = ordersResult.rows.map(formatOrder);
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

/** POST /api/orders — create a new order */
app.post('/api/orders', async (req, res) => {
    const {
        id, items, customerDetails, totalAmount, deliveryCharge,
        gstAmount, status, paymentMethod, paymentStatus,
        orderMode, tableNumber
    } = req.body;

    if (!id || !items || !customerDetails) {
        return res.status(400).json({ error: 'Missing required fields: id, items, customerDetails' });
    }

    try {
        // Insert order
        await query(
            `INSERT INTO orders
        (id, status, payment_method, payment_status, total_amount, delivery_charge, gst_amount,
         order_mode, table_number, customer_name, customer_phone, customer_address, customer_city, customer_pincode)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
       ON CONFLICT (id) DO NOTHING`,
            [
                id,
                status || 'pending',
                paymentMethod || 'cod',
                paymentStatus || 'pending',
                totalAmount || 0,
                deliveryCharge || 0,
                gstAmount || 0,
                orderMode || null,
                tableNumber || null,
                customerDetails.name,
                customerDetails.phone,
                customerDetails.address || '',
                customerDetails.city || '',
                customerDetails.pincode || '',
            ]
        );

        // Insert order items
        for (const item of items) {
            await query(
                `INSERT INTO order_items (order_id, item_id, name, price, quantity, image, category)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
                [id, item.id, item.name, item.price, item.quantity, item.image || '', item.category || '']
            );
        }

        res.status(201).json({ success: true, id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

/** PATCH /api/orders/:id/status — update order status */
app.patch('/api/orders/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    try {
        const result = await query(
            `UPDATE orders SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING id`,
            [status, id]
        );
        if (result.rowCount === 0) return res.status(404).json({ error: 'Order not found' });
        res.json({ success: true, id, status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

// ═══════════════════════════════════════════════════════════════════════════
//  MENU OVERRIDES (Admin can push price/availability updates to DB)
// ═══════════════════════════════════════════════════════════════════════════

/** GET /api/menu-overrides — get all admin overrides */
app.get('/api/menu-overrides', async (_req, res) => {
    try {
        const result = await query('SELECT * FROM menu_overrides');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch menu overrides' });
    }
});

/** PUT /api/menu-overrides/:itemId — upsert a menu item override */
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
            [itemId, name, description, price, category, image, is_available ?? true, is_veg ?? true]
        );
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});

/** DELETE /api/menu-overrides/:itemId — remove a menu override */
app.delete('/api/menu-overrides/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
        await query('DELETE FROM menu_overrides WHERE item_id=$1', [itemId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});

// ─── Helper ──────────────────────────────────────────────────────────────────
function formatOrder(row) {
    return {
        id: row.id,
        status: row.status,
        paymentMethod: row.payment_method,
        paymentStatus: row.payment_status,
        totalAmount: parseFloat(row.total_amount),
        deliveryCharge: parseFloat(row.delivery_charge),
        gstAmount: parseFloat(row.gst_amount),
        orderMode: row.order_mode,
        tableNumber: row.table_number,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        customerDetails: {
            name: row.customer_name,
            phone: row.customer_phone,
            address: row.customer_address,
            city: row.customer_city,
            pincode: row.customer_pincode,
        },
        items: row.items?.filter(Boolean) ?? [],
    };
}

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n🚀 Vrindas API Server running on http://localhost:${PORT}`);
    console.log(`📡 DB: Neon PostgreSQL (ap-southeast-1)\n`);
});
