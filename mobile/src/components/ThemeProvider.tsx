import React from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '../store/theme-store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const { mode } = useThemeStore();

  // Apply theme based on mode
  React.useEffect(() => {
    // Theme logic for mobile
  }, [mode, colorScheme]);

  return <>{children}</>;
};

