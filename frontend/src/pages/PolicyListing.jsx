import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import { policyApi } from '@/api/policyApi';
import PolicyCard from '@/components/policy/PolicyCard';
import PolicyFilterBar from '@/components/policy/PolicyFilterBar';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';
import Skeleton from '@/components/common/Skeleton';

const EMPTY_POLICIES = [];

export default function PolicyListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = Number(searchParams.get('page') || 0);

  const { data, isLoading } = useQuery({
    queryKey: ['policies', category, page],
    queryFn: () => {
      const params = { page, size: 10, sort: 'createdAt,desc' };
      return category ? policyApi.getByCategory(category, params) : policyApi.getAll(params);
    },
  });

  const pageData = data?.data;
  const policies = pageData?.content || EMPTY_POLICIES;

  const filtered = useMemo(() => {
    if (!search) return policies;
    const term = search.toLowerCase();
    return policies.filter(
      (p) => p.policyName.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }, [policies, search]);

  const handleCategoryChange = (cat) => {
    const params = {};
    if (cat) params.category = cat;
    if (search) params.search = search;
    params.page = '0';
    setSearchParams(params);
  };

  const handlePageChange = (nextPage) => {
    const params = Object.fromEntries(searchParams.entries());
    params.page = String(nextPage);
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Coverage that fits</p>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          {search ? `Results for "${search}"` : 'Browse Policies'}
        </h1>
        <p className="mt-2 text-sm text-gray-500">{filtered.length} policies available on this page</p>
        </div>
      </div>

      <PolicyFilterBar activeCategory={category} onChange={handleCategoryChange} />

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex justify-between"><Skeleton className="h-10 w-10 rounded-lg" /><Skeleton className="h-6 w-20" /></div>
              <Skeleton className="mt-5 h-5 w-3/4" />
              <Skeleton className="mt-3 h-10 w-full" />
              <div className="mt-5 grid grid-cols-2 gap-2"><Skeleton className="h-8" /><Skeleton className="h-8" /></div>
              <Skeleton className="mt-4 h-10 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No policies found"
          description="Try a different category or search term."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((policy) => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      )}
      <Pagination pageData={pageData} onPageChange={handlePageChange} />
    </div>
  );
}
