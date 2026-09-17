import { expect, test } from "../pages/customFixture";
import Random from "../../helper/random";

test.describe("PlayGround Account Creation and Login", () => {

  test("Verify account creation, OTP verification, sign-out and successful sign-in", async ({
    page,
    homePage,
    registrationPage,
    loginPage,
    yopmailPage,
  }) => {



const email = Random.getRandomYopmail();
const password = "qazwsxedc123";

console.log("Generated email:", email);

await test.step("Navigate to PlayGround application", async () => {
  await homePage.launchWebApp();
  await homePage.verifyPlayGroundPage();
});

await test.step("Open Yopmail inbox for the generated email", async () => {
  await yopmailPage.openYopmail();
  await yopmailPage.enterEmail(email);
  await yopmailPage.openInbox();
});

await homePage.switchToPlayGround();

await test.step("Navigate to Sign Up page", async () => {
  await homePage.openSignUpPage();
});

await test.step("Create a new account", async () => {
  await registrationPage.enterFullName("moir");
  await registrationPage.enterEmail(email);
  await registrationPage.enterPassword(password);

  await registrationPage.clickNext();

  await registrationPage.selectGender();
  await registrationPage.enterCountry("India");
  await registrationPage.enterBio("Buyer");

  await registrationPage.clickNext();

  await registrationPage.agreeToTerms();
  await registrationPage.clickSignUp();
});

await test.step("Retrieve OTP from Yopmail", async () => {
  await yopmailPage.switchToYopmail();
});

const otp = await yopmailPage.getOtp();
console.log("Retrieved OTP:", otp);

await homePage.switchToPlayGround();

await test.step("Verify OTP", async () => {
  await registrationPage.enterOtp(otp);
  await registrationPage.clickVerifyOtp();
});
await homePage.switchToPlayGround();

await test.step("Verify OTP", async () => {
  await registrationPage.enterOtp(otp);
  await registrationPage.clickVerifyOtp();
});

await test.step("Sign out from the application", async () => {
  await homePage.logout();
});

await test.step("Navigate to Login page", async () => {
  await homePage.openLoginPage();
});

await test.step("Sign in using registered credentials", async () => {
  await loginPage.enterEmailAddress(email);
  await loginPage.enterPassword(password);
  await loginPage.clickLogin();
});
    await test.step("Verify user is successfully signed in", async () => {
      await homePage.openMenu();

      await expect(
        page.getByText("Log Out")
      ).toBeVisible();
    });
  });
});

