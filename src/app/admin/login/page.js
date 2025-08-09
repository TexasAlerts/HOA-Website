'use client';
import { useState } from 'react';

export default function AdminLogin(){
  const [pwd,setPwd]=useState('');
  return (
    <main className="bg-white">
      <div className="banner-spacer" />
      <section className="section">
        <div className="mx-auto max-w-sm card p-6">
          <h1 className="h2">Admin Login</h1>
          <form className="mt-4" onSubmit={async(e)=>{e.preventDefault();const r=await fetch('/api/admin/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password:pwd})});if(r.ok) window.location.href='/admin/qna'; else alert('Invalid password');}}>
            <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Password" className="border rounded-2xl px-4 py-3 w-full" />
            <button className="btn btn-primary w-full mt-4" type="submit">Sign In</button>
          </form>
        </div>
      </section>
    </main>
  );
}