import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class CartPage {
  readonly proceedToCheckoutButton: Locator;
  readonly cartRows: Locator;
  readonly numberOfItems: Locator;
  readonly totalAmount: Locator;

  actions: Actions;

  constructor(public page: Page) {
    this.actions = new Actions(this.page);

    this.proceedToCheckoutButton = this.page.getByRole("button", {
      name: "PROCEED TO CHECKOUT",
    });

    this.cartRows = this.page.locator("#productCartTables tbody tr");

    this.numberOfItems = this.page.getByText("No. of Items :").locator("..");

    this.totalAmount = this.page.getByText("Total Amount :").locator("..");
  }

  async proceedToCheckout() {
    await this.actions.click(this.proceedToCheckoutButton);
  }

  getProductRow(productName: string): Locator {
    return this.cartRows.filter({
      hasText: productName,
    });
  }

  async getNumberOfItems(): Promise<string> {
    return await this.actions.getText(this.numberOfItems);
  }

  async getTotalAmount(): Promise<string> {
    return await this.actions.getText(this.totalAmount);
  }
}