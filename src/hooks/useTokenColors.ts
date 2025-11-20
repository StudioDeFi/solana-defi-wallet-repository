import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { extractColorsFromImage, generateThemeFromColors } from '@/lib/color-extractor';
import { ThemeColors } from '@/types';

export const useTokenColors = (tokenLogoUrl?: string, tokenAddress?: string) => {
  const { mode, setTokenColors, getTokenTheme } = useThemeStore();
  const [colors, setColors] = useState<ThemeColors | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tokenLogoUrl || !tokenAddress) {
      setColors(null);
      return;
    }

    const loadColors = async () => {
      setLoading(true);
      try {
        const palette = await extractColorsFromImage(tokenLogoUrl);
        const themeColors = generateThemeFromColors(palette, mode);
        setColors(themeColors);
        setTokenColors(tokenAddress, themeColors);
      } catch (error) {
        console.error('Error extracting colors:', error);
        setColors(null);
      } finally {
        setLoading(false);
      }
    };

    loadColors();
  }, [tokenLogoUrl, tokenAddress, mode, setTokenColors]);

  useEffect(() => {
    if (tokenAddress) {
      const existingColors = getTokenTheme(tokenAddress);
      if (existingColors) {
        setColors(existingColors);
      }
    }
  }, [tokenAddress, getTokenTheme]);

  return { colors, loading };
};

