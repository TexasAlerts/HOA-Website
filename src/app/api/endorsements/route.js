import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const ENABLE_MODERATION = (process.env.ENABLE_MODERATION || 'true').toLowerCase() === 'true';
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

export async function GET() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/endorsements?select=id,name,reason,created_at&order=created_at.desc`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    cache: 'no-store'
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req) {
  const { name, reason } = await req.json();
  const approved = ENABLE_MODERATION ? false : true;
  const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/endorsements`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify([{ name, reason, approved }])
  });
  const data = await insertRes.json();
  await sendEmail('New endorsement submitted', `<p><b>${name}</b>${reason ? ' — '+reason : ''}</p><p>Approved: ${approved}</p>`);
  return NextResponse.json(data, { status: 201 });
}
