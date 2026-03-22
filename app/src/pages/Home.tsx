import { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/sections/HeroSection';
import FeaturedDishes from '@/sections/FeaturedDishes';
import AboutSection from '@/sections/AboutSection';
import PopularCategories from '@/sections/PopularCategories';
import CustomerReviews from '@/sections/CustomerReviews';
import WhyChooseUs from '@/sections/WhyChooseUs';
import OrderCTA from '@/sections/OrderCTA';
import DeliveryInfo from '@/sections/DeliveryInfo';
import MapSection from '@/sections/MapSection';

export default function Home() {
  // SEO Meta Tags
  useEffect(() => {
    document.title = "Vrindas Restaurant Kanpur | Veg Restaurant in Shivala Kanpur";
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Vrindas is a pure veg family restaurant in Shivala, Kanpur offering Chinese and South Indian dishes with fast home delivery.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Vrindas is a pure veg family restaurant in Shivala, Kanpur offering Chinese and South Indian dishes with fast home delivery.';
      document.head.appendChild(meta);
    }

    // Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'vrindas restaurant kanpur, veg restaurant kanpur, south indian restaurant kanpur, chinese food kanpur, food delivery kanpur');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'vrindas restaurant kanpur, veg restaurant kanpur, south indian restaurant kanpur, chinese food kanpur, food delivery kanpur';
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Vrindas Restaurant Kanpur | Pure Veg Family Restaurant');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = 'Vrindas Restaurant Kanpur | Pure Veg Family Restaurant';
      document.head.appendChild(meta);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', 'Experience authentic South Indian and Chinese cuisine at Vrindas. Pure veg family restaurant in Shivala, Kanpur.');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = 'Experience authentic South Indian and Chinese cuisine at Vrindas. Pure veg family restaurant in Shivala, Kanpur.';
      document.head.appendChild(meta);
    }

    // Schema.org JSON-LD
    const existingSchema = document.querySelector('#restaurant-schema');
    if (existingSchema) {
      existingSchema.remove();
    }
    
    const schemaScript = document.createElement('script');
    schemaScript.id = 'restaurant-schema';
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Restaurant',
      name: 'Vrindas Restaurant',
      image: '/images/logo.png',
      '@id': 'https://vrindas.com',
      url: 'https://vrindas.com',
      telephone: '+919876543210',
      priceRange: '₹₹',
      servesCuisine: ['South Indian', 'Chinese', 'Vegetarian'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shivala Rd, Khas Bazar, Shivala, Patkapur',
        addressLocality: 'Kanpur',
        addressRegion: 'Uttar Pradesh',
        postalCode: '208001',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 26.4499,
        longitude: 80.3319
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '23:00'
        }
      ],
      acceptsReservations: true,
      menu: 'https://vrindas.com/menu',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '2000'
      }
    });
    document.head.appendChild(schemaScript);

    return () => {
      const schema = document.querySelector('#restaurant-schema');
      if (schema) schema.remove();
    };
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FeaturedDishes />
      <AboutSection />
      <PopularCategories />
      <WhyChooseUs />
      <CustomerReviews />
      <OrderCTA />
      <DeliveryInfo />
      <MapSection />
    </motion.main>
  );
}
