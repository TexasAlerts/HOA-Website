import { NextResponse } from 'next/server';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function POST(req) {
  const { id, token } = await req.json();
  if (!token || token !== ADMIN_TOKEN) return new NextResponse('Unauthorized', { status: 401 });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/endorsements?id=eq.${id}`, {
    method: 'DELETE',
    headers: {
      apikey: SUPABASE_SERVICE_ROLE,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
      'Content-Type': 'application/json'
    }
  });
  return NextResponse.json({ ok: true });
}
