// src/components/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import PlanCard from "./PlanCard";

const PLANS_KEY = "plans";

function seedPlans() {
  // realistic sample plans inspired by common features (premium, coverage, riders, tax notes)
  return [
    {
      id: "p1",
      name: "Secure Term Plan",
      type: "Term Life",
      premium: 350,
      coverage: 5000000,
      description: "Pure term cover for family protection.",
      features: ["High sum assured", "Terminal illness cover"],
      notes: "Tax benefits under section 80C may apply."
    },
    {
      id: "p2",
      name: "Health Protect Plus",
      type: "Health Insurance",
      premium: 1200,
      coverage: 300000,
      description: "Family floater health plan with cashless network.",
      features: ["Cashless hospitalization", "Pre-existing disease covered after waiting period"],
      notes: "Covers daycare procedures and ambulance charges."
    },
    {
      id: "p3",
      name: "Savings ULIP Growth",
      type: "ULIP",
      premium: 2000,
      coverage: 1000000,
      description: "Combines investment with insurance cover.",
      features: ["Market-linked returns", "Partial withdrawals allowed"],
      notes: "Fund value may fluctuate; review fund performance."
    }
  ];
}

export default function AdminDashboard() {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [form, setForm] = useState({ name: "", type: "", premium: "", coverage: "", description: "", features: "", notes: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(PLANS_KEY) || "null");
    if (!stored) {
      const initial = seedPlans();
      localStorage.setItem(PLANS_KEY, JSON.stringify(initial));
      setPlans(initial);
    } else {
      setPlans(stored);
    }
  }, []);

  function savePlans(next) {
    setPlans(next);
    localStorage.setItem(PLANS_KEY, JSON.stringify(next));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function startCreate() {
    setEditingPlan(null);
    setForm({ name: "", type: "", premium: "", coverage: "", description: "", features: "", notes: "" });
  }

  function handleEdit(plan) {
    setEditingPlan(plan);
    setForm({ name: plan.name, type: plan.type, premium: plan.premium, coverage: plan.coverage, description: plan.description, features: plan.features.join(", "), notes: plan.notes });
  }

  function handleDelete(id) {
    if (!confirm("Delete this plan?")) return;
    const next = plans.filter(p => p.id !== id);
    savePlans(next);
    setMessage("Plan deleted.");
    setTimeout(() => setMessage(""), 2000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newPlan = {
      id: editingPlan ? editingPlan.id : `p${Date.now()}`,
      name: form.name,
      type: form.type,
      premium: Number(form.premium) || 0,
      coverage: Number(form.coverage) || 0,
      description: form.description,
      features: form.features.split(",").map(s => s.trim()).filter(Boolean),
      notes: form.notes
    };

    if (editingPlan) {
      const next = plans.map(p => p.id === editingPlan.id ? newPlan : p);
      savePlans(next);
      setMessage("Plan updated.");
    } else {
      const next = [newPlan, ...plans];
      savePlans(next);
      setMessage("Plan created.");
    }

    setEditingPlan(null);
    setForm({ name: "", type: "", premium: "", coverage: "", description: "", features: "", notes: "" });
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Admin Dashboard — Manage Plans</h2>
        <div className="text-sm text-slate-600">Total plans: {plans.length}</div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-slate-600">Create or edit plans below</div>
          <button onClick={startCreate} className="px-3 py-1 bg-slate-100 rounded">New plan</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Plan name" required className="border rounded px-3 py-2" />
          <input name="type" value={form.type} onChange={handleChange} placeholder="Type (e.g., Health/Term/ULIP)" required className="border rounded px-3 py-2" />
          <input name="premium" value={form.premium} onChange={handleChange} placeholder="Premium (per month)" className="border rounded px-3 py-2" />
          <input name="coverage" value={form.coverage} onChange={handleChange} placeholder="Coverage (sum assured)" className="border rounded px-3 py-2" />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Short description" className="border rounded px-3 py-2 md:col-span-2" />
          <input name="features" value={form.features} onChange={handleChange} placeholder="Features (comma separated)" className="border rounded px-3 py-2 md:col-span-2" />
          <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="border rounded px-3 py-2 md:col-span-2" />
          <div className="md:col-span-2 flex gap-3">
            <button type="submit" className="px-4 py-2 bg-brand-accent text-white rounded">{editingPlan ? "Save Changes" : "Create Plan"}</button>
            <button type="button" onClick={() => { setEditingPlan(null); setForm({ name: "", type: "", premium: "", coverage: "", description: "", features: "", notes: "" }); }} className="px-4 py-2 border rounded">Clear</button>
          </div>
        </form>
      </div>

      {message && <div className="p-3 bg-blue-50 text-slate-700 rounded">{message}</div>}

      <div className="grid gap-3">
        {plans.map(p => (<PlanCard key={p.id} plan={p} isAdmin={true} onEdit={handleEdit} onDelete={handleDelete} />))}
      </div>
    </div>
  );
}
