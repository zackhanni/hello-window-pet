import { test, expect } from "@playwright/test";

test("should load the home page successfully", async ({ page }) => {
  await page.goto("/");

  // Expect the page to have the main heading
  await expect(page.getByText(/Did you see a window pet\?/)).toBeVisible();
});

test("should navigate to pets page", async ({ page }) => {
  await page.goto("/");

  // Click the "See all pets" button
  await page.getByRole("button", { name: /See all pets/ }).click();

  // Expect to be on the pets page
  await expect(page).toHaveURL("/pets");
  await expect(page.getByRole("heading", { name: "All Pets" })).toBeVisible();
});
