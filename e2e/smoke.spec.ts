import { test, expect } from "@playwright/test";

test("home redirects to first lesson", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/react\//);
});

test("loads useState lesson and sidebar", async ({ page }) => {
  await page.goto("/react/react-usestate");
  await expect(page.getByRole("heading", { level: 1, name: /useState/i })).toBeVisible();
  await expect(page.getByLabel("React konu navigasyonu")).toBeVisible();
});

test("interactive lab accepts an answer", async ({ page }) => {
  await page.goto("/react/react-usestate");
  const lab = page.locator(".interactive");
  await expect(lab).toBeVisible();
  await lab.locator(".option").first().click();
  await lab.getByRole("button", { name: "Cevabı kontrol et" }).click();
  await expect(lab.locator(".result")).toBeVisible();
});
