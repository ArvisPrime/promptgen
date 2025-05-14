import { useMutation } from '@tanstack/react-query';

interface TestRequest {
  prompt: string;
  targetModel?: string;
}

/**
 * Hook to test a prompt via the AI endpoint.
 */
export function useTestPrompt() {
  return useMutation<string, Error, TestRequest>(
    async ({ prompt, targetModel }) => {
      const res = await fetch('/api/ai/test-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, targetModel })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to test prompt');
      }
      return data.completion;
    }
  );
}