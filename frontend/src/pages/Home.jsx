import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryGrid from '@/components/home/CategoryGrid';
import TrustSection from '@/components/home/TrustSection';

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <CategoryGrid />
      <TrustSection />
    </div>
  );
}
