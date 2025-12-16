import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

function PolicyCard({ policy, onApply }) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold">{policy.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{policy.description}</p>
      <p className="mt-3"><strong>Premium:</strong> ₹{policy.premium}</p>
      {policy.benefits && (
        <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
          {policy.benefits.split('\n').map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onApply(policy)}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
        >
          Apply Policy
        </button>
      </div>
    </div>
  );
}

export default function Policies() {
  const { category } = useParams();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // Fetch policies by category. Backend should support this query param.
    api.get('/policies', { params: { category } })
      .then((res) => {
        if (mounted) setPolicies(res.data || []);
      })
      .catch((err) => {
        console.error('Failed to load policies', err);
        setMessage('Could not load policies.');
      })
      .finally(() => setLoading(false));

    return () => { mounted = false; };
  }, [category]);

  const handleApply = async (policy) => {
    setMessage('Applying...');
    try {
      const resp = await api.post('/applications', { policyId: policy.id });
      setMessage('Application submitted successfully. Check Dashboard for status.');
    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.message || 'Failed to apply for policy.');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Policies — {decodeURIComponent(category)}</h1>
      {message && <div className="mb-4 text-sm text-blue-700">{message}</div>}
      {loading ? (
        <div>Loading policies…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.length ? policies.map((p) => (
            <PolicyCard key={p.id} policy={p} onApply={handleApply} />
          )) : (
            <div className="p-4 bg-white rounded shadow">No policies found for this category.</div>
          )}
        </div>
      )}
    </div>
  );
}
