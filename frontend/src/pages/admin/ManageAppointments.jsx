import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { appointmentApi } from '@/api/appointmentApi';
import { CalendarClock } from 'lucide-react';
import { APPOINTMENT_STATUS_META, formatDate } from '@/utils/constants';
import AdminTable from '@/components/admin/AdminTable';
import Badge from '@/components/common/Badge';
import Select from '@/components/common/Select';
import EmptyState from '@/components/common/EmptyState';

const STATUS_OPTIONS = [
  { value: 'REQUESTED', label: 'Requested' },
  { value: 'SCHEDULED', label: 'Scheduled' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function ManageAppointments() {
  const [statusFilter, setStatusFilter] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['appointments', 'admin', statusFilter],
    queryFn: () => appointmentApi.getAllAdmin(statusFilter || undefined),
  });

  const appointments = data?.data || [];

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => appointmentApi.updateStatus(id, { status }),
    onSuccess: () => {
      toast.success('Appointment updated');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Update failed'),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Appointments</h2>
        <div className="w-48">
          <Select options={STATUS_OPTIONS} placeholder="All statuses" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2 rounded-xl border border-gray-200 p-6">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-10 animate-pulse rounded bg-gray-100" />)}</div>
      ) : appointments.length === 0 ? (
        <EmptyState icon={CalendarClock} title="No appointments found" description="Appointment requests will appear here." />
      ) : !isLoading && (
        <AdminTable columns={['Requested By', 'Policy', 'Date & Time', 'Status', 'Update']}>
          {appointments.map((a) => {
            const meta = APPOINTMENT_STATUS_META[a.status] || {};
            return (
              <tr key={a.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{a.userFullName}</p>
                  <p className="text-xs text-gray-400">{a.userEmail}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{a.policyName || 'General'}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(a.preferredDate)} · {a.preferredTime}</td>
                <td className="px-4 py-3"><Badge color={meta.color}>{meta.label}</Badge></td>
                <td className="px-4 py-3 w-40">
                  <Select
                    options={STATUS_OPTIONS}
                    value={a.status}
                    onChange={(e) => updateMutation.mutate({ id: a.id, status: e.target.value })}
                  />
                </td>
              </tr>
            );
          })}
        </AdminTable>
      )}
    </div>
  );
}
