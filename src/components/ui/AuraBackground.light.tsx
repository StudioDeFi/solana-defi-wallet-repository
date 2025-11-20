'use client';

import React from 'react';
import { useThemeStore } from '@/store/theme-store';

// Lightweight version - CSS only, no Three.js
export const AuraBackground: React.FC = () => {
  const { colors } = useThemeStore();
  const glowColor = colors?.glow || '#0ea5e9';

  return (
    <div 
      className="fixed inset-0 -z-10 opacity-20 pointer-events-none"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, ${glowColor}40 0%, transparent 50%),
          radial-gradient(circle at 80% 50%, ${glowColor}40 0%, transparent 50%),
          radial-gradient(circle at 50% 20%, ${glowColor}30 0%, transparent 50%),
          radial-gradient(circle at 50% 80%, ${glowColor}30 0%, transparent 50%)
        `,
        animation: 'aurora 20s ease-in-out infinite alternate',
      }}
    />
  );
};

