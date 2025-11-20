import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, ThemeColors } from '@/types';

interface ThemeState {
  mode: ThemeMode;
  colors: ThemeColors | null;
  tokenColors: Record<string, ThemeColors>;
  setMode: (mode: ThemeMode) => void;
  setColors: (colors: ThemeColors) => void;
  setTokenColors: (tokenAddress: string, colors: ThemeColors) => void;
  getTokenTheme: (tokenAddress: string) => ThemeColors | null;
}

const defaultColors: ThemeColors = {
  primary: '#0ea5e9',
  secondary: '#0284c7',
  accent: '#0369a1',
  background: '#0a0a0a',
  surface: '#1a1a1a',
  text: '#ffffff',
  textSecondary: '#a0a0a0',
  border: '#075985',
  glow: '#0ea5e9',
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'dark',
      colors: defaultColors,
      tokenColors: {},
      setMode: (mode) => set({ mode }),
      setColors: (colors) => set({ colors }),
      setTokenColors: (tokenAddress, colors) => set((state) => ({
        tokenColors: {
          ...state.tokenColors,
          [tokenAddress]: colors,
        },
      })),
      getTokenTheme: (tokenAddress) => {
        const state = get();
        return state.tokenColors[tokenAddress] || state.colors;
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

