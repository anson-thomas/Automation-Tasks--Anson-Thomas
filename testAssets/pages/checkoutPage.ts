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
    this.actions = new Actions(this.page);
    this.placeOrderButton = this.page.getByRole("button", {
      name: "Place Order",
    });
    this.countryDropdown = this.page.getByRole("combobox");
    this.termsCheckbox = this.page.getByRole("checkbox");
    this.proceedButton = this.page.getByRole("button", {
      name: "Proceed",
    });
    this.successMessage = this.page.getByText(
      "Thank you, your order has been placed Successfully"
    );
  }

  async clickPlaceOrder() {await this.actions.click(this.placeOrderButton);}
  async selectCountry(country: string) {await this.actions.selectOption(this.countryDropdown, country);}
  async acceptTerms() {await this.actions.check(this.termsCheckbox);}
  async proceed() {await this.actions.click(this.proceedButton);}
}