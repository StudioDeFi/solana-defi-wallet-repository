'use client';

import React, { useState } from 'react';
import { X, Send, Copy, Star, Clock, Sparkles } from 'lucide-react';

interface AIPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const promptTemplates = [
  {
    id: 1,
    title: 'Code Generator',
    prompt: 'Generate a React component that...',
    category: 'Development',
    starred: true,
  },
  {
    id: 2,
    title: 'Smart Contract Audit',
    prompt: 'Analyze this Solana smart contract for security vulnerabilities...',
    category: 'Security',
    starred: false,
  },
  {
    id: 3,
    title: 'Data Analysis',
    prompt: 'Analyze the following transaction data and provide insights...',
    category: 'Analytics',
    starred: true,
  },
  {
    id: 4,
    title: 'API Integration',
    prompt: 'Create an integration for the following API endpoints...',
    category: 'Development',
    starred: false,
  },
];

export function AIPromptsModal({ isOpen, onClose }: AIPromptsModalProps) {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Development', 'Security', 'Analytics', 'Custom'];
  const filteredPrompts = selectedCategory === 'All' 
    ? promptTemplates 
    : promptTemplates.filter(p => p.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-surface border border-border shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-gradient-to-r from-primary/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Prompts</h2>
              <p className="text-sm text-text-secondary">Manage and execute AI prompts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-surface/50 hover:bg-surface flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 p-4 border-b border-border overflow-x-auto">
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Custom Prompt Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Custom Prompt</label>
            <div className="relative">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter your AI prompt here..."
                className="w-full min-h-[120px] p-4 pr-12 rounded-xl bg-background border border-border focus:border-primary focus:outline-none resize-none text-sm"
              />
              <button
                onClick={() => console.log('[v0] Sending prompt:', customPrompt)}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!customPrompt.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prompt Templates */}
          <div>
            <h3 className="text-lg font-bold mb-4">Saved Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPrompts.map((template) => (
                <div
                  key={template.id}
                  className="p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{template.title}</h4>
                      {template.starred && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {template.prompt}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCustomPrompt(template.prompt)}
                      className="flex-1 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition-colors"
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(template.prompt)}
                      className="w-10 h-10 rounded-lg bg-surface hover:bg-background flex items-center justify-center transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-surface/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Clock className="w-4 h-4" />
            <span>{filteredPrompts.length} templates available</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
