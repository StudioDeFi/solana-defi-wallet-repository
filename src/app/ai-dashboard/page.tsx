'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { NeonText } from '@/components/ui/NeonText';
import { 
  Bot, 
  Sparkles, 
  Activity, 
  Database, 
  Settings, 
  MessageSquare,
  TrendingUp,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { AIPromptsModal } from '@/components/ai/AIPromptsModal';
import { BotAggregator } from '@/components/ai/BotAggregator';
import { LogsViewer } from '@/components/ai/LogsViewer';
import { AIAgentsPanel } from '@/components/ai/AIAgentsPanel';
import { ModelsPanel } from '@/components/ai/ModelsPanel';

export default function AIDashboard() {
  const [showPromptsModal, setShowPromptsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'agents' | 'models' | 'logs'>('overview');

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <header className="mb-8 text-center">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Network CyberAi</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <NeonText size="xl">AI Builder Dashboard</NeonText>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Advanced AI orchestration hub for managing agents, models, and automated workflows
          </p>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowPromptsModal(true)}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
          >
            <MessageSquare className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold">AI Prompts</span>
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
          >
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold">AI Agents</span>
          </button>

          <button
            onClick={() => setActiveTab('models')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
          >
            <Layers className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold">Models</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-surface border border-border hover:border-primary/50 transition-all hover:scale-105 active:scale-95"
          >
            <Activity className="w-8 h-8 text-primary" />
            <span className="text-sm font-semibold">Logs</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['overview', 'agents', 'models', 'logs'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text-secondary hover:text-text hover:bg-surface/80'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlowCard>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Active Agents</p>
                    <p className="text-3xl font-bold">12</p>
                    <div className="flex items-center gap-1 mt-2 text-green-500 text-sm">
                      <TrendingUp className="w-4 h-4" />
                      <span>+3 this week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </GlowCard>

              <GlowCard>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Models Connected</p>
                    <p className="text-3xl font-bold">8</p>
                    <div className="flex items-center gap-1 mt-2 text-blue-500 text-sm">
                      <Database className="w-4 h-4" />
                      <span>5 providers</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </GlowCard>

              <GlowCard>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Requests Today</p>
                    <p className="text-3xl font-bold">1.2K</p>
                    <div className="flex items-center gap-1 mt-2 text-purple-500 text-sm">
                      <Zap className="w-4 h-4" />
                      <span>98% success</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-500" />
                  </div>
                </div>
              </GlowCard>
            </div>

            {/* Bot Aggregator */}
            <BotAggregator />

            {/* Recent Activity */}
            <GlowCard>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { agent: 'GPT-4 Agent', action: 'Completed 45 prompts', time: '2 min ago', status: 'success' },
                  { agent: 'Claude Agent', action: 'Processing batch request', time: '5 min ago', status: 'active' },
                  { agent: 'Gemini Agent', action: 'Model updated successfully', time: '12 min ago', status: 'success' },
                  { agent: 'Llama Agent', action: 'Deployed new version', time: '18 min ago', status: 'success' },
                ].map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${activity.status === 'active' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
                      <div>
                        <p className="font-semibold text-sm">{activity.agent}</p>
                        <p className="text-text-secondary text-xs">{activity.action}</p>
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary">{activity.time}</span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        )}

        {activeTab === 'agents' && <AIAgentsPanel />}
        {activeTab === 'models' && <ModelsPanel />}
        {activeTab === 'logs' && <LogsViewer />}

        {/* AI Prompts Modal */}
        <AIPromptsModal 
          isOpen={showPromptsModal} 
          onClose={() => setShowPromptsModal(false)} 
        />
      </div>
    </main>
  );
}
