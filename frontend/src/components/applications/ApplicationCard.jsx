import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ChevronDown, ChevronUp, CreditCard } from 'lucide-react';
import { paymentApi } from '@/api/paymentApi';
import { loadRazorpayScript } from '@/utils/loadRazorpay';
import { APPLICATION_STATUS_META, formatDate } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';
import Card from '@/components/common/Card';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import DocumentUploadPanel from './DocumentUploadPanel';

export default function ApplicationCard({ application }) {
  const [expanded, setExpanded] = useState(false);
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const statusMeta = APPLICATION_STATUS_META[application.status] || {};

  const payMutation = useMutation({
    mutationFn: () => paymentApi.createOrder(application.id),
    onSuccess: async (res) => {
      const order = res.data;
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Could not load payment gateway. Check your connection.');
        return;
      }

      const razorpay = new window.Razorpay({
        key: order.razorpayKeyId,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        name: 'InsurAI',
        description: application.policyName,
        order_id: order.razorpayOrderId,
        prefill: { name: user?.fullName, email: user?.email },
        theme: { color: '#2563eb' },
        handler: async (response) => {
          try {
            await paymentApi.verify({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            toast.success('Payment successful! Your policy is now active.');
            queryClient.invalidateQueries({ queryKey: ['applications'] });
          } catch {
            toast.error('Payment verification failed. Contact support if amount was deducted.');
          }
        },
        modal: { ondismiss: () => toast('Payment cancelled') },
      });
      razorpay.open();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not start payment'),
  });

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-900">{application.policyName}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Applied on {formatDate(application.appliedAt)}</p>
        </div>
        <Badge color={statusMeta.color}>{statusMeta.label}</Badge>
      </div>

      {application.adminRemarks && (
        <p className="mt-3 text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
          <span className="font-medium text-gray-700">Note: </span>{application.adminRemarks}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {application.status === 'APPROVED' && (
          <Button size="sm" onClick={() => payMutation.mutate()} loading={payMutation.isPending}>
            <CreditCard size={15} /> Pay Premium
          </Button>
        )}
        {application.status === 'ACTIVE' && (
          <Badge color="success">Premium Paid — Policy Active</Badge>
        )}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1 text-sm text-primary-600 font-medium ml-auto"
        >
          {expanded ? 'Hide' : 'Manage'} documents
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <DocumentUploadPanel applicationId={application.id} />
        </div>
      )}
    </Card>
  );
}
