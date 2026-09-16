import { useNavigate } from 'react-router-dom';
import { CATEGORY_META, formatCurrency } from '@/utils/constants';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';

export default function PolicyCard({ policy }) {
  const navigate = useNavigate();
  const meta = CATEGORY_META[policy.category] || {};
  const Icon = meta.icon;

  return (
    <Card hoverable className="group flex flex-col overflow-hidden p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 transition-colors group-hover:bg-primary-100">
          {meta.asset ? (
            <img src={meta.asset} alt="" className="w-7 h-7 object-contain" />
          ) : (
            Icon && <Icon className="text-primary-600" size={20} />
          )}
        </div>
        <Badge color={meta.color || 'gray'}>{meta.label || policy.category}</Badge>
      </div>

      <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-primary-700">{policy.policyName}</h3>
      <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{policy.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg bg-gray-50 p-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Premium</p>
          <p className="font-semibold text-gray-900">{formatCurrency(policy.basePremium)}/yr</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Coverage</p>
          <p className="font-semibold text-gray-900">{formatCurrency(policy.coverageAmount)}</p>
        </div>
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={() => navigate(`/policies/${policy.id}`)}
      >
        View Details
      </Button>
    </Card>
  );
}
