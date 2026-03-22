import { motion } from 'framer-motion';
import { 
  Leaf, 
  ShieldCheck, 
  Truck, 
  ChefHat, 
  Heart, 
  Clock,
  Sparkles,
  Award
} from 'lucide-react';

const reasons = [
  {
    icon: Leaf,
    title: '100% Pure Vegetarian',
    description: 'We serve only pure vegetarian food with no compromise on quality. Jain options available.',
    color: 'from-green-500/20 to-green-500/5',
  },
  {
    icon: ShieldCheck,
    title: 'Hygienic Kitchen',
    description: 'Our kitchen follows strict hygiene protocols and regular quality checks.',
    color: 'from-blue-500/20 to-blue-500/5',
  },
  {
    icon: ChefHat,
    title: 'Expert Chefs',
    description: 'Our experienced chefs bring authentic flavors with years of expertise.',
    color: 'from-orange-500/20 to-orange-500/5',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Hot and fresh food delivered to your doorstep within 30-45 minutes.',
    color: 'from-purple-500/20 to-purple-500/5',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every dish is prepared with care and attention to detail.',
    color: 'from-red-500/20 to-red-500/5',
  },
  {
    icon: Clock,
    title: 'Fresh Daily',
    description: 'We use only fresh ingredients sourced daily from local markets.',
    color: 'from-yellow-500/20 to-yellow-500/5',
  },
  {
    icon: Sparkles,
    title: 'Authentic Recipes',
    description: 'Traditional recipes passed down through generations of culinary expertise.',
    color: 'from-pink-500/20 to-pink-500/5',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized as one of the best vegetarian restaurants in Kanpur.',
    color: 'from-xanthous/40 to-xanthous/10',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-64 h-64 bg-xanthous/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-burgundy/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-burgundy/10 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-4">
            The Vrindas Difference
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We go above and beyond to ensure every dining experience is memorable. 
            Here&apos;s what sets us apart from the rest.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 h-full shadow-card hover:shadow-card-hover transition-all duration-300">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="w-7 h-7 text-burgundy" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg text-burgundy mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-card">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-burgundy/10 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-burgundy">{i}K</span>
                </div>
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              Join <span className="font-semibold text-burgundy">50,000+</span> happy customers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
