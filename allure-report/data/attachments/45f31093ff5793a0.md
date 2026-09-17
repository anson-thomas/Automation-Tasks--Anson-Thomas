# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: assignment3.spec.ts >> PlayGround Account Creation and Login >> Verify account creation, OTP verification, sign-out and successful sign-in
- Location: testAssets\tests\assignment3.spec.ts:6:7

# Error details

```
Error: OTP should be present in the email

expect(received).not.toBeNull()

Received: null
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
      - heading "Create an Account" [level=2] [ref=e71]
      - paragraph [ref=e72]: Join our community
      - generic [ref=e73]:
        - generic [ref=e75]:
          - checkbox "I agree to the Terms of Service" [checked] [ref=e76]
          - generic [ref=e77]:
            - text: I agree to the
            - link "Terms of Service" [ref=e78] [cursor=pointer]:
              - /url: /terms
        - generic [ref=e79]:
          - button "Previous" [ref=e80] [cursor=pointer]
          - button "Sign Up" [active] [ref=e81] [cursor=pointer]
        - paragraph [ref=e83]:
          - text: Already have an account?
          - link "Sign In" [ref=e84] [cursor=pointer]:
            - /url: /signin
    - generic [ref=e86]:
      - generic [ref=e87]:
        - heading "More about PlayGround" [level=3] [ref=e88]
        - generic [ref=e89]:
          - paragraph [ref=e90]: Sign up for our newsletter to receive updates and news.
          - list [ref=e91]:
            - link [ref=e92] [cursor=pointer]:
              - /url: /
              - listitem [ref=e93]
            - link [ref=e96] [cursor=pointer]:
              - /url: /
              - listitem [ref=e97]
            - link [ref=e100] [cursor=pointer]:
              - /url: /
              - listitem [ref=e101]
            - link [ref=e104] [cursor=pointer]:
              - /url: /
              - listitem [ref=e105]
      - generic [ref=e108]:
        - heading "Shop" [level=3] [ref=e109]
        - list [ref=e110]:
          - listitem [ref=e111] [cursor=pointer]: Accesories
          - listitem [ref=e112] [cursor=pointer]: Clothes
          - listitem [ref=e113] [cursor=pointer]: Electronics
          - listitem [ref=e114] [cursor=pointer]: Home appliances
          - listitem [ref=e115] [cursor=pointer]: New Arrivals
      - generic [ref=e116]:
        - heading "Your account" [level=3] [ref=e117]
        - list [ref=e118]:
          - listitem [ref=e119] [cursor=pointer]: Profile
          - listitem [ref=e120] [cursor=pointer]: Orders
          - listitem [ref=e121] [cursor=pointer]: Addresses
          - listitem [ref=e122] [cursor=pointer]: Account Details
          - listitem [ref=e123] [cursor=pointer]: Payment Options
      - generic [ref=e124]:
        - heading "Subscribe to our newsletter." [level=3] [ref=e125]
        - generic [ref=e126]:
          - paragraph [ref=e127]: Sign up for our newsletter to receive updates and news.
          - generic [ref=e128]:
            - textbox "Insert your email ...*" [ref=e130]
            - button "Subscribe" [ref=e131] [cursor=pointer]
          - img "/assets/payment-BAywfhtf.png" [ref=e132]
    - paragraph [ref=e135]:
      - text: Copyright 2024 | PlayGround | All Rights Reserved |
      - link "Powered by Testing Mavens" [ref=e139] [cursor=pointer]:
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
  42 |     return await test.step("Retrieve OTP from Yopmail", async () => {
  43 |       const mailFrame = this.mailFrame.contentFrame();
  44 | 
  45 |       await mailFrame.locator("body").waitFor();
  46 | 
  47 |       const mailText = await mailFrame.locator("body").innerText();
  48 | 
  49 |       console.log("========== YOPMAIL EMAIL ==========");
  50 |       console.log(mailText);
  51 |       console.log("===================================");
  52 | 
  53 |       const otpMatch = mailText.match(/\b\d{6}\b/);
  54 | 
  55 |       await expect(
  56 |         otpMatch,
  57 |         "OTP should be present in the email"
> 58 |       ).not.toBeNull();
     |             ^ Error: OTP should be present in the email
  59 | 
  60 |       return otpMatch![0];
  61 |     });
  62 |   }
  63 |   async switchToYopmail() {
  64 |   await test.step("Switch to Yopmail tab", async () => {
  65 |     await this.page.bringToFront();
  66 |   });
  67 | }
  68 | }
```