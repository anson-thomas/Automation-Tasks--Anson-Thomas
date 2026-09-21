import { test as base, expect } from "@playwright/test";
import HomePage from "./homePage";
import ShopPage from "./shopPage";
import CartPage from "./cartPage";

type Pages = {
    homePage: HomePage;
    shopPage: ShopPage;
    cartPage: CartPage;
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    shopPage: async ({ page }, use) => {
        await use(new ShopPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    }
});

export { expect } from "@playwright/test";