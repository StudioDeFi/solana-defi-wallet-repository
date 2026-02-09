'use client';

import React, { useState, useEffect } from 'react';
import { GlowCard } from '@/components/ui/GlowCard';
import { Activity, Search, Filter, Download, AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'success' | 'warning' | 'error';
  source: string;
  message: string;
  details?: string;
}

const generateMockLogs = (): LogEntry[] => [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60),
    level: 'success',
    source: 'GPT-4 Agent',
    message: 'Successfully processed 45 prompts',
    details: 'Average latency: 234ms',
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    level: 'info',
    source: 'Bot Aggregator',
    message: 'Model sync completed',
    details: '4 models updated',
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: 'warning',
    source: 'Claude Agent',
    message: 'High latency detected',
    details: 'Latency: 450ms (threshold: 300ms)',
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 8),
    level: 'success',
    source: 'UI Dashboard',
    message: 'User interaction recorded',
    details: 'Tab switch: overview -> agents',
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    level: 'error',
    source: 'API Gateway',
    message: 'Rate limit exceeded',
    details: 'Retry after: 60 seconds',
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: 'info',
    source: 'Gemini Agent',
    message: 'Model deployment successful',
    details: 'Version: 1.2.3',
  },
];

export function LogsViewer() {
  const [logs, setLogs] = useState<LogEntry[]>(generateMockLogs());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        timestamp: new Date(),
        level: ['info', 'success', 'warning', 'error'][Math.floor(Math.random() * 4)] as any,
        source: ['GPT-4 Agent', 'Claude Agent', 'Bot Aggregator', 'UI Dashboard'][Math.floor(Math.random() * 4)],
        message: [
          'Request processed',
          'Model updated',
          'User action detected',
          'System health check',
        ][Math.floor(Math.random() * 4)],
      };
      setLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || log.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'success': return 'border-green-500/30 bg-green-500/5';
      case 'error': return 'border-red-500/30 bg-red-500/5';
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5';
      default: return 'border-blue-500/30 bg-blue-500/5';
    }
  };

  return (
    <div className="space-y-6">
      <GlowCard>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">System Logs</h3>
              <p className="text-sm text-text-secondary">Real-time UI/UX activity monitoring</p>
            </div>
          </div>
          <button
            onClick={() => console.log('[v0] Downloading logs...')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'info', 'success', 'warning', 'error'].map((level) => (
              <button
                key={level}
                onClick={() => setFilterLevel(level)}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  filterLevel === level
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text-secondary hover:text-text hover:bg-background'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Logs List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-lg border ${getLevelColor(log.level)} transition-all hover:scale-[1.01]`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getLevelIcon(log.level)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{log.message}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {log.source}
                        </span>
                      </div>
                      {log.details && (
                        <p className="text-xs text-text-secondary">{log.details}</p>
                      )}
                    </div>
                    <span className="text-xs text-text-secondary whitespace-nowrap">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
          <span className="text-text-secondary">{filteredLogs.length} log entries</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-text-secondary">Live monitoring</span>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );
}
