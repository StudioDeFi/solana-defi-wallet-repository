'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Bot, Plus, Edit, Trash2, Play, Pause, BarChart3 } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  status: 'running' | 'paused' | 'stopped';
  tasksCompleted: number;
  successRate: number;
}

const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Code Generator Agent',
    description: 'Generates React components and TypeScript code',
    model: 'GPT-4 Turbo',
    status: 'running',
    tasksCompleted: 1247,
    successRate: 98.5,
  },
  {
    id: '2',
    name: 'Security Auditor',
    description: 'Analyzes smart contracts for vulnerabilities',
    model: 'Claude 3 Opus',
    status: 'running',
    tasksCompleted: 892,
    successRate: 99.2,
  },
  {
    id: '3',
    name: 'Data Analyst',
    description: 'Processes transaction data and generates insights',
    model: 'Gemini Pro',
    status: 'paused',
    tasksCompleted: 534,
    successRate: 97.8,
  },
  {
    id: '4',
    name: 'Documentation Writer',
    description: 'Creates comprehensive code documentation',
    model: 'Claude 3 Sonnet',
    status: 'running',
    tasksCompleted: 678,
    successRate: 96.4,
  },
];

export function AIAgentsPanel() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

  const toggleAgentStatus = (id: string) => {
    setAgents(prev => prev.map(agent =>
      agent.id === id
        ? { ...agent, status: agent.status === 'running' ? 'paused' : 'running' as const }
        : agent
    ));
    console.log('[v0] Toggled agent status:', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">AI Agents</h2>
          <p className="text-text-secondary">Manage your autonomous AI workforce</p>
        </div>
        <button
          onClick={() => console.log('[v0] Create new agent')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          New Agent
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Total Agents</p>
            <p className="text-3xl font-bold">{agents.length}</p>
          </div>
        </GlowCard>
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Active</p>
            <p className="text-3xl font-bold text-green-500">
              {agents.filter(a => a.status === 'running').length}
            </p>
          </div>
        </GlowCard>
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Total Tasks</p>
            <p className="text-3xl font-bold">
              {agents.reduce((sum, a) => sum + a.tasksCompleted, 0).toLocaleString()}
            </p>
          </div>
        </GlowCard>
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Avg Success</p>
            <p className="text-3xl font-bold text-blue-500">
              {(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length).toFixed(1)}%
            </p>
          </div>
        </GlowCard>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <GlowCard key={agent.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{agent.name}</h3>
                  <p className="text-sm text-text-secondary mb-2">{agent.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                      {agent.model}
                    </span>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                      agent.status === 'running' ? 'bg-green-500/10 text-green-500' :
                      agent.status === 'paused' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        agent.status === 'running' ? 'bg-green-500 animate-pulse' :
                        agent.status === 'paused' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`} />
                      {agent.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Tasks Completed</p>
                <p className="text-xl font-bold">{agent.tasksCompleted.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-background">
                <p className="text-xs text-text-secondary mb-1">Success Rate</p>
                <p className="text-xl font-bold text-green-500">{agent.successRate}%</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleAgentStatus(agent.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  agent.status === 'running'
                    ? 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
                    : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                }`}
              >
                {agent.status === 'running' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start
                  </>
                )}
              </button>
              <button
                onClick={() => console.log('[v0] View agent analytics:', agent.id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 font-semibold text-sm transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log('[v0] Edit agent:', agent.id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-background font-semibold text-sm transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => console.log('[v0] Delete agent:', agent.id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 font-semibold text-sm transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  );
}
