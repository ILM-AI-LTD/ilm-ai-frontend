import { QueryClient } from '@tanstack/react-query'

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  })
}
