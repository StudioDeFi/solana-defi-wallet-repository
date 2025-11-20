'use client';

import React from 'react';
import { WalletButton } from '@/components/wallet/WalletButton';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { GlowCard } from '@/components/ui/GlowCard';
import { NeonText } from '@/components/ui/NeonText';
import { SwapInterface } from '@/components/swap/SwapInterface';
import { TokenList } from '@/components/tokens/TokenList';
import { Portfolio } from '@/components/portfolio/Portfolio';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <NeonText size="xl">Solana Wallet</NeonText>
            </h1>
            <p className="text-text-secondary">
              Advanced Multi-Platform Wallet with MEV Protection
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <WalletButton />
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Swap Interface */}
          <div className="lg:col-span-2">
            <GlowCard>
              <SwapInterface />
            </GlowCard>
          </div>

          {/* Portfolio */}
          <div>
            <GlowCard>
              <Portfolio />
            </GlowCard>
          </div>
        </div>

        {/* Token List */}
        <GlowCard>
          <TokenList />
        </GlowCard>
      </div>
    </main>
  );
}

