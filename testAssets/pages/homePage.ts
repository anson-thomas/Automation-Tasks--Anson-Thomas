import { Locator,Page, test, expect } from "@playwright/test";
import Actions from "../../helper/actions";

export default class HomePage{
    actions: Actions; 
    header : Locator;
    menu : Locator;
    login : Locator;
    profile : Locator;
    shop : Locator;
constructor(public page: Page){
    this.actions = new Actions();
    this.header = this.page.locator("//div[text()='PlayGround']");
    this.menu = this.page.locator("//div[@class='relative']/div[contains(@class,'cursor-pointer') and .//svg[@viewBox='0 0 448 512']]");
    this.login = this.page.locator("//li[text()='Login']")
    this.profile = this.page.locator("//a[contains(@href, 'profile')]")
    this.shop = this.page.locator("//a[text()='Shop']")
}
  async launchWebApp() {
    await test.step("Navigate to PlayGround application", async () => {
      await this.page.goto("https://www.playground.testingmavens.tools/");
    });
}
  async verifyPlayGroundPage() {
  await test.step("Verify user is on PlayGround application", async () => {
    await expect(this.page).toHaveURL("https://www.playground.testingmavens.tools/");
  });
}
  async openMenu() {
    await test.step("Open user menu", async () => {
      await this.actions.click(this.menu);
    });
}
  async openLoginPage() {
    await test.step("Navigate to Login page", async () => {
      await this.openMenu();
      await this.login
    });
}
  async verifyLogin(){
    await test.step("Verify user is logged in successfully", async () => {
      await this.openMenu();
      await expect(this.profile);
    });
  }

}