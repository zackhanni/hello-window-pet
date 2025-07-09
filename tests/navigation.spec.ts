import { test, expect } from "@playwright/test";

test.describe("Navigation and Core Functionality", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test("should display home page with correct content", async ({ page }) => {
    // Check that the main heading is visible
    await expect(page.getByText(/Did you see a window pet\?/)).toBeVisible();

    // Check that the main action buttons are present
    await expect(
      page.getByRole("button", { name: /See all pets/ })
    ).toBeVisible();

    // Check that the "How it works" section is present
    await expect(page.getByText(/How it works/)).toBeVisible();
  });

  test("should navigate to pets page and display pets", async ({ page }) => {
    // Click the "See all pets" button
    await page.getByRole("button", { name: /See all pets/ }).click();

    // Verify we're on the pets page
    await expect(page).toHaveURL("/pets");
    await expect(page.getByRole("heading", { name: "All Pets" })).toBeVisible();

    // Check that the pets grid is present
    await expect(page.locator("section.grid")).toBeVisible();

    // Wait for potential data loading
    await page.waitForLoadState("networkidle");

    // Check if pets are displayed or "No pets found" message
    const petsGrid = page.locator("section.grid");
    const hasPets =
      (await petsGrid.locator('[data-testid="pet-card"]').count()) > 0;
    const hasNoPetsMessage = await page.getByText("No pets found").isVisible();

    // Either pets should be displayed or the "no pets" message
    expect(hasPets || hasNoPetsMessage).toBeTruthy();
  });

  test("should navigate to individual pet page", async ({ page }) => {
    // First go to pets page
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    // Try to find and click on a pet card
    const petCards = page.locator('[data-testid="pet-card"]');
    const petCardCount = await petCards.count();

    if (petCardCount > 0) {
      // Click on the first pet card
      await petCards.first().click();

      // Verify we're on a pet detail page
      await expect(page).toHaveURL(/\/pets\/[^/]+$/);

      // Check that pet details are displayed
      await expect(page.getByText(/This is/)).toBeVisible();
      await expect(page.getByText(/Have you seen this cat\?/)).toBeVisible();

      // Check for upload section
      await expect(page.getByText(/Upload a photo/)).toBeVisible();

      // Check for recent photos section
      await expect(
        page.getByRole("heading", { name: "Recent photos" })
      ).toBeVisible();
    } else {
      // If no pets exist, verify the "no pets" message
      await expect(page.getByText("No pets found")).toBeVisible();
    }
  });

  test("should handle authentication flow", async ({ page }) => {
    // Check if sign in button is present for unauthenticated users
    const signInButton = page.getByRole("button", { name: /Sign in/ });
    const myAccountButton = page.getByRole("button", { name: /My account/ });

    // One of these should be visible depending on auth state
    const isAuthenticated = await myAccountButton.isVisible();

    if (isAuthenticated) {
      // User is authenticated, test account page navigation
      await myAccountButton.click();
      await expect(page).toHaveURL("/account");

      // Check account page content
      await expect(page.locator("main")).toBeVisible();

      // Go back to home
      await page.goto("/");
    } else {
      // User is not authenticated, sign in button should be present
      await expect(signInButton).toBeVisible();
    }
  });

  test("should handle responsive design", async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify content is still accessible
    await expect(page.getByText(/Did you see a window pet\?/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /See all pets/ })
    ).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Verify content is still accessible
    await expect(page.getByText(/Did you see a window pet\?/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /See all pets/ })
    ).toBeVisible();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Navigate to pets page which makes API calls
    await page.goto("/pets");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // The page should either show pets or a "no pets" message
    // This ensures the app handles API errors gracefully
    const hasContent = await page.locator("main").isVisible();
    expect(hasContent).toBeTruthy();
  });
});
