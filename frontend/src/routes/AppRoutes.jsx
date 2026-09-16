import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '@/pages/Home';
import PolicyListing from '@/pages/PolicyListing';
import PolicyDetail from '@/pages/PolicyDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import MyApplications from '@/pages/MyApplications';
import AppointmentBooking from '@/pages/AppointmentBooking';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import PageTransition from '@/components/layout/PageTransition';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/policies" element={<PolicyListing />} />
      <Route path="/policies/:id" element={<PolicyDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/appointments/book" element={<AppointmentBooking />} />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <MyApplications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}
