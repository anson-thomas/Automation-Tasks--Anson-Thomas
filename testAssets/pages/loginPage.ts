import { Locator, Page, test } from "@playwright/test";
import Actions from "../../helper/actions";
export default class LoginPage {
   actions: Actions; 
   emailAddressField: Locator;
   passwordField: Locator;
   loginButton: Locator;

  constructor(public page: Page) {
    this.actions = new Actions();
    this.emailAddressField = this.page.locator("//input[@id='email']");
    this.passwordField = this.page.locator("//input[@type='password']");
    this.loginButton = this.page.locator("//button[@type='submit']");
  }

  async enterEmailAddress(email: string) {
    await test.step("Enter email address", async () => {
      await this.emailAddressField.fill(email);
    });
  }
  async enterPassword(password: string) {
    await test.step("Enter password", async () => {
      await this.passwordField.fill(password);
    });
  }
  async clickLogin() {
    await test.step("Click Login button", async () => {
      await this.actions.click(this.loginButton);
    });
  }
}