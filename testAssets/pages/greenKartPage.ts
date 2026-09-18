import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class GreenKartPage {
  readonly products: Locator;
  readonly productNames: Locator;
  readonly cartCount: Locator;
  readonly cartLink: Locator;

  actions: Actions;

  constructor(public page: Page) {
    this.actions = new Actions(this.page);
    this.products = this.page.locator(".product");
    this.productNames = this.products.locator(".product-name");
    this.cartCount = this.page.locator(".cart-count");
    this.cartLink = this.page.getByRole("link", { name: "Cart" });
  }

  async launchWebApp() {await this.page.goto("/seleniumPractise/#/");}
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
  await this.page.getByRole("button",{ name : "PROCEED TO CHECKOUT"});
  }
  async getCartCount(): Promise<string> {
    return await this.actions.getText(this.cartCount);
  }
}