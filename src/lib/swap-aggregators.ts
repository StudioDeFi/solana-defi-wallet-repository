import axios from 'axios';
import { SwapQuote } from '@/types';
import { calculateDynamicSlippage, calculatePriorityFee } from './solana';

const JUPITER_API = 'https://quote-api.jup.ag/v6';
const DEX_AGGREGATORS = [
  'jupiter',
  'raydium',
  'orca',
  'serum',
  'aldrin',
  'cropper',
  'lifinity',
  'marinade',
  'meteora',
  'openbook',
  'phoenix',
  'whirlpool',
  'balansol',
  'goosefx',
  'mango',
  'saber',
  'sencha',
  'tulip',
  'lifinity-v2',
  'mercurial',
  'cykura',
  'deltafi',
];

interface SwapParams {
  inputMint: string;
  outputMint: string;
  amount: string;
  slippage?: number;
  mevProtection?: boolean;
  dynamicSlippage?: boolean;
  priorityFee?: 'low' | 'medium' | 'high';
  speedOptimized?: boolean;
}

export const getUltraSwapQuote = async (params: SwapParams): Promise<SwapQuote> => {
  const { inputMint, outputMint, amount, mevProtection, dynamicSlippage, priorityFee } = params;
  
  try {
    // Get initial quote from Jupiter
    const quoteResponse = await axios.get(`${JUPITER_API}/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps: 50, // 0.5% base
        onlyDirectRoutes: false,
        asLegacyTransaction: false,
      },
    });

    const quote = quoteResponse.data;
    
    // Calculate dynamic slippage if enabled
    let finalSlippage = 50; // 0.5% default
    if (dynamicSlippage && quote.priceImpactPct) {
      const dynamicSlippageBps = calculateDynamicSlippage(quote.priceImpactPct, 0.5) * 100;
      finalSlippage = Math.min(dynamicSlippageBps, 500); // Max 5%
    }

    // Apply MEV protection (additional checks and route optimization)
    if (mevProtection) {
      // In production, add MEV protection logic here
      // This could include private mempool routing, time-lock mechanisms, etc.
    }

    // Calculate priority fee
    const priorityFeeMultiplier = priorityFee === 'high' ? 2.5 : priorityFee === 'medium' ? 1.5 : 1;
    const computedPriorityFee = calculatePriorityFee(5000, priorityFee || 'medium');

    return {
      inputMint: quote.inputMint,
      outputMint: quote.outputMint,
      inAmount: quote.inAmount,
      outAmount: quote.outAmount,
      priceImpactPct: quote.priceImpactPct,
      routePlan: quote.routePlan || [],
      contextSlot: quote.contextSlot,
      timeTaken: Date.now(),
    };
  } catch (error: any) {
    console.error('Jupiter API error:', error);
    throw new Error('Failed to get swap quote from aggregators');
  }
};

export const getStandardSwapQuote = async (params: SwapParams): Promise<SwapQuote> => {
  const { inputMint, outputMint, amount, slippage = 0.5 } = params;
  
  try {
    const quoteResponse = await axios.get(`${JUPITER_API}/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps: slippage * 100,
        onlyDirectRoutes: false,
      },
    });

    const quote = quoteResponse.data;
    
    return {
      inputMint: quote.inputMint,
      outputMint: quote.outputMint,
      inAmount: quote.inAmount,
      outAmount: quote.outAmount,
      priceImpactPct: quote.priceImpactPct,
      routePlan: quote.routePlan || [],
      contextSlot: quote.contextSlot,
    };
  } catch (error: any) {
    console.error('Standard swap error:', error);
    throw new Error('Failed to get swap quote');
  }
};

export const getLiteSwapQuote = async (params: SwapParams): Promise<SwapQuote> => {
  const { inputMint, outputMint, amount } = params;
  
  try {
    // Optimized for speed - use direct routes only
    const quoteResponse = await axios.get(`${JUPITER_API}/quote`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps: 100, // 1% for speed
        onlyDirectRoutes: true, // Faster routing
        maxAccounts: 64, // Limit accounts for speed
      },
      timeout: 5000, // 5 second timeout
    });

    const quote = quoteResponse.data;
    
    return {
      inputMint: quote.inputMint,
      outputMint: quote.outputMint,
      inAmount: quote.inAmount,
      outAmount: quote.outAmount,
      priceImpactPct: quote.priceImpactPct,
      routePlan: quote.routePlan || [],
      contextSlot: quote.contextSlot,
      timeTaken: Date.now(),
    };
  } catch (error: any) {
    console.error('Lite swap error:', error);
    throw new Error('Failed to get fast swap quote');
  }
};

