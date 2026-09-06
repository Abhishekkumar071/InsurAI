import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import { policyApi } from '@/api/policyApi';
import PolicyCard from '@/components/policy/PolicyCard';
import PolicyFilterBar from '@/components/policy/PolicyFilterBar';
import Spinner from '@/components/common/Spinner';
import EmptyState from '@/components/common/EmptyState';

export default function PolicyListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const { data, isLoading } = useQuery({
    queryKey: ['policies', category],
    queryFn: () => (category ? policyApi.getByCategory(category) : policyApi.getAll()),
  });

  const policies = data?.data || [];

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
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          {search ? `Results for "${search}"` : 'Browse Policies'}
        </h1>
        <p className="mt-1 text-gray-500 text-sm">{filtered.length} policies available</p>
      </div>

      <PolicyFilterBar activeCategory={category} onChange={handleCategoryChange} />

      {isLoading ? (
        <Spinner fullPage />
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
    </div>
  );
}
