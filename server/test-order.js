import fetch from 'node-fetch';

const API_URL = 'http://localhost:3001/api/orders';

const testOrder = {
    id: `ORD-${Date.now()}`,
    items: [
        { id: 'S1', name: 'Masala Dosa', price: 120, quantity: 2, image: '', category: 'south-indian' },
        { id: 'B1', name: 'Cold Coffee', price: 90, quantity: 1, image: '', category: 'beverages' }
    ],
    customerDetails: {
        name: 'Test Customer',
        phone: '9876543210',
        address: '123 Test Street',
        city: 'Kanpur',
        pincode: '208001'
    },
    totalAmount: 330,
    deliveryCharge: 0,
    gstAmount: 0,
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderMode: 'delivery'
};

async function runDryRun() {
    console.log('--- STARTING DRY RUN: Placing Test Order ---');
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testOrder)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Order placed successfully:', result.id);
            console.log('Check the Admin Dashboard or run node check-db.js to verify!');
        } else {
            const error = await response.text();
            console.error('❌ Failed to place order:', error);
        }
    } catch (err) {
        console.error('❌ Error during dry run:', err.message);
        console.log('Ensure the server is running with: node server/index.js');
    } finally {
        process.exit();
    }
}

runDryRun();
