import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setUserRole(role);
    // Listen for authChange events so navbar updates after login/logout
    const onAuthChange = () => {
      const t = localStorage.getItem('token');
      const r = localStorage.getItem('userRole');
      setIsAuthenticated(!!t);
      setUserRole(r);
    };
    window.addEventListener('authChange', onAuthChange);
    return () => window.removeEventListener('authChange', onAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">InsureAI</h1>
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
            <Link to="/about" className="hover:underline">About</Link>
          </>
        ) : userRole === 'AGENT' ? (
          <>
            <Link to="/agent" className="hover:underline">Agent Portal</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <button onClick={handleLogout} className="hover:underline bg-none border-none cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <button onClick={handleLogout} className="hover:underline bg-none border-none cursor-pointer">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
