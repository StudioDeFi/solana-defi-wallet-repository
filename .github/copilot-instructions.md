# Copilot Instructions for Solana DeFi Wallet Repository

## Project Overview

This is a comprehensive Solana wallet application with advanced features including MEV protection, multi-platform support (Web, Mobile, Desktop), and extensive DeFi integrations.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **State Management**: Zustand
- **Blockchain**: @solana/web3.js, @solana/wallet-adapter
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js API Routes

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # React components (wallet, swap, tokens, UI)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries (solana, aggregators, registry)
│   ├── store/            # Zustand state stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Helper utilities
│   ├── api/              # API SDK
│   └── middleware/       # Request middleware
├── prisma/               # Database schema
├── public/               # Static assets
├── mobile/               # React Native mobile app
└── desktop/              # Electron/Tauri desktop app
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Prisma database operations
npx prisma generate
npx prisma migrate dev
```

## Coding Conventions

### TypeScript

- Use strict TypeScript with proper type annotations
- Prefer interfaces for object types, types for unions/primitives
- Always define return types for functions
- Use path aliases (`@/*`) for imports from src directory

### React Components

- Use functional components with hooks
- Place component-specific types in the same file or in `src/types/`
- Use Framer Motion for animations
- Follow the existing component structure in `src/components/`

### Styling

- Use Tailwind CSS for styling
- Follow the design system documented in `DESIGN_SYSTEM.md`
- Use the existing UI components in `src/components/ui/` (GlowCard, NeonText, etc.)
- Support Dark, Dim, and Day themes

### API Routes

- Place API routes in `src/app/api/`
- Use proper error handling with try-catch blocks
- Implement rate limiting for public endpoints
- Return consistent JSON response structures

### Solana Integration

- Use `@solana/web3.js` for blockchain interactions
- Use wallet adapters from `@solana/wallet-adapter-*` packages
- Implement MEV protection for swap transactions when appropriate
- Handle transaction errors gracefully with user-friendly messages

## Security Considerations

- Never commit secrets or API keys to the repository
- Use environment variables for sensitive configuration
- Validate and sanitize all user inputs
- Use JWT for authentication where applicable
- Implement rate limiting on API endpoints
- Be cautious with transaction signing and wallet operations

## Files to Avoid Modifying

- `.env` and `.env.*` files (contain secrets)
- `node_modules/` directory
- `.next/` build output directory
- `prisma/migrations/` (use Prisma CLI for migrations)

## Testing

This project does not have a formal test suite. When adding new features:
- Manually test all changes in the development environment
- Verify wallet connection flows work with multiple wallet providers
- Test API endpoints with various input scenarios
- Check responsive design across different screen sizes

## Documentation

- Update `README.md` for significant feature changes
- Document API changes in the API Documentation section
- Keep `CHANGELOG.md` updated for version releases
- Refer to existing documentation files for context:
  - `DESIGN_SYSTEM.md` - Component architecture
  - `PRODUCTION_DEPLOYMENT.md` - Deployment instructions
  - `API_KEYS_GUIDE.md` - API configuration
