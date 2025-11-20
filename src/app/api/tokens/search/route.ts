import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromRegistry } from '@/lib/token-registry';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query required' },
        { status: 400 }
      );
    }

    const tokens = await getTokensFromRegistry({
      search: query,
      limit: 50,
    });

    return NextResponse.json(tokens);
  } catch (error: any) {
    console.error('Token search error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search tokens' },
      { status: 500 }
    );
  }
}

