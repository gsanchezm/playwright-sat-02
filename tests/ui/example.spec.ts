import { test, expect, chromium } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto("https://playwright.dev");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

// AAA
test('get started link', async ({ page }) => {
  // Arrange
  await page.goto('https://playwright.dev/');

  // Act
  // Click the get started link.
  await expect(page.getByRole('link', { name: 'Star microsoft/playwright on' })).toBeVisible();
  await page.getByRole('link', { name: 'Get started' }).click();

  // Assert
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
