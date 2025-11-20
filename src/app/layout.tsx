import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@/components/wallet/WalletProvider';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AuraBackground } from '@/components/ui/AuraBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solana Wallet - Advanced Multi-Platform Wallet',
  description: 'Advanced Solana wallet with MEV protection, dynamic slippage, and multi-platform support',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WalletProvider>
          <ThemeProvider>
            <AuraBackground />
            {children}
          </ThemeProvider>
        </WalletProvider>
      </body>
    </html>
  );
}

