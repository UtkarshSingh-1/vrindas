import { useState } from 'react';
import { Search, UserCircle } from 'lucide-react';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function CustomerManagement() {
    const orders = useSelector((state: RootState) => state.orders.list);
    const [searchTerm, setSearchTerm] = useState('');

    // Extract unique customers from orders for mock display
    const customersMap = new Map();
    orders.forEach(order => {
        if (!customersMap.has(order.customerDetails.phone)) {
            customersMap.set(order.customerDetails.phone, {
                name: order.customerDetails.name,
                phone: order.customerDetails.phone,
                city: order.customerDetails.city,
                totalOrders: 1,
                totalSpent: order.totalAmount,
                lastOrder: order.createdAt
            });
        } else {
            const c = customersMap.get(order.customerDetails.phone);
            c.totalOrders += 1;
            c.totalSpent += order.totalAmount;
            if (order.createdAt > c.lastOrder) c.lastOrder = order.createdAt;
        }
    });

    const uniqueCustomers = Array.from(customersMap.values());
    const filteredCustomers = uniqueCustomers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
            </div>

            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search customers by name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="p-4 font-medium">Customer</th>
                                <th className="p-4 font-medium">City</th>
                                <th className="p-4 font-medium">Total Orders</th>
                                <th className="p-4 font-medium">Total Spent</th>
                                <th className="p-4 font-medium">Last Order</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((c, i) => (
                                <tr key={i} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                                                <UserCircle className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800">{c.name}</p>
                                                <p className="text-sm text-gray-500">{c.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{c.city}</td>
                                    <td className="p-4 text-gray-600">{c.totalOrders}</td>
                                    <td className="p-4 font-semibold text-gray-800">₹{c.totalSpent}</td>
                                    <td className="p-4 text-gray-600">{c.lastOrder}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
