import './globals.css';
import { Sidebar } from '../components/Sidebar';
import { Providers } from './providers';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ThemeToggle } from '../components/ThemeToggle';

export const metadata = {
  title: 'Synthesis.meme | Forge Your Meme Universe',
  description: 'AI-powered platform to create, analyze, and launch meme token ecosystems on the BNB Chain.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="dashboard-grid">
            <Sidebar />
            <main className="main-content">
              <header className="top-header">
                <div className="flex items-center gap-2">
                  <div className="pulse-dot" />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    BNB Chain · Live
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ThemeToggle />
                  <ConnectButton />
                </div>
              </header>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
