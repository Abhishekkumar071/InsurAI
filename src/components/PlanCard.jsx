// src/components/PlanCard.jsx
import React, { useEffect, useState } from "react";

export default function PlanCard({ plan, onApply, onEdit, onDelete, isAdmin }) {
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState(false);

  // Persist saved/favorite plans in localStorage for demo
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("savedPlans") || "[]");
    setSaved(savedList.includes(plan.id));
  }, [plan.id]);

  function toggleSave(e) {
    e.stopPropagation();
    const savedList = JSON.parse(localStorage.getItem("savedPlans") || "[]");
    let next;
    if (savedList.includes(plan.id)) {
      next = savedList.filter(id => id !== plan.id);
      setSaved(false);
    } else {
      next = [plan.id, ...savedList];
      setSaved(true);
    }
    localStorage.setItem("savedPlans", JSON.stringify(next));
  }

  const typeBadge = (type) => {
    const map = {
      "Term Life": "bg-amber-100 text-amber-800",
      "Health Insurance": "bg-emerald-100 text-emerald-800",
      "ULIP": "bg-indigo-100 text-indigo-800",
      "default": "bg-slate-100 text-slate-800"
    };
    return map[type] || map.default;
  };

  return (
    <article onClick={() => setExpanded(!expanded)} className="group bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="p-4 md:p-5 flex flex-col md:flex-row gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-tr from-brand-light to-brand-accent flex items-center justify-center text-white font-bold text-xl">{plan.name.split(" ")[0].charAt(0)}</div>
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-slate-800">{plan.name}</h3>
              <span className={`text-xs font-medium px-2 py-1 rounded ${typeBadge(plan.type)}`}>{plan.type}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1 line-clamp-2">{plan.description}</p>
            <div className="text-sm text-slate-700 mt-3 flex flex-wrap gap-3">
              <div className="text-sm"><strong>Premium:</strong> ₹{plan.premium}/mo</div>
              <div className="text-sm">•</div>
              <div className="text-sm"><strong>Coverage:</strong> ₹{plan.coverage}</div>
            </div>
          </div>
        </div>

        <div className="md:ml-auto flex items-center gap-3">
          <button onClick={(e) => { e.stopPropagation(); onApply && onApply(plan); }} className="px-4 py-2 bg-brand-accent text-white rounded-md text-sm">Apply</button>

          <button onClick={(e) => { e.stopPropagation(); toggleSave(e); }} aria-pressed={saved} className={`px-3 py-2 rounded-md border text-sm ${saved ? 'bg-amber-50 text-amber-700' : 'bg-white text-slate-700'}`}>
            {saved ? 'Saved' : 'Save'}
          </button>

          {isAdmin && <button onClick={(e) => { e.stopPropagation(); onEdit && onEdit(plan); }} className="px-3 py-2 bg-slate-100 text-slate-800 rounded-md text-sm border">Edit</button>}
          {isAdmin && <button onClick={(e) => { e.stopPropagation(); onDelete && onDelete(plan.id); }} className="px-3 py-2 bg-red-50 text-red-600 rounded-md text-sm border">Delete</button>}
        </div>
      </div>

      <div className={`px-4 pb-4 md:px-5 md:pb-5 transition-all duration-200 ${expanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="text-sm text-slate-700 mb-2"><strong>Features:</strong> {plan.features.join(', ')}</div>
        <div className="text-sm text-slate-600 mb-2"><em>Notes:</em> {plan.notes}</div>
        <div className="flex items-center gap-3">
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            {/* Visual coverage indicator: coverage relative to a rough scale */}
            <div className="h-2 bg-gradient-to-r from-brand-light to-brand-accent" style={{ width: `${Math.min(100, Math.round((plan.coverage / 1000000) * 100))}%` }} />
          </div>
          <div className="text-xs text-slate-500">Coverage strength</div>
        </div>
      </div>
    </article>
  );
}
