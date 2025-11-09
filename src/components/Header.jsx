import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-r from-brand-light to-brand-accent flex items-center justify-center text-white font-bold">PB</div>
          <div>
            <Link to="/" className="text-xl font-semibold text-slate-800">PolicyPort</Link>
            <div className="text-sm text-slate-500">Smart insurance, simplified</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-600 hover:text-slate-900">Plans</Link>
          <Link to="/register" className="text-slate-600 hover:text-slate-900">Register</Link>
          {!currentUser ? (
            <Link to="/login" className="px-4 py-2 bg-brand-accent text-white rounded-md">Login</Link>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-sm text-slate-700">{currentUser.name}</div>
              <button onClick={handleLogout} className="px-3 py-1 border rounded-md text-sm text-slate-700 hover:bg-slate-50">Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
