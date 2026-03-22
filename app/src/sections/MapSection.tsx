import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { restaurantInfo } from '@/data/menuData';

export default function MapSection() {
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
            Visit Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-burgundy mb-4">
            Find Us on the Map
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visit our restaurant in Shivala, Kanpur for a delightful dining experience. 
            We&apos;re easy to find and always ready to serve you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-card h-[400px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.4766!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c47!2sShivala%2C%20Kanpur!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vrindas Restaurant Location"
              />
            </div>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-burgundy rounded-3xl p-6 lg:p-8 h-full">
              <h3 className="text-2xl font-display font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-xanthous" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Address</h4>
                    <p className="text-white/70 text-sm">
                      {restaurantInfo.address.street}
                      <br />
                      {restaurantInfo.address.city}, {restaurantInfo.address.state} {restaurantInfo.address.pincode}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-xanthous" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <a 
                      href={`tel:${restaurantInfo.contact.phone}`}
                      className="text-white/70 text-sm hover:text-xanthous transition-colors"
                    >
                      {restaurantInfo.contact.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-xanthous" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <a 
                      href={`mailto:${restaurantInfo.contact.email}`}
                      className="text-white/70 text-sm hover:text-xanthous transition-colors"
                    >
                      {restaurantInfo.contact.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-xanthous/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-xanthous" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Opening Hours</h4>
                    <p className="text-white/70 text-sm">
                      {restaurantInfo.hours.open} - {restaurantInfo.hours.close}
                      <br />
                      <span className="text-xanthous">Open All Days</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://maps.google.com/?q=Shivala+Kanpur+208001"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full bg-xanthous text-black py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-xanthous-light transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
