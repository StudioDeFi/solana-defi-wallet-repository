# Copilot Instructions for Solana DeFi Wallet Repository

## Project Overview

This is a comprehensive Solana wallet application built with Next.js 14, React 18, and TypeScript. The project includes advanced DeFi features like MEV protection, multi-wallet support, and swap aggregation across 22+ DEX platforms.

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

## Build and Development

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Database setup
npx prisma generate
npx prisma migrate dev
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
