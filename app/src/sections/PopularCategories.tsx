import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Utensils, Soup, Cookie, Coffee, Star, IceCream } from 'lucide-react';
import { categories } from '@/data/menuData';

const iconMap: Record<string, React.ElementType> = {
  Utensils,
  Soup,
  Cookie,
  Coffee,
  Star,
  IceCream,
};

export default function PopularCategories() {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-burgundy/10 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Our Menu
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-4">
            Popular Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse menu featuring authentic South Indian, flavorful Chinese, 
            and delicious snacks prepared with love.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Utensils;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => navigate(`/menu?category=${category.id}`)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-16 h-16 bg-gradient-to-br from-xanthous/20 to-xanthous/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-burgundy transition-colors duration-300"
                  >
                    <IconComponent className="w-8 h-8 text-burgundy group-hover:text-xanthous transition-colors duration-300" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="font-display font-semibold text-burgundy mb-2 group-hover:text-burgundy-light transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="bg-white rounded-3xl shadow-card p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '50+', label: 'Menu Items' },
                { value: '6', label: 'Categories' },
                { value: '13+', label: 'Years Experience' },
                { value: '50K+', label: 'Happy Customers' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <span className="text-3xl lg:text-4xl font-display font-bold text-burgundy">
                    {stat.value}
                  </span>
                  <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
