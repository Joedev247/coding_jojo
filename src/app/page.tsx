import "./globals.css";
import { HeroSection } from '@/components/sections/hero'; // Named import
import FeaturedCoursesSection from '@/components/sections/featured-courses'; // Default import
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUs';
import { FAQSection } from '@/components/sections/FAQs'; // Named import
import { AboutCodingJojo } from '@/components/sections/about-coding-jojo'; // Named import
import TestimonialSection from '@/components/sections/testimonial-cards'; // Default import
import PopularTopics from '@/components/sections/popular-topics'; // Default import
import PricingPlans from '@/components/sections/pricing-plans'; // Default import

export default function HomePage() {
  return (
    <div className="app-container">
      <HeroSection />
      <WhyChooseUsSection />
      <FeaturedCoursesSection />
      <PopularTopics />
      <PricingPlans />
      <TestimonialSection />
      <FAQSection />
      <AboutCodingJojo />
    </div>
  );
}
