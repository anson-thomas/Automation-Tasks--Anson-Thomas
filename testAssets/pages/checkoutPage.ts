import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class CheckoutPage {

    readonly countryDropdown: Locator;
    readonly termsCheckbox: Locator;
    readonly proceedButton: Locator;
    readonly placeOrderButton: Locator;
    readonly successMessage: Locator;

    actions: Actions;

    constructor(public page: Page) {
      this.actions = new Actions();    
      this.placeOrderButton = this.page.locator("//button[text()='Place Order']");
      this.countryDropdown = this.page.locator("//select");
      this.termsCheckbox = this.page.locator("//input[@class='chkAgree']");
      this.proceedButton = this.page.locator("//button[text()='Proceed']");
      this.successMessage = this.page.locator("//span[text()='Thank you, your order has been placed successfully ']");
    }

    async clickPlaceOrder() {
        await this.actions.click(this.placeOrderButton);
    }

    async selectCountry(country: string) {
        await this.actions.selectOption(
            this.countryDropdown,
            country
        );
    }

    async acceptTerms() {
        await this.actions.check(this.termsCheckbox);
    }

    async proceed() {
        await this.actions.click(this.proceedButton);
    }
}