import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

/**
 * GET /api/templates
 * Fetches all prompt templates from Supabase.
 */
export async function GET() {
  const { data, error } = await supabase.from('templates').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}