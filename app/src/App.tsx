import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { store } from '@/store';
import { setOrderMode, setTableNumber } from '@/store/cartSlice';
import type { OrderMode } from '@/store/cartSlice';
import { setOrders } from '@/store/ordersSlice';
import { setMenuOverrides } from '@/store/menuSlice';
import { fetchOrders, fetchMenuOverrides } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartWidget from '@/components/CartWidget';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Checkout from '@/pages/Checkout';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Delivery from '@/pages/Delivery';
import Gallery from '@/pages/Gallery';
import AdminLayout from '@/pages/admin/AdminLayout';
import DashboardOverview from '@/pages/admin/DashboardOverview';
import MenuManagement from '@/pages/admin/MenuManagement';
import OrderManagement from '@/pages/admin/OrderManagement';
import CustomerManagement from '@/pages/admin/CustomerManagement';
import QRCodeGenerator from '@/pages/admin/QRCodeGenerator';
import AccountsBilling from '@/pages/admin/AccountsBilling';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Page wrapper for animations
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Parse QR Code URL Parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode') as OrderMode;
    const table = searchParams.get('table');

    if (mode && ['dine-in', 'pickup', 'delivery'].includes(mode)) {
      dispatch(setOrderMode(mode));
    }
    if (table) {
      dispatch(setTableNumber(table));
    }
  }, [location.search, dispatch]);

  // Sync orders & menu from Neon DB on load
  useEffect(() => {
    // 1. Fetch Orders
    fetchOrders()
      .then(orders => {
        if (orders && orders.length > 0) {
          dispatch(setOrders(orders));
        }
      })
      .catch(err => console.warn('Neon DB Sync (Orders): skipping initial fetch:', err.message));

    // 2. Fetch Menu Overrides
    fetchMenuOverrides()
      .then(overrides => {
        if (overrides && overrides.length > 0) {
          dispatch(setMenuOverrides(overrides));
        }
      })
      .catch(err => console.warn('Neon DB Sync (Menu): skipping initial fetch:', err.message));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-cream">
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname.split('/')[1]}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/menu" element={<PageWrapper><Menu /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/delivery" element={<PageWrapper><Delivery /></PageWrapper>} />
          <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="billing" element={<AccountsBilling />} />
            <Route path="users" element={<CustomerManagement />} />
            <Route path="qr-codes" element={<QRCodeGenerator />} />
          </Route>
        </Routes>
      </AnimatePresence>
      {!isAdminPage && <CartWidget />}
      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
