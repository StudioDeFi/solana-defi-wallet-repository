import { NextRequest, NextResponse } from 'next/server';
import { getUltraSwapQuote } from '@/lib/swap-aggregators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inputMint, outputMint, amount, mevProtection, dynamicSlippage, priorityFee } = body;

    if (!inputMint || !outputMint || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const quote = await getUltraSwapQuote({
      inputMint,
      outputMint,
      amount,
      mevProtection: mevProtection ?? true,
      dynamicSlippage: dynamicSlippage ?? true,
      priorityFee: priorityFee || 'medium',
    });

    return NextResponse.json(quote);
  } catch (error: any) {
    console.error('Ultra swap error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get swap quote' },
      { status: 500 }
    );
  }
}

