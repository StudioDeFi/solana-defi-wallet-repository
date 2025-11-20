'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { ThemeColors } from '@/types';

interface ThemeProviderProps {
  children: React.ReactNode;
  tokenAddress?: string;
  tokenLogoUrl?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  tokenAddress,
  tokenLogoUrl,
}) => {
  const { mode, colors, getTokenTheme } = useThemeStore();
  const themeColors: ThemeColors = tokenAddress
    ? getTokenTheme(tokenAddress) || colors || getDefaultColors(mode)
    : colors || getDefaultColors(mode);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', mode);
    
    // Apply CSS variables
    root.style.setProperty('--color-primary', themeColors.primary);
    root.style.setProperty('--color-secondary', themeColors.secondary);
    root.style.setProperty('--color-accent', themeColors.accent);
    root.style.setProperty('--color-background', themeColors.background);
    root.style.setProperty('--color-surface', themeColors.surface);
    root.style.setProperty('--color-text', themeColors.text);
    root.style.setProperty('--color-text-secondary', themeColors.textSecondary);
    root.style.setProperty('--color-border', themeColors.border);
    root.style.setProperty('--color-glow', themeColors.glow);
  }, [mode, themeColors]);

  return <>{children}</>;
};

const getDefaultColors = (mode: 'dark' | 'dim' | 'day'): ThemeColors => {
  const themes = {
    dark: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#0369a1',
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      border: '#075985',
      glow: '#0ea5e9',
    },
    dim: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#0369a1',
      background: '#1a1a1a',
      surface: '#2a2a2a',
      text: '#e0e0e0',
      textSecondary: '#b0b0b0',
      border: '#0284c7',
      glow: '#0ea5e9',
    },
    day: {
      primary: '#0ea5e9',
      secondary: '#0284c7',
      accent: '#0369a1',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#1a1a1a',
      textSecondary: '#666666',
      border: '#bae6fd',
      glow: '#0ea5e9',
    },
  };
  return themes[mode];
};

