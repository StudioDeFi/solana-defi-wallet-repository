import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/middleware/auth';

export async function POST(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const authUser = user as any;

    if (!authUser.githubAccessToken || !authUser.hasRepoAccess) {
      return NextResponse.json(
        { success: false, error: 'GitHub access required. Please login with GitHub.' },
        { status: 403 }
      );
    }

    const { title, body, head, base = 'main' } = await request.json();

    if (!title || !head) {
      return NextResponse.json(
        { success: false, error: 'Title and head branch required' },
        { status: 400 }
      );
    }

    // Create pull request
    const prResponse = await fetch(
      'https://api.github.com/repos/StudioDeFi/solana-defi-wallet-repository/pulls',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authUser.githubAccessToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          body: body || '',
          head,
          base,
        }),
      }
    );

    const prData = await prResponse.json();

    if (!prResponse.ok) {
      return NextResponse.json(
        { success: false, error: prData.message || 'Failed to create PR' },
        { status: prResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        prNumber: prData.number,
        prUrl: prData.html_url,
        title: prData.title,
        state: prData.state,
        createdBy: prData.user.login,
      },
    });
  } catch (error) {
    console.error('[v0] PR creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = verifyAuth(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const authUser = user as any;

    if (!authUser.githubAccessToken) {
      return NextResponse.json(
        { success: false, error: 'GitHub access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state') || 'open';
    const head = searchParams.get('head');

    let url = `https://api.github.com/repos/StudioDeFi/solana-defi-wallet-repository/pulls?state=${state}`;
    if (head) {
      url += `&head=${head}`;
    }

    const prsResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${authUser.githubAccessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const prsData = await prsResponse.json();

    if (!prsResponse.ok) {
      return NextResponse.json(
        { success: false, error: prsData.message || 'Failed to fetch PRs' },
        { status: prsResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        pullRequests: prsData.map((pr: any) => ({
          number: pr.number,
          title: pr.title,
          state: pr.state,
          url: pr.html_url,
          createdBy: pr.user.login,
          createdAt: pr.created_at,
          updatedAt: pr.updated_at,
          head: pr.head.ref,
          base: pr.base.ref,
        })),
      },
    });
  } catch (error) {
    console.error('[v0] PR fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
