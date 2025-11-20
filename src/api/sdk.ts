import axios, { AxiosInstance } from 'axios';
import { SwapQuote, PriceData, Token, LimitOrder, DCAOrder, ApiConfig } from '@/types';
import { calculateDynamicSlippage, calculatePriorityFee } from '@/lib/solana';

export class SolanaWalletSDK {
  private api: AxiosInstance;
  private config: ApiConfig;

  constructor(baseURL: string = '/api', config: ApiConfig = {}) {
    this.api = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.config = config;
  }

  // Ultra API - MEV protection, dynamic slippage, priority fees
  async getUltraSwapQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    options?: {
      mevProtection?: boolean;
      dynamicSlippage?: boolean;
      priorityFee?: 'low' | 'medium' | 'high';
    }
  ): Promise<SwapQuote> {
    const response = await this.api.post('/swap/ultra', {
      inputMint,
      outputMint,
      amount,
      mevProtection: options?.mevProtection ?? this.config.ultraApi?.mevProtection ?? true,
      dynamicSlippage: options?.dynamicSlippage ?? this.config.ultraApi?.dynamicSlippage ?? true,
      priorityFee: options?.priorityFee ?? 'medium',
    });
    return response.data;
  }

  // Standard Swap API
  async getStandardSwapQuote(
    inputMint: string,
    outputMint: string,
    amount: string,
    slippage?: number
  ): Promise<SwapQuote> {
    const response = await this.api.post('/swap/standard', {
      inputMint,
      outputMint,
      amount,
      slippage: slippage ?? this.config.standardSwap?.slippage ?? 0.5,
    });
    return response.data;
  }

  // Lite API - Optimized for speed
  async getLiteSwapQuote(
    inputMint: string,
    outputMint: string,
    amount: string
  ): Promise<SwapQuote> {
    const response = await this.api.post('/swap/lite', {
      inputMint,
      outputMint,
      amount,
      speedOptimized: this.config.liteApi?.speedOptimized ?? true,
    });
    return response.data;
  }

  // Prices API - Real-time multi-source pricing
  async getPrices(
    tokens: string[],
    sources?: string[]
  ): Promise<PriceData[]> {
    const response = await this.api.get('/prices', {
      params: {
        tokens: tokens.join(','),
        sources: sources?.join(','),
      },
    });
    return response.data;
  }

  async getPrice(token: string): Promise<PriceData> {
    const response = await this.api.get(`/prices/${token}`);
    return response.data;
  }

  // Token API - 22,000+ tokens with metadata
  async getTokens(
    params?: {
      search?: string;
      verified?: boolean;
      limit?: number;
      offset?: number;
    }
  ): Promise<Token[]> {
    const response = await this.api.get('/tokens', { params });
    return response.data;
  }

  async getToken(address: string): Promise<Token> {
    const response = await this.api.get(`/tokens/${address}`);
    return response.data;
  }

  async searchTokens(query: string): Promise<Token[]> {
    const response = await this.api.get('/tokens/search', {
      params: { q: query },
    });
    return response.data;
  }

  // Limit Order API
  async createLimitOrder(
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    price: number,
    orderType: 'buy' | 'sell',
    expiresAt?: number
  ): Promise<LimitOrder> {
    const response = await this.api.post('/orders/limit', {
      tokenIn,
      tokenOut,
      amountIn,
      price,
      orderType,
      expiresAt,
    });
    return response.data;
  }

  async getLimitOrders(): Promise<LimitOrder[]> {
    const response = await this.api.get('/orders/limit');
    return response.data;
  }

  async cancelLimitOrder(orderId: string): Promise<void> {
    await this.api.delete(`/orders/limit/${orderId}`);
  }

  // DCA API - Dollar Cost Averaging
  async createDCAOrder(
    tokenIn: string,
    tokenOut: string,
    amountPerInterval: string,
    interval: 'hourly' | 'daily' | 'weekly',
    totalAmount: string
  ): Promise<DCAOrder> {
    const response = await this.api.post('/orders/dca', {
      tokenIn,
      tokenOut,
      amountPerInterval,
      interval,
      totalAmount,
    });
    return response.data;
  }

  async getDCAOrders(): Promise<DCAOrder[]> {
    const response = await this.api.get('/orders/dca');
    return response.data;
  }

  async pauseDCAOrder(orderId: string): Promise<void> {
    await this.api.patch(`/orders/dca/${orderId}/pause`);
  }

  async resumeDCAOrder(orderId: string): Promise<void> {
    await this.api.patch(`/orders/dca/${orderId}/resume`);
  }

  async cancelDCAOrder(orderId: string): Promise<void> {
    await this.api.delete(`/orders/dca/${orderId}`);
  }
}

export const sdk = new SolanaWalletSDK();

