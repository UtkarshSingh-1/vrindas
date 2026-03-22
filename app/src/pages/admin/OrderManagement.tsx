import { useState } from 'react';
import { Search, Eye, FileText, X, Printer } from 'lucide-react';
import type { Order, OrderStatus } from '@/types';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus } from '@/store/ordersSlice';
import type { RootState } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import { updateOrderStatusAPI } from '@/lib/api';

const GSTIN = '09AABFV1234A1Z5';
const FSSAI_NO = '10020042013000';
const RESTAURANT_ADDRESS = 'Shivala Rd, Khas Bazar, Shivala, Patkapur, Kanpur, UP 208001';

function formatDate(iso: string) {
    try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch { return iso; }
}
function formatCurrency(n: number) {
    return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Invoice Print Modal ──
function InvoiceModal({ order, onClose }: { order: Order; onClose: () => void }) {
    const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);
    const cgst = Math.round(subtotal * 0.025 * 100) / 100;
    const sgst = cgst;
    const grandTotal = subtotal + cgst + sgst + (order.deliveryCharge || 0);

    const handlePrint = () => {
        const content = document.getElementById('invoice-print-area')?.innerHTML || '';
        const win = window.open('', '_blank');
        if (!win) return;
        win.document.write(`<html><head><title>Invoice ${order.id}</title>
        <style>body{font-family:Arial,sans-serif;padding:32px;color:#333}
        h1{font-size:22px;font-weight:bold;color:#7a1a2e}
        table{width:100%;border-collapse:collapse;margin:12px 0}
        th,td{padding:8px 10px;text-align:left;border-bottom:1px solid #eee}
        th{background:#f5f5f5;font-size:11px;text-transform:uppercase}
        .text-right{text-align:right}.flex{display:flex;justify-content:space-between}
        .totals{max-width:280px;margin-left:auto;margin-top:16px}
        .totals div{display:flex;justify-content:space-between;padding:4px 0;font-size:13px}
        .grand{font-weight:bold;font-size:15px;color:#7a1a2e;border-top:2px solid #7a1a2e;padding-top:8px}
        .footer{margin-top:24px;border-top:1px solid #eee;padding-top:12px;text-align:center;font-size:11px;color:#999}
        </style></head><body>${content}</body></html>`);
        win.document.close();
        win.print();
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <h3 className="font-bold text-gray-800">Invoice #{order.id}</h3>
                    <div className="flex gap-2">
                        <button onClick={handlePrint}
                            className="flex items-center gap-1.5 px-3 py-2 bg-burgundy text-white text-sm font-semibold rounded-lg hover:bg-burgundy/90 transition">
                            <Printer className="w-4 h-4" /> Print / PDF
                        </button>
                        <button onClick={onClose} className="px-2 text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
                    </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    <div id="invoice-print-area">
                        <div className="flex justify-between border-b-2 border-gray-700 pb-4 mb-4">
                            <div>
                                <h1 className="text-xl font-bold text-burgundy">VRINDAS</h1>
                                <p className="text-xs text-gray-500">{RESTAURANT_ADDRESS}</p>
                                <p className="text-xs text-gray-500">GSTIN: {GSTIN} | FSSAI: {FSSAI_NO}</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-burgundy text-white text-xs px-2 py-0.5 rounded-full font-semibold">TAX INVOICE</span>
                                <p className="text-sm font-bold mt-1">#{order.id}</p>
                                <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                                <p className={`text-xs font-bold mt-1 ${order.paymentStatus === 'completed' ? 'text-green-600' : 'text-orange-500'}`}>
                                    {order.paymentStatus === 'completed' ? '✓ PAID' : '⏳ PENDING'}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Bill To</p>
                                <p className="font-bold text-gray-800">{order.customerDetails.name}</p>
                                <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                                <p className="text-sm text-gray-600">{order.customerDetails.city}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Order Info</p>
                                <p className="text-sm"><span className="text-gray-500">Method:</span> <strong>{order.paymentMethod === 'cod' ? 'Cash' : 'Online'}</strong></p>
                                <p className="text-sm"><span className="text-gray-500">Status:</span> <strong className="capitalize">{order.status.replace(/_/g, ' ')}</strong></p>
                            </div>
                        </div>
                        <table className="w-full text-sm border-collapse mb-4">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2 text-left text-xs uppercase">#</th>
                                    <th className="p-2 text-left text-xs uppercase">Item</th>
                                    <th className="p-2 text-center text-xs uppercase">Qty</th>
                                    <th className="p-2 text-right text-xs uppercase">Rate</th>
                                    <th className="p-2 text-right text-xs uppercase">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, i) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="p-2 text-gray-400">{i + 1}</td>
                                        <td className="p-2 font-medium">{item.name}</td>
                                        <td className="p-2 text-center">{item.quantity}</td>
                                        <td className="p-2 text-right text-gray-600">{formatCurrency(item.price)}</td>
                                        <td className="p-2 text-right font-semibold">{formatCurrency(item.price * item.quantity)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end">
                            <div className="w-60 space-y-1.5 bg-gray-50 rounded-xl p-4">
                                {[['Subtotal', formatCurrency(subtotal)], ['CGST @2.5%', formatCurrency(cgst)], ['SGST @2.5%', formatCurrency(sgst)], ...(order.deliveryCharge > 0 ? [['Delivery', formatCurrency(order.deliveryCharge)]] : [])].map(([k, v]) => (
                                    <div key={k} className="flex justify-between text-sm text-gray-600"><span>{k}</span><span>{v}</span></div>
                                ))}
                                <div className="border-t border-gray-300 pt-2 flex justify-between font-bold text-burgundy">
                                    <span>Grand Total</span><span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 pt-4 border-t text-center text-xs text-gray-400">
                            <p>Thank you for dining with Vrindas! | Computer-generated invoice, no signature required.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Order Detail Modal ──
function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
    const statusColors: Record<string, string> = {
        delivered: 'bg-green-100 text-green-700',
        pending: 'bg-orange-100 text-orange-700',
        preparing: 'bg-blue-100 text-blue-700',
        confirmed: 'bg-teal-100 text-teal-700',
        out_for_delivery: 'bg-purple-100 text-purple-700',
        cancelled: 'bg-red-100 text-red-700',
    };
    const subtotal = order.items.reduce((s, i) => s + i.price * i.quantity, 0);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b bg-gray-50">
                    <div>
                        <h3 className="font-bold text-gray-800">Order #{order.id}</h3>
                        <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
                    {/* Status badge */}
                    <span className={`inline-block text-xs px-3 py-1.5 rounded-full font-semibold capitalize ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}>
                        {order.status.replace(/_/g, ' ')}
                    </span>

                    {/* Customer */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Customer Details</p>
                        <p className="font-bold text-gray-800">{order.customerDetails.name}</p>
                        <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                        {order.customerDetails.address && <p className="text-sm text-gray-600">{order.customerDetails.address}</p>}
                        <p className="text-sm text-gray-600">{order.customerDetails.city} {order.customerDetails.pincode}</p>
                    </div>

                    {/* Items */}
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Items Ordered</p>
                        <div className="space-y-2">
                            {order.items.map(item => (
                                <div key={item.id} className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2.5">
                                    <div className="flex items-center gap-3">
                                        {item.image && <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover" />}
                                        <span className="font-medium text-gray-800 text-sm">{item.quantity}× {item.name}</span>
                                    </div>
                                    <span className="font-bold text-gray-700 text-sm">{formatCurrency(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="bg-burgundy/5 border border-burgundy/20 rounded-xl p-4 space-y-1.5">
                        <div className="flex justify-between text-sm text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
                        <div className="flex justify-between text-sm text-gray-600"><span>GST (5%)</span><span>{formatCurrency(order.gstAmount)}</span></div>
                        {order.deliveryCharge > 0 && <div className="flex justify-between text-sm text-gray-600"><span>Delivery</span><span>{formatCurrency(order.deliveryCharge)}</span></div>}
                        <div className="border-t border-burgundy/20 pt-2 flex justify-between font-bold text-burgundy">
                            <span>Total</span><span>{formatCurrency(order.totalAmount)}</span>
                        </div>
                        <p className="text-xs text-gray-500">Payment: <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</strong> · <span className={order.paymentStatus === 'completed' ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>{order.paymentStatus}</span></p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// ── Main Component ──
export default function OrderManagement() {
    const orders = useSelector((state: RootState) => state.orders.list);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [viewOrder, setViewOrder] = useState<Order | null>(null);
    const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerDetails.phone.includes(searchTerm)
    );

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
        // Sync to Neon DB (non-blocking)
        updateOrderStatusAPI(orderId, newStatus)
            .catch(err => console.warn('DB status sync skipped:', err.message));
    };

    const statusColors: Record<string, string> = {
        pending: 'bg-orange-100 text-orange-700',
        confirmed: 'bg-blue-100 text-blue-700',
        preparing: 'bg-yellow-100 text-yellow-700',
        out_for_delivery: 'bg-purple-100 text-purple-700',
        delivered: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700',
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Customer Name, or Phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
                    />
                    {searchTerm && <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50/60 transition-colors">
                                    <td className="p-4 font-bold text-burgundy">{order.id}</td>
                                    <td className="p-4">
                                        <p className="font-semibold text-gray-800 text-sm">{order.customerDetails.name}</p>
                                        <p className="text-xs text-gray-400">{order.customerDetails.phone}</p>
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">{formatDate(order.createdAt)}</td>
                                    <td className="p-4 font-bold text-gray-800">₹{order.totalAmount}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide cursor-pointer outline-none border-0 ${statusColors[order.status] || 'bg-gray-100 text-gray-600'}`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="preparing">Preparing</option>
                                            <option value="out_for_delivery">Out for Delivery</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => setViewOrder(order)}
                                            title="View Order Details"
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setInvoiceOrder(order)}
                                            title="Generate Invoice"
                                            className="p-2 text-burgundy hover:bg-burgundy/10 rounded-lg transition-colors"
                                        >
                                            <FileText className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredOrders.length === 0 && (
                                <tr><td colSpan={6} className="p-12 text-center text-gray-400">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {viewOrder && <OrderDetailModal order={viewOrder} onClose={() => setViewOrder(null)} />}
                {invoiceOrder && <InvoiceModal order={invoiceOrder} onClose={() => setInvoiceOrder(null)} />}
            </AnimatePresence>
        </div>
    );
}
