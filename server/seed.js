import { query } from './db.js';

const initialItems = [
    { id: 'S1', name: 'Masala Dosa', category: 'south-indian', price: 120, description: 'Crispy rice crepe filled with spicy potato mash', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800' },
    { id: 'S2', name: 'Idli Sambhar', category: 'south-indian', price: 80, description: 'Steamed rice cakes served with lentil soup', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800' },
    { id: 'C1', name: 'Veg Manchurian', category: 'chinese', price: 160, description: 'Vegetable dumplings in spicy manchurian sauce', image: 'https://images.unsplash.com/photo-1512058560566-d8b437a17305?w=800' },
    { id: 'C2', name: 'Hakka Noodles', category: 'chinese', price: 140, description: 'Stir-fried noodles with crisp vegetables', image: 'https://images.unsplash.com/photo-158503222665a-719926f070ef?w=800' },
    { id: 'SN1', name: 'Paneer Tikka', category: 'snacks', price: 220, description: 'Grilled cottage cheese marinated in Indian spices', image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800' },
    { id: 'B1', name: 'Cold Coffee', category: 'beverages', price: 90, description: 'Rich and creamy chilled coffee with chocolate', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800' },
    { id: 'B2', name: 'Masala Tea', category: 'beverages', price: 40, description: 'Aromatic tea brewed with Indian spices', image: 'https://images.unsplash.com/photo-1544787210-b5936a3fba0c?w=800' },
    { id: 'D1', name: 'Gulab Jamun', category: 'desserts', price: 60, description: 'Soft milk solids dumplings in sugar syrup', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800' }
];

async function seed() {
    console.log('--- SEEDING DATABASE ---');
    try {
        for (const item of initialItems) {
            await query(
                `INSERT INTO menu_overrides (item_id, name, description, price, category, image, is_available, is_veg)
         VALUES ($1,$2,$3,$4,$5,$6,true,true)
         ON CONFLICT (item_id) DO UPDATE SET
           name=EXCLUDED.name, description=EXCLUDED.description, price=EXCLUDED.price,
           category=EXCLUDED.category, image=EXCLUDED.image, is_available=true, is_veg=true`,
                [item.id, item.name, item.description, item.price, item.category, item.image]
            );
            console.log(`Seeded item: ${item.name}`);
        }
        console.log('\n✅ Seeding complete!');
    } catch (err) {
        console.error('Seeding failed:', err.message);
    } finally {
        process.exit();
    }
}

seed();
