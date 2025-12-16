import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const CATEGORY_OPTIONS = [
  'Term Life', 'Health', 'Car Insurance', 'Travel', 'Child Plans', 'Retirement', 'Home Insurance', 'Employee Group Insurance'
];

export default function AdminDashboard() {
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

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await api.get('/applications');
      setApps(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPolicy = async (e) => {
    e.preventDefault();
    setMsg('Adding policy...');
    try {
      const payload = {
        name: form.name,
        premium: Number(form.premium),
        description: form.description,
        benefits: form.benefits,
        category: form.category,
        terms: form.terms
      };
      await api.post('/policies', payload);
      setMsg('Policy added successfully.');
      setForm({ name: '', premium: '', description: '', benefits: '', category: CATEGORY_OPTIONS[0], terms: '' });
    } catch (err) {
      console.error(err);
      setMsg('Failed to add policy.');
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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>
      {msg && <div className="mb-4 text-center text-sm text-blue-700">{msg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add Policy</h2>
          <form onSubmit={handleAddPolicy} className="space-y-3">
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
            <div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Policy</button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Manage Applications</h2>
          <div className="space-y-3">
            {apps.length === 0 && <div className="text-sm text-gray-600">No applications yet.</div>}
            {apps.map((a) => (
              <div key={a.id} className="border rounded p-3 flex justify-between items-start">
                <div>
                  <div className="font-semibold">{a.policyName || a.policy?.name}</div>
                  <div className="text-sm text-gray-600">Applicant: {a.userName || a.user?.name}</div>
                  <div className="text-sm text-gray-600">Status: {a.status}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={()=>handleAppAction(a.id,'approved')} className="bg-green-600 text-white px-3 py-1 rounded">Approve</button>
                  <button onClick={()=>handleAppAction(a.id,'rejected')} className="bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
