import { NextResponse } from 'next/server';

let _memRef = null;
function getStore(){
  // reach into the questions store module (same in-memory array used by /api/questions)
  if(!_memRef){
    _memRef = global.__QUESTIONS__ || [];
  }
  return _memRef;
}

// attach to global for simple dev-only memory persistence across module reloads
if(!global.__QUESTIONS__) global.__QUESTIONS__ = [];

function requireAdmin(req){
  const cookie = req.cookies.get('admin_session');
  if(!cookie || cookie.value!=='1') return false;
  return true;
}

export async function GET(req){
  if(!requireAdmin(req)) return NextResponse.json({ ok:false }, { status: 401 });
  const store = getStore();
  const pending = store.filter(x=>x.status==='pending');
  return NextResponse.json({ ok:true, data: pending });
}

export async function POST(req){
  if(!requireAdmin(req)) return NextResponse.json({ ok:false }, { status: 401 });
  const { id, action, answer } = await req.json();
  const store = getStore();
  const idx = store.findIndex(x=>x.id===id);
  if(idx<0) return NextResponse.json({ ok:false, error:'not found' }, { status: 404 });
  if(action==='approve'){
    store[idx].answer = String(answer||'');
    store[idx].status = 'approved';
  } else if(action==='reject'){
    store[idx].status = 'rejected';
  }
  return NextResponse.json({ ok:true });
}


# NOTE: IMPORTANT DB WIRING (to replace the in-memory arrays)
# Supabase tables:
#   questions(id uuid primary key default gen_random_uuid(), name text, email text, question text, answer text, topic text, status text default 'pending', created_at timestamptz default now())
#   endorsements(...) and interest(...) as previously discussed
# Replace the in-memory stores in /api/questions and /api/admin/qna with Supabase client calls when ready.

# Also add your PDF to: public/docs/board-member-101.pdf