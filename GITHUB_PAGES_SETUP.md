# GitHub Pages Setup Instructions

Quick guide to enable GitHub Pages for this repository.

## Prerequisites

✅ GitHub Actions workflow is already configured (`.github/workflows/github-pages.yml`)  
✅ Repository has necessary permissions  
✅ You have admin access to the repository

## Setup Steps

### 1. Enable GitHub Pages

1. Go to repository on GitHub: https://github.com/StudioDeFi/solana-defi-wallet-repository

2. Click **Settings** (requires admin access)

3. In the left sidebar, click **Pages**

4. Under "Build and deployment":
   - **Source**: Select "**GitHub Actions**"
   - This enables workflow-based deployment

5. Save changes (if any)

### 2. Trigger First Deployment

**Option A: Push to main branch**
```bash
git push origin main
```

**Option B: Manual workflow dispatch**
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select branch: `main`
5. Click "Run workflow"

### 3. Wait for Deployment

1. Go to **Actions** tab
2. Watch the workflow run progress
3. When complete, you'll see a green checkmark ✅

Deployment typically takes 2-5 minutes.

### 4. Access Your Site

Once deployed, your site will be available at:

**https://studioDefi.github.io/solana-defi-wallet-repository/**

Or check the deployment URL in:
- Actions → Latest workflow run → Deploy step → View deployment

## Verification

### Check Deployment Status

- **Workflow Status**: ![GitHub Pages](https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml/badge.svg)
- **Actions Tab**: https://github.com/StudioDeFi/solana-defi-wallet-repository/actions/workflows/github-pages.yml
- **Settings → Pages**: Should show "Your site is live at..."

### Test Your Site

1. Visit: https://studioDefi.github.io/solana-defi-wallet-repository/
2. Verify the site loads correctly
3. Test navigation and client-side features

## Custom Domain (Optional)

To use a custom domain:

### 1. Configure Domain in GitHub

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `wallet.yourdomain.com`)
3. Click "Save"
4. Wait for DNS check

### 2. Configure DNS Records

Add one of the following to your DNS:

**Option A: CNAME (Subdomain)**
```
Type: CNAME
Name: wallet (or your subdomain)
Value: studioDefi.github.io
```

**Option B: A Records (Apex Domain)**
```
Type: A
Name: @ (or your apex domain)
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

### 3. Enable HTTPS

1. Wait for DNS propagation (up to 24 hours)
2. In **Settings** → **Pages**, check "Enforce HTTPS"

## Troubleshooting

### Pages Not Showing Up

**Problem**: Can't find Pages in Settings

**Solution**:
- Ensure you have admin access
- Check repository visibility (Pages works with public and private repos)
- Verify GitHub Actions are enabled

**Problem**: 404 error on site URL

**Solution**:
- Check if deployment completed successfully
- Verify Pages source is set to "GitHub Actions"
- Check Actions tab for deployment errors

### Build Failures

**Problem**: Workflow fails with errors

**Solution**:
1. Go to Actions tab
2. Click on failed workflow run
3. Check error logs
4. Common issues:
   - Missing dependencies (should be fixed)
   - Network errors (retry the workflow)
   - Configuration errors (check workflow file)

### Assets Not Loading

**Problem**: Images or styles not loading

**Solution**:
- Check browser console for errors
- Verify asset paths are relative
- Check `.nojekyll` file exists in `public/`

## Configuration Reference

### Current Workflow Configuration

File: `.github/workflows/github-pages.yml`

Key settings:
- **Trigger**: Push to `main` or manual dispatch
- **Build Command**: `npm run build:static`
- **Output Directory**: `./out`
- **Node Version**: 20.x

### Repository Permissions

Required permissions for the workflow:
- `contents: read` - Read repository content
- `pages: write` - Write to GitHub Pages
- `id-token: write` - Deploy pages

These are already configured in the workflow file.

## Monitoring

### Check Deployment History

1. Go to **Actions** tab
2. Filter by workflow: "Deploy to GitHub Pages"
3. View all past deployments

### View Logs

1. Click on any workflow run
2. Expand steps to see detailed logs
3. Check for errors or warnings

## Updating Content

Every push to `main` branch automatically triggers a new deployment:

```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Deployment starts automatically
# Check Actions tab for progress
```

## Disable GitHub Pages

If you need to disable Pages:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment"
3. Set **Source** to "None"
4. Site will be taken offline

Note: Workflow will still run but won't deploy.

## Additional Resources

- **GitHub Pages Documentation**: https://docs.github.com/pages
- **Custom Domain Setup**: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site
- **Troubleshooting Guide**: [GITHUB_PAGES_DEPLOYMENT.md#troubleshooting](./GITHUB_PAGES_DEPLOYMENT.md#troubleshooting)

## Support

If you encounter issues:

1. Check [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) for detailed documentation
2. Review workflow logs in Actions tab
3. Open an issue: https://github.com/StudioDeFi/solana-defi-wallet-repository/issues

---

**Next Steps**: After enabling Pages, configure Vercel deployment!  
See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for instructions.
