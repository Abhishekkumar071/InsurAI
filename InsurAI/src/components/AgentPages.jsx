import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const CATEGORY_OPTIONS = [
  'Term Life', 'Health', 'Car Insurance', 'Travel', 'Child Plans', 'Retirement', 'Home Insurance', 'Employee Group Insurance'
];

export default function AgentPages() {
  const [form, setForm] = useState({
    name: '',
    premium: '',
    description: '',
    benefits: '',
    category: CATEGORY_OPTIONS[0],
    terms: ''
  });
  const [apps, setApps] = useState([]);
  const [msg, setMsg] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
  const [policies, setPolicies] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [currentTab, setCurrentTab] = useState('policies');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    loadApplications();
    loadAllPolicies();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApps(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllPolicies = async () => {
    try {
      const res = await api.get('/policies');
      setAllPolicies(res.data || []);
    } catch (err) {
      console.error('Failed to load all policies', err);
    }
  };

  const handleAddPolicy = async (e) => {
    e.preventDefault();
    setMsg('Adding policy...');
    try {
      // Build payload to match backend entity fields: policyName, premiumAmount, category, description, benefits, termsConditions
      const payload = {
        policyName: form.name,
        premiumAmount: Number(form.premium),
        category: form.category,
        description: form.description,
        benefits: form.benefits,
        termsConditions: form.terms
      };

      const res = await api.post('/policies', payload);
      console.log('create policy response', res);
      setMsg('Policy added successfully.');
      setForm({ name: '', premium: '', description: '', benefits: '', category: CATEGORY_OPTIONS[0], terms: '' });
      // reload all policies
      loadAllPolicies();
    } catch (err) {
      console.error('Failed to add policy', err);
      // Show backend message if available
      const backendMsg = err?.response?.data || err.message;
      setMsg(`Failed to add policy: ${backendMsg}`);
    }
  };



  const handleSelectPolicy = (p) => {
    // populate form with policy data for editing
    setSelectedPolicy(p);
    setForm({
      name: p.policyName || p.name || '',
      premium: p.premiumAmount != null ? String(p.premiumAmount) : '',
      description: p.description || '',
      benefits: p.benefits || '',
      category: p.category || selectedCategory,
      terms: p.termsConditions || p.terms || ''
    });
    setMsg('Editing selected policy');
    setCurrentTab('create');
  };

  const handleUpdatePolicy = async (e) => {
    e.preventDefault();
    if (!selectedPolicy) return setMsg('No policy selected to update');
    setMsg('Updating policy...');
    try {
      const payload = {
        policyName: form.name,
        premiumAmount: Number(form.premium),
        category: form.category,
        description: form.description,
        benefits: form.benefits,
        termsConditions: form.terms
      };
      const res = await api.put(`/policies/${selectedPolicy.policyId || selectedPolicy.id}`, payload);
      console.log('update response', res);
      setMsg('Policy updated successfully.');
      setSelectedPolicy(null);
      setForm({ name: '', premium: '', description: '', benefits: '', category: CATEGORY_OPTIONS[0], terms: '' });
      loadAllPolicies();
      setCurrentTab('policies');
    } catch (err) {
      console.error('Failed to update policy', err);
      const backendMsg = err?.response?.data || err.message;
      setMsg(`Failed to update policy: ${backendMsg}`);
    }
  };

  const handleDeletePolicy = async (p) => {
    const confirm = window.confirm('Delete policy "' + (p.policyName || p.name) + '"? This cannot be undone.');
    if (!confirm) return;
    setMsg('Deleting policy...');
    try {
      await api.delete(`/policies/${p.policyId || p.id}`);
      setMsg('Policy deleted');
      // refresh list
      loadAllPolicies();
    } catch (err) {
      console.error('Failed to delete policy', err);
      const backendMsg = err?.response?.data || err.message;
      setMsg(`Failed to delete policy: ${backendMsg}`);
    }
  };

  const handleAppAction = async (id, status) => {
    try {
      await api.patch(`/applications/${id}`, { status });
      setMsg(`Application ${status}`);
      loadApplications();
    } catch (err) {
      console.error(err);
      setMsg('Failed to update application.');
    }
  };

  // sorting helper
  const sortedPolicies = () => {
    const copy = [...allPolicies];
    copy.sort((a, b) => {
      if (sortBy === 'name') {
        const na = (a.policyName || a.name || '').toLowerCase();
        const nb = (b.policyName || b.name || '').toLowerCase();
        if (na < nb) return sortDir === 'asc' ? -1 : 1;
        if (na > nb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      }
      if (sortBy === 'premium') {
        const pa = Number(a.premiumAmount || a.premium || 0);
        const pb = Number(b.premiumAmount || b.premium || 0);
        return sortDir === 'asc' ? pa - pb : pb - pa;
      }
      return 0;
    });
    return copy;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-extrabold text-slate-800">Agent Portal</h1>
          <div className="flex gap-2">
            <button onClick={() => { setCurrentTab('policies'); setMsg(''); }} className={`px-4 py-2 rounded-full font-medium transition ${currentTab === 'policies' ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg' : 'bg-white border'}`}>Policies</button>
            <button onClick={() => { setCurrentTab('applications'); setMsg(''); }} className={`px-4 py-2 rounded-full font-medium transition ${currentTab === 'applications' ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-lg' : 'bg-white border'}`}>Applications</button>
            <button onClick={() => { setCurrentTab('create'); setMsg(''); setSelectedPolicy(null); }} className={`px-4 py-2 rounded-full font-medium transition ${currentTab === 'create' ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg' : 'bg-white border'}`}>Create</button>
          </div>
        </header>

        {msg && <div className="mb-2 text-center text-sm text-indigo-700">{msg}</div>}

        {/* Policies Tab */}
        {currentTab === 'policies' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">All Policies</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded p-2">
                    <label className="text-sm text-gray-600">Sort</label>
                    <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="text-sm border rounded px-2 py-1">
                      <option value="name">Name</option>
                      <option value="premium">Premium</option>
                    </select>
                    <button onClick={()=>setSortDir(sortDir==='asc'?'desc':'asc')} className="px-2 py-1 bg-white border rounded text-sm">{sortDir === 'asc' ? '▲' : '▼'}</button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto border rounded">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="text-left bg-slate-50">
                      <th className="py-3 px-4 text-sm text-slate-600">Policy Name</th>
                      <th className="py-3 px-4 text-sm text-slate-600">Premium</th>
                      <th className="py-3 px-4 text-sm text-slate-600">Category</th>
                      <th className="py-3 px-4 text-sm text-slate-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPolicies.length === 0 && (
                      <tr><td colSpan={4} className="py-6 text-center text-sm text-gray-500">No policies yet.</td></tr>
                    )}
                    {sortedPolicies().map((p) => (
                      <tr key={p.policyId || p.id} className={`border-b transition hover:bg-gray-50 ${hoveredCategory && (p.category||'').toLowerCase() === hoveredCategory.toLowerCase() ? 'bg-yellow-50' : ''}`}>
                        <td className="py-3 px-4">{p.policyName || p.name}</td>
                        <td className="py-3 px-4">₹{p.premiumAmount || p.premium}</td>
                        <td className="py-3 px-4">{p.category}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleSelectPolicy(p)} className="text-sm px-3 py-1 bg-amber-400 rounded hover:scale-105 transition">Edit</button>
                            <button onClick={() => handleDeletePolicy(p)} className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:scale-105 transition">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="xl:col-span-4 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Policy Category Distribution</h3>
              <PolicyChart policies={allPolicies} categories={CATEGORY_OPTIONS} onHoverCategory={setHoveredCategory} />
              <div className="mt-4 text-xs text-gray-500">Hover bars to highlight matching policies above.</div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {currentTab === 'applications' && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Manage Applications</h2>
            <div className="space-y-3">
              {apps.length === 0 && <div className="text-sm text-gray-600">No applications yet.</div>}
              {apps.map((a) => (
                <div key={a.id} className="border rounded p-3 flex justify-between items-start hover:shadow-md transition">
                  <div>
                    <div className="font-semibold text-slate-700">{a.policyName || a.policy?.name}</div>
                    <div className="text-sm text-gray-600">Applicant: {a.userName || a.user?.name}</div>
                    <div className="text-sm text-gray-600">Status: <span className={`px-2 py-0.5 rounded ${a.status === 'approved' ? 'bg-green-100 text-green-800' : a.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{a.status}</span></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={()=>handleAppAction(a.id,'approved')} className="bg-green-600 text-white px-3 py-1 rounded hover:scale-105 transition">Approve</button>
                    <button onClick={()=>handleAppAction(a.id,'rejected')} className="bg-red-600 text-white px-3 py-1 rounded hover:scale-105 transition">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Tab */}
        {currentTab === 'create' && (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{selectedPolicy ? 'Edit Policy' : 'Create Policy'}</h2>
            <form onSubmit={(e) => selectedPolicy ? handleUpdatePolicy(e) : handleAddPolicy(e)} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Policy Name</label>
                <input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="mt-1 w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Premium Amount</label>
                <input required type="number" value={form.premium} onChange={(e)=>setForm({...form,premium:e.target.value})} className="mt-1 w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Category</label>
                <select value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} className="mt-1 w-full border rounded px-3 py-2">
                  {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} className="mt-1 w-full border rounded px-3 py-2" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium">Benefits (one per line)</label>
                <textarea value={form.benefits} onChange={(e)=>setForm({...form,benefits:e.target.value})} className="mt-1 w-full border rounded px-3 py-2" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium">Terms & Conditions</label>
                <textarea value={form.terms} onChange={(e)=>setForm({...form,terms:e.target.value})} className="mt-1 w-full border rounded px-3 py-2" rows={3} />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded">{selectedPolicy ? 'Update Policy' : 'Add Policy'}</button>
                {selectedPolicy && (
                  <button type="button" onClick={() => { setSelectedPolicy(null); setForm({ name: '', premium: '', description: '', benefits: '', category: CATEGORY_OPTIONS[0], terms: '' }); setMsg(''); }} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">Cancel</button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

function PolicyChart({ policies, categories, onHoverCategory }) {
  const [hover, setHover] = useState(null);

  const counts = categories.map((c, idx) => {
    const count = (policies || []).filter((p) => (p.category || '').toLowerCase() === c.toLowerCase()).length;
    return { category: c, count, idx };
  });

  const max = Math.max(1, ...counts.map((c) => c.count));

  const colors = [
    'from-blue-500 to-indigo-500',
    'from-green-400 to-teal-500',
    'from-yellow-400 to-orange-400',
    'from-pink-400 to-rose-500',
    'from-purple-400 to-violet-500',
    'from-sky-400 to-cyan-500',
    'from-lime-400 to-emerald-500',
    'from-gray-400 to-gray-600'
  ];

  return (
    <div>
      {counts.map((c) => {
        const pct = policies.length ? Math.round((c.count / policies.length) * 100) : 0;
        const color = colors[c.idx % colors.length];
        return (
          <div key={c.category} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-800">{c.category}</div>
              <div className="text-sm text-gray-600">{c.count}</div>
            </div>
            <div
              onMouseEnter={() => { setHover(c); onHoverCategory && onHoverCategory(c.category); }}
              onMouseLeave={() => { setHover(null); onHoverCategory && onHoverCategory(null); }}
              className="w-full bg-gray-100 rounded h-6 relative overflow-hidden cursor-pointer"
              aria-label={`${c.category}: ${c.count} policies (${pct}%)`}
            >
              <div
                className={`absolute left-0 top-0 h-6 rounded ${hover && hover.category === c.category ? 'scale-y-105 transform' : ''}`}
                style={{
                  width: `${(c.count / (max || 1)) * 100}%`,
                  background: `linear-gradient(90deg, var(--tw-gradient-stops))`
                }}
              >
                <div className={`h-6 w-full bg-gradient-to-r ${color} transition-all duration-300`} />
              </div>
              {hover && hover.category === c.category && (
                <div className="absolute right-2 top-1 text-xs bg-white/90 px-2 py-0.5 rounded shadow">{c.count} ({pct}%)</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
