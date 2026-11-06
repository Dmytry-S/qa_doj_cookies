import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });
test('Check zara cookies', async ({ page, context }) => {
    await page.goto("https://www.zara.com/es/en/");
    await page.locator('#onetrust-accept-btn-handler').click();
    await page.getByRole("button", {name: 'Yes, continue on Spain'}).click();

    const pageCookies = await page.context().cookies();
    expect(pageCookies.length > 0).toBeTruthy();

    const cookieToChange = pageCookies.find(c => c.name === 'lastRskxRun');
    const cookieValue = cookieToChange ? cookieToChange.value : null;

    await page.context().addCookies([
        {
            name: "lastRskxRun",
            value: "1793891298741",
            domain: ".zara.com",
            path: "/",
        },
        ]);

    const pageCookiesNew = await page.context().cookies();
    const cookieToChangeNew = pageCookiesNew.find(c => c.name === 'lastRskxRun');
    expect(cookieToChangeNew).toBeTruthy();

    const cookieValueNew = cookieToChangeNew ? cookieToChangeNew.value : null;
    expect(cookieValueNew).toEqual("1793891298741");
    expect(cookieValueNew).not.toEqual(cookieValue);
});