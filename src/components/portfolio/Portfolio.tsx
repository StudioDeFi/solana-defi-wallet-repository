'use client';

import React from 'react';
import { useWalletConnection } from '@/hooks/useWallet';
import { Wallet, TrendingUp } from 'lucide-react';
import { NeonText } from '@/components/ui/NeonText';

export const Portfolio: React.FC = () => {
  const { connected, balance } = useWalletConnection();

  if (!connected) {
    return (
      <div className="text-center py-8">
        <Wallet size={48} className="mx-auto mb-4 text-text-secondary" />
        <p className="text-text-secondary">Connect wallet to view portfolio</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        <NeonText>Portfolio</NeonText>
      </h2>
      
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-surface/50 border border-border/50">
          <div className="text-sm text-text-secondary mb-1">Total Balance</div>
          <div className="text-3xl font-bold text-text">
            {balance.toFixed(4)} SOL
          </div>
          <div className="text-sm text-text-secondary mt-1">
            ≈ ${(balance * 100).toFixed(2)} USD
          </div>
        </div>

        <div className="p-4 rounded-lg bg-surface/50 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">24h Change</span>
            <div className="flex items-center gap-1 text-green-400">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+2.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

