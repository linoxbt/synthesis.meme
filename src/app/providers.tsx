"use client";

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { bsc, bscTestnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { ThemeProvider, useTheme } from 'next-themes';

const config = getDefaultConfig({
  appName: 'Synthesis.meme',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'f0d6f8162be1beccf221b4e2f8bd7026', 
  chains: [bsc, bscTestnet],
  ssr: true, 
});

const queryClient = new QueryClient();

function RainbowKitWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  
  return (
    <RainbowKitProvider 
      theme={resolvedTheme === 'dark' 
        ? darkTheme({ accentColor: '#4DA2FF', accentColorForeground: '#0D1117', borderRadius: 'small', fontStack: 'system' }) 
        : lightTheme({ accentColor: '#1B6CCB', accentColorForeground: '#ffffff', borderRadius: 'small', fontStack: 'system' })
      }
    >
      {children}
    </RainbowKitProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
            {mounted ? (
               <RainbowKitWrapper>{children}</RainbowKitWrapper>
            ) : (
               <>{children}</>
            )}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
