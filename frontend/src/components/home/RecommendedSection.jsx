import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { recommendationApi } from '@/api/recommendationApi';
import Badge from '@/components/common/Badge';
import Card from '@/components/common/Card';
import Skeleton from '@/components/common/Skeleton';
import { useAuthStore } from '@/store/authStore';

export default function RecommendedSection() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data = [], isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => (await recommendationApi.getMy()).data || [],
    enabled: isAuthenticated,
  });

  if (!isLoading && (!Array.isArray(data) || data.length === 0)) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <Sparkles size={19} className="text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Recommended for You</h2>
      </div>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
            <Card key={index} className="w-[min(82vw,18rem)] shrink-0 snap-start overflow-hidden p-5 sm:w-72">
              <Skeleton className="mb-4 h-5 w-3/4" />
              <Skeleton className="mb-3 h-6 w-24" />
              <Skeleton className="mb-6 h-4 w-full" />
              <Skeleton className="h-10 w-full" />
            </Card>
          ))
          : data.map((recommendation, index) => (
            <motion.div
              key={recommendation.policyId}
              className="w-[min(82vw,18rem)] shrink-0 snap-start sm:w-72"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card hoverable className="h-full overflow-hidden border-primary-100 p-5">
                <div className="mb-4 -mx-5 -mt-5 h-1 bg-gradient-to-r from-primary-500 to-success-400" />
                <div className="flex min-h-14 items-start justify-between gap-3">
                  <h3 className="font-semibold leading-6 text-gray-900">{recommendation.policyName}</h3>
                  <Badge color={recommendation.score >= 0.8 ? 'success' : 'primary'} className="shrink-0">
                    {Math.round(recommendation.score * 100)}% match
                  </Badge>
                </div>
                <p className="mt-3 min-h-10 text-sm leading-5 text-gray-500">{recommendation.reason}</p>
                <Link to={`/policies/${recommendation.policyId}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm shadow-primary-600/20 transition-all duration-150 hover:bg-primary-700 hover:shadow-md">
                  View Policy
                </Link>
              </Card>
            </motion.div>
          ))}
      </div>
    </section>
  );
}