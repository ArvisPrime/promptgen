import { useQuery } from '@tanstack/react-query';
import type { Template } from '@/types';

/**
 * Fetch templates from the API.
 */
async function fetchTemplates(): Promise<Template[]> {
  const res = await fetch('/api/templates');
  if (!res.ok) {
    throw new Error('Failed to fetch templates');
  }
  return res.json();
}

/**
 * React Query hook to get templates.
 */
export function useTemplates() {
  return useQuery<Template[], Error>({
    queryKey: ['templates'],
    queryFn: fetchTemplates,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}