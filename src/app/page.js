'use client';
import Image from 'next/image';
import { useRef } from 'react';

export default function HomePage() {
  const formRef = useRef(null);
  const scrollToForms = (e) => { e.preventDefault(); formRef.current?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <main className="bg-white">
      <div className="banner-spacer" />
      {/* HERO */}
      <section className="section bg-gradient-to-br from-sand to-sky/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="h1">Your Voice. Your Vote. Our Windsong.</h1>
            <p className="mt-4 text-lg subtle">
              For the first time, homeowners will elect two representatives to our HOA Board—joining three developer-appointed members.
              These seats will set the tone for the transition to a fully homeowner-led board in the near future.
              I’m <strong>Doug Charles</strong>, and I’m running for <em>purpose</em>—to listen, advocate, and represent <strong>every neighborhood</strong> in Windsong Ranch
              with transparency, fiscal responsibility, and an open door for every neighbor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#get-involved" onClick={scrollToForms} className="btn btn-accent">Endorse Doug</a>
              <a href="#get-involved" onClick={scrollToForms} className="btn btn-secondary">Get Involved</a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image src="/headshot.jpg" alt="Doug Charles" width={288} height={288} priority className="rounded-full object-cover portrait-object-top shadow-card" />
          </div>
        </div>
      </section>

      {/* PROMISES */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-5">
          <div className="card p-5">
            <h3 className="font-heading text-xl">Transparency You Can Trust</h3>
            <p className="mt-2 subtle">I will advocate for clear, plain-language explanations of budgets, contracts, and decisions—and I’ll be available to every resident to answer questions and provide real answers.</p>
          </div>
          <div className="card p-5">
            <h3 className="font-heading text-xl">Owner Power</h3>
            <p className="mt-2 subtle">We’ll staff committees with Windsong’s talented, passionate, expert homeowners—so governance reflects the people who live here.</p>
          </div>
          <div className="card p-5">
            <h3 className="font-heading text-xl">One Windsong</h3>
            <p className="mt-2 subtle">Townhomes, Villas, Peninsula, Crosswater, and every street—no neighborhood left behind.</p>
          </div>
        </div>
      </section>

      {/* MEET DOUG */}
      <section className="section bg-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <h2 className="h2">Meet Doug</h2>
            <p className="mt-3 subtle">I’ve been proud to call Windsong Ranch home since 2015, living in both Crosswater and the Peninsula. I’ve served on Prosper’s Planning & Zoning Commission, the Town Bond Committee, and prior HOA boards—always advocating for fair representation and smart growth. Professionally, I’m a Senior VP in financial services with 25+ years leading budgets, contracts, and complex projects.</p>
            <p className="mt-3 subtle">These first two homeowner seats may not yet create a homeowner majority, but they will <strong>set the standard</strong> for the day residents take full governance. I’m ready to help us start that chapter the right way.</p>
          </div>
        </div>
      </section>

      {/* NEIGHBORHOOD UNITY */}
      <section className="section">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="h2">One Windsong, Every Voice</h2>
          <p className="mt-2 subtle">From unique needs (like distinct assessments) to shared priorities, every neighborhood deserves representation and respect.</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
            {['Anthem','Cadence','Creekside','Crosswater','The Enclave','Lakeside','The Landing','The Overlook','The Peninsula','The Pinnacle','The Point','The Summit','The Townhomes','The Villas','Northview','The Crossing'].map(n => (
              <div key={n} className="card px-3 py-3 text-sm">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="section bg-gradient-to-r from-sand to-sky/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="h2">We Live in a Community Worth Protecting</h2>
          <p className="mt-2 subtle">From The Lagoon and trails to parks, amphitheater events, and shared green spaces—Windsong is built for connection. Good governance keeps it thriving today and strong for tomorrow.</p>
        </div>
      </section>

      {/* Q&A SUBMIT */}
      <section className="section" id="ask">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="h2">Ask Doug a Question</h2>
            <p className="mt-2 subtle">Have a question for the Candidate Forum—or anytime? Send it here. I’ll answer and post them on this page, so check back soon.</p>
          </div>
          <form className="card p-5" onSubmit={async(e)=>{e.preventDefault();const f=new FormData(e.currentTarget);const payload={name:String(f.get('name')||''),email:String(f.get('email')||''),question:String(f.get('question')||'')};const res=await fetch('/api/questions',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});if(res.ok){alert('Thanks! I\'ll review and post an answer here soon.');e.currentTarget.reset();}else{alert('Something went wrong.');}}}>
            <input name="name" required placeholder="Name" className="border rounded-2xl px-4 py-3 w-full" />
            <input name="email" required type="email" placeholder="Email" className="border rounded-2xl px-4 py-3 w-full mt-3" />
            <textarea name="question" required rows={5} placeholder="Your question" className="border rounded-2xl px-4 py-3 w-full mt-3" />
            <button type="submit" className="btn btn-primary mt-4">Submit Question</button>
          </form>
        </div>
      </section>

      {/* Q&A LIST (published) */}
      <section className="section" id="qna">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="h2">Questions & Answers</h2>
          <QnaList />
        </div>
      </section>

      {/* ENDORSEMENTS & GET INVOLVED remain as in your project, or we can refactor later */}
      <section id="get-involved" ref={formRef} className="section bg-sand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="h2">Get Involved</h2>
          <p className="mt-2 subtle">Select how you’d like to participate—endorse, volunteer, host, or request a meeting.</p>
          {/* Keep your existing forms here or use the simple version from earlier iterations */}
        </div>
      </section>

      <footer className="section border-t">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <nav className="flex gap-5 text-sm"><a href="/voting">Voting Info</a><a href="#qna">Q&A</a><a href="#get-involved">Get Involved</a><a href="/endorsements">Endorsements</a></nav>
          <div className="text-xs subtle">Self-funded by Doug Charles.</div>
        </div>
      </footer>
    </main>
  );
}

// Lightweight client component to fetch and render approved Q&A
function QnaList() {
  const [items, setItems] = React.useState([]);
  React.useEffect(()=>{ (async()=>{ const r = await fetch('/api/questions'); const j = await r.json(); if(j?.ok) setItems(j.data||[]); })(); },[]);
  if(!items?.length) return <p className="subtle mt-3">Answers will appear here as they’re posted. Check back soon.</p>;
  return (
    <div className="mt-4 grid gap-4">
      {items.map(q => (
        <div key={q.id} className="card p-5">
          <div className="text-sm text-gray-500">{q.topic || 'General'}</div>
          <h3 className="font-heading text-lg mt-1">Q: {q.question}</h3>
          <p className="mt-2">A (Doug): {q.answer}</p>
        </div>
      ))}
    </div>
  );
}