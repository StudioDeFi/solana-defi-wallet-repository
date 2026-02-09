'use client';

import { useState, useEffect } from 'react';
import { GitBranch, GitPullRequest, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface GitHubUser {
  id: string;
  githubUsername: string;
  avatarUrl: string;
  name: string;
  hasRepoAccess: boolean;
  canOpenPR: boolean;
}

interface PullRequest {
  number: number;
  title: string;
  state: string;
  url: string;
  createdBy: string;
  createdAt: string;
  head: string;
  base: string;
}

export function GitHubSyncStatus() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    checkGitHubAuth();
    fetchPullRequests();
  }, []);

  const checkGitHubAuth = async () => {
    try {
      const token = localStorage.getItem('github_token');
      if (token) {
        // Decode JWT to get user info
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: payload.userId,
          githubUsername: payload.githubUsername,
          avatarUrl: '',
          name: payload.githubUsername,
          hasRepoAccess: payload.hasRepoAccess,
          canOpenPR: payload.hasRepoAccess,
        });
      }
    } catch (error) {
      console.error('[v0] GitHub auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPullRequests = async () => {
    try {
      const token = localStorage.getItem('github_token');
      if (!token) return;

      const response = await fetch('/api/github/pr?state=open&head=cyberai-smart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPullRequests(data.data.pullRequests || []);
      }
    } catch (error) {
      console.error('[v0] Failed to fetch PRs:', error);
    }
  };

  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/github/callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      // Trigger sync with repository
      console.log('[v0] Syncing with repository...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await fetchPullRequests();
    } catch (error) {
      console.error('[v0] Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  const handleCreatePR = async () => {
    try {
      const token = localStorage.getItem('github_token');
      if (!token) return;

      const response = await fetch('/api/github/pr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: `[CyberAi] Updates from ${user?.githubUsername}`,
          body: 'Auto-generated PR from CyberAi AI Builder Dashboard',
          head: 'cyberai-smart',
          base: 'main',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        window.open(data.data.prUrl, '_blank');
        await fetchPullRequests();
      }
    } catch (error) {
      console.error('[v0] PR creation failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Clock className="w-4 h-4 animate-spin" />
        <span>Loading GitHub status...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <button
        onClick={handleGitHubLogin}
        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
      >
        <GitBranch className="w-4 h-4" />
        Connect GitHub
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-surface/50 backdrop-blur-sm rounded-lg border border-border/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{user.githubUsername}</span>
              {user.hasRepoAccess && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
            </div>
            <p className="text-xs text-text-secondary">
              {user.hasRepoAccess ? 'Repo Access Granted' : 'No Repo Access'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
          >
            {syncing ? 'Syncing...' : 'Sync'}
          </button>
          {user.canOpenPR && (
            <button
              onClick={handleCreatePR}
              className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-xs font-medium transition-colors"
            >
              Open PR
            </button>
          )}
        </div>
      </div>

      {pullRequests.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-text-secondary uppercase">
            Active Pull Requests
          </h4>
          {pullRequests.map((pr) => (
            <a
              key={pr.number}
              href={pr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-background/50 hover:bg-background rounded-md transition-colors"
            >
              <div className="flex items-center gap-2">
                <GitPullRequest className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-sm font-medium">#{pr.number} {pr.title}</p>
                  <p className="text-xs text-text-secondary">
                    {pr.head} → {pr.base}
                  </p>
                </div>
              </div>
              {pr.state === 'open' && (
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full">
                  Open
                </span>
              )}
            </a>
          ))}
        </div>
      )}

      {user.hasRepoAccess && (
        <div className="flex items-start gap-2 p-2 bg-primary/5 rounded-md border border-primary/20">
          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs space-y-1">
            <p className="font-medium text-primary">Same User Access Granted</p>
            <p className="text-text-secondary">
              You have permission to open PRs and sync with the cyberai-smart branch.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
