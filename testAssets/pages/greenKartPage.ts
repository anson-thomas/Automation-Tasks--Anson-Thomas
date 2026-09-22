import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class GreenKartPage {
    products: Locator;
    productNames: Locator;
    cartCount: Locator;
    cartLink: Locator;
    actions: Actions;

    constructor(public page: Page) {
      this.actions = new Actions();
      this.products = this.page.locator(".product"); 
      this.productNames = this.products.locator(".product-name"); 
      this.cartCount = this.page.locator(".cart-count"); 
      this.cartLink = this.page.getByRole("link", { name: "Cart" });
          }

    async launchWebApp() {
        await this.page.goto("/seleniumPractise/#/");
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async addProductToCart(productName: string) {
        const productCard = this.products.filter({
            hasText: productName,
        });

        await this.actions.click(productCard.locator("button"));
    }

    async openCart() {
        await this.actions.click(this.cartLink);
    }

async getCartCount(): Promise<string> {
    return await this.cartCount.innerText();
}
}