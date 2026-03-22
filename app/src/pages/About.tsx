import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Leaf, ChefHat, Sparkles } from 'lucide-react';
import { restaurantInfo } from '@/data/menuData';

const milestones = [
  { year: '2010', title: 'Humble Beginnings', description: 'Started as a small eatery in Shivala, Kanpur' },
  { year: '2015', title: 'Growing Popularity', description: 'Expanded menu and renovated the restaurant' },
  { year: '2018', title: 'Award Winning', description: 'Recognized as Best Veg Restaurant in Kanpur' },
  { year: '2022', title: 'Digital Expansion', description: 'Launched online ordering and delivery' },
  { year: '2024', title: 'Today', description: 'Serving 50,000+ happy customers monthly' },
];

const values = [
  { icon: Leaf, title: 'Purity', description: '100% vegetarian, no compromise on quality' },
  { icon: Heart, title: 'Passion', description: 'Every dish made with love and care' },
  { icon: ChefHat, title: 'Excellence', description: 'Striving for the best in every meal' },
  { icon: Users, title: 'Community', description: 'Building relationships through food' },
];

const team = [
  { name: 'Chef Rajesh', role: 'Head Chef', experience: '20+ years', specialty: 'South Indian' },
  { name: 'Chef Amit', role: 'Chinese Specialist', experience: '15+ years', specialty: 'Chinese' },
  { name: 'Chef Priya', role: 'Dessert Expert', experience: '12+ years', specialty: 'Sweets' },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | Vrindas Restaurant Kanpur";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn about Vrindas Restaurant - Kanpur\'s favorite pure veg family restaurant serving authentic South Indian and Chinese cuisine since 2010.');
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block bg-xanthous/20 text-xanthous text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Serving Love on a Plate Since {restaurantInfo.established}
            </h1>
            <p className="text-white/80 text-lg">
              From a small family eatery to one of Kanpur&apos;s most loved vegetarian restaurants, 
              our journey has been filled with passion, dedication, and the love of our customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-card"
            >
              <div className="w-14 h-14 bg-burgundy/10 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-burgundy" />
              </div>
              <h2 className="text-2xl font-display font-bold text-burgundy mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To serve delicious, hygienic, and wholesome vegetarian food that brings families together. 
                We strive to maintain the highest standards of quality while keeping our food affordable 
                and accessible to everyone in Kanpur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-card"
            >
              <div className="w-14 h-14 bg-xanthous/20 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-burgundy" />
              </div>
              <h2 className="text-2xl font-display font-bold text-burgundy mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted and loved vegetarian restaurant chain in Uttar Pradesh, 
                known for our authentic flavors, exceptional service, and commitment to customer satisfaction. 
                We envision a future where Vrindas is synonymous with quality vegetarian dining.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy">
              Milestones Over the Years
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-burgundy/20 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-2xl font-display font-bold text-burgundy">
                      {milestone.year}
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-800 mt-1">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-500 mt-1">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="w-4 h-4 bg-burgundy rounded-full border-4 border-white shadow-lg z-10" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-burgundy/10 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-16 h-16 bg-burgundy/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-burgundy" />
                </div>
                <h3 className="text-xl font-display font-semibold text-burgundy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chef Team */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Meet Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy">
              The Culinary Experts
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Our talented chefs bring years of experience and passion to every dish they create.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((chef, index) => (
              <motion.div
                key={chef.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-cream rounded-2xl overflow-hidden shadow-card"
              >
                <div className="h-48 bg-burgundy/10 flex items-center justify-center">
                  <div className="w-24 h-24 bg-burgundy rounded-full flex items-center justify-center">
                    <ChefHat className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-display font-semibold text-burgundy">
                    {chef.name}
                  </h3>
                  <p className="text-xanthous font-medium">{chef.role}</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Experience:</span> {chef.experience}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Specialty:</span> {chef.specialty}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-burgundy rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '13+', label: 'Years of Service' },
                { value: '50+', label: 'Menu Items' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '4.8', label: 'Average Rating' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <span className="text-4xl lg:text-5xl font-display font-bold text-xanthous">
                    {stat.value}
                  </span>
                  <p className="text-white/70 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
