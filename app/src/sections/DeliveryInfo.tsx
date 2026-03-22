import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Truck, Phone, ArrowRight, Check } from 'lucide-react';
import { deliveryAreas } from '@/data/menuData';

export default function DeliveryInfo() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Home Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-6">
              Fast Delivery to Your Doorstep
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              We deliver hot and fresh food across Kanpur. Enjoy restaurant-quality 
              meals in the comfort of your home.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹500' },
                { icon: Clock, title: 'Quick Delivery', desc: '30-45 minutes average' },
                { icon: MapPin, title: 'Wide Coverage', desc: 'Delivering across Kanpur' },
                { icon: Phone, title: 'Live Tracking', desc: 'Track your order in real-time' },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-burgundy" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-burgundy">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/delivery')}
              className="btn-primary inline-flex items-center gap-2"
            >
              View Delivery Areas
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Right - Delivery Areas */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-cream rounded-3xl p-6 lg:p-8">
              <h3 className="text-xl font-display font-semibold text-burgundy mb-6">
                Delivery Areas in Kanpur
              </h3>
              
              <div className="space-y-3">
                {deliveryAreas.slice(0, 6).map((area, index) => (
                  <motion.div
                    key={area.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center justify-between bg-white rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-burgundy text-sm">{area.name}</p>
                        <p className="text-xs text-gray-500">{area.estimatedTime}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-xanthous">
                      {area.deliveryCharge === 0 ? 'Free' : `₹${area.deliveryCharge}`}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  and many more areas covered...
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
