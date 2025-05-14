import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { Configuration, OpenAIApi } from 'openai';

/**
 * POST /api/ai/generate
 * Body: { templateId: string; rawInput: string; targetModel?: string; }
 * Returns: { refinedPrompt: string }
 */
export async function POST(request: Request) {
  try {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const openaiClient = new OpenAIApi(
      new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    );
    const { templateId, rawInput, targetModel = 'gpt-4' } = await request.json();

    // Fetch the template structure from Supabase
    const { data: tpl, error: tplError } = await supabase
      .from('templates')
      .select('structure')
      .eq('id', templateId)
      .single();
    if (tplError || !tpl) {
      return NextResponse.json(
        { error: tplError?.message || 'Template not found' },
        { status: 404 }
      );
    }

    // Fill in the raw input
    let promptText = tpl.structure.replace(/\[TOPIC\]/g, rawInput);
    promptText = promptText.replace(/\[SUBJECT\]/g, rawInput);

    // Generate a refined prompt via OpenAI
    const completion = await openaiClient.createChatCompletion({
      model: targetModel,
      messages: [
        { role: 'system', content: 'You are a helpful assistant for prompt engineering.' },
        { role: 'user', content: promptText }
      ]
    });
    const refinedPrompt = completion.data.choices?.[0]?.message?.content;
    if (!refinedPrompt) {
      throw new Error('No content returned from model');
    }

    return NextResponse.json({ refinedPrompt });
  } catch (err: any) {
    console.error('Error in /api/ai/generate:', err);
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}