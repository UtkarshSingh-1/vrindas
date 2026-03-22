import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, Plus, ArrowRight } from 'lucide-react';
import { addToCart } from '@/store/cartSlice';
import { menuItems } from '@/data/menuData';
import type { MenuItem } from '@/types';

const featuredItems = menuItems.filter(item => 
  ['si-1', 'ch-4', 'cb-1', 'ds-1'].includes(item.id)
);

function DishCard({ item, index }: { item: MenuItem; index: number }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={() => navigate('/menu')}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Veg Indicator */}
        <div className="absolute top-3 left-3">
          <div className="veg-indicator" />
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-xanthous fill-xanthous" />
          <span className="text-xs font-semibold text-burgundy">{item.rating}</span>
        </div>

        {/* Add Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-10 h-10 bg-xanthous rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Plus className="w-5 h-5 text-black" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-burgundy mb-1 group-hover:text-burgundy-light transition-colors">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-burgundy">
            ₹{item.price}
          </span>
          <span className="text-xs text-gray-400">
            {item.reviews} reviews
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedDishes() {
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
          <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Customer Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-4">
            Featured Dishes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved dishes, crafted with passion and served with love. 
            Each bite is a journey of flavors.
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <DishCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/menu')}
            className="btn-primary inline-flex items-center gap-2"
          >
            View Full Menu
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
