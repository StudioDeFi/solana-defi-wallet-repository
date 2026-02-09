'use client';

import React, { useState, useEffect } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Bot, Settings, Power, Activity, RefreshCw } from 'lucide-react';

interface BotConfig {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'idle' | 'error';
  requests: number;
  latency: number;
  uptime: string;
}

const initialBots: BotConfig[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    model: 'gpt-4-turbo-preview',
    status: 'active',
    requests: 1247,
    latency: 234,
    uptime: '99.8%',
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    model: 'claude-3-opus',
    status: 'active',
    requests: 892,
    latency: 189,
    uptime: '99.9%',
  },
  {
    id: '3',
    name: 'Gemini Pro',
    model: 'gemini-pro',
    status: 'idle',
    requests: 534,
    latency: 156,
    uptime: '98.5%',
  },
  {
    id: '4',
    name: 'Llama 3 70B',
    model: 'llama-3-70b',
    status: 'active',
    requests: 678,
    latency: 201,
    uptime: '99.2%',
  },
];

export function BotAggregator() {
  const [bots, setBots] = useState<BotConfig[]>(initialBots);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setBots(prev => prev.map(bot => ({
        ...bot,
        requests: bot.requests + Math.floor(Math.random() * 5),
        latency: Math.max(100, bot.latency + Math.floor(Math.random() * 20) - 10),
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const toggleBotStatus = (id: string) => {
    setBots(prev => prev.map(bot => 
      bot.id === id 
        ? { ...bot, status: bot.status === 'active' ? 'idle' : 'active' as const }
        : bot
    ));
    console.log('[v0] Toggled bot status:', id);
  };

  return (
    <GlowCard>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Bot Aggregator</h3>
            <p className="text-sm text-text-secondary">Dynamic AI model orchestration</p>
          </div>
        </div>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
            autoRefresh 
              ? 'bg-primary text-white' 
              : 'bg-surface text-text-secondary hover:bg-background'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          Auto-Sync
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="p-4 rounded-xl bg-surface border border-border hover:border-primary/30 transition-all"
          >
            {/* Bot Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold">{bot.name}</h4>
                  <div className={`w-2 h-2 rounded-full ${
                    bot.status === 'active' ? 'bg-green-500 animate-pulse' :
                    bot.status === 'idle' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                </div>
                <p className="text-xs text-text-secondary">{bot.model}</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleBotStatus(bot.id)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                    bot.status === 'active'
                      ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                      : 'bg-surface hover:bg-background'
                  }`}
                  title={bot.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                  <Power className="w-4 h-4" />
                </button>
                <button
                  className="w-9 h-9 rounded-lg bg-surface hover:bg-background flex items-center justify-center transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bot Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Requests</p>
                <p className="text-lg font-bold">{bot.requests.toLocaleString()}</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Latency</p>
                <p className="text-lg font-bold">{bot.latency}ms</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Uptime</p>
                <p className="text-lg font-bold">{bot.uptime}</p>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className={`font-semibold ${
                bot.status === 'active' ? 'text-green-500' :
                bot.status === 'idle' ? 'text-yellow-500' :
                'text-red-500'
              }`}>
                {bot.status.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-text-secondary">
                <Activity className="w-3 h-3" />
                <span>Live monitoring</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}
