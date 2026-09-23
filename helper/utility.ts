import { test, Page, Locator } from "@playwright/test";

export async function testStep(
    name: string,
    page: Page,
    action: () => Promise<void>,
    locator?: Locator
) {
    await test.step(name, async () => {

        await action();

        if (locator) {
            await locator.waitFor({ state: "visible" });
            await locator.scrollIntoViewIfNeeded();
        }

        try {
            const screenshot = await page.screenshot({
                fullPage: false,
                timeout: 10000
            });

            await test.info().attach(`${name} Screenshot`, {
                body: screenshot,
                contentType: "image/png"
            });

        } catch (error) {
            console.log(`Screenshot failed: ${name}`, error);
        }
    });
}