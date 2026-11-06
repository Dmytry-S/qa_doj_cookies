import { chromium, expect, type FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig ) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("http://104.168.59.50/articles/login");
    await page.getByTestId("auth-email").fill("dms@gm.co");
    await page.getByTestId("auth-password").fill("123456");
    await page.getByTestId("auth-submit").click();
    await expect(page.getByTestId("nav-profile")).toBeVisible();
    await page.waitForURL('**/articles');

    await context.storageState({path: "./storageState.json"});

    await browser.close();
};

export default globalSetup;