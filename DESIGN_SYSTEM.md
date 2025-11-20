# Design System Documentation

## Overview

The Solana Wallet uses a modern, neon-inspired design system with dynamic theming, glow effects, and smooth animations. The design is optimized for production with accessibility, performance, and SEO in mind.

## 🎨 Design Components

### 1. GlowCard

**Location:** `src/components/ui/GlowCard.tsx`

A card component with customizable glow effects and hover animations.

**Props:**
- `children`: React.ReactNode - Card content
- `className?: string` - Additional CSS classes
- `glowColor?: string` - Custom glow color (defaults to theme)
- `intensity?: 'low' | 'medium' | 'high'` - Glow intensity
- `hover?: boolean` - Enable hover effects
- `aria-label?: string` - Accessibility label
- `role?: string` - ARIA role

**Usage:**
```tsx
<GlowCard intensity="high" glowColor="#0ea5e9">
  <YourContent />
</GlowCard>
```

**Features:**
- ✅ Memoized for performance
- ✅ Framer Motion animations
- ✅ Dynamic color theming
- ✅ Accessibility support
- ✅ Responsive design

### 2. NeonText

**Location:** `src/components/ui/NeonText.tsx`

Text component with neon glow effect and optional animation.

**Props:**
- `children`: React.ReactNode - Text content
- `className?: string` - Additional CSS classes
- `glowColor?: string` - Custom glow color
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Text size
- `animate?: boolean` - Enable pulsing animation
- `as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'` - HTML element

**Usage:**
```tsx
<NeonText size="xl" animate={true}>
  Solana Wallet
</NeonText>
```

**Features:**
- ✅ Memoized for performance
- ✅ Multiple text sizes
- ✅ Pulsing animation
- ✅ Semantic HTML support
- ✅ Dynamic color theming

### 3. AuraBackground

**Location:** `src/components/ui/AuraBackground.tsx`

Animated background with radial gradients creating an aura effect.

**Features:**
- ✅ CSS-only (no Three.js dependency)
- ✅ Lightweight
- ✅ Theme-aware colors
- ✅ Smooth animations

### 4. Theme System

**Location:** `src/store/theme-store.ts`, `src/components/theme/ThemeProvider.tsx`

Dynamic theme system with three modes: Dark, Dim, and Day.

**Theme Modes:**
- **Dark**: Deep black background (#0a0a0a)
- **Dim**: Dark gray background (#1a1a1a)
- **Day**: Light background (#ffffff)

**Features:**
- ✅ Zustand state management
- ✅ Token-based color extraction
- ✅ CSS variable integration
- ✅ Persistent theme selection

## 🎯 Component Architecture

### Layout Structure

```
RootLayout (layout.tsx)
├── ErrorBoundary
│   ├── WalletProvider
│   │   ├── ThemeProvider
│   │   │   ├── AuraBackground
│   │   │   ├── Home Page (page.tsx)
│   │   │   │   ├── Header
│   │   │   │   │   ├── NeonText (Title)
│   │   │   │   │   ├── ThemeSwitcher
│   │   │   │   │   └── WalletButton
│   │   │   │   ├── Main Grid
│   │   │   │   │   ├── GlowCard (SwapInterface)
│   │   │   │   │   └── GlowCard (Portfolio)
│   │   │   │   └── GlowCard (TokenList)
│   │   │   └── Toaster (Notifications)
```

### Component Hierarchy

1. **Providers** (Top Level)
   - `WalletProvider`: Solana wallet connection
   - `ThemeProvider`: Theme management
   - `ErrorBoundary`: Error handling

2. **Layout Components**
   - `AuraBackground`: Animated background
   - Header with navigation

3. **Feature Components**
   - `SwapInterface`: Token swapping UI
   - `Portfolio`: Wallet balance display
   - `TokenList`: Token browsing
   - `WalletButton`: Wallet connection

4. **UI Components**
   - `GlowCard`: Container with glow
   - `NeonText`: Glowing text
   - `ThemeSwitcher`: Theme toggle

## 🔌 Wire-Up Architecture

### State Management

**Zustand Stores:**
- `theme-store.ts`: Theme colors and mode
- `wallet-store.ts`: Wallet connection state

**React Context:**
- `WalletProvider`: Solana wallet adapter context
- `ThemeProvider`: Theme application

### API Integration

**SDK:** `src/api/sdk.ts`
- Centralized API client
- Methods for swap, tokens, prices, orders

**API Routes:** `src/app/api/`
- `/api/swap/ultra` - MEV-protected swaps
- `/api/swap/standard` - Standard swaps
- `/api/swap/lite` - Fast swaps
- `/api/tokens` - Token data
- `/api/prices` - Price data
- `/api/orders` - Limit/DCA orders

### Data Flow

```
User Action
  ↓
Component (e.g., SwapInterface)
  ↓
Hook (e.g., useWallet)
  ↓
SDK (src/api/sdk.ts)
  ↓
API Route (src/app/api/)
  ↓
External Service (Jupiter, Birdeye, etc.)
  ↓
Response → Component Update
```

## 🎨 Color System

### CSS Variables

Defined in `src/app/globals.css`:

```css
--color-primary: #0ea5e9
--color-secondary: #0284c7
--color-accent: #0369a1
--color-background: #0a0a0a
--color-surface: #1a1a1a
--color-text: #ffffff
--color-text-secondary: #a0a0a0
--color-border: #075985
--color-glow: #0ea5e9
```

### Dynamic Theming

Colors are dynamically updated via:
1. Theme store (Zustand)
2. Theme provider (applies CSS variables)
3. Token color extraction (from logos)

## 🚀 Performance Optimizations

### Code Splitting
- Vendor chunks separated
- Solana libraries in separate chunk
- Route-based splitting

### Component Optimization
- React.memo for expensive components
- Suspense boundaries for async data
- Lazy loading where applicable

### Image Optimization
- Next.js Image component
- AVIF and WebP formats
- Responsive sizes
- Lazy loading

### Bundle Optimization
- SWC minification
- Tree shaking
- Dead code elimination
- External CDN for heavy libs (Three.js)

## ♿ Accessibility Features

### ARIA Support
- Proper labels on interactive elements
- Role attributes where needed
- Screen reader friendly

### Keyboard Navigation
- Tab order logical
- Focus indicators visible
- Keyboard shortcuts support

### Semantic HTML
- Proper heading hierarchy
- Landmark regions
- Form labels

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Grid System
- CSS Grid for layouts
- Flexbox for components
- Tailwind responsive utilities

## 🔒 Security Features

### Headers (next.config.js)
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### API Security
- JWT authentication
- Rate limiting ready
- Input validation
- CORS configuration

## 📊 SEO Optimization

### Metadata (layout.tsx)
- Comprehensive meta tags
- Open Graph tags
- Twitter Cards
- Structured data (JSON-LD)
- Canonical URLs

### Performance
- Fast page loads
- Optimized images
- Minimal JavaScript
- Server-side rendering

## 🎭 Animation System

### Framer Motion
- Smooth transitions
- Hover effects
- Loading states
- Page transitions

### CSS Animations
- Glow effects
- Aurora background
- Pulse animations
- Float effects

## 📝 Usage Examples

### Creating a New GlowCard Section

```tsx
import { GlowCard } from '@/components/ui/GlowCard';
import { NeonText } from '@/components/ui/NeonText';

export const MyComponent = () => {
  return (
    <GlowCard intensity="high">
      <NeonText size="lg">My Title</NeonText>
      <p>Content here</p>
    </GlowCard>
  );
};
```

### Using Theme Colors

```tsx
import { useThemeStore } from '@/store/theme-store';

export const MyComponent = () => {
  const { colors } = useThemeStore();
  
  return (
    <div style={{ color: colors?.glow }}>
      Themed content
    </div>
  );
};
```

### Error Handling

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

## 🎯 Best Practices

1. **Always use GlowCard for containers** - Provides consistent styling
2. **Use NeonText for headings** - Maintains design consistency
3. **Leverage theme store** - For dynamic colors
4. **Add error boundaries** - For production resilience
5. **Use Suspense** - For async data loading
6. **Memoize expensive components** - For performance
7. **Add ARIA labels** - For accessibility
8. **Test responsive design** - On multiple devices

## 🔄 Maintenance

### Updating Colors
Edit `src/store/theme-store.ts` or `src/app/globals.css`

### Adding New Components
1. Create component in appropriate directory
2. Use GlowCard/NeonText for consistency
3. Add to design system docs
4. Test accessibility
5. Optimize performance

---

**Design System Version:** 1.0.0  
**Last Updated:** Production Ready  
**Maintained by:** StudioDeFi

