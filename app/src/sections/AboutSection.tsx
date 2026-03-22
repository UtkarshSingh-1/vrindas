import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Award, Users, Clock, Leaf } from 'lucide-react';
import { restaurantInfo } from '@/data/menuData';

const features = [
  { icon: Leaf, title: '100% Pure Veg', description: 'Authentic vegetarian cuisine' },
  { icon: Award, title: 'Quality Assured', description: 'Best ingredients only' },
  { icon: Users, title: 'Family Friendly', description: 'Perfect for all ages' },
  { icon: Clock, title: 'Since 2010', description: '13+ years of excellence' },
];

const highlights = [
  'Authentic South Indian recipes',
  'Fresh ingredients daily',
  'Hygienic kitchen standards',
  'Experienced chefs',
  'Family-friendly atmosphere',
  'Affordable pricing',
];

export default function AboutSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-xanthous/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-burgundy/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/images/about-main.jpg"
                  alt="Vrindas Restaurant Interior"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 -right-8 w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-20"
              >
                <img
                  src="/images/about-secondary.jpg"
                  alt="Delicious Food"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -left-6 bg-burgundy text-white rounded-2xl p-4 lg:p-6 shadow-xl z-20"
              >
                <span className="text-3xl lg:text-4xl font-display font-bold text-xanthous">
                  {new Date().getFullYear() - restaurantInfo.established}+
                </span>
                <p className="text-sm text-white/80">Years of<br />Excellence</p>
              </motion.div>

              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-xanthous/20 rounded-3xl -z-10" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Label */}
            <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              About Us
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-6">
              Serving Love on a Plate Since {restaurantInfo.established}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {restaurantInfo.description}
            </p>

            <p className="text-gray-600 leading-relaxed mb-8">
              Our journey began with a simple mission - to serve delicious, hygienic, and 
              wholesome vegetarian food that brings families together. Today, we are proud 
              to be one of Kanpur&apos;s most loved vegetarian restaurants.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 bg-xanthous/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-burgundy" />
                  </div>
                  <span className="text-sm text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
              className="btn-primary inline-flex items-center gap-2"
            >
              Know More About Us
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Features Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 lg:mt-24"
        >
          <div className="bg-burgundy rounded-3xl p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 bg-xanthous/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-7 h-7 text-xanthous" />
                  </div>
                  <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
