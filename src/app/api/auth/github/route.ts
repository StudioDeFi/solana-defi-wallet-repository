import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'GitHub OAuth code required' },
        { status: 400 }
      );
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return NextResponse.json(
        { success: false, error: tokenData.error_description || 'GitHub OAuth failed' },
        { status: 400 }
      );
    }

    const accessToken = tokenData.access_token;

    // Get GitHub user data
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const userData = await userResponse.json();

    if (!userData.login) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch GitHub user data' },
        { status: 500 }
      );
    }

    // Check if user has access to repository
    const repoResponse = await fetch(
      'https://api.github.com/repos/StudioDeFi/solana-defi-wallet-repository',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    const repoData = await repoResponse.json();
    const hasRepoAccess = repoResponse.ok;

    // Generate JWT token
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign(
      {
        userId: userData.id.toString(),
        githubUsername: userData.login,
        githubAccessToken: accessToken,
        hasRepoAccess,
        role: hasRepoAccess ? 'contributor' : 'user',
      },
      secret,
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: {
          id: userData.id.toString(),
          githubUsername: userData.login,
          avatarUrl: userData.avatar_url,
          name: userData.name,
          hasRepoAccess,
          canOpenPR: hasRepoAccess,
        },
      },
    });
  } catch (error) {
    console.error('[v0] GitHub auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
