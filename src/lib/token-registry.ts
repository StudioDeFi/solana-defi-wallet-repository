import axios from 'axios';
import { Token } from '@/types';

const TOKEN_REGISTRIES = [
  'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json',
  'https://api.raydium.io/v2/main/pairs',
  'https://api.jup.ag/tokens/v1',
];

let tokenCache: Token[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 3600000; // 1 hour

export const getTokensFromRegistry = async (params?: {
  search?: string;
  verified?: boolean;
  limit?: number;
  offset?: number;
}): Promise<Token[]> => {
  const now = Date.now();
  
  // Use cache if available and fresh
  if (tokenCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return filterTokens(tokenCache, params);
  }

  try {
    // Fetch from Jupiter API (most comprehensive)
    const response = await axios.get('https://token.jup.ag/all');
    const jupiterTokens = response.data;

    tokenCache = jupiterTokens.map((token: any) => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logoURI: token.logoURI,
      tags: token.tags || [],
      verified: token.verified || false,
      metadata: {
        website: token.website,
        twitter: token.twitter,
        telegram: token.telegram,
        discord: token.discord,
      },
    }));

    cacheTimestamp = now;
    if (tokenCache) {
      return filterTokens(tokenCache, params);
    }
  } catch (error) {
    console.error('Error fetching tokens:', error);
    
    // Fallback to Solana token list
    try {
      const response = await axios.get(TOKEN_REGISTRIES[0]);
      const solanaTokens = response.data.tokens || [];

      tokenCache = solanaTokens.map((token: any) => ({
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        logoURI: token.logoURI,
        tags: token.tags || [],
        verified: token.verified || false,
      }));

      cacheTimestamp = now;
      if (tokenCache) {
        return filterTokens(tokenCache, params);
      }
    } catch (fallbackError) {
      console.error('Fallback token fetch failed:', fallbackError);
      return [];
    }
  }
  
  return [];
};

export const getTokenByAddress = async (address: string): Promise<Token | null> => {
  const tokens = await getTokensFromRegistry();
  const token = tokens.find(t => t.address === address);
  return token || null;
};

const filterTokens = (
  tokens: Token[],
  params?: {
    search?: string;
    verified?: boolean;
    limit?: number;
    offset?: number;
  }
): Token[] => {
  let filtered = [...tokens];

  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter(
      token =>
        token.symbol.toLowerCase().includes(searchLower) ||
        token.name.toLowerCase().includes(searchLower) ||
        token.address.toLowerCase().includes(searchLower)
    );
  }

  if (params?.verified) {
    filtered = filtered.filter(token => token.verified);
  }

  const start = params?.offset || 0;
  const end = start + (params?.limit || 100);

  return filtered.slice(start, end);
};

