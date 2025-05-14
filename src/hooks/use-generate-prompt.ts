import { useMutation } from '@tanstack/react-query';

interface GenerateRequest {
  templateId: string;
  rawInput: string;
  targetModel?: string;
}

interface GenerateResponse {
  refinedPrompt: string;
}

/**
 * Hook to generate a prompt via the AI endpoint.
 */
export function useGeneratePrompt() {
  return useMutation<GenerateResponse, Error, GenerateRequest>(
    async ({ templateId, rawInput, targetModel }) => {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId, rawInput, targetModel })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate prompt');
      }
      return data;
    }
  );
}