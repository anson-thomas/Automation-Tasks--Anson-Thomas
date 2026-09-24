import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class CartPage {
    proceedToCheckoutButton: Locator;
    cartRows: Locator;
    numberOfItems: Locator;
    totalAmount: Locator;
    actions: Actions;

    constructor(public page: Page) {
    this.actions = new Actions();
    this.proceedToCheckoutButton = this.page.locator( "//button[normalize-space()='PROCEED TO CHECKOUT']"); 
    this.cartRows = this.page.locator("//table[@class='cartTable']//tr"); 
    this.numberOfItems = this.page.locator("//b[normalize-space()='No. of Items :']/.."); 
    this.totalAmount = this.page.locator("//span[@class='totAmt']")
    }

    async proceedToCheckout() {
        await this.actions.click(
            this.proceedToCheckoutButton
        );
    }

    getProductRow(productName: string): Locator {
        return this.cartRows.filter({
            hasText: productName,
        });
    }

    async getNumberOfItems(): Promise<string> {
        return await this.actions.getText(
            this.numberOfItems
        );
    }

    async getTotalAmount(): Promise<string> {
        return await this.actions.getText(
            this.totalAmount
        );
    }
}