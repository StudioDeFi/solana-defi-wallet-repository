'use client';

import React, { Suspense } from 'react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { GlowCard } from '@/components/ui/GlowCard';
import { NeonText } from '@/components/ui/NeonText';
import { SwapInterface } from '@/components/swap/SwapInterface';
import { TokenList } from '@/components/tokens/TokenList';
import { Portfolio } from '@/components/portfolio/Portfolio';
import { Loader2 } from 'lucide-react';

// Loading component for Suspense boundaries
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12" role="status" aria-label="Loading">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
    <span className="sr-only">Loading...</span>
  </div>
);

// Error boundary fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="min-h-screen flex items-center justify-center p-4" role="alert">
    <GlowCard className="max-w-md w-full">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-text">Something went wrong</h2>
        <p className="text-text-secondary">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </GlowCard>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8" role="main">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8" role="banner">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              <NeonText size="xl">Solana Wallet</NeonText>
            </h1>
            <p className="text-text-secondary text-sm sm:text-base">
              Advanced Multi-Platform Wallet with MEV Protection
            </p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <ThemeSwitcher />
            <WalletButton />
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <GlowCard>
              <Suspense fallback={<LoadingSpinner />}>
                <SwapInterface />
              </Suspense>
            </GlowCard>
          </div>

          {/* Portfolio */}
          <div>
            <GlowCard>
              <Suspense fallback={<LoadingSpinner />}>
                <Portfolio />
              </Suspense>
            </GlowCard>
          </div>
        </div>

        {/* Token List */}
        <GlowCard>
          <Suspense fallback={<LoadingSpinner />}>
            <TokenList />
          </Suspense>
        </GlowCard>
      </div>
    </main>
  );
}

