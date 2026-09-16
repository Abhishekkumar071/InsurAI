import { useQuery } from '@tanstack/react-query';
import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { applicationApi } from '@/api/applicationApi';
import ApplicationCard from '@/components/applications/ApplicationCard';
import EmptyState from '@/components/common/EmptyState';
import Button from '@/components/common/Button';
import Skeleton from '@/components/common/Skeleton';

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
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="rounded-xl border border-gray-200 bg-white p-5">
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="mt-3 h-4 w-3/5" />
              <Skeleton className="mt-6 h-10 w-full" />
            </div>
          ))}
        </div>
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
