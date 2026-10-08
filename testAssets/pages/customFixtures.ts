import { test as base } from "@playwright/test";
import HomePage from "./homePage";
import CartPage from "./cartPage";
import LoginPage from "./loginPage";

type Pages = {
    homePage: HomePage;
    cartPage: CartPage;
    loginPage: LoginPage;
};

export const test = base.extend<Pages>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

export { expect } from "@playwright/test";

