import { Locator, Page } from "@playwright/test";
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
        shippingCharge: Locator;
        cartTotal: Locator;
        checkoutButton: Locator;
        resetCartButton: Locator;

    constructor(public page: Page) {
        this.actions = new Actions();
        this.cartIcon = this.page.locator("//div[@class='relative']/following::a[@href='/cart']");
        this.cartCount = this.page.locator("//a[@href='/cart']/descendant::span");
        this.cartHeading = this.page.locator("//div[contains(@class,'auto px-4')]/descendant::h1[1]");
        this.productName = this.page.locator("//div[contains(@class,'border py-2')]/descendant::h1");
        this.unitPrice = this.page.locator("//div[contains(@class,'gap-0')]/descendant::div[1]");
        this.quantity = this.page.locator("//div[contains(@class,'gap-0')]/descendant::div[2]/p");
        this.cartSubTotal = this.page.locator("//p[contains(normalize-space(), 'Subtotal')]/descendant::span");
        this.shippingCharge = this.page.locator("//p[contains(normalize-space(), 'Shipping Charge')]/descendant::span");
        this.cartTotal = this.page.locator("//p[contains(normalize-space(), 'Total')]/descendant::span");
        this.checkoutButton = this.page.getByRole("button", { name: /checkout/i });
        this.resetCartButton = this.page.getByRole("button", { name: "Reset cart" });
    }
    
    async openCart() {
    await this.actions.click(this.cartIcon);
    }
    async proceedToCheckout() {
        await this.actions.click(this.checkoutButton);
    }
    async resetCart() {
        await this.actions.click(this.resetCartButton);
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

    async getShippingCharge(): Promise<number> {
        const shippingCharge = await this.shippingCharge.innerText();
        return Number(shippingCharge.replace("$", "").trim());
    }

    async getCartTotal(): Promise<number> {
        const total = await this.cartTotal.innerText();
        return Number(total.replace("$", "").trim());
    }

    async removeProductFromCart(productName: string) {
        const productRow = this.page.locator(
            `//div[contains(@class,'border py-2')][.//h1[normalize-space()='${productName}']]`
        );
        await this.actions.click(productRow.locator("svg").first());
    }
}