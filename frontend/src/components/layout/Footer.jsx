import { Link } from 'react-router-dom';
import { ShieldCheck, Phone, Mail } from 'lucide-react';
import { CATEGORY_META } from '@/utils/constants';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="text-primary-400" size={24} />
            <span className="text-lg font-bold text-white">InsurAI</span>
          </div>
          <p className="text-sm text-gray-400">
            Digital-first insurance discovery, application, and management —
            built for transparency and speed.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {Object.entries(CATEGORY_META).slice(0, 5).map(([key, meta]) => (
              <li key={key}>
                <Link to={`/policies?category=${key}`} className="hover:text-primary-400">
                  {meta.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/policies" className="hover:text-primary-400">Browse Policies</Link></li>
            <li><Link to="/appointments/book" className="hover:text-primary-400">Talk to an Advisor</Link></li>
            <li><Link to="/register" className="hover:text-primary-400">Create Account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} /> 1800-XXX-XXXX</li>
            <li className="flex items-center gap-2"><Mail size={14} /> support@insurai.example</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} InsurAI. Built as a learning / portfolio project — not a licensed insurer.
      </div>
    </footer>
  );
}
