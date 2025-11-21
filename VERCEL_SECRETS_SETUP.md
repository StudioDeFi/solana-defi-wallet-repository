# Vercel GitHub Actions Secrets Setup

Quick guide to configure GitHub secrets for automated Vercel deployment via GitHub Actions.

## Prerequisites

- Admin access to GitHub repository
- Vercel account with access to the project
- Vercel CLI installed (optional, for getting IDs)

## Required Secrets

You need to add 2 secrets to your GitHub repository:

1. **VERCEL_TOKEN** - Your Vercel authentication token
2. **VERCEL_ORG_ID** - Your Vercel organization/team ID

> **Note**: The project ID (`prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`) is already configured in the workflow.

## Step-by-Step Setup

### Step 1: Get Vercel Token

1. **Go to Vercel Account Settings**
   - Visit: https://vercel.com/account/tokens
   - Or: Vercel Dashboard → Settings → Tokens

2. **Create New Token**
   - Click "Create" button
   - **Name**: `GitHub Actions - solana-defi-wallet`
   - **Scope**: Select "Full Account"
   - **Expiration**: No expiration (or set as needed)
   - Click "Create Token"

3. **Copy Token**
   - Copy the token immediately (it won't be shown again)
   - Keep it secure - treat it like a password

### Step 2: Get Organization ID

#### Option A: Using Vercel Dashboard

1. Go to your Vercel project settings
2. Navigate to: https://vercel.com/[your-team]/[project-name]/settings
3. Look for "Project ID" section
4. The Organization ID is shown near the Project ID

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Get organization ID
vercel whoami
```

This will display:
```
> Your team: [team-name] ([TEAM_ID])
```

The `TEAM_ID` is your organization ID.

#### Option C: From .vercel Directory

If you've deployed before using Vercel CLI:

```bash
# Check project.json in .vercel directory
cat .vercel/project.json
```

Look for `orgId` field.

### Step 3: Add Secrets to GitHub

1. **Go to Repository Settings**
   - Visit: https://github.com/StudioDeFi/solana-defi-wallet-repository/settings

2. **Navigate to Secrets**
   - In left sidebar, click **Secrets and variables**
   - Click **Actions**

3. **Add VERCEL_TOKEN**
   - Click "New repository secret"
   - **Name**: `VERCEL_TOKEN`
   - **Value**: Paste your Vercel token from Step 1
   - Click "Add secret"

4. **Add VERCEL_ORG_ID**
   - Click "New repository secret"
   - **Name**: `VERCEL_ORG_ID`
   - **Value**: Paste your organization ID from Step 2
   - Click "Add secret"

### Step 4: Verify Secrets

After adding secrets, you should see:
- ✅ VERCEL_TOKEN
- ✅ VERCEL_ORG_ID

Secrets are encrypted and can't be viewed after creation.

## Test Deployment

### Trigger Workflow

**Option A: Push to main**
```bash
git push origin main
```

**Option B: Manual dispatch**
1. Go to **Actions** tab
2. Select "Vercel Deployment" workflow
3. Click "Run workflow"
4. Select branch: `main`
5. Click "Run workflow"

### Monitor Deployment

1. Go to **Actions** tab
2. Click on the running workflow
3. Watch the deployment progress
4. Check for any errors

Expected steps:
1. ✅ Checkout code
2. ✅ Setup Node.js
3. ✅ Install Vercel CLI
4. ✅ Pull Vercel Environment Information
5. ✅ Build Project Artifacts
6. ✅ Deploy Project Artifacts to Vercel

## Troubleshooting

### Error: "Invalid token"

**Problem**: VERCEL_TOKEN is incorrect or expired

**Solution**:
1. Generate a new token at https://vercel.com/account/tokens
2. Update VERCEL_TOKEN secret in GitHub
3. Re-run the workflow

### Error: "Invalid organization ID"

**Problem**: VERCEL_ORG_ID is incorrect

**Solution**:
1. Verify your organization ID using `vercel whoami`
2. Update VERCEL_ORG_ID secret in GitHub
3. Re-run the workflow

### Error: "Project not found"

**Problem**: The project ID in the workflow doesn't match your Vercel project

**Solution**:
1. Check your Vercel project settings for the correct Project ID
2. Update the workflow file if needed:
   ```yaml
   env:
     VERCEL_PROJECT_ID: your-actual-project-id
   ```

### Workflow Not Running

**Problem**: Workflow doesn't trigger on push

**Solution**:
1. Check workflow file is in `.github/workflows/`
2. Verify you're pushing to `main` branch
3. Check Actions are enabled (Settings → Actions → General)
4. Look for errors in Actions tab

### Build Fails

**Problem**: Build step fails

**Solution**:
1. Check build logs in Actions tab
2. Verify environment variables are set in Vercel
3. Test build locally: `npm run vercel-build`
4. Check for missing dependencies

## Environment Variables

Don't forget to set environment variables in Vercel Dashboard:

1. Go to: https://vercel.com/[your-team]/[project-name]/settings/environment-variables

2. Add required variables:
   ```env
   NODE_ENV=production
   SKIP_ENV_VALIDATION=true
   DATABASE_URL=your-database-url
   NEXT_PUBLIC_SOLANA_RPC_MAINNET=https://api.mainnet-beta.solana.com
   JWT_SECRET=your-secret-key
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

3. Set scope: **Production**, **Preview**, and **Development** (as needed)

## Security Best Practices

### Token Security

- ✅ Use separate tokens for different projects
- ✅ Set appropriate expiration dates
- ✅ Rotate tokens periodically
- ✅ Revoke unused tokens
- ❌ Never commit tokens to repository
- ❌ Don't share tokens publicly

### Secret Management

- Secrets are encrypted by GitHub
- Only users with admin access can add/edit secrets
- Secrets are not exposed in logs
- Use separate tokens for production and development

## Updating Secrets

To update a secret:

1. Go to repository Settings → Secrets and variables → Actions
2. Click on the secret name
3. Click "Update secret"
4. Enter new value
5. Click "Update secret"

Changes take effect immediately on next workflow run.

## Alternative: Vercel Git Integration

If you prefer not to use GitHub Actions, you can use Vercel's built-in Git integration:

1. No secrets needed
2. Automatic deployments on push
3. Preview deployments for PRs
4. Simpler setup

See [VERCEL_DEPLOYMENT.md#method-2-vercel-git-integration-alternative](./VERCEL_DEPLOYMENT.md#method-2-vercel-git-integration-alternative)

## Verification Checklist

- [ ] Vercel token created and copied
- [ ] Organization ID obtained
- [ ] VERCEL_TOKEN secret added to GitHub
- [ ] VERCEL_ORG_ID secret added to GitHub
- [ ] Environment variables set in Vercel Dashboard
- [ ] Workflow triggered (manual or push)
- [ ] Deployment successful
- [ ] Site accessible at Vercel URL

## Next Steps

After successful deployment:

1. ✅ Monitor deployment in Vercel Dashboard
2. ✅ Set up custom domain (optional)
3. ✅ Configure analytics (optional)
4. ✅ Set up monitoring/alerts (optional)

## Resources

- **Vercel CLI Documentation**: https://vercel.com/docs/cli
- **Vercel Tokens**: https://vercel.com/account/tokens
- **GitHub Secrets**: https://docs.github.com/actions/security-guides/encrypted-secrets
- **Full Deployment Guide**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## Support

Need help?

- **Documentation**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)
- **Issues**: https://github.com/StudioDeFi/solana-defi-wallet-repository/issues
- **Vercel Support**: https://vercel.com/support

---

**Last Updated**: 2025-11-21  
**Project ID**: `prj_0jZfdorrk1hX9QvTbHOKAgSsrGWk`
