import { test, expect } from "@playwright/test";

test.describe("Data Fetching and API Integration", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test("should fetch and display pets data", async ({ page }) => {
    // Navigate to pets page which triggers API call
    await page.goto("/pets");

    // Wait for network requests to complete
    await page.waitForLoadState("networkidle");

    // Check that the page loaded successfully
    await expect(page.getByRole("heading", { name: "All Pets" })).toBeVisible();

    // Verify the pets grid section exists
    const petsSection = page.locator("section.grid");
    await expect(petsSection).toBeVisible();

    // Check if pets are loaded or empty state is shown
    const petCards = petsSection.locator('[data-testid="pet-card"]');
    const noPetsMessage = page.getByText("No pets found");

    const hasPets = (await petCards.count()) > 0;
    const hasNoPetsMessage = await noPetsMessage.isVisible();

    // Either pets should be displayed or the "no pets" message
    expect(hasPets || hasNoPetsMessage).toBeTruthy();
  });

  test("should handle individual pet data fetching", async ({ page }) => {
    // First get to pets page to find a pet
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    // Look for pet cards
    const petCards = page.locator('[data-testid="pet-card"]');
    const petCardCount = await petCards.count();

    if (petCardCount > 0) {
      // Get the first pet card and extract its link
      const firstPetCard = petCards.first();
      const petLink = firstPetCard.locator("a").first();

      // Click on the pet to navigate to detail page
      await petLink.click();

      // Wait for the page to load
      await page.waitForLoadState("networkidle");

      // Verify we're on a pet detail page
      await expect(page).toHaveURL(/\/pets\/[^/]+$/);

      // Check that pet information is displayed
      await expect(page.getByText(/This is/)).toBeVisible();
      await expect(page.getByText(/They have been seen/)).toBeVisible();

      // Check for pet image
      const petImage = page.locator("img[alt]").first();
      await expect(petImage).toBeVisible();

      // Check for upload section
      await expect(page.getByText(/Have you seen this cat\?/)).toBeVisible();

      // Check for recent photos section
      await expect(
        page.getByRole("heading", { name: "Recent photos" })
      ).toBeVisible();
    } else {
      // If no pets exist, verify empty state
      await expect(page.getByText("No pets found")).toBeVisible();
    }
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock API failure by intercepting requests
    await page.route("**/api/pets", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    // Navigate to pets page
    await page.goto("/pets");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // The page should still be accessible even with API errors
    await expect(page.getByRole("heading", { name: "All Pets" })).toBeVisible();

    // Should show "No pets found" when API fails
    await expect(page.getByText("No pets found")).toBeVisible();
  });

  test("should handle slow network conditions", async ({ page }) => {
    // Navigate to pets page
    await page.goto("/pets");

    // Set a longer timeout for slow network conditions
    await page.waitForLoadState("networkidle", { timeout: 30000 });

    // Verify the page loads eventually
    await expect(page.getByRole("heading", { name: "All Pets" })).toBeVisible();

    // Check that content is displayed
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });

  test("should verify data consistency across pages", async ({ page }) => {
    // Navigate to pets page
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    // Get pet information from the listing page
    const petCards = page.locator('[data-testid="pet-card"]');
    const petCardCount = await petCards.count();

    if (petCardCount > 0) {
      // Get the first pet's name from the listing
      const firstPetName = await petCards
        .first()
        .locator('[data-testid="pet-name"]')
        .textContent();

      // Click on the first pet
      await petCards.first().click();

      // Wait for the detail page to load
      await page.waitForLoadState("networkidle");

      // Verify the pet name is consistent
      if (firstPetName) {
        await expect(page.getByText(new RegExp(firstPetName))).toBeVisible();
      }
    }
  });

  test("should test authentication state handling", async ({ page }) => {
    // Check initial state on home page
    const welcomeMessage = page.getByText(/Welcome back/);
    const signInPrompt = page.getByText(/Did you see a window pet\?/);

    // One of these should be visible based on auth state
    const isAuthenticated = await welcomeMessage.isVisible();

    if (isAuthenticated) {
      // Test authenticated user flow
      await expect(welcomeMessage).toBeVisible();

      // Check for account button
      await expect(
        page.getByRole("button", { name: /My account/ })
      ).toBeVisible();

      // Navigate to account page
      await page.getByRole("button", { name: /My account/ }).click();
      await expect(page).toHaveURL("/account");

      // Verify account page loads with user data
      await page.waitForLoadState("networkidle");
      await expect(page.locator("main")).toBeVisible();
    } else {
      // Test unauthenticated user flow
      await expect(signInPrompt).toBeVisible();

      // Check for sign in button
      await expect(page.getByRole("button", { name: /Sign in/ })).toBeVisible();
    }
  });

  test("should handle image loading", async ({ page }) => {
    // Navigate to pets page
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    // Look for pet images
    const petImages = page.locator("img[alt]");
    const imageCount = await petImages.count();

    if (imageCount > 0) {
      // Check that images are loading properly
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const image = petImages.nth(i);
        await expect(image).toBeVisible();

        // Check that image has proper alt text
        const altText = await image.getAttribute("alt");
        expect(altText).toBeTruthy();
      }
    }
  });
});
