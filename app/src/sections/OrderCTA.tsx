import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Smartphone, Percent, Clock, Truck } from 'lucide-react';

const benefits = [
  { icon: Percent, text: 'Exclusive Online Discounts' },
  { icon: Clock, text: 'Real-time Order Tracking' },
  { icon: Truck, text: 'Free Delivery on Orders ₹500+' },
  { icon: Smartphone, text: 'Easy Reordering' },
];

export default function OrderCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-burgundy">
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-burgundy to-burgundy-light" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F7B538' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-xanthous/20 text-xanthous text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Order Online
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
              Craving Delicious Food?
              <br />
              <span className="text-xanthous">Order Now!</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg">
              Enjoy our mouth-watering dishes from the comfort of your home. 
              Fast delivery, hot food, and amazing discounts await you!
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-xanthous/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-xanthous" />
                  </div>
                  <span className="text-white/80 text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/menu')}
                className="px-6 py-3 border-2 border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
              >
                Browse Menu
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Phone Frame */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 mx-auto w-72"
              >
                <div className="bg-black rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-cream rounded-[2.5rem] overflow-hidden">
                    {/* Screen Content */}
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-burgundy font-semibold">Vrindas</span>
                        <div className="w-8 h-8 bg-burgundy rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">👤</span>
                        </div>
                      </div>
                      
                      {/* Search */}
                      <div className="bg-white rounded-xl p-2 mb-4 text-xs text-gray-400">
                        Search for dishes...
                      </div>

                      {/* Categories */}
                      <div className="flex gap-2 mb-4">
                        {['All', 'South', 'Chinese'].map((cat, i) => (
                          <div 
                            key={cat}
                            className={`px-3 py-1 rounded-full text-xs ${
                              i === 0 ? 'bg-burgundy text-white' : 'bg-white text-gray-600'
                            }`}
                          >
                            {cat}
                          </div>
                        ))}
                      </div>

                      {/* Food Items */}
                      <div className="space-y-3">
                        {[
                          { name: 'Masala Dosa', price: '₹120', img: '🍛' },
                          { name: 'Veg Manchurian', price: '₹180', img: '🥘' },
                        ].map((item) => (
                          <div key={item.name} className="bg-white rounded-xl p-3 flex items-center gap-3">
                            <div className="w-12 h-12 bg-xanthous/20 rounded-lg flex items-center justify-center text-2xl">
                              {item.img}
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-burgundy">{item.name}</p>
                              <p className="text-xs text-xanthous font-bold">{item.price}</p>
                            </div>
                            <div className="w-6 h-6 bg-burgundy rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">+</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-10 -left-8 bg-white rounded-xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-burgundy">Order Placed!</p>
                    <p className="text-[10px] text-gray-500">Preparing your food</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-20 -right-4 bg-white rounded-xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-xanthous/20 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-burgundy" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-burgundy">On the way!</p>
                    <p className="text-[10px] text-gray-500">Arriving in 25 min</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
