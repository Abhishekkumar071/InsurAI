import { useEffect } from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import AppRoutes from '@/routes/AppRoutes';
import { useAuthStore } from '@/store/authStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

// Listens for the 'insurai:unauthorized' event dispatched by axiosInstance
// on a 401 response, clears auth state, and sends the user to /login.
function UnauthorizedListener() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const handler = () => {
      logout();
      navigate('/login');
    };
    window.addEventListener('insurai:unauthorized', handler);
    return () => window.removeEventListener('insurai:unauthorized', handler);
  }, [logout, navigate]);

  return null;
}

function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UnauthorizedListener />
        <AppShell />
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
