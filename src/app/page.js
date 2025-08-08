'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [formType, setFormType] = useState('updates');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [thanks, setThanks] = useState(false);
  const [endorsements, setEndorsements] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/endorsements', { cache: 'no-store' });
      const data = await res.json();
      setEndorsements(data || []);
    }
    load();
  }, []);

  async function submit(e) {
    e.preventDefault();
    const type = formType;
    if (type === 'endorsement') {
      await fetch('/api/endorsements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, reason: form.message })
      });
    } else {
      await fetch('/api/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type })
      });
    }
    setThanks(true);
    setForm({ name: '', email: '', phone: '', message: '' });
  }

  return (
    <div className="space-y-8">
      <section className="card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-4xl font-extrabold text-wsr-red tracking-widest">VOTE</div>
            <h1 className="text-2xl font-bold mt-2">Doug Charles for Windsong Ranch HOA Board of Directors</h1>
            <p className="text-sm mt-1">Transparency. Stewardship. Listening.</p>
            <p className="mt-3 italic">“Whether you live in the townhomes, the villas, or any neighborhood in Windsong Ranch, I will be an active representative for you.”</p>
            <div className="mt-4 flex gap-3">
              <a className="btn" href="/endorsements">Endorse Doug</a>
              <a className="btn" href="#get-involved">Get Involved</a>
              <a className="btn" href="/voting">Voting Info</a>
            </div>
          </div>
          <img src="/headshot.jpg" alt="Doug Charles" className="h-32 w-32 rounded-full border-4 border-wsr-navy shadow-lg" />
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-bold mb-2">Meet Doug</h2>
        <p>
          With over 25 years of executive leadership experience—including two terms on the Town of Prosper Planning & Zoning Commission,
          service on the Town Bond Committee, and prior HOA Boards—I bring deep experience in budgeting, vendor management, and community engagement.
          I’m a strong advocate for Windsong Ranch and the broader West Side.
        </p>
        <div className="bg-wsr-gray border-l-4 border-wsr-red p-3 mt-3 italic">
          “I believe our assessments, contracts, and community resources should always reflect the will and interests of the homeowners—not just a few.
          My goal is to maintain and improve the Windsong Ranch lifestyle and exceptional amenities, today and tomorrow.”
        </div>
      </section>

      <section className="card">
        <h2 className="text-xl font-bold mb-2">My Commitments to Windsong Ranch</h2>
        <ul className="space-y-2">
          <li>✔ Manage the reserve fund to ensure we have the financial reserves to meet expected and unexpected demands.</li>
          <li>✔ Minimize unnecessary assessment increases while preserving and enhancing the WSR unique lifestyle—serving everyone from young families to empty nesters.</li>
          <li>✔ Ensure transparency in all board decisions, contracts, and spending.</li>
          <li>✔ Wise financial stewardship with vendors, contractors, and commitments—keep assessments reasonable; require all changes to be documented, communicated, and transparent.</li>
          <li>✔ Powerful Homeowner Voice: as one of the first two homeowner-elected board members, I’ll champion real mechanisms for homeowner input.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-xl font-bold mb-2">Recent Endorsements</h2>
        <div className="h-24 overflow-y-auto bg-wsr-gray rounded p-2">
          <ul className="space-y-1 text-sm">
            {endorsements.map(e => (
              <li key={e.id}><b>{e.name}</b>{e.reason ? <span className="italic ml-1">— {e.reason}</span> : null}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="get-involved" className="card">
        <h2 className="text-xl font-bold mb-2">Get Involved</h2>
        {!thanks ? (
          <form onSubmit={submit} className="grid grid-cols-1 gap-3">
            <select className="border p-2 rounded" value={formType} onChange={e=>setFormType(e.target.value)}>
              <option value="updates">Join Email/Text List</option>
              <option value="endorsement">Endorse Doug</option>
              <option value="volunteer">Volunteer: Door Knock</option>
              <option value="host">Host Home Meeting</option>
              <option value="meeting">Request a Meeting</option>
            </select>
            <input className="border p-2 rounded" placeholder="Name" required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <input className="border p-2 rounded" type="email" placeholder="Email" required value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            {(formType==='updates' || formType==='volunteer') and (""=="" ) and (
              <input className="border p-2 rounded" placeholder="Mobile (optional)" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
            )}
            {(formType==='endorsement' || formType==='host' || formType==='meeting') && (
              <textarea className="border p-2 rounded" rows={3} placeholder={formType==='endorsement' ? 'Why do you endorse Doug?' : 'Message (optional)'} value={form.message} onChange={e=>setForm({...form, message:e.target.value})}></textarea>
            )}
            <button className="btn" type="submit">Submit</button>
          </form>
        ) : (
          <div className="bg-green-100 text-green-700 p-3 rounded text-center font-semibold">Thank you—your submission was received!</div>
        )}
      </section>
    </div>
  );
}
