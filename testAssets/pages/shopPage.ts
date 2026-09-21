import { Locator, Page } from "@playwright/test";

export default class ShopPage {
     products: Locator;
     productNames: Locator;
     productPrices: Locator;
     addToCartButtons: Locator;
     shopHeading: Locator;

    constructor(public page: Page) {
        this.products = this.page.locator(
            "//div[contains(@class,'group') and contains(@class,'border') and contains(@class,'rounded-lg')]"
        );

        this.productNames = this.page.locator(
            "//div[contains(@class,'group') and contains(@class,'border')]//h2"
        );

        this.productPrices = this.page.locator(
            "//div[contains(@class,'group') and contains(@class,'border')]//p[contains(@class,'text-xl') and contains(@class,'font-semibold')]"
        );

        this.addToCartButtons = this.page.locator(
            "//button[normalize-space()='Add to Cart']"
        );
        this.shopHeading = this.page.locator("//h1[text()='Products']");
    }

    async launchShopPage() {
        await this.page.goto(
            "https://www.playground.testingmavens.tools/shop?page=1"
        );
    }

    async addProductToCart(productName: string) {
        const product = this.products.filter({
            hasText: productName
        });

        product.locator("xpath=.//button[normalize-space()='Add to Cart']").click();
    }

    async getProductDetails(productName: string) {
        const product = this.products.filter({
            hasText: productName
        });

        const name = await product.locator("xpath=.//h2").innerText();
        const priceText = await product
            .locator(
                "xpath=.//p[contains(@class,'text-xl') and contains(@class,'font-semibold')]"
            )
            .innerText();

        const price = Number(priceText.replace("$", "").trim());

        const quantity = 1;

        return {
            name,
            price,
            quantity
        };
    }
}