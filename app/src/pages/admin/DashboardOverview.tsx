import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { IndianRupee, TrendingUp, ShoppingBag, CheckCircle } from 'lucide-react';

export default function DashboardOverview() {
    const orders = useSelector((state: RootState) => state.orders.list);

    // Calculate stats
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter((o) => o.status === 'delivered').length;
    const pendingOrders = totalOrders - completedOrders;

    const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

    const stats = [
        { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Completed', value: completedOrders.toString(), icon: CheckCircle, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Pending', value: pendingOrders.toString(), icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div key={stat.label} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl shadow-card flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-card mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                <p className="text-gray-500">Welcome to the real-time Admin Management System. Use the sidebar to navigate to Orders, Menu Management, and table QR Codes.</p>
            </div>
        </div>
    );
}
