import { NextRequest, NextResponse } from 'next/server';
import { getStandardSwapQuote } from '@/lib/swap-aggregators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputMint, outputMint, amount, slippage } = body;

    if (!inputMint || !outputMint || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const quote = await getStandardSwapQuote({
      inputMint,
      outputMint,
      amount,
      slippage: slippage ?? 0.5,
    });

    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Standard swap error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get swap quote' },
      { status: 500 }
    );
  }
}

