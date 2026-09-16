import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Plus, Ban, FileStack } from 'lucide-react';
import { policyApi } from '@/api/policyApi';
import { CATEGORY_META, formatCurrency } from '@/utils/constants';
import AdminTable from '@/components/admin/AdminTable';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';

const schema = z.object({
  policyName: z.string().min(3, 'Minimum 3 characters'),
  category: z.string().min(1, 'Required'),
  basePremium: z.coerce.number().positive('Must be greater than 0'),
  coverageAmount: z.coerce.number().min(1000, 'Minimum 1000'),
  tenureYears: z.coerce.number().int().min(1).max(100),
  description: z.string().min(1, 'Required'),
  benefits: z.string().optional(),
  termsAndConditions: z.string().optional(),
});

const categoryOptions = Object.entries(CATEGORY_META).map(([value, meta]) => ({ value, label: meta.label }));

export default function ManagePolicies() {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['policies', page],
    queryFn: () => policyApi.getAll({ page, size: 10, sort: 'createdAt,desc' }),
  });
  const pageData = data?.data;
  const policies = pageData?.content || [];

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const createMutation = useMutation({
    mutationFn: policyApi.create,
    onSuccess: () => {
      toast.success('Policy created');
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      setModalOpen(false);
      reset();
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to create policy'),
  });

  const deactivateMutation = useMutation({
    mutationFn: policyApi.deactivate,
    onSuccess: () => {
      toast.success('Policy deactivated');
      queryClient.invalidateQueries({ queryKey: ['policies'] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not deactivate policy'),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Policies</h2>
        <Button size="sm" onClick={() => setModalOpen(true)}><Plus size={16} /> New Policy</Button>
      </div>

      {isLoading ? (
        <div className="space-y-2 rounded-xl border border-gray-200 p-6">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-10 animate-pulse rounded bg-gray-100" />)}</div>
      ) : policies.length === 0 ? (
        <EmptyState icon={FileStack} title="No policies found" description="Create a policy to make it available to customers." />
      ) : !isLoading && (
        <AdminTable columns={['Name', 'Category', 'Premium', 'Coverage', 'Status', '']}>
          {policies.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-3 font-medium text-gray-900">{p.policyName}</td>
              <td className="px-4 py-3"><Badge color={CATEGORY_META[p.category]?.color}>{CATEGORY_META[p.category]?.label}</Badge></td>
              <td className="px-4 py-3 text-gray-600">{formatCurrency(p.basePremium)}</td>
              <td className="px-4 py-3 text-gray-600">{formatCurrency(p.coverageAmount)}</td>
              <td className="px-4 py-3">
                <Badge color={p.isActive ? 'success' : 'gray'}>{p.isActive ? 'Active' : 'Inactive'}</Badge>
              </td>
              <td className="px-4 py-3">
                {p.isActive && (
                  <button
                    onClick={() => deactivateMutation.mutate(p.id)}
                    className="text-danger-600 hover:text-red-700 flex items-center gap-1 text-xs font-medium"
                  >
                    <Ban size={14} /> Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
      <Pagination pageData={pageData} onPageChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create New Policy">
        <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
          <Input label="Policy Name" error={errors.policyName?.message} {...register('policyName')} />
          <Select label="Category" placeholder="Select category" options={categoryOptions} error={errors.category?.message} {...register('category')} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Base Premium (₹)" type="number" error={errors.basePremium?.message} {...register('basePremium')} />
            <Input label="Coverage Amount (₹)" type="number" error={errors.coverageAmount?.message} {...register('coverageAmount')} />
          </div>
          <Input label="Tenure (years)" type="number" error={errors.tenureYears?.message} {...register('tenureYears')} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea rows={2} className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm" {...register('description')} />
            {errors.description && <p className="mt-1 text-sm text-danger-600">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Benefits</label>
            <textarea rows={2} className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm" {...register('benefits')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Terms & Conditions</label>
            <textarea rows={2} className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm" {...register('termsAndConditions')} />
          </div>
          <Button type="submit" className="w-full" loading={createMutation.isPending}>Create Policy</Button>
        </form>
      </Modal>
    </div>
  );
}
