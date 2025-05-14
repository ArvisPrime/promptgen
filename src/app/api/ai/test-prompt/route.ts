import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

/**
 * POST /api/ai/test-prompt
 * Body: { prompt: string; targetModel?: string }
 * Returns: { completion: string }
 */
export async function POST(request: Request) {
  try {
    const { prompt, targetModel = 'gpt-4' } = await request.json();
    const openaiClient = new OpenAIApi(
      new Configuration({ apiKey: process.env.OPENAI_API_KEY })
    );
    const completion = await openaiClient.createChatCompletion({
      model: targetModel,
      messages: [
        { role: 'system', content: 'You are an AI assistant.' },
        { role: 'user', content: prompt }
      ]
    });
    const content = completion.data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No response from AI');
    }
    return NextResponse.json({ completion: content });
  } catch (err: any) {
    console.error('Error in /api/ai/test-prompt:', err);
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    );
  }
}