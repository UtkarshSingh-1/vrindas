import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Utensils,
    ShoppingBag,
    Users,
    LogOut,
    QrCode,
    IndianRupee
} from 'lucide-react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

export default function AdminLayout() {
    const { items: menuList } = useSelector((state: RootState) => state.menu);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('vrindas_admin_session') === 'true';
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Admin Dashboard | Vrindas Restaurant";
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@vrindas.com' && password === 'admin123') {
            localStorage.setItem('vrindas_admin_session', 'true');
            setIsLoggedIn(true);
            navigate('/admin');
        } else {
            alert('Invalid credentials. Use admin@vrindas.com / admin123');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('vrindas_admin_session');
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
    };

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/menu', label: 'Menu Management', icon: Utensils },
        { path: '/admin/orders', label: 'Order Management', icon: ShoppingBag },
        { path: '/admin/billing', label: 'Accounts & Billing', icon: IndianRupee },
        { path: '/admin/users', label: 'Customers', icon: Users },
        { path: '/admin/qr-codes', label: 'Table QR Codes', icon: QrCode },
    ];

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
                        <h1 className="text-3xl font-display font-bold text-burgundy mb-2">VRINDAS</h1>
                        <p className="text-gray-500">Admin Dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all" placeholder="admin@vrindas.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all" placeholder="••••••••" />
                        </div>
                        <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full btn-primary">Login</motion.button>
                    </form>
                    <p className="text-center text-gray-400 text-sm mt-6">Demo: admin@vrindas.com / admin123</p>
                </motion.div>
            </motion.main>
        );
    }

    const currentNavItem = navItems.find((item) => item.path === location.pathname) ?? navItems[0];

    return (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-cream flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 bg-burgundy lg:min-h-screen lg:fixed lg:left-0 lg:top-0 lg:bottom-0 z-10 flex flex-col hidden lg:flex">
                <div className="p-6 flex-1">
                    <h1 className="text-2xl font-display font-bold text-xanthous mb-8">VRINDAS Admin</h1>
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-xanthous text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="p-6 border-t border-white/10">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5" /> Logout
                    </button>
                </div>
            </div>

            {/* Mobile Topbar */}
            <div className="lg:hidden sticky top-0 z-20 bg-burgundy shadow-lg">
                <div className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <h1 className="text-xl font-display font-bold text-xanthous">VRINDAS Admin</h1>
                        <p className="text-xs text-white/70 truncate">{currentNavItem.label}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="shrink-0 rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        aria-label="Logout from admin"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                <nav className="px-4 pb-4 overflow-x-auto">
                    <div className="flex gap-2 min-w-max">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                                    location.pathname === item.path
                                        ? 'bg-xanthous text-black'
                                        : 'bg-white/10 text-white/80 hover:bg-white/15 hover:text-white'
                                }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 lg:ml-64 p-4 lg:p-8 overflow-y-auto overflow-x-hidden">
                <Outlet context={{ menuList }} />
            </div>
        </motion.main>
    );
}
