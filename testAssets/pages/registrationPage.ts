import { Locator, Page, test } from "@playwright/test";

export default class RegistrationPage {
  readonly fullNameField: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly nextButton: Locator;
  readonly maleRadioButton: Locator;
  readonly countryField: Locator;
  readonly bioField: Locator;
  readonly termsCheckbox: Locator;
  readonly signUpButton: Locator;
  readonly otpField: Locator;
  readonly verifyOtpButton: Locator;

  constructor(public page: Page) {
    this.fullNameField = this.page.getByRole("textbox", { name: "Full Name" });
    this.emailField = this.page.getByRole("textbox", {
      name: "Email",
      exact: true,
    });
    this.passwordField = this.page.getByRole("textbox", {
      name: "Password",
    });

    this.nextButton = this.page.getByRole("button", { name: "Next" });

    this.maleRadioButton = this.page.getByRole("radio", {
      name: "Male",
      exact: true,
    });

    this.countryField = this.page.getByRole("textbox", {
      name: "Country",
    });

    this.bioField = this.page.getByRole("textbox", { name: "Bio" });

    this.termsCheckbox = this.page.getByRole("checkbox", {
      name: "I agree to the Terms of",
    });

    this.signUpButton = this.page.getByRole("button", {
      name: "Sign Up",
    });

    this.otpField = this.page.getByRole("textbox", { name: "OTP" });

    this.verifyOtpButton = this.page.getByRole("button", {
      name: "Verify OTP",
    });
  }
    async enterFullName(fullName: string) {
    await test.step("Enter full name", async () => {
      await this.fullNameField.fill(fullName);
    });
  }

  async enterEmail(email: string) {
    await test.step("Enter email address", async () => {
      await this.emailField.fill(email);
    });
  }

  async enterPassword(password: string) {
    await test.step("Enter password", async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickNext() {
    await test.step("Click Next button", async () => {
      await this.nextButton.click();
    });
  }

  async selectGender() {
    await test.step("Select Male gender", async () => {
      await this.maleRadioButton.check();
    });
  }

  async enterCountry(country: string) {
    await test.step("Enter country", async () => {
      await this.countryField.fill(country);
    });
  }

  async enterBio(bio: string) {
    await test.step("Enter bio", async () => {
      await this.bioField.fill(bio);
    });
  }

  async agreeToTerms() {
    await test.step("Accept terms and conditions", async () => {
      await this.termsCheckbox.check();
    });
  }

  async clickSignUp() {
    await test.step("Click Sign Up button", async () => {
      await this.signUpButton.click();
    });
  }

  async enterOtp(otp: string) {
    await test.step("Enter OTP", async () => {
      await this.otpField.fill(otp);
    });
  }

  async clickVerifyOtp() {
    await test.step("Click Verify OTP button", async () => {
      await this.verifyOtpButton.click();
    });
  }
}