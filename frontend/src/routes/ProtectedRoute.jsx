import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

// Wrap any route element with this to require login.
// Pass adminOnly to also require role === 'ADMIN'.
export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
}
