import { useQuery } from '@tanstack/react-query';
import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { applicationApi } from '@/api/applicationApi';
import ApplicationCard from '@/components/applications/ApplicationCard';
import Spinner from '@/components/common/Spinner';
import EmptyState from '@/components/common/EmptyState';
import Button from '@/components/common/Button';

export default function MyApplications() {
  const { data, isLoading } = useQuery({
    queryKey: ['applications', 'my'],
    queryFn: applicationApi.getMy,
  });

  const applications = data?.data || [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">My Applications</h1>
      <p className="text-gray-500 text-sm mb-8">Track status, upload documents, and pay premiums</p>

      {isLoading ? (
        <Spinner fullPage />
      ) : applications.length === 0 ? (
        <EmptyState
          icon={FileQuestion}
          title="No applications yet"
          description="Browse policies and apply to get started."
          action={<Link to="/policies"><Button>Browse Policies</Button></Link>}
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </div>
      )}
    </div>
  );
}
