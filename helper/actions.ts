import { Locator, Page } from "@playwright/test";

export default class Actions {
  constructor(private page: Page) {}

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async check(locator: Locator) {
    await locator.check();
  }

  async selectOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}.png`,
      fullPage: true,
    });
  }
}