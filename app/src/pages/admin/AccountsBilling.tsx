import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { Order } from '@/types';
import {
    TrendingUp, IndianRupee, CreditCard,
    FileText, Printer, ChevronDown, ChevronUp,
    BarChart2, PieChart, ArrowUpRight, ArrowDownRight,
    CheckCircle, XCircle, Receipt
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== HELPERS ====================
const GST_RATE = 0.05;
const FSSAI_NO = '10020042013000';
const GSTIN = '09AABFV1234A1Z5';
const RESTAURANT_ADDRESS = 'Shivala Rd, Khas Bazar, Shivala, Patkapur, Kanpur, UP 208001';
const RESTAURANT_PHONE = '+91 98765 43210';

function formatCurrency(n: number) {
    return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDate(iso: string) {
    try {
        return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return iso; }
}

// ==================== INVOICE MODAL ====================
function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
    const printRef = useRef<HTMLDivElement>(null);

    const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const cgst = Math.round(subtotal * (GST_RATE / 2) * 100) / 100;
    const sgst = cgst;
    const grandTotal = subtotal + cgst + sgst + (order.deliveryCharge || 0);

    const handlePrint = () => {
        const printContents = printRef.current?.innerHTML || '';
        const win = window.open('', '_blank');
        if (!win) return;
        win.document.write(`
      <html><head><title>Invoice ${order.id}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 32px; color: #333; }
        h1 { font-size: 24px; font-weight: bold; } h2 { font-size: 18px; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #eee; }
        th { background: #f5f5f5; font-size: 12px; text-transform: uppercase; letter-spacing: .5px; }
        .text-right { text-align: right; }
        .total-row { font-weight: bold; font-size: 16px; }
        .paid-stamp { color: green; font-size: 28px; font-weight: bold; border: 3px solid green;
                      display: inline-block; padding: 4px 16px; border-radius: 6px;
                      transform: rotate(-8deg); margin-top: 16px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #333; padding-bottom: 16px; margin-bottom: 16px; }
        .badge { background: #7a1a2e; color: white; padding: 4px 12px; border-radius: 9999px; font-size: 11px; display: inline-block; }
        .meta { font-size: 12px; color: #666; margin-top: 4px; }
        .gst-section { background: #fafafa; border: 1px solid #eee; border-radius: 8px; padding: 12px; }
      </style></head><body>${printContents}</body></html>
    `);
        win.document.close();
        win.print();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-auto"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Toolbar */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Receipt className="w-5 h-5 text-burgundy" />
                        <h2 className="font-bold text-gray-800">Invoice #{order.id}</h2>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={handlePrint} className="flex items-center gap-1.5 px-3 py-2 bg-burgundy text-white text-sm font-semibold rounded-lg hover:bg-burgundy/90 transition-colors">
                            <Printer className="w-4 h-4" /> Print / Download PDF
                        </button>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 px-2">✕</button>
                    </div>
                </div>

                {/* Invoice Content */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <div ref={printRef}>
                        {/* Header */}
                        <div className="flex justify-between items-start border-b-2 border-gray-800 pb-4 mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-burgundy">VRINDAS</h1>
                                <p className="text-xs text-gray-500">{RESTAURANT_ADDRESS}</p>
                                <p className="text-xs text-gray-500">📞 {RESTAURANT_PHONE}</p>
                                <p className="text-xs text-gray-500 mt-1">GSTIN: <strong>{GSTIN}</strong> | FSSAI: {FSSAI_NO}</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-burgundy text-white text-xs px-3 py-1 rounded-full font-semibold">TAX INVOICE</span>
                                <p className="text-sm font-bold mt-2 text-gray-800">Invoice #{order.id}</p>
                                <p className="text-xs text-gray-500">Date: {formatDate(order.createdAt)}</p>
                                <p className={`text-xs font-bold mt-1 ${order.paymentStatus === 'completed' ? 'text-green-600' : 'text-orange-500'}`}>
                                    {order.paymentStatus === 'completed' ? '✓ PAID' : '⏳ PENDING'}
                                </p>
                            </div>
                        </div>

                        {/* Bill To */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Bill To</p>
                                <p className="font-bold text-gray-800">{order.customerDetails.name}</p>
                                <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                                {order.customerDetails.address && <p className="text-sm text-gray-600">{order.customerDetails.address}</p>}
                                <p className="text-sm text-gray-600">{order.customerDetails.city} - {order.customerDetails.pincode}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order Info</p>
                                <div className="space-y-1">
                                    <p className="text-sm"><span className="text-gray-500">Method:</span> <strong>{order.paymentMethod === 'cod' || order.paymentMethod === 'razorpay' ? (order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment') : order.paymentMethod}</strong></p>
                                    <p className="text-sm"><span className="text-gray-500">Status:</span> <strong className="capitalize">{order.status.replace(/_/g, ' ')}</strong></p>
                                    <p className="text-sm"><span className="text-gray-500">Items:</span> <strong>{order.items.length} items</strong></p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <table className="w-full text-sm border-collapse mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left font-semibold text-gray-600 text-xs uppercase">#</th>
                                    <th className="p-3 text-left font-semibold text-gray-600 text-xs uppercase">Item</th>
                                    <th className="p-3 text-center font-semibold text-gray-600 text-xs uppercase">Qty</th>
                                    <th className="p-3 text-right font-semibold text-gray-600 text-xs uppercase">Rate</th>
                                    <th className="p-3 text-right font-semibold text-gray-600 text-xs uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, idx) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="p-3 text-gray-400">{idx + 1}</td>
                                        <td className="p-3 font-medium text-gray-800">{item.name}</td>
                                        <td className="p-3 text-center text-gray-600">{item.quantity}</td>
                                        <td className="p-3 text-right text-gray-600">{formatCurrency(item.price)}</td>
                                        <td className="p-3 text-right font-semibold text-gray-800">{formatCurrency(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* GST Breakdown */}
                        <div className="flex justify-end">
                            <div className="w-64 space-y-2 bg-gray-50 rounded-xl p-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>CGST @{(GST_RATE / 2 * 100).toFixed(1)}%</span>
                                    <span>{formatCurrency(cgst)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>SGST @{(GST_RATE / 2 * 100).toFixed(1)}%</span>
                                    <span>{formatCurrency(sgst)}</span>
                                </div>
                                {order.deliveryCharge > 0 && (
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Delivery Charge</span>
                                        <span>{formatCurrency(order.deliveryCharge)}</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-base text-burgundy">
                                    <span>Grand Total</span>
                                    <span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-6 pt-4 border-t text-center text-xs text-gray-400">
                            <p>Thank you for dining with us! | This is a computer-generated invoice and does not require a physical signature.</p>
                            <p className="mt-1">FSSAI License No: {FSSAI_NO} | GSTIN: {GSTIN}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ==================== KPI CARD ====================
function KPICard({ label, value, sub, icon: Icon, color, trend }: {
    label: string; value: string; sub?: string; icon: React.ElementType; color: string; trend?: { value: number; label: string };
}) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs uppercase font-semibold text-gray-400 tracking-wide">{label}</p>
                    <h3 className="text-2xl font-black text-gray-800 mt-1">{value}</h3>
                    {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
                    {trend && (
                        <div className={`flex items-center gap-1 mt-2 text-xs font-semibold ${trend.value >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {trend.value >= 0 ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            {Math.abs(trend.value)}% {trend.label}
                        </div>
                    )}
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );
}

// ==================== SETTLEMENT BAR ====================
function SettlementBar({ label, amount, total, color }: { label: string; amount: number; total: number; color: string }) {
    const pct = total === 0 ? 0 : Math.round((amount / total) * 100);
    return (
        <div>
            <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{label}</span>
                <span className="font-bold text-gray-800">{formatCurrency(amount)} <span className="text-gray-400 font-normal">({pct}%)</span></span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}

// ==================== MAIN COMPONENT ====================
export default function AccountsBilling() {
    const allOrders = useSelector((state: RootState) => state.orders.list);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settlement' | 'gst'>('overview');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('all');

    // Filter orders by date
    const now = new Date();
    const filtered = allOrders.filter(o => {
        const d = new Date(o.createdAt);
        if (dateFilter === 'today') return d.toDateString() === now.toDateString();
        if (dateFilter === 'week') return (now.getTime() - d.getTime()) <= 7 * 864e5;
        if (dateFilter === 'month') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        return true;
    });

    // Metrics
    const revenue = filtered.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.totalAmount, 0);
    const gstCollected = filtered.filter(o => o.status !== 'cancelled').reduce((s, o) => {
        const sub = o.items.reduce((ss, i) => ss + i.price * i.quantity, 0);
        return s + sub * GST_RATE;
    }, 0);
    const cashOrders = filtered.filter(o => (o.paymentMethod === 'cod' || o.paymentMethod === 'cash' as any) && o.status !== 'cancelled');
    const onlineOrders = filtered.filter(o => (o.paymentMethod === 'razorpay' || o.paymentMethod === 'online' as any) && o.status !== 'cancelled');
    const cashRevenue = cashOrders.reduce((s, o) => s + o.totalAmount, 0);
    const onlineRevenue = onlineOrders.reduce((s, o) => s + o.totalAmount, 0);
    const completedOrders = filtered.filter(o => o.status === 'delivered').length;
    const cancelledOrders = filtered.filter(o => o.status === 'cancelled').length;
    const avgOrderValue = filtered.length === 0 ? 0 : Math.round(revenue / Math.max(filtered.filter(o => o.status !== 'cancelled').length, 1));

    // Top selling items
    const itemMap: Record<string, { name: string; qty: number; revenue: number }> = {};
    filtered.filter(o => o.status !== 'cancelled').forEach(order => {
        order.items.forEach(item => {
            if (!itemMap[item.id]) itemMap[item.id] = { name: item.name, qty: 0, revenue: 0 };
            itemMap[item.id].qty += item.quantity;
            itemMap[item.id].revenue += item.price * item.quantity;
        });
    });
    const topItems = Object.values(itemMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    const tabs = [
        { key: 'overview', label: 'Overview', icon: BarChart2 },
        { key: 'orders', label: 'Order Ledger', icon: Receipt },
        { key: 'settlement', label: 'Settlement', icon: CreditCard },
        { key: 'gst', label: 'GST Summary', icon: FileText },
    ] as const;

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">Accounts & Billing</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Real-time financial overview · GSTIN: {GSTIN}</p>
                </div>
                {/* Date Filter */}
                <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                    {(['today', 'week', 'month', 'all'] as const).map(f => (
                        <button key={f} onClick={() => setDateFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all capitalize ${dateFilter === f ? 'bg-white text-burgundy shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {f === 'all' ? 'All Time' : f === 'week' ? 'This Week' : f === 'month' ? 'This Month' : 'Today'}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard label="Net Revenue" value={formatCurrency(revenue)} sub={`${filtered.filter(o => o.status !== 'cancelled').length} paid orders`} icon={IndianRupee} color="bg-burgundy" trend={{ value: 12, label: 'vs last period' }} />
                <KPICard label="GST Collected" value={formatCurrency(gstCollected)} sub="CGST + SGST @5%" icon={Receipt} color="bg-green-600" />
                <KPICard label="Avg Order Value" value={formatCurrency(avgOrderValue)} sub="per transaction" icon={TrendingUp} color="bg-blue-600" trend={{ value: 8, label: 'vs last period' }} />
                <KPICard label="Cancelled Orders" value={cancelledOrders.toString()} sub={`${completedOrders} delivered`} icon={XCircle} color="bg-red-500" />
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                {tabs.map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === t.key ? 'bg-white shadow-sm text-burgundy' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <t.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{t.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

                    {/* ====== OVERVIEW TAB ====== */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Revenue Breakdown */}
                            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-burgundy" /> Revenue by Order Status</h3>
                                <div className="space-y-4">
                                    {(['delivered', 'preparing', 'pending', 'cancelled'] as const).map(status => {
                                        const statusRevenue = filtered.filter(o => o.status === status).reduce((s, o) => s + o.totalAmount, 0);
                                        const colors: Record<string, string> = { delivered: 'bg-green-500', preparing: 'bg-blue-500', pending: 'bg-orange-400', cancelled: 'bg-red-400' };
                                        return (
                                            <div key={status}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="capitalize font-medium text-gray-700">{status.replace(/_/g, ' ')}</span>
                                                    <span className="font-bold text-gray-800">{formatCurrency(statusRevenue)}</span>
                                                </div>
                                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${colors[status] || 'bg-gray-400'} rounded-full transition-all duration-700`}
                                                        style={{ width: revenue === 0 ? '0%' : `${Math.min(100, (statusRevenue / revenue) * 100)}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Top Items */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><PieChart className="w-4 h-4 text-burgundy" /> Top Selling Items</h3>
                                {topItems.length === 0 ? (
                                    <p className="text-sm text-gray-400 text-center py-8">No data available</p>
                                ) : (
                                    <div className="space-y-3">
                                        {topItems.map((item, i) => (
                                            <div key={item.name} className="flex items-center gap-3">
                                                <div className="w-7 h-7 rounded-lg bg-burgundy/10 flex items-center justify-center text-sm font-black text-burgundy">{i + 1}</div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-800 text-sm truncate">{item.name}</p>
                                                    <p className="text-xs text-gray-400">{item.qty} sold</p>
                                                </div>
                                                <span className="font-bold text-sm text-gray-700">{formatCurrency(item.revenue)}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ====== ORDER LEDGER TAB ====== */}
                    {activeTab === 'orders' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="font-bold text-gray-800">Order Ledger</h3>
                                <span className="text-xs text-gray-400">{filtered.length} records</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Order ID</th>
                                            <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Customer</th>
                                            <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Date</th>
                                            <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Payment</th>
                                            <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Status</th>
                                            <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">Amount</th>
                                            <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map(order => {
                                            const statusColors: Record<string, string> = {
                                                delivered: 'bg-green-100 text-green-700',
                                                pending: 'bg-orange-100 text-orange-700',
                                                preparing: 'bg-blue-100 text-blue-700',
                                                confirmed: 'bg-teal-100 text-teal-700',
                                                out_for_delivery: 'bg-purple-100 text-purple-700',
                                                cancelled: 'bg-red-100 text-red-700',
                                            };
                                            return (
                                                <>
                                                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                                                        <td className="p-4 font-bold text-burgundy">{order.id}</td>
                                                        <td className="p-4">
                                                            <p className="font-semibold text-gray-800">{order.customerDetails.name}</p>
                                                            <p className="text-xs text-gray-400">{order.customerDetails.phone}</p>
                                                        </td>
                                                        <td className="p-4 text-gray-600">{formatDate(order.createdAt)}</td>
                                                        <td className="p-4">
                                                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-semibold ${order.paymentMethod === 'cod' || order.paymentMethod === ('cash' as any) ? 'bg-gray-100 text-gray-700' : 'bg-blue-50 text-blue-700'}`}>
                                                                {order.paymentMethod === 'cod' || order.paymentMethod === ('cash' as any) ? '💵 Cash' : '💳 Online'}
                                                            </span>
                                                        </td>
                                                        <td className="p-4">
                                                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                                                                {order.status.replace(/_/g, ' ')}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right font-black text-gray-800">{formatCurrency(order.totalAmount)}</td>
                                                        <td className="p-4 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <button onClick={() => setExpandedRow(expandedRow === order.id ? null : order.id)}
                                                                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="View items">
                                                                    {expandedRow === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                                </button>
                                                                <button onClick={() => setSelectedOrder(order)}
                                                                    className="p-1.5 rounded-lg hover:bg-burgundy/10 text-burgundy" title="View Invoice">
                                                                    <FileText className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {expandedRow === order.id && (
                                                        <tr key={`${order.id}-exp`} className="bg-gray-50/80">
                                                            <td colSpan={7} className="px-8 py-3">
                                                                <div className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wide">Items Ordered</div>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {order.items.map(item => (
                                                                        <span key={item.id} className="bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700">
                                                                            {item.quantity}× {item.name} — <span className="text-burgundy font-bold">{formatCurrency(item.price * item.quantity)}</span>
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </>
                                            );
                                        })}
                                        {filtered.length === 0 && (
                                            <tr><td colSpan={7} className="p-12 text-center text-gray-400">No orders found for this period.</td></tr>
                                        )}
                                    </tbody>
                                    {/* Totals row */}
                                    {filtered.length > 0 && (
                                        <tfoot>
                                            <tr className="bg-burgundy/5 border-t-2 border-burgundy/20">
                                                <td colSpan={5} className="p-4 font-bold text-gray-700">Period Total ({filtered.filter(o => o.status !== 'cancelled').length} paid orders)</td>
                                                <td className="p-4 text-right font-black text-lg text-burgundy">{formatCurrency(revenue)}</td>
                                                <td />
                                            </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ====== SETTLEMENT TAB ====== */}
                    {activeTab === 'settlement' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2"><CreditCard className="w-4 h-4 text-burgundy" /> Payment Mode Settlement</h3>
                                <SettlementBar label="Cash Payments" amount={cashRevenue} total={revenue} color="bg-green-500" />
                                <SettlementBar label="Online Payments" amount={onlineRevenue} total={revenue} color="bg-blue-500" />
                                <div className="border-t pt-4 grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 rounded-xl p-4">
                                        <p className="text-xs text-green-600 font-semibold uppercase mb-1">Cash in Hand</p>
                                        <p className="text-xl font-black text-green-700">{formatCurrency(cashRevenue)}</p>
                                        <p className="text-xs text-green-500 mt-1">{cashOrders.length} order{cashOrders.length !== 1 ? 's' : ''}</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-4">
                                        <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Online Settled</p>
                                        <p className="text-xl font-black text-blue-700">{formatCurrency(onlineRevenue)}</p>
                                        <p className="text-xs text-blue-500 mt-1">{onlineOrders.length} order{onlineOrders.length !== 1 ? 's' : ''}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                                <h3 className="font-bold text-gray-800 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-burgundy" /> Order Status Summary</h3>
                                {(['delivered', 'preparing', 'confirmed', 'pending', 'out_for_delivery', 'cancelled'] as const).map(status => {
                                    const count = filtered.filter(o => o.status === status).length;
                                    if (count === 0) return null;
                                    const sColors: Record<string, string> = {
                                        delivered: 'text-green-700 bg-green-50',
                                        preparing: 'text-blue-700 bg-blue-50',
                                        confirmed: 'text-teal-700 bg-teal-50',
                                        pending: 'text-orange-700 bg-orange-50',
                                        out_for_delivery: 'text-purple-700 bg-purple-50',
                                        cancelled: 'text-red-700 bg-red-50',
                                    };
                                    return (
                                        <div key={status} className={`flex justify-between items-center p-3 rounded-xl ${sColors[status]}`}>
                                            <span className="font-semibold capitalize text-sm">{status.replace(/_/g, ' ')}</span>
                                            <span className="font-black">{count} order{count !== 1 ? 's' : ''}</span>
                                        </div>
                                    );
                                })}

                                <div className="border-t pt-4 flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">Total Net Revenue</span>
                                    <span className="font-black text-xl text-burgundy">{formatCurrency(revenue)}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ====== GST TAB ====== */}
                    {activeTab === 'gst' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { label: 'Taxable Value', value: formatCurrency(revenue / (1 + GST_RATE)), color: 'bg-gray-50', text: 'text-gray-800' },
                                    { label: 'CGST @2.5%', value: formatCurrency(gstCollected / 2), color: 'bg-blue-50', text: 'text-blue-800' },
                                    { label: 'SGST @2.5%', value: formatCurrency(gstCollected / 2), color: 'bg-teal-50', text: 'text-teal-800' },
                                ].map(c => (
                                    <div key={c.label} className={`${c.color} rounded-2xl p-5 border border-white shadow-sm`}>
                                        <p className="text-xs uppercase font-semibold text-gray-500 mb-1">{c.label}</p>
                                        <p className={`text-2xl font-black ${c.text}`}>{c.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-800">GST Order-wise Breakout</h3>
                                    <p className="text-xs text-gray-400 mt-0.5">GSTIN: {GSTIN} | Applicable for HSN 9963 (Restaurant Services)</p>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-gray-50 border-b">
                                                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Invoice No</th>
                                                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Date</th>
                                                <th className="p-4 text-left text-xs uppercase font-semibold text-gray-500">Customer</th>
                                                <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">Taxable Amt</th>
                                                <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">CGST @2.5%</th>
                                                <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">SGST @2.5%</th>
                                                <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">Total Tax</th>
                                                <th className="p-4 text-right text-xs uppercase font-semibold text-gray-500">Invoice Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filtered.filter(o => o.status !== 'cancelled').map(order => {
                                                const sub = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
                                                const cgst = Math.round(sub * 0.025 * 100) / 100;
                                                const sgst = cgst;
                                                const total = sub + cgst + sgst + (order.deliveryCharge || 0);
                                                return (
                                                    <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/60">
                                                        <td className="p-4 font-bold text-burgundy">{order.id}</td>
                                                        <td className="p-4 text-gray-600">{formatDate(order.createdAt)}</td>
                                                        <td className="p-4 text-gray-700 font-medium">{order.customerDetails.name}</td>
                                                        <td className="p-4 text-right text-gray-700">{formatCurrency(sub)}</td>
                                                        <td className="p-4 text-right text-blue-600 font-semibold">{formatCurrency(cgst)}</td>
                                                        <td className="p-4 text-right text-teal-600 font-semibold">{formatCurrency(sgst)}</td>
                                                        <td className="p-4 text-right text-gray-800 font-bold">{formatCurrency(cgst + sgst)}</td>
                                                        <td className="p-4 text-right font-black text-gray-800">{formatCurrency(total)}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                        {filtered.filter(o => o.status !== 'cancelled').length > 0 && (
                                            <tfoot>
                                                <tr className="bg-burgundy/5 border-t-2 border-burgundy/20 font-bold">
                                                    <td colSpan={3} className="p-4 text-gray-700">Total</td>
                                                    <td className="p-4 text-right">{formatCurrency(revenue / (1 + GST_RATE))}</td>
                                                    <td className="p-4 text-right text-blue-600">{formatCurrency(gstCollected / 2)}</td>
                                                    <td className="p-4 text-right text-teal-600">{formatCurrency(gstCollected / 2)}</td>
                                                    <td className="p-4 text-right text-burgundy">{formatCurrency(gstCollected)}</td>
                                                    <td className="p-4 text-right text-burgundy font-black text-base">{formatCurrency(revenue)}</td>
                                                </tr>
                                            </tfoot>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                </motion.div>
            </AnimatePresence>

            {/* Invoice Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <InvoiceModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}
