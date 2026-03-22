import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  Navigation,
  MessageSquare
} from 'lucide-react';
import { restaurantInfo } from '@/data/menuData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us | Vrindas Restaurant Kanpur";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Contact Vrindas Restaurant in Shivala, Kanpur. Call us at +91 98765 43210 for reservations, catering, or feedback.');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 3000);
  };

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
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-white/80 text-lg">
              We&apos;d love to hear from you. Reach out to us for reservations,
              feedback, or any questions you may have.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: 'Visit Us',
                content: `${restaurantInfo.address.street}, ${restaurantInfo.address.city}`,
                action: { text: 'Get Directions', href: 'https://maps.google.com/?q=Shivala+Kanpur+208001' }
              },
              {
                icon: Phone,
                title: 'Call Us',
                content: restaurantInfo.contact.phone,
                action: { text: 'Call Now', href: `tel:${restaurantInfo.contact.phone}` }
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: restaurantInfo.contact.email,
                action: { text: 'Send Email', href: `mailto:${restaurantInfo.contact.email}` }
              },
              {
                icon: Clock,
                title: 'Opening Hours',
                content: `${restaurantInfo.hours.open} - ${restaurantInfo.hours.close}`,
                action: { text: 'All Days', href: '#' }
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow text-center"
              >
                <div className="w-14 h-14 bg-burgundy/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-burgundy" />
                </div>
                <h3 className="text-lg font-display font-semibold text-burgundy mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.content}</p>
                <a
                  href={item.action.href}
                  target={item.action.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-xanthous hover:text-burgundy font-medium text-sm transition-colors"
                >
                  {item.action.text} →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-cream rounded-3xl p-8">
                <h2 className="text-2xl font-display font-bold text-burgundy mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-6">
                  Have a question or feedback? Fill out the form below and we&apos;ll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition-all resize-none"
                      placeholder="Write your message here..."
                      rows={4}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitted}
                    className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${isSubmitted
                        ? 'bg-green-500 text-white'
                        : 'btn-primary'
                      }`}
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="w-5 h-5" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>

                {/* WhatsApp CTA */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-gray-500 text-sm mb-4">
                    Prefer WhatsApp?
                  </p>
                  <a
                    href={`https://wa.me/${restaurantInfo.contact.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-cream rounded-3xl p-8 h-full">
                <h2 className="text-2xl font-display font-bold text-burgundy mb-2">
                  Find Us on Map
                </h2>
                <p className="text-gray-600 mb-6">
                  Visit our restaurant at Shivala, Kanpur for a delightful dining experience.
                </p>

                <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
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

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://maps.google.com/?q=Shivala+Kanpur+208001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-burgundy text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-burgundy-light transition-colors"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-burgundy rounded-2xl p-6 lg:p-8"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl lg:text-2xl font-display font-bold text-white mb-2">
                  Ready to Order?
                </h3>
                <p className="text-white/70">
                  Call us now or order online for quick delivery.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${restaurantInfo.contact.phone}`}
                  className="px-6 py-3 bg-xanthous text-black rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-xanthous-light transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a
                  href="/checkout"
                  className="px-6 py-3 border-2 border-white text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-white hover:text-burgundy transition-colors"
                >
                  Checkout
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
