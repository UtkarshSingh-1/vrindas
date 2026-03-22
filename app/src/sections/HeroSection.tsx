import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Utensils, Phone, Star, Clock } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy/95 via-burgundy/85 to-burgundy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/50 via-transparent to-burgundy/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 30, repeat: Infinity, ease: 'linear' }
          }}
          className="absolute -top-20 -right-20 w-96 h-96 border border-xanthous/10 rounded-full"
        />
        <motion.div
          animate={{
            rotate: -360,
            transition: { duration: 25, repeat: Infinity, ease: 'linear' }
          }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] border border-xanthous/5 rounded-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-xanthous/20 backdrop-blur-sm border border-xanthous/30 rounded-full px-4 py-2 mb-6"
            >
              <Star className="w-4 h-4 text-xanthous fill-xanthous" />
              <span className="text-xanthous text-sm font-medium">Kanpur&apos;s Favorite Veg Restaurant</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-4"
            >
              <span className="text-gradient-gold">VRINDAS</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl sm:text-2xl text-white/90 font-medium mb-4"
            >
              Pure Veg Family Restaurant in Kanpur
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-white/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Experience the authentic flavors of South Indian and Chinese cuisine.
              Fresh, hygienic, and delicious vegetarian food for the whole family.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/order')}
                className="btn-primary flex items-center justify-center gap-2 text-base"
              >
                <Utensils className="w-5 h-5" />
                Order Now
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/menu')}
                className="btn-secondary flex items-center justify-center gap-2 text-base"
              >
                View Menu
              </motion.button>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-10"
            >
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-white/80 hover:text-xanthous transition-colors"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-sm">+91 98765 43210</span>
              </a>
              <div className="flex items-center gap-2 text-white/80">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-sm">10 AM - 11 PM</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative z-10"
              >
                <img
                  src="/images/hero-food.png"
                  alt="Delicious South Indian Food"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute top-10 -left-4 bg-white rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                  <div>
                    <p className="font-semibold text-burgundy">100% Pure Veg</p>
                    <p className="text-xs text-gray-500">No onion, No garlic options</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-20 -right-4 bg-white rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-xanthous/20 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-xanthous fill-xanthous" />
                  </div>
                  <div>
                    <p className="font-semibold text-burgundy">4.8 Rating</p>
                    <p className="text-xs text-gray-500">2000+ Reviews</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute top-1/2 -right-8 bg-white rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-burgundy" />
                  </div>
                  <div>
                    <p className="font-semibold text-burgundy">Fast Delivery</p>
                    <p className="text-xs text-gray-500">30-45 mins</p>
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
