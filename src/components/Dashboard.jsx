// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!u) {
      navigate("/login");
    } else {
      setCurrentUser(u);
    }
  }, []);

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className={`bg-white rounded-lg p-4 shadow-sm md:col-span-1 ${sidebarOpen ? "block" : "hidden md:block"}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-slate-800">{currentUser.name}</div>
            <div className="text-sm text-slate-500">{currentUser.role.toUpperCase()}</div>
          </div>
          <button onClick={() => { localStorage.removeItem("currentUser"); navigate("/login"); }} className="text-sm text-red-600 border px-2 py-1 rounded">Logout</button>
        </div>

        <nav className="space-y-2 text-sm">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50">Dashboard Home</button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50">My Policies</button>
          {currentUser.role === "admin" && <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50">Manage Plans</button>}
          <button className="w-full text-left px-3 py-2 rounded hover:bg-slate-50">Support</button>
        </nav>
      </aside>

      <section className="md:col-span-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-slate-800">Welcome, {currentUser.name}</h1>
          <div className="sm:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="px-3 py-2 border rounded">Menu</button>
          </div>
        </div>

        {currentUser.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
      </section>
    </div>
  );
}
