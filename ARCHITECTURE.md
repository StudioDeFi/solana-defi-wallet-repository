# Architecture Documentation

## System Overview

Solana DeFi Wallet - Network CyberAi - Advanced Multi-Platform Wallet with AI Builder Dashboard

### Core Architecture Principles

1. **Multi-Platform First**: Web, Mobile APK, iOS, Windows Desktop
2. **AI-Driven**: Integrated AI Builder Dashboard with Bot Aggregators and Model Management
3. **Security-First**: JWT authentication, MEV protection, secure wallet handling
4. **Production-Ready**: Optimized for performance, SEO, and accessibility
5. **Modular Design**: Component-based architecture following design system

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **State Management**: Zustand

### Backend
- **API**: Next.js API Routes (RESTful)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based sessions
- **Blockchain**: Solana Web3.js

### AI Integration
- **AI Dashboard**: `/ai-dashboard` route
- **Components**: AIPromptsModal, BotAggregator, AIAgentsPanel, ModelsPanel, LogsViewer
- **Features**: Dynamic config, auto-sync, real-time logs

## Directory Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home page (wallet)
│   │   ├── ai-dashboard/       # AI Builder Dashboard
│   │   │   └── page.tsx        # AI dashboard route
│   │   ├── api/                # API routes
│   │   │   ├── swap/           # Swap APIs (ultra, standard, lite)
│   │   │   ├── tokens/         # Token data API
│   │   │   ├── prices/         # Price aggregator API
│   │   │   ├── orders/         # Limit/DCA order APIs
│   │   │   └── health/         # Health check
│   │   └── globals.css         # Global styles + design tokens
│   ├── components/
│   │   ├── ai/                 # AI Dashboard components
│   │   │   ├── AIPromptsModal.tsx
│   │   │   ├── BotAggregator.tsx
│   │   │   ├── AIAgentsPanel.tsx
│   │   │   ├── ModelsPanel.tsx
│   │   │   └── LogsViewer.tsx
│   │   ├── wallet/             # Wallet components
│   │   │   ├── WalletProvider.tsx
│   │   │   └── WalletButton.tsx
│   │   ├── swap/               # Swap interface
│   │   ├── tokens/             # Token list
│   │   ├── theme/              # Theme components
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── ThemeSwitcher.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── GlowCard.tsx
│   │       ├── NeonText.tsx
│   │       └── AuraBackground.tsx
│   ├── lib/                    # Utilities
│   │   ├── solana.ts           # Solana helpers
│   │   ├── swap-aggregators.ts # Swap logic
│   │   ├── price-aggregators.ts
│   │   ├── token-registry.ts
│   │   ├── color-extractor.ts
│   │   └── db.ts               # Database client
│   ├── store/                  # Zustand stores
│   │   └── theme-store.ts
│   ├── middleware/             # Express-style middleware
│   │   └── auth.ts             # JWT authentication
│   ├── types/                  # TypeScript types
│   └── api/                    # SDK client
│       └── sdk.ts              # API client wrapper
├── prisma/
│   └── schema.prisma           # Database schema
├── public/                     # Static assets
└── [config files]              # next.config.js, tailwind.config.js, etc.
```

## Component Architecture

### 1. Provider Hierarchy

```
RootLayout
├── ErrorBoundary (Error handling)
├── WalletProvider (Solana wallet connection)
│   └── ThemeProvider (Dynamic theming)
│       └── Children (App routes)
```

### 2. Design System Components

All UI follows the design system documented in `DESIGN_SYSTEM.md`:

- **GlowCard**: Container with glow effects
- **NeonText**: Text with neon glow
- **AuraBackground**: Animated background
- **ThemeSwitcher**: Theme mode toggle

### 3. AI Dashboard Components

Located in `/src/components/ai/`:

#### AIPromptsModal
- Popup modal for AI prompt management
- Template library with categories
- Real-time prompt execution
- History tracking

#### BotAggregator
- Dynamic bot management dashboard
- Auto-sync with repository
- Real-time metrics (success rate, latency, cost)
- Start/pause/configure controls

#### AIAgentsPanel
- AI agent orchestration
- Performance monitoring
- Task queue management
- Agent health status

#### ModelsPanel
- Connected AI models display
- Model metrics (latency, cost, tokens/sec)
- Provider management (OpenAI, Anthropic, etc.)
- Version tracking

#### LogsViewer
- Real-time activity logs from UI/UX
- Filtering by level (info, warn, error)
- Search functionality
- Export capabilities

## Data Flow

### 1. Wallet Connection Flow

```
User clicks "Connect Wallet"
  ↓
WalletButton triggers wallet adapter
  ↓
WalletProvider connects to Phantom/Solflare/etc
  ↓
Wallet state updates in component
  ↓
JWT token generated (optional)
  ↓
User authenticated
```

### 2. Swap Flow

```
User selects tokens + amount
  ↓
SwapInterface validates inputs
  ↓
API call to /api/swap/ultra (or standard/lite)
  ↓
Backend aggregates routes from Jupiter/Raydium
  ↓
MEV protection applied (if ultra)
  ↓
Transaction built and returned
  ↓
User signs transaction
  ↓
Transaction sent to Solana RPC
  ↓
Confirmation + UI update
```

### 3. AI Dashboard Flow

```
User navigates to /ai-dashboard
  ↓
Dashboard loads AI components
  ↓
Components fetch data from API/store
  ↓
Real-time updates via polling/websocket
  ↓
User interacts (start bot, run prompt, etc.)
  ↓
API call to backend
  ↓
Action executed
  ↓
Logs updated in LogsViewer
```

## Authentication & Authorization

### JWT-Based Auth

Located in `/src/middleware/auth.ts`:

```typescript
// Verify JWT token
const user = verifyAuth(request);

// Require authentication
const user = requireAuth(request);
```

### User Access Control

- **Same User Login**: Grants access to AI Dashboard and repo sync
- **Wallet-Based Auth**: User identified by wallet address
- **Session Management**: JWT tokens with expiration
- **Role-Based Access**: Admin controls for certain features

### GitHub Integration (PR Access)

When user logs in from the same GitHub account:
1. User authenticates via GitHub OAuth
2. JWT token includes GitHub username
3. Access granted to open PR if same user
4. Repo syncs automatically with `cyberai-smart` branch

## Database Schema

Located in `/prisma/schema.prisma`:

### Tables
- **User**: Wallet addresses, JWT sessions
- **Transaction**: Swap history
- **Order**: Limit and DCA orders
- **Token**: Token metadata cache
- **Price**: Price history
- **AILog**: AI Dashboard activity logs
- **Bot**: Bot configurations
- **Agent**: AI agent records
- **Model**: AI model connections

## API Architecture

### Endpoints

#### Swap APIs
- `POST /api/swap/ultra` - MEV-protected swaps
- `POST /api/swap/standard` - Standard swaps
- `POST /api/swap/lite` - Fast swaps

#### Token APIs
- `GET /api/tokens` - Token list with filters
- `GET /api/tokens/[address]` - Token details

#### Price APIs
- `GET /api/prices` - Multi-token prices
- `GET /api/prices/[token]` - Single token price

#### Order APIs
- `GET/POST /api/orders/limit` - Limit orders
- `GET/POST /api/orders/dca` - DCA orders
- `PATCH/DELETE /api/orders/[type]/[id]` - Manage orders

#### AI APIs (Future)
- `POST /api/ai/prompt` - Execute AI prompt
- `GET /api/ai/bots` - List bots
- `POST /api/ai/bots/[id]/start` - Start bot
- `GET /api/ai/logs` - Fetch logs

### API Response Format

```json
{
  "success": true,
  "data": { /* response data */ },
  "error": null,
  "timestamp": "2025-01-20T00:00:00Z"
}
```

## State Management

### Zustand Stores

#### theme-store.ts
```typescript
interface ThemeStore {
  mode: 'dark' | 'dim' | 'day';
  colors: ColorScheme | null;
  setMode: (mode) => void;
  setColors: (colors) => void;
}
```

#### wallet-store.ts (Future)
```typescript
interface WalletStore {
  connected: boolean;
  address: string | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
}
```

## Design Tokens

Located in `/src/app/globals.css`:

```css
:root {
  --color-primary: #0ea5e9;
  --color-secondary: #0284c7;
  --color-accent: #0369a1;
  --color-background: #0a0a0a;
  --color-surface: #1a1a1a;
  --color-text: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-border: #075985;
  --color-glow: #0ea5e9;
  --radius: 0.75rem;
}
```

## Security Architecture

### 1. API Security
- JWT authentication on protected routes
- Rate limiting (ready to enable)
- Input validation on all endpoints
- CORS configuration
- Secure headers (CSP, X-Frame-Options, etc.)

### 2. Wallet Security
- Never store private keys
- Sign transactions client-side
- Verify transaction data before signing
- MEV protection on swaps

### 3. Database Security
- Parameterized queries (Prisma)
- Connection pooling
- Encrypted connections
- Environment variable secrets

## Performance Optimization

### 1. Code Splitting
- Vendor chunks separated
- Route-based splitting
- Dynamic imports for heavy components

### 2. Image Optimization
- Next.js Image component
- AVIF/WebP formats
- Lazy loading
- Responsive sizes

### 3. Caching Strategy
- API response caching
- Static asset caching (CDN)
- Database query caching
- Client-side state persistence

### 4. Bundle Optimization
- Tree shaking enabled
- Dead code elimination
- SWC minification
- External CDN for Three.js

## Deployment Architecture

### Vercel Deployment
- Git-based deployments
- Automatic previews for PRs
- Environment variables via dashboard
- Edge functions for API routes

### Docker Deployment
- Multi-container setup (app + database + nginx)
- Health checks
- Auto-restart policies
- Volume persistence

### Environment Variables
```env
DATABASE_URL="postgres://..."
DIRECT_DATABASE_URL="postgres://..."
NEXT_PUBLIC_SOLANA_RPC_MAINNET="https://..."
JWT_SECRET="..."
BIRDEYE_API_KEY="..."
GITHUB_TOKEN="..." # For PR access
```

## Mobile & Desktop Architecture

### Mobile (React Native)
- Shared components from web
- Native wallet adapters
- Platform-specific UI adjustments
- APK/IPA build pipelines

### Desktop (Electron/Tauri)
- Web app wrapped in native shell
- System tray integration
- Auto-updater
- Native notifications

## AI Builder Dashboard Architecture

### Features
1. **AI Prompts Bot**: Template-based prompt execution
2. **Bot Aggregator**: Auto-syncing bot management with dynamic config
3. **AI Agents**: Multi-agent orchestration and monitoring
4. **Models Panel**: Connected AI model tracking
5. **Logs Viewer**: Real-time UI/UX activity logs

### Integration Points
- Syncs with GitHub repo (`cyberai-smart` branch)
- Auto-deploys on PR merge (same user access)
- Real-time log streaming from all components
- Dynamic configuration without code changes

## Testing Strategy

### Unit Tests
- Component testing with Jest
- Utility function tests
- API endpoint tests

### Integration Tests
- Wallet connection flows
- Swap execution
- Order placement
- AI dashboard interactions

### E2E Tests
- Full user journeys
- Cross-browser testing
- Mobile responsiveness

## Monitoring & Logging

### Application Monitoring
- Error tracking (Sentry-ready)
- Performance monitoring
- User analytics (privacy-focused)

### Logging
- Console logging with prefixes: `[v0]`, `[AI]`, `[Swap]`
- Structured logging for APIs
- Log aggregation in LogsViewer
- Export to external services

## Future Enhancements

### Planned Features
1. WebSocket support for real-time updates
2. Advanced AI prompt chaining
3. Bot marketplace
4. Multi-chain support (Ethereum, Polygon)
5. Social features (wallet profiles, leaderboards)
6. Advanced analytics dashboard
7. Custom bot builder UI
8. AI model fine-tuning interface

### Scalability Considerations
- Horizontal scaling for API routes
- Database read replicas
- CDN for static assets
- Queue system for background jobs
- Microservices architecture (long-term)

## Contributing

### Branch Strategy
- `main`: Production branch
- `cyberai-smart`: AI features and v0.app integrations
- Feature branches: `feature/feature-name`
- Hotfix branches: `hotfix/issue-description`

### PR Process
1. Create feature branch from `main` or `cyberai-smart`
2. Implement feature following architecture guidelines
3. Write tests
4. Open PR with description
5. Same user login grants auto-approval access
6. CI/CD runs tests
7. Merge after approval
8. Auto-deploy to staging/production

## References

- **Design System**: `DESIGN_SYSTEM.md`
- **Deployment Guide**: `PRODUCTION_DEPLOYMENT.md`
- **Quick Start**: `QUICK_START.md`
- **Changelog**: `CHANGELOG.md`
- **API Keys**: `API_KEYS_GUIDE.md`

---

**Architecture Version**: 1.0.0  
**Last Updated**: January 2025  
**Maintained by**: StudioDeFi - Network CyberAi  
**Repository**: https://github.com/StudioDeFi/solana-defi-wallet-repository
