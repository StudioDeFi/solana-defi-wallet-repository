'use client';

import React from 'react';
import { useThemeStore } from '@/store/theme-store';
import { ThemeMode } from '@/types';
import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/utils/cn';

export const ThemeSwitcher: React.FC = () => {
  const { mode, setMode } = useThemeStore();

  const themes: { mode: ThemeMode; icon: React.ReactNode; label: string }[] = [
    { mode: 'day', icon: <Sun size={18} />, label: 'Day' },
    { mode: 'dim', icon: <Monitor size={18} />, label: 'Dim' },
    { mode: 'dark', icon: <Moon size={18} />, label: 'Dark' },
  ];

  return (
    <div className="flex items-center gap-2 p-1 rounded-lg bg-surface/50 backdrop-blur-sm border border-border/50">
      {themes.map((theme) => (
        <button
          key={theme.mode}
          onClick={() => setMode(theme.mode)}
          className={cn(
            'relative px-4 py-2 rounded-md transition-all duration-200',
            'flex items-center gap-2',
            mode === theme.mode
              ? 'text-primary'
              : 'text-text-secondary hover:text-text'
          )}
        >
          {mode === theme.mode && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 rounded-md bg-primary/20 border border-primary/50"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {theme.icon}
            <span className="text-sm font-medium">{theme.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

