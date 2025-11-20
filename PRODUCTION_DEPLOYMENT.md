# Production Deployment Guide

This guide covers deploying the Solana Wallet application to production with all optimizations enabled.

## 🚀 Pre-Deployment Checklist

### 1. Environment Variables

Set up the following environment variables in your deployment platform (Vercel, Netlify, etc.):

```env
# Required
DATABASE_URL="your-production-database-url"
NEXT_PUBLIC_SOLANA_RPC_MAINNET="https://api.mainnet-beta.solana.com"
JWT_SECRET="your-secure-random-secret-key-min-32-chars"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"

# Optional - API Keys
BIRDEYE_API_KEY="your-birdeye-api-key"
JUPITER_API_KEY="your-jupiter-api-key"
```

### 2. Database Setup

#### For Vercel (Recommended)
1. Go to Vercel Dashboard → Your Project → Storage
2. Create a Postgres database
3. Copy the connection string to `DATABASE_URL`

#### For Other Platforms
1. Set up a PostgreSQL database (AWS RDS, Supabase, Railway, etc.)
2. Update `DATABASE_URL` with your connection string
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

### 3. Build & Test Locally

```bash
# Install dependencies
npm install --legacy-peer-deps

# Generate Prisma client
npx prisma generate

# Build for production
npm run build

# Test production build locally
npm start
```

## 📦 Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables from the checklist above

3. **Configure Build Settings**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `npm install --legacy-peer-deps`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project.vercel.app`

### Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Add new site from Git
   - Connect your repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add all required variables

4. **Deploy**
   - Push to main branch triggers auto-deploy

### Railway

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - New Project → Deploy from GitHub

2. **Add Database**
   - Add PostgreSQL service
   - Copy connection string to `DATABASE_URL`

3. **Configure**
   - Set environment variables
   - Deploy automatically starts

## 🔧 Production Optimizations Enabled

### Performance
- ✅ SWC minification
- ✅ Image optimization (AVIF, WebP)
- ✅ Code splitting (vendor, Solana libraries)
- ✅ Compression enabled
- ✅ ETags for caching
- ✅ Standalone output for Docker

### Security
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-Content-Type-Options: nosniff
- ✅ X-XSS-Protection enabled
- ✅ Referrer-Policy configured
- ✅ Permissions-Policy set
- ✅ Powered-by header removed

### SEO
- ✅ Comprehensive metadata
- ✅ Open Graph tags
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Canonical URLs
- ✅ Sitemap ready

### Accessibility
- ✅ ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management

### Error Handling
- ✅ Error boundaries
- ✅ Graceful fallbacks
- ✅ Error logging ready
- ✅ User-friendly error messages

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Vercel Analytics** (if using Vercel)
   - Built-in performance monitoring
   - Real User Monitoring (RUM)

2. **Sentry** (Error Tracking)
   ```bash
   npm install @sentry/nextjs
   ```
   - Configure in `sentry.client.config.js`

3. **Google Analytics**
   - Add tracking ID to environment variables
   - Implement in `_app.tsx` or `layout.tsx`

4. **Logging**
   - Use Vercel's built-in logs
   - Or integrate with LogRocket, Datadog, etc.

## 🔍 Post-Deployment Verification

### 1. Functionality Tests
- [ ] Wallet connection works
- [ ] Token list loads
- [ ] Swap interface functional
- [ ] Portfolio displays correctly
- [ ] Theme switching works
- [ ] Error boundaries catch errors

### 2. Performance Tests
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Images load optimized formats

### 3. SEO Tests
- [ ] Meta tags present
- [ ] Open Graph preview works
- [ ] Structured data valid
- [ ] Sitemap accessible

### 4. Security Tests
- [ ] HTTPS enabled
- [ ] Security headers present
- [ ] No sensitive data exposed
- [ ] API routes protected

## 🐛 Troubleshooting

### Build Fails

**Error: Prisma Client not generated**
```bash
npx prisma generate
```

**Error: Module not found**
```bash
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
```

### Database Connection Issues

1. Check `DATABASE_URL` format
2. Verify database is accessible
3. Check firewall rules
4. Test connection with `npx prisma db pull`

### Performance Issues

1. Check bundle size: `npm run build` shows sizes
2. Enable Vercel Analytics
3. Review Lighthouse report
4. Optimize images
5. Check API response times

## 📈 Scaling Considerations

### Database
- Use connection pooling (PgBouncer)
- Set up read replicas for high traffic
- Monitor query performance

### API Routes
- Implement rate limiting
- Cache responses where possible
- Use CDN for static assets

### Monitoring
- Set up alerts for errors
- Monitor API response times
- Track user metrics
- Watch database performance

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install --legacy-peer-deps
      - run: npm run build
      # Add deployment steps
```

## 📝 Maintenance

### Regular Tasks
- Update dependencies monthly
- Review security advisories
- Monitor error logs
- Update database schema as needed
- Backup database regularly

### Updates
```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit

# Update Prisma
npx prisma update
npx prisma migrate dev
```

## 🎉 Success!

Your Solana Wallet is now production-ready with:
- ✅ Optimized performance
- ✅ Security best practices
- ✅ SEO optimization
- ✅ Error handling
- ✅ Accessibility features
- ✅ Modern design system

For support, check the main README.md or open an issue on GitHub.

