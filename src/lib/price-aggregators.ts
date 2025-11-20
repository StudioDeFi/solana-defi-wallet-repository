import axios from 'axios';
import { PriceData } from '@/types';

const PRICE_SOURCES = {
  coingecko: 'https://api.coingecko.com/api/v3',
  birdeye: 'https://public-api.birdeye.so',
  jupiter: 'https://price.jup.ag/v4',
  dexscreener: 'https://api.dexscreener.com/latest/dex',
};

export const getPricesFromMultipleSources = async (
  tokens: string[],
  sources?: string[]
): Promise<PriceData[]> => {
  const sourceList = sources && sources.length > 0 ? sources : Object.keys(PRICE_SOURCES);
  const pricePromises: Promise<PriceData[]>[] = [];

  for (const source of sourceList) {
    try {
      switch (source) {
        case 'coingecko':
          pricePromises.push(getCoingeckoPrices(tokens));
          break;
        case 'birdeye':
          pricePromises.push(getBirdeyePrices(tokens));
          break;
        case 'jupiter':
          pricePromises.push(getJupiterPrices(tokens));
          break;
        case 'dexscreener':
          pricePromises.push(getDexscreenerPrices(tokens));
          break;
      }
    } catch (error) {
      console.error(`Error fetching from ${source}:`, error);
    }
  }

  const results = await Promise.allSettled(pricePromises);
  const allPrices: PriceData[] = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allPrices.push(...result.value);
    }
  });

  // Aggregate prices (average for now, could use weighted average)
  const aggregated: Record<string, PriceData> = {};
  allPrices.forEach(price => {
    if (!aggregated[price.token]) {
      aggregated[price.token] = { ...price, price: 0, source: 'aggregated' };
    }
    aggregated[price.token].price += price.price;
  });

  return Object.values(aggregated).map(price => ({
    ...price,
    price: price.price / allPrices.filter(p => p.token === price.token).length,
  }));
};

export const getPriceForToken = async (token: string): Promise<PriceData> => {
  const prices = await getPricesFromMultipleSources([token]);
  return prices[0] || {
    token,
    price: 0,
    timestamp: Date.now(),
    source: 'unknown',
  };
};

const getCoingeckoPrices = async (tokens: string[]): Promise<PriceData[]> => {
  // Map Solana tokens to CoinGecko IDs (simplified)
  // In production, maintain a mapping database
  try {
    const response = await axios.get(`${PRICE_SOURCES.coingecko}/simple/price`, {
      params: {
        ids: 'solana', // Simplified - would need token mapping
        vs_currencies: 'usd',
      },
    });

    return tokens.map(token => ({
      token,
      price: response.data.solana?.usd || 0,
      timestamp: Date.now(),
      source: 'coingecko',
    }));
  } catch (error) {
    return [];
  }
};

const getBirdeyePrices = async (tokens: string[]): Promise<PriceData[]> => {
  try {
    const response = await axios.get(`${PRICE_SOURCES.birdeye}/defi/price`, {
      params: {
        list_address: tokens.join(','),
      },
      headers: {
        'X-API-KEY': process.env.BIRDEYE_API_KEY || '',
      },
    });

    return Object.entries(response.data.data || {}).map(([token, data]: [string, any]) => ({
      token,
      price: data.value || 0,
      timestamp: Date.now(),
      source: 'birdeye',
      liquidity: data.liquidity,
      volume24h: data.volume24h,
    }));
  } catch (error) {
    return [];
  }
};

const getJupiterPrices = async (tokens: string[]): Promise<PriceData[]> => {
  try {
    const response = await axios.get(`${PRICE_SOURCES.jupiter}/price`, {
      params: {
        ids: tokens.join(','),
      },
    });

    return Object.entries(response.data.data || {}).map(([token, data]: [string, any]) => ({
      token,
      price: data.price || 0,
      timestamp: Date.now(),
      source: 'jupiter',
    }));
  } catch (error) {
    return [];
  }
};

const getDexscreenerPrices = async (tokens: string[]): Promise<PriceData[]> => {
  try {
    const response = await axios.get(`${PRICE_SOURCES.dexscreener}/tokens/${tokens.join(',')}`);

    return (response.data.pairs || []).map((pair: any) => ({
      token: pair.baseToken?.address || '',
      price: parseFloat(pair.priceUsd || '0'),
      timestamp: Date.now(),
      source: 'dexscreener',
      liquidity: pair.liquidity?.usd,
      volume24h: pair.volume?.h24,
    }));
  } catch (error) {
    return [];
  }
};

