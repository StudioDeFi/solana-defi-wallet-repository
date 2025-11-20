export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
  verified?: boolean;
  price?: number;
  priceChange24h?: number;
  volume24h?: number;
  marketCap?: number;
  liquidity?: number;
  sensorScore?: number;
  metadata?: TokenMetadata;
}

export interface TokenMetadata {
  description?: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  discord?: string;
  coingeckoId?: string;
}

export interface SwapQuote {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  priceImpactPct: number;
  routePlan: RoutePlan[];
  contextSlot?: number;
  timeTaken?: number;
}

export interface RoutePlan {
  swapInfo: SwapInfo;
  percent: number;
}

export interface SwapInfo {
  ammKey: string;
  label: string;
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  feeAmount: string;
  feeMint: string;
}

export interface PriceData {
  token: string;
  price: number;
  timestamp: number;
  source: string;
  liquidity?: number;
  volume24h?: number;
}

export interface LimitOrder {
  id: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  price: number;
  orderType: 'buy' | 'sell';
  status: 'pending' | 'filled' | 'cancelled' | 'expired';
  createdAt: number;
  expiresAt?: number;
  filledAt?: number;
  txHash?: string;
}

export interface DCAOrder {
  id: string;
  tokenIn: string;
  tokenOut: string;
  amountPerInterval: string;
  interval: 'hourly' | 'daily' | 'weekly';
  totalAmount: string;
  executedAmount: string;
  nextExecution: number;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  createdAt: number;
}

export interface WalletConnection {
  wallet: string;
  publicKey: string;
  connected: boolean;
  adapter?: any;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  glow: string;
}

export type ThemeMode = 'dark' | 'dim' | 'day';

export interface ApiConfig {
  ultraApi?: {
    mevProtection: boolean;
    dynamicSlippage: boolean;
    priorityFees: boolean;
  };
  standardSwap?: {
    slippage: number;
    priorityFee?: number;
  };
  liteApi?: {
    speedOptimized: boolean;
  };
}

