import { Connection, PublicKey, Transaction, VersionedTransaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

export const SOLANA_RPC_ENDPOINTS = {
  mainnet: process.env.NEXT_PUBLIC_SOLANA_RPC_MAINNET || 'https://api.mainnet-beta.solana.com',
  devnet: process.env.NEXT_PUBLIC_SOLANA_RPC_DEVNET || 'https://api.devnet.solana.com',
  testnet: process.env.NEXT_PUBLIC_SOLANA_RPC_TESTNET || 'https://api.testnet.solana.com',
};

export const getConnection = (network: 'mainnet' | 'devnet' | 'testnet' = 'mainnet'): Connection => {
  const endpoint = SOLANA_RPC_ENDPOINTS[network];
  return new Connection(endpoint, {
    commitment: 'confirmed',
    wsEndpoint: endpoint.replace('https://', 'wss://'),
  });
};

export const validateAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const formatTokenAmount = (amount: number | string, decimals: number = 9): string => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  const divisor = Math.pow(10, decimals);
  const formatted = (num / divisor).toFixed(decimals);
  return parseFloat(formatted).toString();
};

export const parseTokenAmount = (amount: string, decimals: number = 9): number => {
  return parseFloat(amount) * Math.pow(10, decimals);
};

export const calculatePriorityFee = (
  baseFee: number,
  urgency: 'low' | 'medium' | 'high' = 'medium'
): number => {
  const multipliers = { low: 1, medium: 1.5, high: 2.5 };
  return Math.floor(baseFee * multipliers[urgency]);
};

export const calculateDynamicSlippage = (
  priceImpact: number,
  baseSlippage: number = 0.5
): number => {
  if (priceImpact < 0.1) return baseSlippage;
  if (priceImpact < 0.5) return baseSlippage * 1.5;
  if (priceImpact < 1) return baseSlippage * 2;
  return baseSlippage * 3;
};

