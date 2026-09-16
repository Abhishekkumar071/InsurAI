import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { policyApi } from '@/api/policyApi';
import { applicationApi } from '@/api/applicationApi';
import { useAuthStore } from '@/store/authStore';
import { CATEGORY_META, formatCurrency } from '@/utils/constants';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';

export default function PolicyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['policy', id],
    queryFn: () => policyApi.getById(id),
  });

  const applyMutation = useMutation({
    mutationFn: () => applicationApi.apply(Number(id)),
    onSuccess: () => {
      toast.success('Application submitted! Track it under "My Applications".');
      navigate('/my-applications');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Could not submit application');
    },
  });

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/policies/${id}` } } });
      return;
    }
    applyMutation.mutate();
  };

  if (isLoading) return <Spinner fullPage />;

  const policy = data?.data;
  if (!policy) return null;

  const meta = CATEGORY_META[policy.category] || {};
  const benefits = (policy.benefits || '').split(/[,.]\s*/).filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <button onClick={() => navigate(-1)} className="mb-8 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <Badge color={meta.color || 'gray'}>{meta.label || policy.category}</Badge>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">{policy.policyName}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">{policy.description}</p>
          </div>

          {benefits.length > 0 && (
            <Card className="p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-900">Key Benefits</h3>
              <ul className="space-y-2">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="text-success-600 shrink-0 mt-0.5" size={16} />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {policy.termsAndConditions && (
            <Card className="p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600">{policy.termsAndConditions}</p>
            </Card>
          )}
        </div>

        {/* Sticky apply card */}
        <div>
          <Card className="sticky top-24 border-primary-100 bg-gradient-to-b from-primary-50/70 to-white p-6 shadow-lg shadow-primary-900/5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Annual Premium</span>
                <span className="font-semibold text-gray-900">{formatCurrency(policy.basePremium)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Coverage Amount</span>
                <span className="font-semibold text-gray-900">{formatCurrency(policy.coverageAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tenure</span>
                <span className="font-semibold text-gray-900">{policy.tenureYears} years</span>
              </div>
            </div>
            <Button
              className="w-full mt-5"
              onClick={handleApply}
              loading={applyMutation.isPending}
            >
              Apply Now
            </Button>
            <p className="mt-3 text-xs text-gray-400 text-center">
              You'll review and submit your application in the next step. No payment yet.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
