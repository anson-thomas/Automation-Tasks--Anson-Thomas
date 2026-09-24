import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";


export default class CartPage {
        actions: Actions;
        cartIcon: Locator;
        cartCount: Locator;
        cartHeading: Locator;
        productName: Locator;
        unitPrice: Locator;
        quantity: Locator;
        cartSubTotal: Locator;

    constructor(public page: Page) {
        this.actions = new Actions();
        this.cartIcon = this.page.locator("//div[@class='relative']/following::a[@href='/cart']");
        this.cartCount = this.page.locator("//a[@href='/cart']/descendant::span");
        this.cartHeading = this.page.locator("//div[contains(@class,'auto px-4')]/descendant::h1[1]");
        this.productName = this.page.locator("//div[contains(@class,'border py-2')]/descendant::h1");
        this.unitPrice = this.page.locator("//div[contains(@class,'gap-0')]/descendant::div[1]");
        this.quantity = this.page.locator("//div[contains(@class,'gap-0')]/descendant::div[2]/p");
        this.cartSubTotal = this.page.locator("//p[contains(normalize-space(), 'Subtotal')]/descendant::span");
    }
    
    async openCart() {
    await this.actions.click(this.cartIcon);
    await expect(this.cartHeading).toBeVisible();
    }
    async getCartCount(): Promise<number> {
        const count = await this.cartCount.innerText();
        return Number(count);
    }
        async getProductNames(): Promise<string[]> {
        return await this.productName.allTextContents();
    }
    async getUnitPrices(): Promise<number[]> {
        const prices = await this.unitPrice.allTextContents();
        return prices.map((price) => Number(price.replace("$", "").trim())
        );
    }
    async getQuantities(): Promise<number[]> {
        const quantities = await this.quantity.allTextContents();
        return quantities.map((quantity) => Number(quantity.trim())
        );
    }    
    async getCartSubtotal(): Promise<number> {
    const subtotal = await this.cartSubTotal.innerText();
    return Number(subtotal.replace("$", "").trim());
    }
}