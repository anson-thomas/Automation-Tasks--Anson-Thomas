import { test as base } from "@playwright/test";
import HomePage from "./homePage";
import ShopPage from "./shopPage";
import CartPage from "./cartPage";
import GreenKartPage from "./greenKartPage";
import CheckoutPage from "./checkoutPage";
type Pages = {
    homePage: HomePage;
    shopPage: ShopPage;
    greenKartPage: GreenKartPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage; 
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
    },
     greenKartPage: async ({ page }, use) => {
    await use(new GreenKartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect } from "@playwright/test";







  

