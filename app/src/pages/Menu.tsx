import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Search, Plus, Minus, Star, ShoppingCart } from 'lucide-react';
import { addToCart } from '@/store/cartSlice';
import { categories } from '@/data/menuData';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { MenuItem } from '@/types';
import type { RootState } from '@/store';

const iconMap: Record<string, string> = {
  'south-indian': '🍛',
  'chinese': '🥡',
  'snacks': '🥠',
  'beverages': '☕',
  'combos': '🍱',
  'desserts': '🍨',
};

function MenuItemCard({ item, onClick }: { item: MenuItem; onClick: () => void }) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Veg Badge */}
        <div className="absolute top-3 left-3">
          <div className="w-6 h-6 bg-white rounded-md border-2 border-green-600 flex items-center justify-center">
            <div className={`w-3 h-3 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
          </div>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-xanthous fill-xanthous" />
          <span className="text-xs font-semibold text-burgundy">{item.rating || '4.5'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-burgundy mb-1">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-burgundy">
            ₹{item.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-10 h-10 bg-burgundy rounded-full flex items-center justify-center hover:bg-xanthous hover:text-black transition-colors"
          >
            <Plus className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function ItemDetailModal({ item, isOpen, onClose }: {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(item));
    }
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-0 overflow-hidden">
        <div className="relative h-64">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 bg-white rounded border border-green-600 flex items-center justify-center">
                <div className={`w-2.5 h-2.5 ${item.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
              </div>
              <span className="text-white/80 text-sm">{item.isVeg ? 'Pure Veg' : 'Non-Veg'}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-white">{item.name}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-xanthous fill-xanthous" />
            <span className="font-semibold text-burgundy">{item.rating || '4.5'}</span>
            <span className="text-gray-400">({item.reviews || '50+'} reviews)</span>
          </div>

          <p className="text-gray-600 mb-6">{item.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-burgundy">₹{item.price}</span>

            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="btn-primary flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add ₹{item.price * quantity}
              </motion.button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items: menuItems } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      if (!item.isAvailable) return false;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, menuItems]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const openItemModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // SEO
  useEffect(() => {
    document.title = "Menu | Vrindas Restaurant Kanpur";
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-16 bg-cream min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-4">
            Our Menu
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of delicious vegetarian dishes.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-burgundy outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all' ? 'bg-burgundy text-white' : 'bg-white text-gray-600 hover:bg-burgundy/10'}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${selectedCategory === category.id ? 'bg-burgundy text-white' : 'bg-white text-gray-600 hover:bg-burgundy/10'}`}
              >
                <span>{iconMap[category.id] || '🍽️'}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={() => openItemModal(item)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-burgundy mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        )}
      </div>

      <ItemDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
      />
    </motion.main>
  );
}
