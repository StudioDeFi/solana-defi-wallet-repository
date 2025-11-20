import { NextRequest, NextResponse } from 'next/server';
import { getTokenByAddress } from '@/lib/token-registry';

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;

    if (!address) {
      return NextResponse.json(
        { error: 'Token address required' },
        { status: 400 }
      );
    }

    const token = await getTokenByAddress(address);

    if (!token) {
      return NextResponse.json(
        { error: 'Token not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(token);
  } catch (error: any) {
    console.error('Token API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get token' },
      { status: 500 }
    );
  }
}

