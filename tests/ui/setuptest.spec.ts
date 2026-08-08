import { test } from "../../fixtures/omnipizza";

test.describe("setup & auth", ()=>{
    test("lands on /catalog", async({page, catalogPage, loginPage, standardUser, defaultMarket}) =>{
        await page.goto("/catalog");
        // The app decides client-side (after an async auth check) whether to
        // redirect an unauthenticated visitor back to "/"; wait for that to
        // settle before reading the URL, otherwise we can catch it mid-redirect.
        await page.waitForLoadState("networkidle");

        // Projects without a pre-authenticated storageState (ui-chromium,
        // firefox, webkit) get redirected to the login page here; log in
        // in that case. Projects with storageState (chromium) land on
        // /catalog directly and skip this.
        if (!/\/catalog/.test(page.url())) {
            await loginPage.loginInMarket(standardUser, defaultMarket.code);
        }

        await catalogPage.expectLoaded();
        await catalogPage.expectHasPizzas();
    });
});