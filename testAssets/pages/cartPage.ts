import { Locator, Page, expect, test } from "@playwright/test";
import Actions from "../../helper/actions";


export default class CartPage {
     actions: Actions;   
     cartIcon: Locator;
     cartCount: Locator;
     cartHeading: Locator;
     productRows: Locator;
     productName: Locator;
     unitPrice: Locator;
     quantity: Locator;
     subTotal: Locator;
     total: Locator;
     cartSubTotal: Locator;
     resetCartButton: Locator;
     emptyCartmsg: Locator;

    constructor(public page: Page) {
        this.actions = new Actions();
        this.cartIcon = this.page.locator("//a[@href='/cart']");
        this.cartCount = this.page.locator("//a[@href='/cart']//span");
        this.cartHeading = this.page.locator("//h1[normalize-space()='Cart']");
        this.productRows = this.page.locator("//div[contains(@class,'grid') and .//h1]");
        this.productName = this.page.locator("//h1[@class='font-titleFont font-semibold']");
        this.unitPrice = this.page.locator("//div[@class='flex w-1/3 items-center text-lg font-semibold']");
        this.quantity = this.page.locator("//div[@class='w-1/3 flex items-center gap-6 text-lg']//p");
        this.subTotal = this.page.locator("//div[@class='w-1/3 flex items-center font-titleFont font-bold text-lg']//p");
        this.total = this.page.locator("//p[contains(normalize-space(), 'Total')]/span");
        this.cartSubTotal = this.page.locator("//p[contains(normalize-space(), 'Subtotal')]/span");
        this.resetCartButton= this.page.locator("//button[normalize-space()='Reset cart']")
        this.emptyCartmsg = this.page.locator("//h1[text()='Your Cart feels lonely.']")
    }
    async openCart() {
    await this.actions.click(this.cartIcon);
    await expect(this.cartHeading).toBeVisible();
    }
async getCartCount(): Promise<number> {
    await expect(this.cartCount).toHaveText("2");

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
        return prices.map((price) => Number(price.replace("$", "").trim())
        );
    }
    async getQuantities(): Promise<number[]> {
        const quantities = await this.quantity.allTextContents();
        return quantities.map((quantity) => Number(quantity.trim())
        );
    }
    async getSubTotals(): Promise<number[]> {
        const subTotals = await this.subTotal.allTextContents();
        return subTotals.map((subTotal) => Number(subTotal.replace("$", "").trim())
        );
    }
    async getTotal(): Promise<number> {
        const total = await this.total.innerText();
        return Number(total.replace("$", "").trim());
    }
    async verifyProductInCart(productName: string): Promise<boolean> {
    const product = this.productRows.filter({hasText: productName});
    return await product.count() > 0;
    }
    async getCartSubtotal(): Promise<number> {
    const subtotal = await this.cartSubTotal.innerText();
    return Number(subtotal.replace("$", "").trim());
    }
    async resetCart() {
    await this.actions.click(this.resetCartButton);
    }
}