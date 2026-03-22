import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  Heart
} from 'lucide-react';
import { restaurantInfo } from '@/data/menuData';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Order Online', path: '/order' },
  { name: 'About Us', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const cuisineLinks = [
  { name: 'South Indian', path: '/menu?category=south-indian' },
  { name: 'Chinese', path: '/menu?category=chinese' },
  { name: 'Snacks', path: '/menu?category=snacks' },
  { name: 'Beverages', path: '/menu?category=beverages' },
  { name: 'Combos', path: '/menu?category=combos' },
  { name: 'Desserts', path: '/menu?category=desserts' },
];

export default function Footer() {
  return (
    <footer className="bg-burgundy text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="inline-block">
                <span className="text-3xl font-display font-bold text-xanthous">
                  VRINDAS
                </span>
              </Link>
              <p className="mt-4 text-white/70 text-sm leading-relaxed">
                Pure Veg Family Restaurant serving authentic South Indian and Chinese cuisine in Kanpur since 2010.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={restaurantInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-xanthous hover:text-black transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={restaurantInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-xanthous hover:text-black transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href={restaurantInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-xanthous hover:text-black transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-xanthous mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-xanthous transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Cuisine Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-xanthous mb-4">Our Cuisine</h3>
              <ul className="space-y-2">
                {cuisineLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-xanthous transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-xanthous mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-xanthous flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    {restaurantInfo.address.street},<br />
                    {restaurantInfo.address.city}, {restaurantInfo.address.state} {restaurantInfo.address.pincode}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-xanthous flex-shrink-0" />
                  <a 
                    href={`tel:${restaurantInfo.contact.phone}`}
                    className="text-white/70 hover:text-xanthous transition-colors text-sm"
                  >
                    {restaurantInfo.contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-xanthous flex-shrink-0" />
                  <a 
                    href={`mailto:${restaurantInfo.contact.email}`}
                    className="text-white/70 hover:text-xanthous transition-colors text-sm"
                  >
                    {restaurantInfo.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-xanthous flex-shrink-0" />
                  <span className="text-white/70 text-sm">
                    {restaurantInfo.hours.open} - {restaurantInfo.hours.close}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              &copy; {new Date().getFullYear()} Vrindas Restaurant. All rights reserved.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-xanthous fill-xanthous" /> in Kanpur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
