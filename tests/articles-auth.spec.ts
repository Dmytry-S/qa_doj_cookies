import { test, expect } from '@playwright/test';

test.use({storageState: "storageState.json" });

test("login via storageState", async({ page }) => {
    await page.goto("/articles");
    await expect(page.getByTestId("nav-profile")).toBeVisible();
});

