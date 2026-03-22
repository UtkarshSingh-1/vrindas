import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrderStatus } from '@/types';
import { menuItems } from '@/data/menuData';

// Initial Mock data for Orders
const mockOrders: Order[] = [
    {
        id: 'VRD001',
        items: [{ ...menuItems[0], quantity: 2 }],
        customerDetails: { name: 'Rahul Kumar', phone: '9876543210', address: '123 Main St', city: 'Kanpur', pincode: '208001' },
        totalAmount: 240,
        deliveryCharge: 40,
        gstAmount: 14,
        status: 'delivered',
        paymentMethod: 'cod',
        paymentStatus: 'completed',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0], // 2 days ago
    },
    {
        id: 'VRD002',
        items: [{ ...menuItems[5], quantity: 1 }],
        customerDetails: { name: 'Priya Sharma', phone: '9876543211', address: '456 Park Ave', city: 'Kanpur', pincode: '208002' },
        totalAmount: 180,
        deliveryCharge: 0,
        gstAmount: 11,
        status: 'preparing',
        paymentMethod: 'razorpay',
        paymentStatus: 'completed',
        createdAt: new Date(Date.now() - 86400000).toISOString().split('T')[0], // 1 day ago
    },
    {
        id: 'VRD003',
        items: [{ ...menuItems[2], quantity: 3 }],
        customerDetails: { name: 'Amit Verma', phone: '9876543212', address: '789 Gandhi Rd', city: 'Kanpur', pincode: '208001' },
        totalAmount: 450,
        deliveryCharge: 0,
        gstAmount: 27,
        status: 'pending',
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString().split('T')[0], // today
    },
];

// Load from local storage if exists, else load mocks
const loadOrders = (): Order[] => {
    try {
        const saved = localStorage.getItem('vrindas_orders');
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load orders from local storage', e);
    }
    return mockOrders;
};

// Save to local storage
const saveOrders = (orders: Order[]) => {
    try {
        localStorage.setItem('vrindas_orders', JSON.stringify(orders));
    } catch (e) {
        console.error('Failed to save orders to local storage', e);
    }
};

interface OrdersState {
    list: Order[];
}

const initialState: OrdersState = {
    list: loadOrders(),
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            // Add new order at the beginning
            state.list.unshift(action.payload);
            saveOrders(state.list);
        },
        updateOrderStatus: (state, action: PayloadAction<{ id: string; status: OrderStatus }>) => {
            const order = state.list.find((o) => o.id === action.payload.id);
            if (order) {
                order.status = action.payload.status;
                saveOrders(state.list);
            }
        },
        clearOrders: (state) => {
            state.list = [];
            saveOrders(state.list);
        },
        setOrders: (state, action: PayloadAction<Order[]>) => {
            state.list = action.payload;
            saveOrders(state.list);
        },
    },
});

export const { addOrder, updateOrderStatus, clearOrders, setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
