'use client';
import { useEffect, useState } from 'react';

export default function EndorsementsPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name:'', reason:'' });
  const [thanks, setThanks] = useState(false);

  async function load() {
    const res = await fetch('/api/endorsements', { cache: 'no-store' });
    const data = await res.json();
    setList(data || []);
  }
  useEffect(()=>{ load(); }, []);

  async function submit(e){
    e.preventDefault();
    await fetch('/api/endorsements', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    });
    setThanks(true);
    setForm({ name:'', reason:'' });
  }

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4">Endorse Doug</h1>
      {!thanks ? (
        <form onSubmit={submit} className="grid gap-3 mb-6">
          <input className="border p-2 rounded" placeholder="Your Name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
          <textarea className="border p-2 rounded" rows={3} placeholder="Why do you endorse Doug? (optional)" value={form.reason} onChange={e=>setForm({...form, reason:e.target.value})}></textarea>
          <button className="btn" type="submit">Submit Endorsement</button>
        </form>
      ) : (
        <div className="bg-green-100 text-green-700 p-3 rounded text-center font-semibold mb-6">Thanks! Your endorsement was submitted for review.</div>
      )}

      <h2 className="text-xl font-bold mb-2">Approved Endorsements</h2>
      <ul className="space-y-2">
        {list.map(e => (
          <li key={e.id} className="border rounded p-2 bg-wsr-gray">
            <b>{e.name}</b>{e.reason ? <span className="italic ml-1">— {e.reason}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
