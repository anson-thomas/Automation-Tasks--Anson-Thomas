import { Locator, Page, expect, test } from "@playwright/test";

export default class CartPage {
    readonly cartIcon: Locator;
    readonly cartCount: Locator;
    readonly cartHeading: Locator;
    readonly productRows: Locator;
    readonly productName: Locator;
    readonly unitPrice: Locator;
    readonly quantity: Locator;
    readonly subTotal: Locator;
    readonly total: Locator;

    constructor(public page: Page) {
        this.cartIcon = this.page.locator("//a[@href='/cart']");
        this.cartCount = this.page.locator("//a[@href='/cart']//span");
        this.cartHeading = this.page.locator("//h1[normalize-space()='Cart']");

        this.productRows = this.page.locator(
            "//div[contains(@class,'grid-cols-5') and contains(@class,'border')]"
        );

        this.productName = this.page.locator(
            "//div[contains(@class,'grid-cols-5') and contains(@class,'border')]//h1"
        );

        this.unitPrice = this.page.locator(
            "//div[contains(@class,'grid-cols-5') and contains(@class,'border')]//div[contains(@class,'w-1/3') and contains(@class,'font-semibold')]"
        );

        this.quantity = this.page.locator(
            "//div[contains(@class,'grid-cols-5') and contains(@class,'border')]//p"
        );

        this.subTotal = this.page.locator(
            "//div[contains(@class,'grid-cols-5') and contains(@class,'border')]//div[contains(@class,'font-bold')]//p"
        );

        this.total = this.page.locator(
            "//p[normalize-space()='Total']/span"
        );
    }

    async openCart() {
        await test.step("Navigate to Cart", async () => {
            await this.cartIcon.click();
            await expect(this.cartHeading).toBeVisible();
        });
    }

    async getCartCount(): Promise<number> {
        const count = await this.cartCount.innerText();
        return Number(count);
    }

    async getProductCount(): Promise<number> {
        return await this.productRows.count();
    }

    async getProductNames(): Promise<string[]> {
        return await this.productName.allTextContents();
    }

    async getUnitPrices(): Promise<number[]> {
        const prices = await this.unitPrice.allTextContents();

        return prices.map((price) =>
            Number(price.replace("$", "").trim())
        );
    }

    async getQuantities(): Promise<number[]> {
        const quantities = await this.quantity.allTextContents();

        return quantities.map((quantity) =>
            Number(quantity.trim())
        );
    }

    async getSubTotals(): Promise<number[]> {
        const subTotals = await this.subTotal.allTextContents();

        return subTotals.map((subTotal) =>
            Number(subTotal.replace("$", "").trim())
        );
    }

    async getTotal(): Promise<number> {
        const total = await this.total.innerText();

        return Number(total.replace("$", "").trim());
    }
}