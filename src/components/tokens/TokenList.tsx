'use client';

import React, { useState, useEffect } from 'react';
import { sdk } from '@/api/sdk';
import { Token } from '@/types';
import { useTokenColors } from '@/hooks/useTokenColors';
import { GlowCard } from '@/components/ui/GlowCard';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import Image from 'next/image';

export const TokenList: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const data = await sdk.getTokens({ limit: 50 });
        setTokens(data);
      } catch (error) {
        console.error('Error loading tokens:', error);
      } finally {
        setLoading(false);
      }
    };
    loadTokens();
  }, []);

  const filteredTokens = tokens.filter(token =>
    token.symbol.toLowerCase().includes(search.toLowerCase()) ||
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tokens</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tokens..."
            className="pl-10 pr-4 py-2 rounded-lg bg-surface/50 border border-border/50 text-text placeholder-text-secondary outline-none focus:border-primary"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-text-secondary">Loading tokens...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <TokenCard key={token.address} token={token} />
          ))}
        </div>
      )}
    </div>
  );
};

const TokenCard: React.FC<{ token: Token }> = ({ token }) => {
  const { colors } = useTokenColors(token.logoURI, token.address);

  return (
    <GlowCard
      glowColor={colors?.glow}
      className="p-4 cursor-pointer"
    >
      <div className="flex items-center gap-3 mb-3">
        {token.logoURI && (
          <div className="w-10 h-10 rounded-full overflow-hidden bg-surface">
            <Image
              src={token.logoURI}
              alt={token.symbol}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <div className="font-semibold text-text">{token.symbol}</div>
          <div className="text-sm text-text-secondary">{token.name}</div>
        </div>
        {token.price && (
          <div className="text-right">
            <div className="font-semibold text-text">${token.price.toFixed(4)}</div>
            {token.priceChange24h && (
              <div className={`text-sm flex items-center gap-1 ${
                token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {token.priceChange24h >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {Math.abs(token.priceChange24h).toFixed(2)}%
              </div>
            )}
          </div>
        )}
      </div>
      {token.sensorScore && (
        <div className="text-xs text-text-secondary">
          Sensor Score: {token.sensorScore}/100
        </div>
      )}
    </GlowCard>
  );
};

