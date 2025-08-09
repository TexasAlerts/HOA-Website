'use client';
import { useEffect, useState } from 'react';

export default function AdminQnA(){
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);

  async function load(){
    setLoading(true);
    const r = await fetch('/api/admin/qna');
    if(r.status===401){ window.location.href='/admin/login'; return; }
    const j = await r.json(); setItems(j.data||[]); setLoading(false);
  }

  useEffect(()=>{ load(); },[]);

  async function saveAnswer(id){
    const answer = prompt('Enter answer:');
    if(!answer) return;
    const r = await fetch('/api/admin/qna',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id,answer,action:'approve'})});
    if(r.ok) load(); else alert('Failed to save');
  }

  async function reject(id){
    const r = await fetch('/api/admin/qna',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({id,action:'reject'})});
    if(r.ok) load(); else alert('Failed to reject');
  }

  if(loading) return <main className="bg-white"><div className="banner-spacer" /><section className="section"><div className="mx-auto max-w-4xl">Loading…</div></section></main>;

  return (
    <main className="bg-white">
      <div className="banner-spacer" />
      <section className="section">
        <div className="mx-auto max-w-4xl">
          <h1 className="h2">Q&A Moderation</h1>
          <div className="mt-4 grid gap-4">
            {items.length===0 && <div className="subtle">No pending questions.</div>}
            {items.map(q=> (
              <div key={q.id} className="card p-5">
                <div className="text-sm text-gray-500">{q.created_at?.slice(0,10)} · {q.email}</div>
                <div className="font-heading text-lg mt-1">Q: {q.question}</div>
                <div className="mt-3 flex gap-3">
                  <button className="btn btn-primary" onClick={()=>saveAnswer(q.id)}>Answer & Approve</button>
                  <button className="btn btn-secondary" onClick={()=>reject(q.id)}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
