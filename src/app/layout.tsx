import type { Metadata } from 'next';
import './globals.css';
import { WalletProvider } from '@/components/wallet/WalletProvider';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { AuraBackground } from '@/components/ui/AuraBackground';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

// Note: Using Tailwind's default font-sans stack for better compatibility
// in offline/network-restricted environments (e.g., build servers, GitHub Pages).
// Provides good fallbacks: system-ui, -apple-system, etc.

export const metadata: Metadata = {
  title: {
    default: 'Solana Wallet - Advanced Multi-Platform Wallet',
    template: '%s | Solana Wallet',
  },
  description: 'Advanced Solana wallet with MEV protection, dynamic slippage, and multi-platform support. Swap tokens, manage your portfolio, and trade with confidence.',
  keywords: ['Solana', 'Wallet', 'DeFi', 'Crypto', 'MEV Protection', 'Swap', 'Trading', 'Blockchain'],
  authors: [{ name: 'StudioDeFi' }],
  creator: 'StudioDeFi',
  publisher: 'StudioDeFi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'Solana Wallet - Advanced Multi-Platform Wallet',
    description: 'Advanced Solana wallet with MEV protection, dynamic slippage, and multi-platform support',
    siteName: 'Solana Wallet',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Solana Wallet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solana Wallet - Advanced Multi-Platform Wallet',
    description: 'Advanced Solana wallet with MEV protection, dynamic slippage, and multi-platform support',
    images: ['/og-image.png'],
    creator: '@StudioDeFi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Solana Wallet',
              description: 'Advanced Solana wallet with MEV protection, dynamic slippage, and multi-platform support',
              url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans">
        <ErrorBoundary>
          <WalletProvider>
            <ThemeProvider>
              <AuraBackground />
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  },
                  success: {
                    iconTheme: {
                      primary: 'var(--color-primary)',
                      secondary: 'var(--color-text)',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: 'var(--color-text)',
                    },
                  },
                }}
              />
            </ThemeProvider>
          </WalletProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

