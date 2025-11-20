import { NextRequest, NextResponse } from 'next/server';
import { getPriceForToken } from '@/lib/price-aggregators';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    if (!token) {
      return NextResponse.json(
        { error: 'Token address required' },
        { status: 400 }
      );
    }

    const price = await getPriceForToken(token);

    return NextResponse.json(price);
  } catch (error: any) {
    console.error('Price API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get price' },
      { status: 500 }
    );
  }
}

