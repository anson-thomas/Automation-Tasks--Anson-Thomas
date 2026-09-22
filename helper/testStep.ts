import { test, Page } from "@playwright/test";

export async function testStep(
    name: string,
    page: Page,
    action: () => Promise<void>
) {
    await test.step(name, async () => {
        await action();
        try {
            const screenshot = await page.screenshot({
                fullPage: true,
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