import { test as base } from "@playwright/test";

import HomePage from "./homePage";
import LoginPage from "./loginPage";
import RegistrationPage from "./registrationPage";
import YopmailPage from "./yopmailPage";

type Pages = {
  homePage: HomePage;
  loginPage: LoginPage;
  registrationPage: RegistrationPage;
  yopmailPage: YopmailPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  yopmailPage: async ({ context }, use) => {
    const yopmailPage = await context.newPage();

    await use(new YopmailPage(yopmailPage));

    await yopmailPage.close();
  },
});

export { expect } from "@playwright/test";

