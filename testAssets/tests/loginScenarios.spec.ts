import { test, expect } from "../pages/customFixtures";
import { testStep } from "../../helper/utility";

test.use({ screenshot: "off", video: "off", trace: "off" });

test.describe("Login scenarios", () => {
    test("Environment-configured account can sign in", async ({ page, loginPage }) => {
        const email = process.env.E2E_LOGIN_EMAIL;
        const password = process.env.E2E_LOGIN_PASSWORD;

        test.skip(
            !email || !password,
            "Set E2E_LOGIN_EMAIL and E2E_LOGIN_PASSWORD to run the positive login test."
        );

        await testStep("Step 1 : Open the login page", page, async () => {
            await loginPage.launchLoginPage();
            await expect(page).toHaveURL(/\/signin\/?$/);
            await expect(loginPage.loginButton).toBeVisible();
        });

        await testStep("Step 2 : Sign in and verify the account profile", page, async () => {
            await loginPage.login(email!, password!);
            await expect(loginPage.profileLink).toBeVisible();
        }, undefined, { captureScreenshot: false });
    });

    test("Submitting blank fields shows required validation", async ({ page, loginPage }) => {
        await testStep("Step 1 : Open the login page", page, async () => {
            await loginPage.launchLoginPage();
            await expect(page).toHaveURL(/\/signin\/?$/);
            await expect(loginPage.loginButton).toBeVisible();
        });

        await testStep("Step 2 : Submit the empty login form", page, async () => {
            await loginPage.submit();
            await expect(loginPage.emailValidationMessage).toBeVisible();
            await expect(loginPage.passwordValidationMessage).toBeVisible();
        });
    });

    test("Unknown credentials are rejected", async ({ page, loginPage }) => {
        await testStep("Step 1 : Open the login page", page, async () => {
            await loginPage.launchLoginPage();
            await expect(page).toHaveURL(/\/signin\/?$/);
            await expect(loginPage.loginButton).toBeVisible();
        });

        await testStep("Step 2 : Submit unrecognized credentials", page, async () => {
            await loginPage.login("unknown.account@example.invalid", "NotAValidPassword9");
            await expect(loginPage.invalidCredentialsAlert).toHaveText("Invalid credentials");
            await expect(page).toHaveURL(/\/signin\/?$/);
        }, undefined, { captureScreenshot: false });
    });

    test("Malformed email shows email validation", async ({ page, loginPage }) => {
        await testStep("Step 1 : Open the login page", page, async () => {
            await loginPage.launchLoginPage();
            await expect(page).toHaveURL(/\/signin\/?$/);
            await expect(loginPage.loginButton).toBeVisible();
        });

        await testStep("Step 2 : Submit a malformed email address", page, async () => {
            await loginPage.login("not-an-email", "ValidPassword1");
            await expect(loginPage.emailValidationMessage).toBeVisible();
        }, undefined, { captureScreenshot: false });
    });

    test("Password below the minimum length shows validation", async ({ page, loginPage }) => {
        await testStep("Step 1 : Open the login page", page, async () => {
            await loginPage.launchLoginPage();
            await expect(page).toHaveURL(/\/signin\/?$/);
            await expect(loginPage.loginButton).toBeVisible();
        });

        await testStep("Step 2 : Submit a password below the minimum length", page, async () => {
            await loginPage.login("unknown.account@example.invalid", "short");
            await expect(loginPage.passwordValidationMessage).toBeVisible();
        }, undefined, { captureScreenshot: false });
    });
});