// src/components/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";

const PLANS_KEY = "plans";
const APPS_KEY = "applications";

export default function UserDashboard() {
  const [plans, setPlans] = useState([]);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    const p = JSON.parse(localStorage.getItem(PLANS_KEY) || "[]");
    setPlans(p);
    const a = JSON.parse(localStorage.getItem(APPS_KEY) || "[]");
    setApplied(a);
  }, []);

  function handleApply(plan) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (!currentUser) {
      alert("Please login to apply.");
      return;
    }

    const newApp = { id: `app${Date.now()}`, planId: plan.id, userEmail: currentUser.email, appliedAt: new Date().toISOString() };
    const next = [newApp, ...applied];
    setApplied(next);
    localStorage.setItem(APPS_KEY, JSON.stringify(next));
    alert("Plan application saved locally. (Demo)");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Available Plans</h2>
        <p className="text-sm text-slate-500">Browse plans and click Apply to save your interest (demo uses browser storage).</p>
      </div>

      {plans.length === 0 && <p className="text-sm text-slate-500">No plans available.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map(p => <PlanCard key={p.id} plan={p} onApply={handleApply} isAdmin={false} />)}
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-medium">Your Saved Applications</h3>
        {applied.length === 0 && <p className="text-sm text-slate-500 mt-2">You have not applied to any plan yet.</p>}
        <ul className="mt-3 space-y-2">
          {applied.map(a => <li key={a.id} className="text-sm text-slate-700">{a.planId} — applied at {new Date(a.appliedAt).toLocaleString()}</li>)}
        </ul>
      </div>
    </div>
  );
}
