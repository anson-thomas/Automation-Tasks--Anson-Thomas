import { Locator, Page } from "@playwright/test";
import Actions from "../../helper/actions";

export default class ShopPage {
     actions: Actions;    
     products: Locator;
     productNames: Locator;
     productPrices: Locator;
     addToCartButtons: Locator;
     shopHeading: Locator;
     nextPageButton: Locator;
     

    constructor(public page: Page) {
        this.actions = new Actions();
        this.products = this.page.locator("//div[contains(@class,'w-full') and contains(@class,'relative') and .//h2 and .//button[normalize-space()='Add to Cart']]");        
        this.productNames = this.page.locator("//div[contains(@class,'w-full relative')]//h2");
        this.productPrices = this.page.locator("//div[contains(@class,'w-full relative')]//p[contains(@class,'text-xl')]");        
        this.addToCartButtons = this.page.locator("//button[normalize-space()='Add to Cart']");
        this.shopHeading = this.page.locator("//h1[text()='Products']");
        this.nextPageButton = this.page.locator("//a[@rel='next']").first();
    }

    async launchShopPage() {
        await this.page.goto("https://www.playground.testingmavens.tools/shop?page=1");
        await this.products.first().waitFor({
        state: "visible"
    });
}
    async addProductToCart(productName: string) {
        const product = this.products.filter({hasText: productName});
        const addToCartButton = product.locator("xpath=.//button[normalize-space()='Add to Cart']");
        await this.actions.click(addToCartButton);
    }
    async getProductDetails(productName: string) {
        const product = this.products.filter({hasText: productName});
        const name = await product.locator("xpath=.//h2").innerText();
        const priceText = await product.locator("xpath=.//p[contains(@class,'text-xl') and contains(@class,'font-semibold')]").innerText();
        const price = Number(priceText.replace("$", "").trim());
        return {
            name,
            price
        };
    }
    getProductCard(productName: string): Locator {
    return this.products.filter({
        hasText: productName
    });
    }   
    async goToNextPage(nextProduct: string) {
        await this.actions.click(this.nextPageButton);
        const nextProductCard = this.products.filter({
        hasText: nextProduct
        });
        await nextProductCard.locator("xpath=.//h2").waitFor({
        state: "visible"
        });
    }
}