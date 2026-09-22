import { test as base, Page } from "@playwright/test";

import GreenKartPage from "./greenKartPage";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";

type Pages = {
  greenKartPage: GreenKartPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  greenKartPage: async ({ page }, use) => {
    await use(new GreenKartPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

});

export { expect } from "@playwright/test";