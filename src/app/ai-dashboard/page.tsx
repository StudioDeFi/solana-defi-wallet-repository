'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { NeonText } from '@/components/ui/NeonText';
import { GitHubSyncStatus } from '@/components/github/GitHubSyncStatus';
import { 
  Bot, 
  Brain, 
  Code2, 
  Activity, 
  Zap,
  Database,
  Cpu,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AIBotDashboard() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'bots' | 'agents' | 'models' | 'logs'>('bots');

  const stats = [
    { label: 'Active Bots', value: '12', icon: Bot, color: 'text-blue-500' },
    { label: 'AI Agents', value: '5', icon: Brain, color: 'text-purple-500' },
    { label: 'Models', value: '8', icon: Database, color: 'text-green-500' },
    { label: 'Requests/hour', value: '2.4K', icon: TrendingUp, color: 'text-orange-500' },
  ];

  const bots = [
    {
      id: '1',
      name: 'Trading Bot Alpha',
      status: 'active',
      successRate: 94.2,
      latency: 45,
      cost: 12.50,
      executions: 1234,
    },
    {
      id: '2',
      name: 'Market Monitor',
      status: 'active',
      successRate: 98.7,
      latency: 32,
      cost: 5.20,
      executions: 5678,
    },
    {
      id: '3',
      name: 'Price Alert Bot',
      status: 'paused',
      successRate: 100,
      latency: 12,
      cost: 2.10,
      executions: 892,
    },
  ];

  const agents = [
    {
      id: '1',
      name: 'Trading Agent',
      type: 'trading',
      status: 'online',
      currentTask: 'Analyzing SOL/USDC pair',
      queuedTasks: 3,
      successRate: 96.5,
    },
    {
      id: '2',
      name: 'Analysis Agent',
      type: 'analysis',
      status: 'busy',
      currentTask: 'Processing market data',
      queuedTasks: 7,
      successRate: 94.2,
    },
    {
      id: '3',
      name: 'Monitoring Agent',
      type: 'monitoring',
      status: 'online',
      currentTask: 'Watching wallet activity',
      queuedTasks: 1,
      successRate: 99.8,
    },
  ];

  const models = [
    {
      id: '1',
      name: 'GPT-4',
      provider: 'OpenAI',
      status: 'connected',
      latency: 850,
      tokensPerSec: 42,
      costPerToken: 0.00003,
      requests: 12450,
    },
    {
      id: '2',
      name: 'Claude 3.5',
      provider: 'Anthropic',
      status: 'connected',
      latency: 720,
      tokensPerSec: 38,
      costPerToken: 0.000015,
      requests: 8920,
    },
    {
      id: '3',
      name: 'Llama 3',
      provider: 'Local',
      status: 'connected',
      latency: 150,
      tokensPerSec: 95,
      costPerToken: 0,
      requests: 45230,
    },
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg bg-surface/50 hover:bg-surface transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                <NeonText size="xl">Network CyberAi</NeonText>
              </h1>
              <p className="text-text-secondary text-sm sm:text-base">
                AI Builder Dashboard - Bot Aggregator & Model Management
              </p>
            </div>
          </div>
        </header>

        {/* GitHub Sync Status */}
        <GlowCard intensity="low">
          <GitHubSyncStatus />
        </GlowCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <GlowCard key={stat.label} intensity="low" className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-text-secondary text-xs uppercase font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'bots', label: 'Bot Aggregator', icon: Bot },
            { id: 'agents', label: 'AI Agents', icon: Brain },
            { id: 'models', label: 'Models', icon: Database },
            { id: 'prompts', label: 'AI Prompts', icon: Code2 },
            { id: 'logs', label: 'Logs', icon: Activity },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-surface/50 text-text-secondary hover:bg-surface'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'bots' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Bot Aggregator</h2>
              <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors">
                Add Bot
              </button>
            </div>

            <div className="grid gap-4">
              {bots.map((bot) => (
                <GlowCard key={bot.id} className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        bot.status === 'active' ? 'bg-green-500/20' : 'bg-orange-500/20'
                      }`}>
                        <Bot className={`w-5 h-5 ${
                          bot.status === 'active' ? 'text-green-500' : 'text-orange-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{bot.name}</h3>
                        <p className="text-xs text-text-secondary">
                          {bot.executions.toLocaleString()} executions
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:flex gap-4 w-full sm:w-auto">
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Success Rate</p>
                        <p className="text-lg font-bold text-green-500">{bot.successRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Latency</p>
                        <p className="text-lg font-bold">{bot.latency}ms</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Cost</p>
                        <p className="text-lg font-bold">${bot.cost}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors">
                          {bot.status === 'active' ? 'Pause' : 'Start'}
                        </button>
                        <button className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors">
                          Config
                        </button>
                      </div>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">AI Agents</h2>
              <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors">
                Deploy Agent
              </button>
            </div>

            <div className="grid gap-4">
              {agents.map((agent) => (
                <GlowCard key={agent.id} className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        agent.status === 'online' ? 'bg-green-500/20' : agent.status === 'busy' ? 'bg-yellow-500/20' : 'bg-red-500/20'
                      }`}>
                        <Brain className={`w-5 h-5 ${
                          agent.status === 'online' ? 'text-green-500' : agent.status === 'busy' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <p className="text-xs text-text-secondary">{agent.currentTask}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {agent.queuedTasks} tasks queued
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Success Rate</p>
                        <p className="text-lg font-bold text-green-500">{agent.successRate}%</p>
                      </div>
                      <button className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Connected AI Models</h2>
              <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors">
                Add Model
              </button>
            </div>

            <div className="grid gap-4">
              {models.map((model) => (
                <GlowCard key={model.id} className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Cpu className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{model.name}</h3>
                        <p className="text-xs text-text-secondary">{model.provider}</p>
                        <p className="text-xs text-text-secondary mt-1">
                          {model.requests.toLocaleString()} requests
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:flex gap-4 w-full sm:w-auto">
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Latency</p>
                        <p className="text-sm font-bold">{model.latency}ms</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Tokens/sec</p>
                        <p className="text-sm font-bold">{model.tokensPerSec}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-text-secondary mb-1">Cost/Token</p>
                        <p className="text-sm font-bold">
                          {model.costPerToken === 0 ? 'Free' : `$${model.costPerToken.toFixed(6)}`}
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors">
                        Config
                      </button>
                    </div>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <GlowCard className="p-6">
            <div className="text-center space-y-4">
              <Code2 className="w-12 h-12 mx-auto text-primary" />
              <h3 className="text-xl font-bold">AI Prompts Bot</h3>
              <p className="text-text-secondary">
                Create and execute AI prompts with templates for coding, design, analysis, and more.
              </p>
              <button className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors">
                Open Prompt Library
              </button>
            </div>
          </GlowCard>
        )}

        {activeTab === 'logs' && (
          <GlowCard className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Activity Logs</h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors">
                    Filter
                  </button>
                  <button className="px-3 py-1.5 bg-surface hover:bg-surface/80 rounded-md text-xs font-medium transition-colors">
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { level: 'info', message: 'Trading Bot Alpha executed swap', time: '2 min ago' },
                  { level: 'success', message: 'Analysis Agent completed market scan', time: '5 min ago' },
                  { level: 'warn', message: 'High latency detected on GPT-4 model', time: '8 min ago' },
                  { level: 'info', message: 'New PR opened on cyberai-smart branch', time: '12 min ago' },
                  { level: 'success', message: 'GitHub sync completed successfully', time: '15 min ago' },
                ].map((log, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-surface/30 rounded-lg"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.level === 'success' ? 'bg-green-500' : 
                      log.level === 'warn' ? 'bg-yellow-500' : 
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm">{log.message}</p>
                      <p className="text-xs text-text-secondary mt-1">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlowCard>
        )}
      </div>
    </main>
  );
}
