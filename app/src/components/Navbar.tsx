import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  Menu,
  X,
  ShoppingCart,
  Phone,
  User,
  Home,
  UtensilsCrossed,
  Info,
  MapPin,
  Truck,
  Image as ImageIcon
} from 'lucide-react';
import type { RootState } from '@/store';

const navLinks = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Menu', path: '/menu', icon: UtensilsCrossed },
  { name: 'Checkout', path: '/checkout', icon: ShoppingCart },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Gallery', path: '/gallery', icon: ImageIcon },
  { name: 'Delivery', path: '/delivery', icon: Truck },
  { name: 'Contact', path: '/contact', icon: MapPin },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartItemCount = useSelector((state: RootState) => state.cart.itemCount);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-burgundy/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
          }`}
      >
        {/* Top Bar */}
        <div className={`bg-xanthous text-black py-1.5 px-4 transition-all duration-300 ${isScrolled ? 'hidden' : 'block'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center text-xs sm:text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-burgundy transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+91 98765 43210</span>
              </a>
              <span className="hidden md:inline text-burgundy/50">|</span>
              <span className="hidden md:inline">Open: 10:00 AM - 11:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">Pure Veg | Family Restaurant</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-burgundy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <span className="text-2xl lg:text-3xl font-display font-bold text-xanthous">
                    VRINDAS
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-xanthous/50 rounded-full" />
                </motion.div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isActive(link.path)
                        ? 'text-xanthous'
                        : 'text-white/90 hover:text-xanthous'
                      }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-xanthous rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-3">
                {/* Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/checkout')}
                  className="relative p-2 text-white hover:text-xanthous transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6" />
                  {cartItemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-xanthous text-black text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {cartItemCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* Admin Login */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/admin')}
                  className="hidden sm:flex p-2 text-white hover:text-xanthous transition-colors"
                >
                  <User className="w-5 h-5 lg:w-6 lg:h-6" />
                </motion.button>

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-white hover:text-xanthous transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[64px] lg:top-[80px] z-40 bg-burgundy/98 backdrop-blur-lg lg:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive(link.path)
                        ? 'bg-xanthous/20 text-xanthous'
                        : 'text-white/90 hover:bg-white/10 hover:text-xanthous'
                      }`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-4 border-t border-white/10"
              >
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 px-4 py-3 text-xanthous"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+91 98765 43210</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
