import { NextRequest, NextResponse } from 'next/server';
import { getLiteSwapQuote } from '@/lib/swap-aggregators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputMint, outputMint, amount } = body;

    if (!inputMint || !outputMint || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const quote = await getLiteSwapQuote({
      inputMint,
      outputMint,
      amount,
      speedOptimized: true,
    });

    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Lite swap error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get swap quote' },
      { status: 500 }
    );
  }
}

