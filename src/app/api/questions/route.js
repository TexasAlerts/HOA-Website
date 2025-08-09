import { NextResponse } from 'next/server';

// In production, replace with your DB (Supabase). For now, keep an in-memory store stub during dev.
// This file expects you to later wire Supabase tables: questions(id, name, email, question, answer, topic, status, created_at)

let _mem = [];

export async function GET() {
  // Publicly show only approved + answered
  const data = _mem.filter(x => x.status === 'approved' && x.answer);
  return NextResponse.json({ ok: true, data });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const item = {
      id: crypto.randomUUID(),
      name: String(body.name||'').slice(0,200),
      email: String(body.email||'').slice(0,200),
      question: String(body.question||'').slice(0,4000),
      answer: '',
      topic: '',
      status: 'pending',
      created_at: new Date().toISOString()
    };
    _mem.unshift(item);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}