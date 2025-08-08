'use client';
import { useEffect, useState } from 'react';

export default function AdminEndorsements() {
  const [pending, setPending] = useState([]);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  useEffect(()=>{
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token') || '';
    setToken(t);
    if(!t){ setError('Missing admin token in URL.'); return; }
    load(t);
  }, []);

  async function load(t){
    const res = await fetch('/api/admin/pending?token=' + encodeURIComponent(t), { cache:'no-store' });
    if(!res.ok){ setError('Unauthorized or server error.'); return; }
    const data = await res.json();
    setPending(data || []);
  }

  async function act(id, action){
    const res = await fetch('/api/admin/' + action, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ id, token })
    });
    if(res.ok){ await load(token); }
  }

  if(error){
    return <div className="card"><h1 className="text-xl font-bold text-red-700">Admin</h1><p>{error}</p></div>;
  }

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Pending Endorsements</h1>
      {pending.length === 0 ? <p>No pending endorsements.</p> : (
        <ul className="space-y-3">
          {pending.map(e => (
            <li key={e.id} className="border rounded p-3 bg-wsr-gray">
              <div><b>{e.name}</b>{e.reason ? <span className="italic ml-1">— {e.reason}</span> : null}</div>
              <div className="mt-2 flex gap-2">
                <button className="btn" onClick={()=>act(e.id, 'approve')}>Approve</button>
                <button className="btn" onClick={()=>act(e.id, 'reject')}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
