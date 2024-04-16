import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
    const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, { supabaseUrl:supabaseUrl, supabaseKey:supabaseAnonKey});
  await supabase.auth.getSession();
  return res;
};