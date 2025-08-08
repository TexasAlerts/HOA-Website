import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_TO = process.env.EMAIL_TO || 'dbcharles@me.com';
const EMAIL_FROM = process.env.EMAIL_FROM || 'notifications@example.com';

async function sendEmail(subject, html) {
  if (!RESEND_API_KEY) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ from: EMAIL_FROM, to: EMAIL_TO, subject, html })
  }).catch(()=>{});
}

export async function POST(req) {
  const payload = await req.json();
  const { name, email, phone, type, message } = payload;
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/interests`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify([{ name, email, phone, type, message }])
  });
  const data = await insertRes.json();
  await sendEmail(`New ${type} submission`, `<p><b>${name}</b> — ${email}${phone ? (' — '+phone) : ''}</p><p>${message || ''}</p>`);
  return NextResponse.json(data, { status: 201 });
}
