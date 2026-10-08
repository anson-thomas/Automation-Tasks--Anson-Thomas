import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class LoginPage {
    actions: Actions;
    emailInput: Locator;
    passwordInput: Locator;
    loginButton: Locator;
    emailValidationMessage: Locator;
    passwordValidationMessage: Locator;
    invalidCredentialsAlert: Locator;
    profileLink: Locator;

    constructor(public page: Page) {
        this.actions = new Actions();
        this.emailInput = this.page.getByRole("textbox", { name: "Email Address" });
        this.passwordInput = this.page.getByLabel("Password");
        this.loginButton = this.page.getByRole("button", { name: "Login" });
        this.emailValidationMessage = this.page.getByText(
            'Missing "@" symbol. Missing domain extension (e.g., ".com").',
            { exact: true }
        );
        this.passwordValidationMessage = this.page.getByText(
            "Password must be at least 6 characters",
            { exact: true }
        );
        this.invalidCredentialsAlert = this.page.getByRole("alert");
        this.profileLink = this.page.locator("//a/li[text()='Profile']");
    }

    async launchLoginPage() {
        await this.page.goto("https://www.playground.testingmavens.tools/signin");
    }

    async submit() {
        await this.actions.click(this.loginButton);
    }

    async login(email: string, password: string) {
        await this.actions.fill(this.emailInput, email);
        await this.actions.fill(this.passwordInput, password);
        await this.submit();
    }
}