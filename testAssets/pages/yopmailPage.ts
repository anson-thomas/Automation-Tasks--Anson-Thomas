import { expect, Locator, Page, test } from "@playwright/test";

export default class YopmailPage {
  readonly loginField: Locator;
  readonly checkInboxButton: Locator;
  readonly inboxFrame: Locator;
  readonly mailFrame: Locator;

  constructor(public page: Page) {
    this.loginField = this.page.getByRole("textbox", {
      name: "Login",
    });

    this.checkInboxButton = this.page.getByTitle(
      "Check Inbox @yopmail.com"
    );

    this.inboxFrame = this.page.locator('iframe[name="ifinbox"]');

    this.mailFrame = this.page.locator('iframe[name="ifmail"]');
  }

  async openYopmail() {
    await test.step("Open Yopmail", async () => {
      await this.page.goto("https://yopmail.com/");
    });
  }

  async enterEmail(email: string) {
    await test.step("Enter email address in Yopmail", async () => {
      await this.loginField.fill(email);
    });
  }

  async openInbox() {
    await test.step("Open Yopmail inbox", async () => {
      await this.checkInboxButton.click();
    });
  }

  async getOtp(): Promise<string> {
  return await test.step("Retrieve OTP from Yopmail", async () => {
    await this.page.reload();

    const inboxFrame = this.inboxFrame.contentFrame();

    const emailMessage = inboxFrame.getByRole("button", {
      name: /playground@/i,
    }).first();

    await emailMessage.waitFor();
    await emailMessage.click();

    const mailFrame = this.mailFrame.contentFrame();

    await mailFrame.locator("body").waitFor();

    const mailText = await mailFrame.locator("body").innerText();

    console.log("========== YOPMAIL EMAIL ==========");
    console.log(mailText);
    console.log("===================================");

    const otpMatch = mailText.match(/\b\d{6}\b/);

    await expect(
      otpMatch,
      "OTP should be present in the email"
    ).not.toBeNull();

    return otpMatch![0];
  });
}
  async switchToYopmail() {
  await test.step("Switch to Yopmail tab", async () => {
    await this.page.bringToFront();
    await this.page.waitForTimeout(5000);
    await this.page.reload({waitUntil: 'load'});
    const iFrame = await this.page.locator("//iframe[@title='reCAPTCHA']")
    await iFrame.locator("//div[@class='recaptcha-checkbox-checkmark']").click();
  });
}
}