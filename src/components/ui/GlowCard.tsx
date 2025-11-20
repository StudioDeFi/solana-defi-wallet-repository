'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useThemeStore } from '@/store/theme-store';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  hover?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  glowColor,
  intensity = 'medium',
  hover = true,
}) => {
  const { colors } = useThemeStore();
  const color = glowColor || colors?.glow || '#0ea5e9';
  
  const intensityMap = {
    low: '0 0 10px',
    medium: '0 0 20px, 0 0 40px',
    high: '0 0 30px, 0 0 60px, 0 0 90px',
  };

  const baseStyle = {
    boxShadow: `${intensityMap[intensity]} ${color}`,
  };

  return (
    <motion.div
      className={cn(
        'relative rounded-xl p-6 backdrop-blur-sm border',
        'bg-gradient-to-br from-surface/50 to-surface/30',
        className
      )}
      style={{
        ...baseStyle,
        borderColor: color,
        '--glow-color': color,
      } as React.CSSProperties}
      whileHover={hover ? {
        scale: 1.02,
        boxShadow: `${intensityMap[intensity]} ${color}, 0 0 80px ${color}40`,
      } : undefined}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 rounded-xl opacity-20 blur-xl"
        style={{
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

