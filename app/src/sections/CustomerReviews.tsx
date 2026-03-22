import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/data/menuData';

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
    >
      {/* Quote Icon */}
      <div className="w-10 h-10 bg-xanthous/20 rounded-full flex items-center justify-center mb-4">
        <Quote className="w-5 h-5 text-burgundy" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? 'text-xanthous fill-xanthous'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-600 mb-6 line-clamp-4">
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-burgundy/10 rounded-full flex items-center justify-center">
          <span className="text-lg font-semibold text-burgundy">
            {review.userName.charAt(0)}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-burgundy">{review.userName}</h4>
          <p className="text-gray-400 text-sm">Verified Customer</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-xanthous/5 rounded-full" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-burgundy/5 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-xanthous/20 text-burgundy text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our valued customers 
            have to say about their dining experience at Vrindas.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="bg-burgundy rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left - Rating */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
                  Trusted by Thousands of Food Lovers
                </h3>
                <p className="text-white/70 mb-6">
                  Join our community of satisfied customers who choose Vrindas 
                  for their family dining experiences.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="text-center">
                    <span className="text-4xl lg:text-5xl font-display font-bold text-xanthous">
                      4.8
                    </span>
                    <div className="flex items-center gap-1 justify-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-xanthous fill-xanthous"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-12 w-px bg-white/20" />
                  <div>
                    <span className="text-2xl font-bold text-white">2000+</span>
                    <p className="text-white/60 text-sm">Reviews</p>
                  </div>
                </div>
              </div>

              {/* Right - Platform Ratings */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { platform: 'Google', rating: '4.9', reviews: '1.2K' },
                  { platform: 'Zomato', rating: '4.7', reviews: '800+' },
                  { platform: 'Swiggy', rating: '4.8', reviews: '600+' },
                  { platform: 'TripAdvisor', rating: '4.6', reviews: '200+' },
                ].map((item, index) => (
                  <motion.div
                    key={item.platform}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <span className="text-white/60 text-sm">{item.platform}</span>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-xanthous fill-xanthous" />
                      <span className="text-white font-semibold">{item.rating}</span>
                    </div>
                    <span className="text-white/40 text-xs">{item.reviews} reviews</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
