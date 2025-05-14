import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

/**
 * GET /api/prompts/featured
 * Fetches featured global prompts from Supabase.
 */
export async function GET() {
  const { data, error } = await supabase
    .from('global_prompts')
    .select('*')
    .eq('is_featured', true);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}