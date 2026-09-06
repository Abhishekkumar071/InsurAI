import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Check, X } from 'lucide-react';
import { applicationApi } from '@/api/applicationApi';
import { APPLICATION_STATUS_META, formatDate } from '@/utils/constants';
import AdminTable from '@/components/admin/AdminTable';
import Badge from '@/components/common/Badge';
import Select from '@/components/common/Select';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'ACTIVE', label: 'Active' },
];

export default function ManageApplications() {
  const [statusFilter, setStatusFilter] = useState('');
  const [actionTarget, setActionTarget] = useState(null); // { id, status }
  const [remarks, setRemarks] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['applications', 'admin', statusFilter],
    queryFn: () => applicationApi.getAllAdmin(statusFilter || undefined),
  });

  const applications = data?.data || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, status, remarks }) => applicationApi.updateStatus(id, status, remarks),
    onSuccess: () => {
      toast.success('Application updated');
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setActionTarget(null);
      setRemarks('');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
        <div className="w-48">
          <Select options={STATUS_FILTERS.slice(1)} placeholder="All statuses" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
        </div>
      </div>

      {!isLoading && (
        <AdminTable columns={['Applicant', 'Policy', 'Status', 'Applied', 'Actions']}>
          {applications.map((app) => {
            const meta = APPLICATION_STATUS_META[app.status] || {};
            return (
              <tr key={app.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{app.userFullName}</p>
                  <p className="text-xs text-gray-400">{app.userEmail}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{app.policyName}</td>
                <td className="px-4 py-3"><Badge color={meta.color}>{meta.label}</Badge></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(app.appliedAt)}</td>
                <td className="px-4 py-3">
                  {app.status === 'PENDING' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActionTarget({ id: app.id, status: 'APPROVED' })}
                        className="text-success-600 hover:text-green-700"
                        title="Approve"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => setActionTarget({ id: app.id, status: 'REJECTED' })}
                        className="text-danger-600 hover:text-red-700"
                        title="Reject"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </AdminTable>
      )}

      <Modal
        open={!!actionTarget}
        onClose={() => setActionTarget(null)}
        title={actionTarget?.status === 'APPROVED' ? 'Approve Application' : 'Reject Application'}
        footer={
          <>
            <Button variant="outline" onClick={() => setActionTarget(null)}>Cancel</Button>
            <Button
              variant={actionTarget?.status === 'APPROVED' ? 'primary' : 'danger'}
              loading={updateMutation.isPending}
              onClick={() => updateMutation.mutate({ ...actionTarget, remarks })}
            >
              Confirm
            </Button>
          </>
        }
      >
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Remarks (optional)</label>
        <textarea
          rows={3}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm"
          placeholder="Reason or notes for the applicant..."
        />
      </Modal>
    </div>
  );
}
