import { Locator, Page, test } from "@playwright/test";

export default class LoginPage {
  readonly emailAddressField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(public page: Page) {
    this.emailAddressField = this.page.getByRole("textbox", {
      name: "Email Address",
    });

    this.passwordField = this.page.getByRole("textbox", {
      name: "Password",
    });

    this.loginButton = this.page.getByRole("button", {
      name: "Login",
    });
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
      await this.loginButton.click();
    });
  }
}

