import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromRegistry } from '@/lib/token-registry';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const verified = searchParams.get('verified') === 'true';
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const tokens = await getTokensFromRegistry({
      search: search || undefined,
      verified,
      limit,
      offset,
    });

    return NextResponse.json(tokens);
  } catch (error: any) {
    console.error('Token API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to get tokens' },
      { status: 500 }
    );
  }
}

