import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/common/Button';
import travelBanner from '@/assets/banners/Travel_Insurance_ 2.png';
import healthBanner from '@/assets/banners/Health_Insurance_Banner.png';
import generalBanner from '@/assets/banners/General_Insurance_Banner.png';
import fireBanner from '@/assets/banners/Fire_Insurance_Banner.png';
import carBanner from '@/assets/banners/Car_Insurance_Banner.png';

// Each slide maps to one category so "Apply Now" can deep-link into the
// filtered policy listing for that category.
//
const SLIDES = [
  {
    category: 'HEALTH',
    title: 'Health Insurance',
    subtitle: 'Comprehensive coverage for you and your family, with cashless hospitalization.',
    image: healthBanner,
  },
  {
    category: 'MOTOR',
    title: 'Motor Insurance',
    subtitle: 'Bumper-to-bumper protection for your car or two-wheeler, with 24x7 roadside assistance.',
    image: carBanner,
  },
  {
    category: 'TRAVEL',
    title: 'Travel Insurance',
    subtitle: 'Worldwide coverage for medical emergencies, trip delays, and lost baggage.',
    image: travelBanner,
  },
  {
    category: 'HOME',
    title: 'Home Insurance',
    subtitle: 'Protect your home and belongings against fire, theft, and natural disasters.',
    image: fireBanner,
  },
  {
    category: 'TERM_LIFE',
    title: 'Term Life Insurance',
    subtitle: 'High-value life cover at affordable premiums, securing your family\'s future.',
    image: generalBanner,
  },
];

const AUTO_ROTATE_MS = 5000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[index];

  return (
    <section className="relative h-[420px] md:h-[480px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {slide.image ? (
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          ) : null}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
        </motion.div>
      </AnimatePresence>

      {/* Info box - right side, per requirement */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.category}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
            className="bg-white/95 backdrop-blur rounded-2xl shadow-xl p-6 md:p-8 max-w-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900">{slide.title}</h2>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{slide.subtitle}</p>
            <Button
              className="mt-5 w-full"
              onClick={() => navigate(`/policies?category=${slide.category}`)}
            >
              Apply Now
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur ml-12"
        style={{ left: '3.25rem' }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.category}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
