import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CalendarClock, Clock } from 'lucide-react';
import { appointmentApi } from '@/api/appointmentApi';
import { policyApi } from '@/api/policyApi';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import { APPOINTMENT_STATUS_META, formatDate } from '@/utils/constants';
import Card from '@/components/common/Card';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

const schema = z.object({
  policyId: z.string().optional(),
  preferredDate: z.string().min(1, 'Pick a date'),
  preferredTime: z.string().min(1, 'Pick a time'),
  reason: z.string().optional(),
});

export default function AppointmentBooking() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const { data: policiesData } = useQuery({
    queryKey: ['policies'],
    queryFn: policyApi.getAll,
    enabled: isAuthenticated,
  });

  const { data: myAppointmentsData, refetch } = useQuery({
    queryKey: ['appointments', 'my'],
    queryFn: appointmentApi.getMy,
    enabled: isAuthenticated,
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      appointmentApi.book({
        ...data,
        policyId: data.policyId ? Number(data.policyId) : undefined,
      }),
    onSuccess: () => {
      toast.success('Appointment requested! We will confirm shortly.');
      reset();
      refetch();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not book appointment'),
  });

  const onSubmit = (data) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/appointments/book' } } });
      return;
    }
    mutation.mutate(data);
  };

  const policyOptions = (policiesData?.data?.content || []).map((p) => ({ value: p.id, label: p.policyName }));
  const myAppointments = myAppointmentsData?.data || [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-1">
        <CalendarClock className="text-primary-600" size={28} />
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Talk to an Advisor</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        Not sure which policy fits? Book a free call — no pressure, just clarity.
      </p>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select
            label="Related Policy (optional)"
            placeholder="General consultation — no specific policy"
            options={policyOptions}
            {...register('policyId')}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Preferred Date" type="date" error={errors.preferredDate?.message} {...register('preferredDate')} />
            <Input label="Preferred Time" type="time" error={errors.preferredTime?.message} {...register('preferredTime')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">What would you like to discuss?</label>
            <textarea
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. Comparing health plans for a family of 4"
              {...register('reason')}
            />
          </div>
          <Button type="submit" className="w-full" loading={mutation.isPending}>
            Request Appointment
          </Button>
        </form>
      </Card>

      {isAuthenticated && myAppointments.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Your Requests</h2>
          <div className="space-y-3">
            {myAppointments.map((a) => {
              const meta = APPOINTMENT_STATUS_META[a.status] || {};
              return (
                <Card key={a.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {a.policyName || 'General consultation'}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> {formatDate(a.preferredDate)} at {a.preferredTime}
                    </p>
                  </div>
                  <Badge color={meta.color}>{meta.label}</Badge>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
