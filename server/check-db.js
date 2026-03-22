import { query } from './db.js';
import dotenv from 'dotenv';
dotenv.config();

async function checkDatabase() {
    try {
        console.log('--- DATABASE STATUS ---');

        // Check tables
        const tableRes = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        const tableNames = tableRes.rows.map(t => t.table_name);
        console.log('Tables found:', tableNames.join(', '));

        // Check specific tables if they exist
        const hasOrders = tableNames.includes('orders');
        if (hasOrders) {
            const ordersCount = await query('SELECT COUNT(*) FROM orders');
            console.log('Total Orders in DB:', ordersCount.rows[0].count);
        }

        const hasOverrides = tableNames.includes('menu_overrides');
        if (hasOverrides) {
            const overridesCount = await query('SELECT COUNT(*) FROM menu_overrides');
            console.log('Total Menu Overrides in DB:', overridesCount.rows[0].count);
        }

        if (!hasOrders || !hasOverrides) {
            console.log('WARNING: Some tables are missing. Running migrations might be necessary.');
        }

        console.log('------------------------');
    } catch (err) {
        console.error('Database check failed:', err.message);
    } finally {
        process.exit();
    }
}

checkDatabase();
