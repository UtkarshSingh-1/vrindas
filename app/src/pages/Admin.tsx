import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Utensils,
  ShoppingBag,
  Users,
  DollarSign,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  TrendingUp,
  Clock,
  CheckCircle,
  QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { menuItems } from '@/data/menuData';
import type { MenuItem, Order, OrderStatus } from '@/types';

// Mock data for dashboard
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
    createdAt: '2024-01-20',
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
    createdAt: '2024-01-21',
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
    createdAt: '2024-01-21',
  },
];

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-orange-100 text-orange-700',
  out_for_delivery: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'orders' | 'users' | 'qr-codes'>('dashboard');
  const [menuList, setMenuList] = useState<MenuItem[]>(menuItems);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableInput, setTableInput] = useState('');
  const [generatedTable, setGeneratedTable] = useState('');

  useEffect(() => {
    document.title = "Admin Dashboard | Vrindas Restaurant";
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, validate against backend
    if (email === 'admin@vrindas.com' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use admin@vrindas.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const deleteMenuItem = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuList(menuList.filter(item => item.id !== id));
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-cream flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl shadow-card p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-burgundy mb-2">
              VRINDAS
            </h1>
            <p className="text-gray-500">Admin Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                placeholder="admin@vrindas.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary"
            >
              Login
            </motion.button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Demo: admin@vrindas.com / admin123
          </p>
        </motion.div>
      </motion.main>
    );
  }

  // Dashboard Stats
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount + order.deliveryCharge + order.gstAmount, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-cream"
    >
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-burgundy hidden lg:block">
        <div className="p-6">
          <h1 className="text-2xl font-display font-bold text-xanthous mb-8">
            VRINDAS
          </h1>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'menu', label: 'Menu Management', icon: Utensils },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'users', label: 'Customers', icon: Users },
              { id: 'qr-codes', label: 'QR Codes', icon: QrCode },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === item.id
                  ? 'bg-xanthous text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </motion.button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-burgundy p-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold text-xanthous">VRINDAS Admin</h1>
        <button onClick={handleLogout} className="text-white/70">
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-display font-bold text-burgundy mb-6">
              Dashboard Overview
            </h2>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12%' },
                { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingBag, trend: '+8%' },
                { label: 'Pending Orders', value: pendingOrders.toString(), icon: Clock, trend: '-3%' },
                { label: 'Delivered', value: deliveredOrders.toString(), icon: CheckCircle, trend: '+15%' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-burgundy mt-1">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 bg-burgundy/10 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-burgundy" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-4">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-500 text-sm">{stat.trend}</span>
                    <span className="text-gray-400 text-sm">vs last month</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-display font-semibold text-burgundy">
                  Recent Orders
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-burgundy">{order.id}</td>
                        <td className="px-6 py-4">{order.customerDetails.name}</td>
                        <td className="px-6 py-4">₹{order.totalAmount + order.deliveryCharge + order.gstAmount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Management */}
        {activeTab === 'menu' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-burgundy">
                Menu Management
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Add item feature coming soon!')}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </motion.button>
            </div>

            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {menuList
                      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                              <span className="font-medium text-burgundy">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 capitalize">{item.category.replace('-', ' ')}</td>
                          <td className="px-6 py-4">₹{item.price}</td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                              {item.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => alert('Edit feature coming soon!')}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteMenuItem(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-display font-bold text-burgundy mb-6">
              Order Management
            </h2>

            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-burgundy">{order.id}</td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{order.customerDetails.name}</p>
                            <p className="text-sm text-gray-500">{order.customerDetails.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">{order.items.length} items</td>
                        <td className="px-6 py-4">₹{order.totalAmount + order.deliveryCharge + order.gstAmount}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                            {statusLabels[order.status]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-burgundy outline-none"
                          >
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-display font-bold text-burgundy mb-6">
              Customer Management
            </h2>

            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
              <div className="w-20 h-20 bg-burgundy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-burgundy" />
              </div>
              <h3 className="text-xl font-display font-semibold text-burgundy mb-2">
                Coming Soon
              </h3>
              <p className="text-gray-500">
                Customer management features will be available in the next update.
              </p>
            </div>
          </motion.div>
        )}

        {/* QR Codes Generator */}
        {activeTab === 'qr-codes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-display font-bold text-burgundy mb-6">
              Table QR Codes
            </h2>

            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 max-w-3xl">
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Table Number</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Enter table number (e.g. 5)"
                    value={tableInput}
                    onChange={(e) => setTableInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy outline-none"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      if (tableInput) setGeneratedTable(tableInput);
                    }}
                    className="btn-primary h-[50px] px-6 w-full sm:w-auto"
                  >
                    Generate QR
                  </button>
                </div>
              </div>

              {generatedTable && (
                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-cream">
                  <div className="bg-white p-4 shadow-sm rounded-xl mb-6 relative group" id="qr-code-view">
                    <QRCodeSVG
                      value={`https://vrindas.com/?mode=dine-in&table=${generatedTable}`}
                      size={240}
                      level="H"
                      includeMargin={true}
                    />
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <span className="bg-burgundy px-4 py-2 font-bold text-lg rounded-full shadow-lg text-white">Table {generatedTable}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-burgundy mb-2">Table {generatedTable}</h3>
                  <p className="text-sm text-gray-500 mb-6 font-mono text-center break-all max-w-sm">
                    https://vrindas.com/?mode=dine-in&amp;table={generatedTable}
                  </p>

                  <div className="flex gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => window.print()}
                      className="px-8 py-3 bg-burgundy text-white font-semibold rounded-full hover:bg-burgundy/90 transition-colors flex items-center justify-center gap-2 w-full"
                    >
                      <QrCode className="w-5 h-5" />
                      Print QR Code
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}
