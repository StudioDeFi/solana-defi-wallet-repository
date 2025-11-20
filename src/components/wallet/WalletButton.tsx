'use client';

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWalletConnection } from '@/hooks/useWallet';
import { motion } from 'framer-motion';
import { Wallet, LogOut } from 'lucide-react';
import { shortenAddress } from '@/lib/solana';
import { NeonText } from '@/components/ui/NeonText';
import { cn } from '@/utils/cn';

export const WalletButton: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { balance, disconnect } = useWalletConnection();

  if (connected && publicKey) {
    return (
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="px-4 py-2 rounded-lg bg-surface/50 backdrop-blur-sm border border-border/50">
          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-primary" />
            <span className="text-sm text-text-secondary">
              {shortenAddress(publicKey.toString())}
            </span>
            <span className="text-sm font-medium text-text">
              {balance.toFixed(4)} SOL
            </span>
          </div>
        </div>
        <button
          onClick={disconnect}
          className={cn(
            'px-4 py-2 rounded-lg bg-surface/50 backdrop-blur-sm',
            'border border-border/50 hover:border-primary/50',
            'transition-all duration-200 flex items-center gap-2'
          )}
        >
          <LogOut size={16} className="text-text-secondary" />
          <span className="text-sm text-text-secondary">Disconnect</span>
        </button>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={() => setVisible(true)}
      className={cn(
        'px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent',
        'text-white font-semibold shadow-lg',
        'hover:shadow-xl transition-all duration-200',
        'flex items-center gap-2'
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Wallet size={20} />
      <NeonText size="sm" glowColor="#ffffff">Connect Wallet</NeonText>
    </motion.button>
  );
};

