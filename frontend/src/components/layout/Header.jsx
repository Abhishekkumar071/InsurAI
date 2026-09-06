import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Button from '@/components/common/Button';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/policies?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/policies');
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/policies', label: 'Policies' },
    { to: '/appointments/book', label: 'Talk to an Advisor' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left — Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* TODO: Replace with actual logo image */}
            {/* # */}
            <ShieldCheck className="text-primary-600" size={28} strokeWidth={2.2} />
            <span className="text-xl font-bold text-gray-900 tracking-tight">InsurAI</span>
          </Link>

          {/* Center — Search (desktop only) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm
                           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Right — Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-600 hover:text-primary-600">
                {link.label}
              </Link>
            ))}

            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-primary-600">
                  Login
                </Link>
                <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
                    {user?.fullName?.[0]?.toUpperCase() || <User size={16} />}
                  </div>
                  {user?.fullName?.split(' ')[0]}
                </button>
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    {user?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LayoutDashboard size={16} /> Admin Dashboard
                      </Link>
                    )}
                    <Link
                      to="/my-applications"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <User size={16} /> My Applications
                    </Link>
                    <button
                      onClick={() => { logout(); setProfileOpen(false); navigate('/'); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger-600 hover:bg-gray-50"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-gray-700" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 px-4 py-4 space-y-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search policies..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 text-sm"
              />
            </div>
          </form>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-gray-700"
            >
              {link.label}
            </Link>
          ))}
          {!isAuthenticated ? (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-gray-700">Login</Link>
              <Link to="/register" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-primary-600">Register</Link>
            </div>
          ) : (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              {user?.role === 'ADMIN' && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700">Admin Dashboard</Link>
              )}
              <Link to="/my-applications" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700">My Applications</Link>
              <button onClick={() => { logout(); setMobileOpen(false); navigate('/'); }} className="text-sm font-medium text-danger-600">Logout</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
