'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/lib/get-query-client'
import { ProgressProvider } from '@bprogress/next/app'

export function Providers({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>
        <ProgressProvider
          style="style"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
        </ProgressProvider>
        <ReactQueryDevtools
          initialIsOpen={false}
          position="left"
          buttonPosition="bottom-left"
        />
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
