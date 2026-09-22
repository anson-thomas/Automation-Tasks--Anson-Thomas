import { Locator } from "@playwright/test";

export default class Actions {
    async highlight(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
        await locator.evaluate((element) => {
            const htmlElement = element as HTMLElement;
            htmlElement.style.border = "3px solid red";
            htmlElement.style.backgroundColor = "yellow";
        });
    }
    async click(locator: Locator) {
        await this.highlight(locator);
        await locator.click();
    }
    async fill(locator: Locator, value: string) {
        await this.highlight(locator);
        await locator.fill(value);
    }
    async check(locator: Locator) {
        await this.highlight(locator);
        await locator.check();
    }
    async selectOption(locator: Locator, value: string) {
        await this.highlight(locator);
        await locator.selectOption(value);
    }
}