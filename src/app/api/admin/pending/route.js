import { NextResponse } from 'next/server';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');
  if (!token || token !== ADMIN_TOKEN) return new NextResponse('Unauthorized', { status: 401 });
  const res = await fetch(`${SUPABASE_URL}/rest/v1/endorsements?select=id,name,reason,approved,created_at&approved=eq.false&order=created_at.asc`, {
    headers: { apikey: SUPABASE_SERVICE_ROLE, Authorization: `Bearer ${SUPABASE_SERVICE_ROLE}` },
    cache: 'no-store'
  });
  const data = await res.json();
  return NextResponse.json(data);
}
