import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Check, 
  ArrowRight,
  Package,
  Phone,
  Star,
  Shield
} from 'lucide-react';
import { deliveryAreas } from '@/data/menuData';

const deliveryFeatures = [
  { icon: Truck, title: 'Fast Delivery', description: '30-45 minutes average delivery time' },
  { icon: Shield, title: 'Safe Packaging', description: 'Hygienic and secure food packaging' },
  { icon: Clock, title: 'Real-time Tracking', description: 'Track your order status live' },
  { icon: Star, title: 'Hot & Fresh', description: 'Food delivered hot and fresh every time' },
];

const howItWorks = [
  { step: 1, title: 'Place Order', description: 'Browse menu and add items to cart' },
  { step: 2, title: 'We Prepare', description: 'Our chefs prepare your food with care' },
  { step: 3, title: 'Quick Delivery', description: 'Delivery partner picks up your order' },
  { step: 4, title: 'Enjoy!', description: 'Receive hot and fresh food at your doorstep' },
];

export default function Delivery() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Delivery Information | Vrindas Restaurant Kanpur";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Fast home delivery from Vrindas Restaurant in Kanpur. Free delivery on orders above ₹500. We deliver across Shivala, Patkapur, Civil Lines, and more areas.');
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-16 bg-cream"
    >
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-burgundy">
          <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-burgundy to-burgundy-light opacity-90" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="inline-block bg-xanthous/20 text-xanthous text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Home Delivery
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
                Fast Delivery to Your Doorstep
              </h1>
              <p className="text-white/80 text-lg mb-8">
                Enjoy restaurant-quality food in the comfort of your home. 
                We deliver hot, fresh, and delicious vegetarian food across Kanpur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/order')}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <a
                  href="tel:+919876543210"
                  className="px-6 py-3 border-2 border-white text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white hover:text-burgundy transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call to Order
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-xanthous rounded-2xl flex items-center justify-center">
                      <Truck className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Average Delivery Time</p>
                      <p className="text-white text-3xl font-bold">30-45 min</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white/80">
                      <Check className="w-5 h-5 text-xanthous" />
                      <span>Free delivery on orders above ₹500</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Check className="w-5 h-5 text-xanthous" />
                      <span>Live order tracking</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Check className="w-5 h-5 text-xanthous" />
                      <span>Hot & fresh packaging</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-burgundy/10 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Why Choose Our Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy">
              Delivery You Can Trust
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-16 h-16 bg-burgundy/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-burgundy" />
                </div>
                <h3 className="text-lg font-display font-semibold text-burgundy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy">
              How It Works
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-cream rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-burgundy text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-display font-semibold text-burgundy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {step.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-burgundy/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-burgundy/10 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Coverage Areas
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy mb-4">
                Areas We Deliver To
              </h2>
              <p className="text-gray-600 mb-8">
                We deliver across major areas in Kanpur. Check if we deliver to your location.
              </p>

              <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                <div className="grid grid-cols-3 gap-4 p-4 bg-burgundy text-white text-sm font-medium">
                  <span>Area</span>
                  <span className="text-center">Time</span>
                  <span className="text-right">Charge</span>
                </div>
                <div className="divide-y divide-gray-100">
                  {deliveryAreas.map((area, index) => (
                    <motion.div
                      key={area.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-3 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-burgundy" />
                        <span className="text-sm font-medium text-burgundy">{area.name}</span>
                      </div>
                      <span className="text-center text-sm text-gray-600">{area.estimatedTime}</span>
                      <span className={`text-right text-sm font-medium ${area.deliveryCharge === 0 ? 'text-green-600' : 'text-gray-600'}`}>
                        {area.deliveryCharge === 0 ? 'Free' : `₹${area.deliveryCharge}`}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-burgundy rounded-3xl p-8 h-full">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  Delivery Information
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-xanthous" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Minimum Order</h4>
                      <p className="text-white/70 text-sm">₹200 for delivery orders</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-6 h-6 text-xanthous" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Free Delivery</h4>
                      <p className="text-white/70 text-sm">On all orders above ₹500</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-xanthous" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Delivery Hours</h4>
                      <p className="text-white/70 text-sm">10:00 AM - 10:30 PM daily</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-xanthous" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Need Help?</h4>
                      <p className="text-white/70 text-sm">Call us at +91 98765 43210</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/order')}
                    className="w-full bg-xanthous text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-xanthous-light transition-colors"
                  >
                    Order Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
