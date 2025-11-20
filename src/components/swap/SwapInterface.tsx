'use client';

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { sdk } from '@/api/sdk';
import { SwapQuote } from '@/types';
import { GlowCard } from '@/components/ui/GlowCard';
import { NeonText } from '@/components/ui/NeonText';
import { ArrowDownUp, Zap, Shield, Gauge } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export const SwapInterface: React.FC = () => {
  const { connected } = useWallet();
  const [inputToken, setInputToken] = useState<string>('SOL');
  const [outputToken, setOutputToken] = useState<string>('USDC');
  const [amount, setAmount] = useState<string>('');
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiMode, setApiMode] = useState<'ultra' | 'standard' | 'lite'>('ultra');

  const handleGetQuote = async () => {
    if (!amount || !connected) {
      toast.error('Please connect wallet and enter amount');
      return;
    }

    setLoading(true);
    try {
      let result: SwapQuote;
      
      switch (apiMode) {
        case 'ultra':
          result = await sdk.getUltraSwapQuote(
            inputToken,
            outputToken,
            amount,
            {
              mevProtection: true,
              dynamicSlippage: true,
              priorityFee: 'medium',
            }
          );
          break;
        case 'standard':
          result = await sdk.getStandardSwapQuote(inputToken, outputToken, amount);
          break;
        case 'lite':
          result = await sdk.getLiteSwapQuote(inputToken, outputToken, amount);
          break;
      }
      
      setQuote(result);
      toast.success('Quote received!');
    } catch (error) {
      console.error('Error getting quote:', error);
      toast.error('Failed to get quote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          <NeonText>Swap Tokens</NeonText>
        </h2>
        
        {/* API Mode Selector */}
        <div className="flex gap-2">
          {[
            { mode: 'ultra' as const, icon: Shield, label: 'Ultra', desc: 'MEV Protection' },
            { mode: 'standard' as const, icon: Gauge, label: 'Standard', desc: 'Balanced' },
            { mode: 'lite' as const, icon: Zap, label: 'Lite', desc: 'Fast' },
          ].map(({ mode, icon: Icon, label, desc }) => (
            <button
              key={mode}
              onClick={() => setApiMode(mode)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                apiMode === mode
                  ? 'border-primary bg-primary/20 text-primary'
                  : 'border-border text-text-secondary hover:border-primary/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon size={16} />
                <div className="text-left">
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-xs opacity-75">{desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Swap Inputs */}
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-surface/50 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">From</span>
            <span className="text-sm text-text-secondary">Balance: 0.00</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="flex-1 bg-transparent text-2xl font-bold text-text outline-none"
            />
            <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary font-medium">
              {inputToken}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-surface border border-border"
          >
            <ArrowDownUp size={20} />
          </motion.button>
        </div>

        <div className="p-4 rounded-lg bg-surface/50 border border-border/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">To</span>
            <span className="text-sm text-text-secondary">≈ $0.00</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 text-2xl font-bold text-text">
              {quote ? parseFloat(quote.outAmount) / 1e9 : '0.0'}
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary/20 text-primary font-medium">
              {outputToken}
            </button>
          </div>
        </div>
      </div>

      {/* Quote Details */}
      {quote && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-surface/30 border border-border/30"
        >
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Price Impact</span>
              <span className="text-text">{quote.priceImpactPct.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Route</span>
              <span className="text-text">{quote.routePlan.length} hop(s)</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Swap Button */}
      <button
        onClick={handleGetQuote}
        disabled={loading || !connected}
        className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? 'Getting Quote...' : connected ? 'Get Quote' : 'Connect Wallet'}
      </button>
    </div>
  );
};

