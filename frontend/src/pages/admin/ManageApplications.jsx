import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Check, X, Download, ShieldCheck, ClipboardList } from 'lucide-react';
import { applicationApi } from '@/api/applicationApi';
import { documentApi } from '@/api/documentApi';
import { APPLICATION_STATUS_META, formatDate } from '@/utils/constants';
import AdminTable from '@/components/admin/AdminTable';
import Badge from '@/components/common/Badge';
import Select from '@/components/common/Select';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';

function ApplicationDocuments({ applicationId }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['documents', 'admin', applicationId],
    queryFn: () => documentApi.getAdminForApplication(applicationId),
  });
  const documents = data?.data || [];
  const verifyMutation = useMutation({
    mutationFn: (documentId) => documentApi.verify(documentId),
    onSuccess: () => {
      toast.success('Document verified');
      queryClient.invalidateQueries({ queryKey: ['documents', 'admin', applicationId] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not verify document'),
  });

  const downloadDocument = async (document) => {
    try {
      const response = await documentApi.download(document.id);
      const blobUrl = URL.createObjectURL(response.data);
      const link = window.document.createElement('a');
      link.href = blobUrl;
      link.download = document.originalFileName || `document-${document.id}`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not download document');
    }
  };

  if (isLoading) return <span className="text-xs text-gray-400">Loading docs...</span>;
  if (documents.length === 0) return <span className="text-xs text-gray-400">No documents</span>;

  return (
    <div className="space-y-1.5 min-w-48">
      {documents.map((document) => (
        <div key={document.id} className="flex items-center gap-2 text-xs">
          <span className="truncate max-w-32" title={document.originalFileName}>{document.originalFileName}</span>
          <button type="button" onClick={() => downloadDocument(document)} className="text-gray-500 hover:text-primary-600" title="Download document">
            <Download size={14} />
          </button>
          {document.verified ? (
            <span className="text-success-600">Verified</span>
          ) : (
            <button type="button" onClick={() => verifyMutation.mutate(document.id)} disabled={verifyMutation.isPending} className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 disabled:opacity-50" title="Verify document">
              <ShieldCheck size={14} /> Verify
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
  { value: 'ACTIVE', label: 'Active' },
];

export default function ManageApplications() {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [actionTarget, setActionTarget] = useState(null); // { id, status }
  const [remarks, setRemarks] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['applications', 'admin', statusFilter, page],
    queryFn: () => applicationApi.getAllAdmin(statusFilter || undefined, { page, size: 10, sort: 'appliedAt,desc' }),
  });

  const pageData = data?.data;
  const applications = pageData?.content || [];

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

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setPage(0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Applications</h2>
        <div className="w-48">
          <Select options={STATUS_FILTERS.slice(1)} placeholder="All statuses" value={statusFilter} onChange={(e) => handleStatusChange(e.target.value)} />
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2 rounded-xl border border-gray-200 p-6">{Array.from({ length: 5 }, (_, index) => <div key={index} className="h-10 animate-pulse rounded bg-gray-100" />)}</div>
      ) : applications.length === 0 ? (
        <EmptyState icon={ClipboardList} title="No applications found" description="Applications will appear here when customers apply." />
      ) : !isLoading && (
        <AdminTable columns={['Applicant', 'Policy', 'Documents', 'Status', 'Applied', 'Actions']}>
          {applications.map((app) => {
            const meta = APPLICATION_STATUS_META[app.status] || {};
            return (
              <tr key={app.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{app.userFullName}</p>
                  <p className="text-xs text-gray-400">{app.userEmail}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{app.policyName}</td>
                <td className="px-4 py-3"><ApplicationDocuments applicationId={app.id} /></td>
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
      <Pagination pageData={pageData} onPageChange={setPage} />

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
