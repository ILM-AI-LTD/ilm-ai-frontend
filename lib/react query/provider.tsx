'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './client'

export default function ReactQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  const [queryClient] = useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={null}>
        {children}
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
