# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: assignment3.spec.ts >> PlayGround Account Creation and Login >> Verify account creation, OTP verification, sign-out and successful sign-in
- Location: testAssets\tests\assignment3.spec.ts:6:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('//iframe[@title=\'reCAPTCHA\']').locator('//div[@class=\'recaptcha-checkbox-checkmark\']')

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - navigation [ref=e6]:
    - generic [ref=e7]:
      - link "PlayGround" [ref=e8] [cursor=pointer]:
        - /url: /
      - list [ref=e11]:
        - listitem [ref=e12]:
          - link "Home" [ref=e13] [cursor=pointer]:
            - /url: /
        - listitem [ref=e14]:
          - link "Shop" [ref=e15] [cursor=pointer]:
            - /url: /shop
        - listitem [ref=e16]:
          - link "Components" [ref=e17] [cursor=pointer]:
            - /url: /components
        - listitem [ref=e18]:
          - link "About" [ref=e19] [cursor=pointer]:
            - /url: /about
        - listitem [ref=e20]:
          - link "Contact" [ref=e21] [cursor=pointer]:
            - /url: /contact
        - listitem [ref=e22]:
          - link "Journal" [ref=e23] [cursor=pointer]:
            - /url: /journal
        - listitem [ref=e24]:
          - link "API" [ref=e25] [cursor=pointer]:
            - /url: /apidoc
        - generic [ref=e28]:
          - log [ref=e30]
          - generic [ref=e32]:
            - generic [ref=e33]: English
            - combobox [ref=e37]
  - generic [ref=e43]:
    - generic [ref=e46]:
      - paragraph [ref=e51] [cursor=pointer]: Shop by Category
      - generic [ref=e52]:
        - textbox "Search your products here" [ref=e53]
        - button [ref=e54] [cursor=pointer]
      - link "0" [ref=e64] [cursor=pointer]:
        - /url: /cart
    - generic [ref=e70]:
      - generic [ref=e71]:
        - heading "Verify Your Account" [level=2] [ref=e72]
        - paragraph [ref=e73]:
          - text: Please enter the OTP sent to
          - strong [ref=e74]: playground_i4t30hg3@yopmail.com
          - text: . Didn't receive it?
          - button "Resend OTP" [ref=e75] [cursor=pointer]
      - generic [ref=e76]:
        - generic [ref=e77]:
          - generic [ref=e78]: OTP
          - textbox "OTP" [ref=e79]:
            - /placeholder: Enter OTP
        - button "Verify OTP" [ref=e80] [cursor=pointer]
    - generic [ref=e82]:
      - generic [ref=e83]:
        - heading "More about PlayGround" [level=3] [ref=e84]
        - generic [ref=e85]:
          - paragraph [ref=e86]: Sign up for our newsletter to receive updates and news.
          - list [ref=e87]:
            - link [ref=e88] [cursor=pointer]:
              - /url: /
              - listitem [ref=e89]
            - link [ref=e92] [cursor=pointer]:
              - /url: /
              - listitem [ref=e93]
            - link [ref=e96] [cursor=pointer]:
              - /url: /
              - listitem [ref=e97]
            - link [ref=e100] [cursor=pointer]:
              - /url: /
              - listitem [ref=e101]
      - generic [ref=e104]:
        - heading "Shop" [level=3] [ref=e105]
        - list [ref=e106]:
          - listitem [ref=e107] [cursor=pointer]: Accesories
          - listitem [ref=e108] [cursor=pointer]: Clothes
          - listitem [ref=e109] [cursor=pointer]: Electronics
          - listitem [ref=e110] [cursor=pointer]: Home appliances
          - listitem [ref=e111] [cursor=pointer]: New Arrivals
      - generic [ref=e112]:
        - heading "Your account" [level=3] [ref=e113]
        - list [ref=e114]:
          - listitem [ref=e115] [cursor=pointer]: Profile
          - listitem [ref=e116] [cursor=pointer]: Orders
          - listitem [ref=e117] [cursor=pointer]: Addresses
          - listitem [ref=e118] [cursor=pointer]: Account Details
          - listitem [ref=e119] [cursor=pointer]: Payment Options
      - generic [ref=e120]:
        - heading "Subscribe to our newsletter." [level=3] [ref=e121]
        - generic [ref=e122]:
          - paragraph [ref=e123]: Sign up for our newsletter to receive updates and news.
          - generic [ref=e124]:
            - textbox "Insert your email ...*" [ref=e126]
            - button "Subscribe" [ref=e127] [cursor=pointer]
          - img "/assets/payment-BAywfhtf.png" [ref=e128]
    - paragraph [ref=e131]:
      - text: Copyright 2024 | PlayGround | All Rights Reserved |
      - link "Powered by Testing Mavens" [ref=e135] [cursor=pointer]:
        - /url: https://www.testingmavens.com/
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
  25 |       await this.page.goto("https://yopmail.com/");
  26 |     });
  27 |   }
  28 | 
  29 |   async enterEmail(email: string) {
  30 |     await test.step("Enter email address in Yopmail", async () => {
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
  41 |   async getOtp(): Promise<string> {
  42 |   return await test.step("Retrieve OTP from Yopmail", async () => {
  43 |     await this.page.reload();
  44 | 
  45 |     const inboxFrame = this.inboxFrame.contentFrame();
  46 | 
  47 |     const emailMessage = inboxFrame.getByRole("button", {
  48 |       name: /playground@/i,
  49 |     }).first();
  50 | 
  51 |     await emailMessage.waitFor();
  52 |     await emailMessage.click();
  53 | 
  54 |     const mailFrame = this.mailFrame.contentFrame();
  55 | 
  56 |     await mailFrame.locator("body").waitFor();
  57 | 
  58 |     const mailText = await mailFrame.locator("body").innerText();
  59 | 
  60 |     console.log("========== YOPMAIL EMAIL ==========");
  61 |     console.log(mailText);
  62 |     console.log("===================================");
  63 | 
  64 |     const otpMatch = mailText.match(/\b\d{6}\b/);
  65 | 
  66 |     await expect(
  67 |       otpMatch,
  68 |       "OTP should be present in the email"
  69 |     ).not.toBeNull();
  70 | 
  71 |     return otpMatch![0];
  72 |   });
  73 | }
  74 |   async switchToYopmail() {
  75 |   await test.step("Switch to Yopmail tab", async () => {
  76 |     await this.page.bringToFront();
  77 |     await this.page.waitForTimeout(5000);
  78 |     await this.page.reload({waitUntil: 'load'});
  79 |     const iFrame = await this.page.locator("//iframe[@title='reCAPTCHA']")
> 80 |     await iFrame.locator("//div[@class='recaptcha-checkbox-checkmark']").click();
     |                                                                          ^ Error: locator.click: Target page, context or browser has been closed
  81 |   });
  82 | }
  83 | }
```