'use client';

import React, { useState } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Layers, TrendingUp, Zap, DollarSign, CheckCircle, Plus } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  provider: string;
  category: string;
  performance: number;
  costPerToken: number;
  avgLatency: number;
  status: 'available' | 'limited' | 'unavailable';
}

const models: Model[] = [
  {
    id: '1',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    category: 'Large Language Model',
    performance: 98,
    costPerToken: 0.03,
    avgLatency: 234,
    status: 'available',
  },
  {
    id: '2',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    category: 'Large Language Model',
    performance: 97,
    costPerToken: 0.015,
    avgLatency: 189,
    status: 'available',
  },
  {
    id: '3',
    name: 'Gemini Pro',
    provider: 'Google',
    category: 'Large Language Model',
    performance: 95,
    costPerToken: 0.002,
    avgLatency: 156,
    status: 'available',
  },
  {
    id: '4',
    name: 'Llama 3 70B',
    provider: 'Meta',
    category: 'Open Source LLM',
    performance: 93,
    costPerToken: 0.001,
    avgLatency: 201,
    status: 'available',
  },
  {
    id: '5',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    category: 'Image Generation',
    performance: 96,
    costPerToken: 0.04,
    avgLatency: 4500,
    status: 'available',
  },
  {
    id: '6',
    name: 'Stable Diffusion XL',
    provider: 'Stability AI',
    category: 'Image Generation',
    performance: 92,
    costPerToken: 0.005,
    avgLatency: 3200,
    status: 'available',
  },
];

export function ModelsPanel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(models.map(m => m.category)))];
  const filteredModels = selectedCategory === 'All' 
    ? models 
    : models.filter(m => m.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-500 bg-green-500/10';
      case 'limited': return 'text-yellow-500 bg-yellow-500/10';
      case 'unavailable': return 'text-red-500 bg-red-500/10';
      default: return 'text-text-secondary bg-surface';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">AI Models</h2>
          <p className="text-text-secondary">Available models and performance metrics</p>
        </div>
        <button
          onClick={() => console.log('[v0] Add custom model')}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Model
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-white'
                : 'bg-surface text-text-secondary hover:text-text hover:bg-background'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredModels.map((model) => (
          <GlowCard key={model.id}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{model.name}</h3>
                  <p className="text-sm text-text-secondary mb-2">{model.provider}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                      {model.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${getStatusColor(model.status)}`}>
                      <CheckCircle className="w-3 h-3" />
                      {model.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-text-secondary flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Performance
                  </span>
                  <span className="text-sm font-bold">{model.performance}%</span>
                </div>
                <div className="h-2 rounded-full bg-background overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all"
                    style={{ width: `${model.performance}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-background">
                  <div className="flex items-center gap-1 text-text-secondary text-xs mb-1">
                    <Zap className="w-3 h-3" />
                    Latency
                  </div>
                  <p className="font-bold">{model.avgLatency}ms</p>
                </div>
                <div className="p-3 rounded-lg bg-background">
                  <div className="flex items-center gap-1 text-text-secondary text-xs mb-1">
                    <DollarSign className="w-3 h-3" />
                    Cost/Token
                  </div>
                  <p className="font-bold">${model.costPerToken.toFixed(3)}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => console.log('[v0] Use model:', model.id)}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                Use Model
              </button>
              <button
                onClick={() => console.log('[v0] View model details:', model.id)}
                className="px-4 py-2 rounded-lg bg-surface hover:bg-background font-semibold transition-colors"
              >
                Details
              </button>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Total Models</p>
            <p className="text-2xl font-bold">{filteredModels.length}</p>
          </div>
        </GlowCard>
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Avg Performance</p>
            <p className="text-2xl font-bold text-green-500">
              {(filteredModels.reduce((sum, m) => sum + m.performance, 0) / filteredModels.length).toFixed(1)}%
            </p>
          </div>
        </GlowCard>
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Avg Latency</p>
            <p className="text-2xl font-bold text-blue-500">
              {Math.round(filteredModels.reduce((sum, m) => sum + m.avgLatency, 0) / filteredModels.length)}ms
            </p>
          </div>
        </GlowCard>
        <GlowCard>
          <div className="text-center">
            <p className="text-text-secondary text-sm mb-1">Providers</p>
            <p className="text-2xl font-bold text-purple-500">
              {new Set(filteredModels.map(m => m.provider)).size}
            </p>
          </div>
        </GlowCard>
      </div>
    </div>
  );
}
