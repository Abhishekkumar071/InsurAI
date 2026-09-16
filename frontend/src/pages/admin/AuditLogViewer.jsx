import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ScrollText } from 'lucide-react';
import { auditLogApi } from '@/api/auditLogApi';
import { formatDate } from '@/utils/constants';
import AdminTable from '@/components/admin/AdminTable';
import EmptyState from '@/components/common/EmptyState';
import Pagination from '@/components/common/Pagination';

export default function AuditLogViewer() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['audit-logs', page],
    queryFn: () => auditLogApi.getAll(page),
  });

  const pageData = data?.data;
  const logs = pageData?.content || [];

  if (isLoading) {
    return <div className="py-12 text-center text-sm text-gray-500">Loading audit logs...</div>;
  }

  if (isError) {
    return <EmptyState icon={AlertCircle} title="Could not load audit logs" description="Please try again shortly." />;
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">Audit Logs</h2>
        <p className="mt-1 text-sm text-gray-500">A read-only history of administrative activity.</p>
      </div>

      {logs.length === 0 ? (
        <EmptyState icon={ScrollText} title="No audit activity yet" description="Administrative actions will appear here." />
      ) : (
        <AdminTable columns={['Timestamp', 'Entity', 'Action', 'Performed By', 'Details']}>
          {logs.map((log) => (
            <tr key={log.id} className="transition-colors hover:bg-gray-50">
              <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">
                <span>{formatDate(log.timestamp)}</span>
                <span className="block text-gray-400">
                  {log.timestamp ? new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '-'}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-gray-600">
                <span className="font-medium text-gray-900">{log.entityType}</span>
                <span className="block text-gray-400">#{log.entityId}</span>
              </td>
              <td className="px-4 py-3 text-sm font-medium text-gray-800">{log.action}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{log.performedBy || '-'}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{log.details || '-'}</td>
            </tr>
          ))}
        </AdminTable>
      )}
      <Pagination pageData={pageData} onPageChange={setPage} />
    </div>
  );
}