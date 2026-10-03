import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, X } from 'lucide-react';
import { profileApi } from '@/api/profileApi';
import HeroCarousel from '@/components/home/HeroCarousel';
import RecommendedSection from '@/components/home/RecommendedSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import TrustSection from '@/components/home/TrustSection';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getMy,
    enabled: isAuthenticated,
    retry: false,
  });
  const needsProfile = isAuthenticated && isError && error.response?.status === 404;

  return (
    <div>
      <HeroCarousel />
      {needsProfile && !bannerDismissed && (
        <div className="mx-auto mt-8 flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-between gap-4 rounded-xl border border-primary-100 bg-primary-50/70 px-4 py-3 sm:px-5">
            <p className="text-sm font-medium text-gray-800">
              Complete your profile to get personalized policy recommendations.
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Link to="/profile/setup" className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-all duration-150 hover:bg-primary-700 hover:shadow-md">
                Set up <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                aria-label="Dismiss profile reminder"
                onClick={() => setBannerDismissed(true)}
                className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-white hover:text-gray-800"
              >
                <X size={17} />
              </button>
            </div>
          </div>
        </div>
      )}
      {isAuthenticated && <RecommendedSection />}
      <CategoryGrid />
      <TrustSection />
    </div>
  );
}
