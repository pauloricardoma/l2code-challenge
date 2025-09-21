import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const queryClient = new QueryClient()

interface QueryClientContextProps {
  children: ReactNode
}

function QueryClientContext({ children }: QueryClientContextProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryClientContext;
