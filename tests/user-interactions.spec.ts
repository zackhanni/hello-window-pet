import { test, expect } from "@playwright/test";

test.describe("User Interactions and Form Handling", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto("/");
  });

  test("should handle button interactions", async ({ page }) => {
    // Test "See all pets" button
    const seeAllPetsButton = page.getByRole("button", { name: /See all pets/ });
    await expect(seeAllPetsButton).toBeVisible();
    await seeAllPetsButton.click();

    // Verify navigation
    await expect(page).toHaveURL("/pets");

    // Go back to home
    await page.goto("/");

    // Test sign in or account button
    const signInButton = page.getByRole("button", { name: /Sign in/ });
    const myAccountButton = page.getByRole("button", { name: /My account/ });

    if (await signInButton.isVisible()) {
      await expect(signInButton).toBeVisible();
      // Don't click sign in as it might trigger auth flow
    } else if (await myAccountButton.isVisible()) {
      await expect(myAccountButton).toBeVisible();
      await myAccountButton.click();
      await expect(page).toHaveURL("/account");
    }
  });

  test("should test pet card interactions", async ({ page }) => {
    // Navigate to pets page
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    // Look for pet cards
    const petCards = page.locator('[data-testid="pet-card"]');
    const petCardCount = await petCards.count();

    if (petCardCount > 0) {
      const firstPetCard = petCards.first();

      // Test pet card visibility
      await expect(firstPetCard).toBeVisible();

      // Test pet card content
      await expect(firstPetCard.locator("h3")).toBeVisible(); // Pet name
      await expect(firstPetCard.locator("p")).toBeVisible(); // Description

      // Test pet card buttons
      const visitButton = firstPetCard.getByRole("button", {
        name: /Visit this/,
      });
      await expect(visitButton).toBeVisible();

      // Test delete/report button
      const deleteButton = firstPetCard.getByRole("button", {
        name: /Delete|Report/,
      });
      await expect(deleteButton).toBeVisible();
    }
  });

  test("should test modal and dialog interactions", async ({ page }) => {
    // Navigate to pets page
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    const petCards = page.locator('[data-testid="pet-card"]');
    const petCardCount = await petCards.count();

    if (petCardCount > 0) {
      const firstPetCard = petCards.first();

      // Test delete/report dialog
      const deleteButton = firstPetCard.getByRole("button", {
        name: /Delete|Report/,
      });
      await deleteButton.click();

      // Check if dialog appears
      const dialog = page.locator('[role="dialog"]');
      await expect(dialog).toBeVisible();

      // Test dialog content
      await expect(dialog.getByText(/Are you absolutely sure\?/)).toBeVisible();
      await expect(
        dialog.getByText(/This action cannot be undone/)
      ).toBeVisible();

      // Test cancel button
      const cancelButton = dialog.getByRole("button", { name: "Cancel" });
      await expect(cancelButton).toBeVisible();
      await cancelButton.click();

      // Dialog should be closed
      await expect(dialog).not.toBeVisible();
    }
  });

  test("should test form interactions on account page", async ({ page }) => {
    // Check if user is authenticated
    const myAccountButton = page.getByRole("button", { name: /My account/ });

    if (await myAccountButton.isVisible()) {
      // Navigate to account page
      await myAccountButton.click();
      await expect(page).toHaveURL("/account");

      // Test account page interactions
      await expect(page.locator("main")).toBeVisible();

      // Look for create pet button
      const createPetButton = page.getByRole("button", { name: /Add new pet/ });
      if (await createPetButton.isVisible()) {
        await expect(createPetButton).toBeVisible();

        // Test opening create pet dialog
        await createPetButton.click();

        // Check if dialog appears
        const dialog = page.locator('[role="dialog"]');
        await expect(dialog).toBeVisible();

        // Test dialog content
        await expect(dialog.getByText(/New pet form/)).toBeVisible();
        await expect(
          dialog.getByText(/Add details about your pet/)
        ).toBeVisible();

        // Test form fields
        const nameInput = dialog.getByLabel(/Name/);
        const descriptionInput = dialog.getByLabel(/Description/);
        const speciesInput = dialog.getByLabel(/Species/);
        const ageInput = dialog.getByLabel(/Age/);

        await expect(nameInput).toBeVisible();
        await expect(descriptionInput).toBeVisible();
        await expect(speciesInput).toBeVisible();
        await expect(ageInput).toBeVisible();

        // Close dialog
        const closeButton = dialog.getByRole("button", { name: /Close/ });
        if (await closeButton.isVisible()) {
          await closeButton.click();
        }
      }
    }
  });

  test("should test image interactions", async ({ page }) => {
    // Navigate to pets page
    await page.goto("/pets");
    await page.waitForLoadState("networkidle");

    // Look for pet images
    const petImages = page.locator("img[alt]");
    const imageCount = await petImages.count();

    if (imageCount > 0) {
      const firstImage = petImages.first();

      // Test image is visible and has proper attributes
      await expect(firstImage).toBeVisible();

      const altText = await firstImage.getAttribute("alt");
      expect(altText).toBeTruthy();

      const src = await firstImage.getAttribute("src");
      expect(src).toBeTruthy();
    }
  });

  test("should test responsive interactions", async ({ page }) => {
    // Test mobile interactions
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify buttons are still clickable on mobile
    const seeAllPetsButton = page.getByRole("button", { name: /See all pets/ });
    await expect(seeAllPetsButton).toBeVisible();
    await seeAllPetsButton.click();

    await expect(page).toHaveURL("/pets");

    // Test mobile pet cards
    await page.waitForLoadState("networkidle");
    const petCards = page.locator('[data-testid="pet-card"]');

    if ((await petCards.count()) > 0) {
      const firstPetCard = petCards.first();
      await expect(firstPetCard).toBeVisible();

      // Test mobile button interactions
      const visitButton = firstPetCard.getByRole("button", {
        name: /Visit this/,
      });
      await expect(visitButton).toBeVisible();
    }

    // Test desktop interactions
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");

    // Verify desktop layout
    await expect(page.getByText(/Did you see a window pet\?/)).toBeVisible();
    await expect(
      page.getByRole("button", { name: /See all pets/ })
    ).toBeVisible();
  });

  test("should test keyboard navigation", async ({ page }) => {
    // Test tab navigation
    await page.keyboard.press("Tab");

    // Verify focus is on a button
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();

    // Test enter key on focused element
    await page.keyboard.press("Enter");

    // Should navigate to pets page if "See all pets" was focused
    if (page.url().includes("/pets")) {
      await expect(page).toHaveURL("/pets");
    }
  });

  test("should test loading states", async ({ page }) => {
    // Navigate to pets page and check for loading behavior
    await page.goto("/pets");

    // Wait for content to load
    await page.waitForLoadState("networkidle");

    // Verify content is displayed after loading
    await expect(page.getByRole("heading", { name: "All Pets" })).toBeVisible();

    // Check that the page is interactive after loading
    const mainContent = page.locator("main");
    await expect(mainContent).toBeVisible();
  });
});
