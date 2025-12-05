# Copilot Instructions for Solana DeFi Wallet Repository

## Project Overview

This is a comprehensive Solana wallet application built with Next.js 14, React 18, and TypeScript. The project includes advanced DeFi features like MEV protection, multi-wallet support, and swap aggregation across 22+ DEX platforms.

## Key Documentation

Before making changes, review these essential documents:

- **[README.md](../README.md)** - Project setup and API documentation
- **[DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md)** - UI components and design patterns
- **[PRODUCTION_DEPLOYMENT.md](../PRODUCTION_DEPLOYMENT.md)** - Deployment configurations
- **[CHANGELOG.md](../CHANGELOG.md)** - Version history and release notes

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand
- **Animation**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Blockchain**: Solana (@solana/web3.js, wallet-adapter)

## Project Structure

```
src/
├── app/              # Next.js App Router pages and API routes
│   ├── api/          # API endpoints for swap, tokens, prices, orders
│   ├── layout.tsx    # Root layout with providers
│   └── page.tsx      # Home page
├── components/       # React components
│   ├── wallet/       # Wallet connection components
│   ├── swap/         # Swap interface components
│   ├── tokens/       # Token list and display components
│   ├── portfolio/    # Portfolio tracking components
│   ├── theme/        # Theme system (ThemeProvider, ThemeToggle)
│   └── ui/           # Reusable UI components (GlowCard, NeonText, etc.)
├── lib/              # Core utility libraries
├── hooks/            # Custom React hooks
├── store/            # Zustand state stores
├── types/            # TypeScript type definitions
├── utils/            # Helper utilities
└── middleware/       # Next.js middleware
```

## Coding Standards

### TypeScript

- Use strict mode (`"strict": true` in tsconfig.json)
- Define explicit types for function parameters and return values
- Use interfaces for object shapes, type aliases for unions/primitives
- Prefer `type` for component props
- Use path aliases (`@/components/*`, `@/lib/*`, etc.)

### React/Next.js

- Use functional components with hooks
- Mark client components with `'use client'` directive
- Keep server components as default when possible
- Use the App Router patterns for routing and data fetching
- Wrap error-prone components with `ErrorBoundary`

### Component Patterns

```typescript
// Component file structure
'use client'; // if needed

import React from 'react';
// External imports
// Internal imports using path aliases

interface ComponentProps {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow the design system defined in `DESIGN_SYSTEM.md`
- Use CSS variables for theme colors (e.g., `var(--color-primary)`)
- Use `clsx` and `tailwind-merge` for conditional classes

### State Management

- Use Zustand for global state
- Keep component-local state with `useState`
- Use `useEffect` for side effects

## API Conventions

### API Routes

- Located in `src/app/api/`
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return consistent JSON responses
- Include proper error handling and status codes
- Validate input with proper type checking

### Response Format

```typescript
// Success response
{ data: T, success: true }

// Error response
{ error: string, success: false }
```

## Security Considerations

This is a DeFi/crypto wallet application. Follow these security practices:

- Never log or expose private keys or seed phrases
- Validate all user inputs, especially token addresses and amounts
- Use rate limiting on API endpoints
- Sanitize data before database operations
- Use JWT for session management
- Follow Solana security best practices for transaction signing
- Never commit `.env` files (check `.gitignore`)

## Testing

- Tests should be co-located with the code they test or in a `__tests__` directory
- Use descriptive test names that explain the expected behavior
- Test edge cases, especially around numerical operations for crypto amounts

## Environment Setup

Required environment variables (see `.env.example` for template):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/solana_wallet"
NEXT_PUBLIC_SOLANA_RPC_MAINNET="https://api.mainnet-beta.solana.com"
JWT_SECRET="your-secure-random-secret-key-min-32-chars"
BIRDEYE_API_KEY="your-birdeye-api-key"  # Optional
```

**Important**: Never commit `.env` files. Only `.env.example` with placeholder values should be version controlled.

## Build and Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Lightweight build (faster, for testing)
npm run build:light

# Database setup
npx prisma generate
npx prisma migrate dev
```

## Validation Commands

Before submitting changes, ensure:

```bash
# TypeScript type checking
npx tsc --noEmit

# Build verification
npm run build

# Start development server to manually verify changes
npm run dev
```

## Documentation

- Update `README.md` for significant feature changes
- Document new API endpoints in the API Documentation section
- Keep `CHANGELOG.md` updated for releases
- Update `DESIGN_SYSTEM.md` for new UI components

## Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, Refactor)
- Reference issue numbers when applicable

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include a clear description of changes
- Update relevant documentation
- Ensure all tests pass
- Request review from appropriate team members

## Common Patterns and Troubleshooting

### Adding New API Endpoints

1. Create route file in `src/app/api/[endpoint]/route.ts`
2. Export HTTP method handlers (GET, POST, etc.)
3. Use consistent response format: `{ data: T, success: true }` or `{ error: string, success: false }`
4. Add proper error handling and input validation
5. Document the endpoint in README.md

### Adding New UI Components

1. Create component in appropriate `src/components/` subdirectory
2. Use `GlowCard` and `NeonText` for consistent styling
3. Follow the component pattern with explicit TypeScript props
4. Add `'use client'` directive for interactive components
5. Update `DESIGN_SYSTEM.md` for new reusable components

### Working with Solana/Wallet Integration

- Always use the wallet adapter hooks (`useWallet`, `useConnection`)
- Never expose or log private keys or seed phrases
- Handle wallet connection states gracefully
- Test with multiple wallet providers (Phantom, Solflare, etc.)

### Database Changes

1. Modify schema in `prisma/schema.prisma`
2. Run `npx prisma generate` to update client
3. Run `npx prisma migrate dev` to create migration
4. Test with local database before deploying
