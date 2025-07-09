# Playwright Tests for Do You See My Cat

This directory contains comprehensive Playwright tests for the Do You See My Cat application.

## Test Structure

### `main-functionality.spec.ts`

Basic smoke tests that verify the application loads and core navigation works.

### `navigation.spec.ts`

Comprehensive navigation tests covering:

- Home page content and layout
- Navigation between pages (home → pets → individual pet pages)
- Authentication state handling
- Responsive design testing
- API error handling

### `data-fetching.spec.ts`

Tests focused on data fetching and API integration:

- Pet data loading and display
- Individual pet page data fetching
- API error handling and graceful degradation
- Network condition handling
- Data consistency across pages
- Image loading and display

### `user-interactions.spec.ts`

Tests for user interactions and form handling:

- Button interactions and navigation
- Pet card interactions
- Modal and dialog interactions
- Form interactions (create/edit pets)
- Image interactions
- Responsive interactions
- Keyboard navigation
- Loading states

## Running Tests

### Prerequisites

1. Make sure your development server is configured properly
2. Ensure all environment variables are set up
3. The database should be accessible

### Commands

```bash
# Run all tests
npm test

# Run tests with UI (interactive mode)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test navigation.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
```

## Test Configuration

The tests are configured in `playwright.config.ts` with:

- Base URL: `http://localhost:3000`
- Web server: Automatically starts `npm run dev`
- Multiple browser support (Chrome, Firefox, Safari)
- Retry logic for CI environments
- HTML reporter for test results

## Test Data Attributes

The tests use `data-testid` attributes for reliable element selection:

- `pet-card`: Individual pet cards
- `pet-name`: Pet name elements
- `pet-description`: Pet description elements
- `pet-image`: Pet image elements
- `visit-pet-button`: Buttons to visit individual pet pages
- `delete-report-button`: Delete/Report buttons

## Key Testing Areas

### Navigation Testing

- ✅ Home page loads correctly
- ✅ Navigation to pets page works
- ✅ Individual pet page navigation
- ✅ Account page access (when authenticated)
- ✅ Responsive design across viewports

### Data Fetching Testing

- ✅ API calls complete successfully
- ✅ Data displays correctly
- ✅ Error handling works gracefully
- ✅ Loading states are handled
- ✅ Image loading and display

### User Interaction Testing

- ✅ Button clicks work as expected
- ✅ Modal dialogs open and close
- ✅ Form interactions work
- ✅ Keyboard navigation
- ✅ Mobile interactions

### Authentication Testing

- ✅ Different states for authenticated/unauthenticated users
- ✅ Account page access
- ✅ Sign in flow (when applicable)

## Troubleshooting

### Common Issues

1. **Tests fail with "Cannot connect to localhost:3000"**

   - Ensure your development server is running
   - Check that the port 3000 is available
   - Verify environment variables are set

2. **Tests fail with authentication errors**

   - Tests are designed to work with both authenticated and unauthenticated states
   - Some tests may be skipped based on auth state

3. **Image loading issues**

   - Tests handle cases where images may not load
   - Verify ImageKit configuration is correct

4. **API errors**
   - Tests include error handling scenarios
   - Ensure your API endpoints are working

### Debug Mode

Use `npm run test:debug` to run tests in debug mode, which will:

- Open the browser in headed mode
- Allow you to step through tests
- Show detailed error information

### Viewing Test Results

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Adding New Tests

When adding new tests:

1. Follow the existing naming convention
2. Use `data-testid` attributes for reliable element selection
3. Include both positive and negative test cases
4. Test responsive design when applicable
5. Handle authentication states appropriately
6. Include proper error handling

## Test Best Practices

- Tests should be independent and not rely on other tests
- Use `test.beforeEach()` for common setup
- Wait for network requests to complete with `page.waitForLoadState('networkidle')`
- Use descriptive test names that explain what is being tested
- Include both happy path and error scenarios
- Test across different viewport sizes for responsive design
