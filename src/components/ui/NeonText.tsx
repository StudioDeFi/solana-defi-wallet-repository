'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useThemeStore } from '@/store/theme-store';

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
}

export const NeonText: React.FC<NeonTextProps> = memo(({
  children,
  className,
  glowColor,
  size = 'md',
  animate = true,
  as: Component = 'span',
}) => {
  const { colors } = useThemeStore();
  const color = glowColor || colors?.glow || '#0ea5e9';
  
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const baseProps = {
    className: cn(
      sizeMap[size],
      'font-bold',
      className
    ),
    style: {
      color,
      textShadow: `
        0 0 5px ${color},
        0 0 10px ${color},
        0 0 15px ${color},
        0 0 20px ${color}
      `,
    },
    animate: animate ? {
      filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
    } : undefined,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  if (Component === 'span') {
    return <motion.span {...baseProps}>{children}</motion.span>;
  }

  const MotionComponent = motion[Component as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'] || motion.span;
  return <MotionComponent {...baseProps}>{children}</MotionComponent>;
});

NeonText.displayName = 'NeonText';

