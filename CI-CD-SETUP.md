# CI/CD Setup Guide for Do You See My Cat

This guide will help you set up continuous integration and deployment (CI/CD) for your application using GitHub Actions.

## Overview

We've created multiple GitHub Actions workflows:

1. **`playwright.yml`** - Enhanced Playwright testing with browser matrix
2. **`ci-cd.yml`** - Full CI/CD pipeline with linting, testing, security, and deployment
3. **`test.yml`** - Simple test-only workflow

## Quick Start

### 1. Enable GitHub Actions

1. Go to your GitHub repository
2. Navigate to **Settings** → **Actions** → **General**
3. Enable "Allow all actions and reusable workflows"
4. Save the changes

### 2. Set Up Environment Secrets

You'll need to add these secrets to your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each of the following:

#### Required Secrets:

```
DATABASE_URL=your_database_connection_string
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=your_application_url
```

#### Optional Secrets (for deployment):

```
STAGING_DATABASE_URL=your_staging_database_url
STAGING_URL=your_staging_application_url
PRODUCTION_DATABASE_URL=your_production_database_url
PRODUCTION_URL=your_production_application_url
```

### 3. Choose Your Workflow

#### Option A: Simple Testing (Recommended for starting)

Use `test.yml` - This runs only tests and is perfect for getting started.

#### Option B: Full CI/CD Pipeline

Use `ci-cd.yml` - This includes linting, security audits, and deployment stages.

#### Option C: Enhanced Testing

Use `playwright.yml` - This runs tests across multiple browsers.

## Workflow Details

### Test Suite (`test.yml`)

- ✅ Runs on push to main/master and pull requests
- ✅ Installs dependencies and Playwright browsers
- ✅ Builds the application
- ✅ Starts the server and runs tests
- ✅ Uploads test results and failure screenshots
- ✅ 30-minute timeout

### Full CI/CD Pipeline (`ci-cd.yml`)

- ✅ **Lint Job**: Code linting and type checking
- ✅ **Test Job**: Playwright tests across browsers (Chrome, Firefox, Safari)
- ✅ **Security Job**: npm audit for security vulnerabilities
- ✅ **Build Job**: Production build (main/master only)
- ✅ **Deploy Staging**: Deploy to staging environment (main/master only)
- ✅ **Deploy Production**: Deploy to production environment (main/master only)

### Enhanced Playwright (`playwright.yml`)

- ✅ Matrix testing across browsers
- ✅ Caching for faster builds
- ✅ Comprehensive artifact upload
- ✅ Better error handling

## Environment Variables

### For Testing

```bash
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3000
NODE_ENV=test
PLAYWRIGHT_HTML_REPORT=1
```

### For Production

```bash
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=your_app_url
```

## Local Testing

Before pushing to GitHub, test locally:

```bash
# Install Playwright browsers
npm run test:install

# Run tests locally
npm test

# Run full CI pipeline locally
npm run ci:full
```

## Monitoring and Debugging

### View Test Results

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Click on a workflow run
4. Download artifacts to see test reports and screenshots

### Common Issues

#### 1. Tests Fail with "Cannot connect to localhost:3000"

- Ensure the application starts properly
- Check that port 3000 is available
- Verify environment variables are set

#### 2. Database Connection Issues

- Ensure your database is accessible from GitHub Actions
- Check that `DATABASE_URL` secret is set correctly
- Consider using a test database for CI

#### 3. Authentication Issues

- Set up `NEXTAUTH_SECRET` and `NEXTAUTH_URL` secrets
- Ensure your auth provider is configured for testing

#### 4. Build Failures

- Check that all dependencies are installed
- Verify TypeScript compilation passes
- Ensure all environment variables are available

### Debug Mode

To debug failing tests:

```bash
# Run tests in debug mode locally
npm run test:debug

# View test reports
npx playwright show-report
```

## Customization

### Adding More Tests

1. Create new test files in the `tests/` directory
2. Follow the existing naming convention
3. Use `data-testid` attributes for reliable element selection

### Modifying Workflows

1. Edit the `.github/workflows/` files
2. Add new jobs or steps as needed
3. Configure environment-specific settings

### Deployment Configuration

To set up deployment:

1. **For Vercel:**

   ```yaml
   - name: Deploy to Vercel
     uses: amondnet/vercel-action@v25
     with:
       vercel-token: ${{ secrets.VERCEL_TOKEN }}
       vercel-org-id: ${{ secrets.ORG_ID }}
       vercel-project-id: ${{ secrets.PROJECT_ID }}
   ```

2. **For Netlify:**

   ```yaml
   - name: Deploy to Netlify
     uses: nwtgck/actions-netlify@v2.0
     with:
       publish-dir: "./out"
       production-branch: main
       github-token: ${{ secrets.GITHUB_TOKEN }}
       deploy-message: "Deploy from GitHub Actions"
   ```

3. **For Custom Server:**
   ```yaml
   - name: Deploy to server
     run: |
       # Add your deployment commands here
       rsync -avz --delete ./out/ user@server:/path/to/app/
   ```

## Best Practices

### 1. Test Coverage

- Write tests for critical user flows
- Test both authenticated and unauthenticated states
- Include error scenarios and edge cases

### 2. Performance

- Use caching for dependencies and browsers
- Run tests in parallel when possible
- Keep test execution time under 10 minutes

### 3. Security

- Never commit secrets to the repository
- Use GitHub Secrets for sensitive data
- Run security audits regularly

### 4. Monitoring

- Set up notifications for failed builds
- Monitor test flakiness
- Track deployment success rates

## Troubleshooting

### Workflow Not Triggering

- Check that the workflow file is in `.github/workflows/`
- Verify the branch names in the `on` section
- Ensure the file has `.yml` extension

### Tests Timing Out

- Increase timeout in workflow file
- Optimize test execution time
- Consider running tests in parallel

### Environment Issues

- Double-check all secrets are set
- Verify environment variable names
- Test locally with same environment

## Next Steps

1. **Start Simple**: Use `test.yml` to get started
2. **Add Security**: Enable the security audit job
3. **Set Up Deployment**: Configure deployment for your hosting platform
4. **Monitor**: Set up notifications and monitoring
5. **Optimize**: Add caching and parallel execution

## Support

If you encounter issues:

1. Check the GitHub Actions logs for detailed error messages
2. Test locally to reproduce the issue
3. Review the troubleshooting section above
4. Consider opening an issue in the repository

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Testing Guide](https://playwright.dev/docs/intro)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [GitHub Secrets Management](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
