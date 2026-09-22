import { Locator, Page, test, expect } from "@playwright/test";

export default class HomePage {
  readonly playGroundLink: Locator;
  readonly menuButton: Locator;
  readonly signUpOption: Locator;
  readonly loginOption: Locator;
  readonly logoutOption: Locator;

  constructor(public page: Page) {
    this.playGroundLink = this.page.getByRole("link", {
      name: "PlayGround",
    });

    this.menuButton = this.page.locator(".flex.gap-4 > div > .flex");

    this.signUpOption = this.page.getByRole("link", {
      name: "Sign Up",
    });

    this.loginOption = this.page.getByRole("link", {
      name: "Login",
    });

    this.logoutOption = this.page.getByText("Log Out");
  }

  async launchWebApp() {
    await test.step("Navigate to PlayGround application", async () => {
      await this.page.goto("https://www.playground.testingmavens.tools/");
    });
  }

async verifyPlayGroundPage() {
  await test.step("Verify user is on PlayGround application", async () => {
    await expect(this.page).toHaveURL(
      "https://www.playground.testingmavens.tools/"
    );
  });
}

  async openMenu() {
    await test.step("Open user menu", async () => {
      await this.menuButton.click();
    });
  }

  async openSignUpPage() {
    await test.step("Navigate to Sign Up page", async () => {
      await this.openMenu();
      await this.signUpOption.click();
    });
  }

  async openLoginPage() {
    await test.step("Navigate to Login page", async () => {
      await this.openMenu();
      await this.loginOption.click();
    });
  }

  async logout() {
    await test.step("Sign out from the application", async () => {
      await this.openMenu();

      this.page.once("dialog", async (dialog) => {
        await dialog.dismiss();
      });

      await this.logoutOption.click();
    });
  }
  async switchToPlayGround() {
  await test.step("Switch to PlayGround tab", async () => {
    await this.page.bringToFront();
  });
}
}

