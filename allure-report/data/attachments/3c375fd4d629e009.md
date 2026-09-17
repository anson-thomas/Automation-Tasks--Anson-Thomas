# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: assignment3.spec.ts >> PlayGround Account Creation and Login >> Verify account creation, OTP verification, sign-out and successful sign-in
- Location: testAssets\tests\assignment3.spec.ts:5:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://yopmail.com/", waiting until "load"

```

# Test source

```ts
  1  | import { expect, Locator, Page, test } from "@playwright/test";
  2  | 
  3  | export default class YopmailPage {
  4  |   readonly loginField: Locator;
  5  |   readonly checkInboxButton: Locator;
  6  |   readonly inboxFrame: Locator;
  7  |   readonly mailFrame: Locator;
  8  | 
  9  |   constructor(public page: Page) {
  10 |     this.loginField = this.page.getByRole("textbox", {
  11 |       name: "Login",
  12 |     });
  13 | 
  14 |     this.checkInboxButton = this.page.getByTitle(
  15 |       "Check Inbox @yopmail.com"
  16 |     );
  17 | 
  18 |     this.inboxFrame = this.page.locator('iframe[name="ifinbox"]');
  19 | 
  20 |     this.mailFrame = this.page.locator('iframe[name="ifmail"]');
  21 |   }
  22 | 
  23 |   async openYopmail() {
  24 |     await test.step("Open Yopmail", async () => {
> 25 |       await this.page.goto("https://yopmail.com/");
     |                       ^ Error: page.goto: Target page, context or browser has been closed
  26 |     });
  27 |   }
  28 | 
  29 |   async enterEmail(email: string) {
  30 |     await test.step("Enter Yopmail email address", async () => {
  31 |       await this.loginField.fill(email);
  32 |     });
  33 |   }
  34 | 
  35 |   async openInbox() {
  36 |     await test.step("Open Yopmail inbox", async () => {
  37 |       await this.checkInboxButton.click();
  38 |     });
  39 |   }
  40 | 
  41 | async getOtp(): Promise<string> {
  42 |   return await test.step("Retrieve OTP from email", async () => {
  43 |     const mailFrame = this.mailFrame.contentFrame();
  44 | 
  45 |     await mailFrame.locator("body").waitFor();
  46 | 
  47 |     const mailText = await mailFrame.locator("body").innerText();
  48 | 
  49 |     console.log("========== YOPMAIL EMAIL ==========");
  50 |     console.log(mailText);
  51 |     console.log("===================================");
  52 | 
  53 |     const otpMatch = mailText.match(/\b\d{6}\b/);
  54 | 
  55 |     await expect(
  56 |       otpMatch,
  57 |       "OTP should be present in the email"
  58 |     ).not.toBeNull();
  59 | 
  60 |     return otpMatch![0];
  61 |   });
  62 | }
  63 | }
  64 | 
  65 | 
```