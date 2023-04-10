import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { CurrentPlayerProvider } from '../provider/CurrentPlayerProvider';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <CurrentPlayerProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </CurrentPlayerProvider>
    </SessionProvider>
  )
}
