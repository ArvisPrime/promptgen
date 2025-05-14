"use client";
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * React Query provider to wrap the app with QueryClient.
 */
export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}