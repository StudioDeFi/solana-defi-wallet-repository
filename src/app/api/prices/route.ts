import { NextRequest, NextResponse } from 'next/server';
import { getPricesFromMultipleSources } from '@/lib/price-aggregators';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tokens = searchParams.get('tokens')?.split(',') || [];
    const sources = searchParams.get('sources')?.split(',') || [];

    if (tokens.length === 0) {
      return NextResponse.json(
        { error: 'No tokens specified' },
        { status: 400 }
      );
    }

    const prices = await getPricesFromMultipleSources(tokens, sources);

    return NextResponse.json(prices);
  } catch (error: any) {
    console.error('Price API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get prices' },
      { status: 500 }
    );
  }
}

