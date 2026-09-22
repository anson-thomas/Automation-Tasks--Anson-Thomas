import {test as base, expect, Page} from "@playwright/test"
import HomePage from "./homePage"
import GreenKartPage from "./greenKartPage";
import CartPage from "./cartPage";
import CheckoutPage from "./checkoutPage";

type Pages = {
    homePage: HomePage;
    greenKartPage: GreenKartPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;    
}

export const test = base.extend<Pages, {}>({
    homePage: async({page}, use)=>{
        const homePage = new HomePage(page);
        await use (homePage);
    },
    greenKartPage: async ({ page }, use) => {
    await use(new GreenKartPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
})
export {expect} from "@playwright/test"




  

