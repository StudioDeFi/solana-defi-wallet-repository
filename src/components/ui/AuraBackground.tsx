'use client';

import React from 'react';
import { useThemeStore } from '@/store/theme-store';

// Lightweight CSS-only version (no Three.js dependency)
// For full 3D version, use AuraBackground.full.tsx
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
      }}
    >
      <style jsx>{`
        @keyframes aurora {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, 10px) scale(1.1); }
          100% { transform: translate(-10px, -10px) scale(1); }
        }
        div {
          animation: aurora 20s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

