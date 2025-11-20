import ColorThief from 'colorthief';

export interface ColorPalette {
  dominant: string;
  palette: string[];
  vibrant: string;
  muted: string;
  dark: string;
  light: string;
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const extractColorsFromImage = async (
  imageUrl: string
): Promise<ColorPalette> => {
  try {
    // Create canvas to extract colors from image
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    return new Promise((resolve, reject) => {
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Could not get canvas context');
          }
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Sample colors from image
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          
          // Simple color extraction - get average color
          let r = 0, g = 0, b = 0;
          const sampleSize = Math.min(10000, pixels.length / 4);
          
          for (let i = 0; i < sampleSize * 4; i += 4) {
            r += pixels[i];
            g += pixels[i + 1];
            b += pixels[i + 2];
          }
          
          r = Math.floor(r / sampleSize);
          g = Math.floor(g / sampleSize);
          b = Math.floor(b / sampleSize);
          
          const dominantHex = rgbToHex(r, g, b);
          
          // Generate palette variations
          const paletteHex = [
            dominantHex,
            rgbToHex(Math.min(255, r + 20), Math.min(255, g + 20), Math.min(255, b + 20)),
            rgbToHex(Math.max(0, r - 20), Math.max(0, g - 20), Math.max(0, b - 20)),
            rgbToHex(Math.max(0, r - 40), Math.max(0, g - 40), Math.max(0, b - 40)),
            rgbToHex(Math.min(255, r + 40), Math.min(255, g + 40), Math.min(255, b + 40)),
          ];
          
          const vibrant = paletteHex[0];
          const muted = paletteHex[2];
          const dark = rgbToHex(
            Math.max(0, r - 50),
            Math.max(0, g - 50),
            Math.max(0, b - 50)
          );
          const light = rgbToHex(
            Math.min(255, r + 50),
            Math.min(255, g + 50),
            Math.min(255, b + 50)
          );
          
          resolve({
            dominant: dominantHex,
            palette: paletteHex,
            vibrant,
            muted,
            dark,
            light,
          });
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  } catch (error) {
    // Fallback colors
    return {
      dominant: '#0ea5e9',
      palette: ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
      vibrant: '#0ea5e9',
      muted: '#075985',
      dark: '#0c4a6e',
      light: '#38bdf8',
    };
  }
};

export const generateThemeFromColors = (palette: ColorPalette, mode: 'dark' | 'dim' | 'day') => {
  const baseColors = {
    dark: {
      primary: palette.vibrant,
      secondary: palette.muted,
      accent: palette.dominant,
      background: '#0a0a0a',
      surface: '#1a1a1a',
      text: '#ffffff',
      textSecondary: '#a0a0a0',
      border: palette.dark,
      glow: palette.vibrant,
    },
    dim: {
      primary: palette.vibrant,
      secondary: palette.muted,
      accent: palette.dominant,
      background: '#1a1a1a',
      surface: '#2a2a2a',
      text: '#e0e0e0',
      textSecondary: '#b0b0b0',
      border: palette.muted,
      glow: palette.dominant,
    },
    day: {
      primary: palette.dominant,
      secondary: palette.muted,
      accent: palette.vibrant,
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#1a1a1a',
      textSecondary: '#666666',
      border: palette.light,
      glow: palette.dominant,
    },
  };
  
  return baseColors[mode];
};

