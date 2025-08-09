import { NextResponse } from 'next/server';

export async function POST(req){
  const { password } = await req.json();
  if(password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD){
    const res = NextResponse.json({ ok: true });
    res.cookies.set('admin_session','1',{ httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60*60*8 });
    return res;
  }
  return NextResponse.json({ ok:false }, { status: 401 });
}
