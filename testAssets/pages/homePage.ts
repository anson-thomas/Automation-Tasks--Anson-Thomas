import { Locator,Page, test, expect } from "@playwright/test";
import Actions from "../../helper/actions";

export default class HomePage{
    actions: Actions; 
    header : Locator;
    // menu : Locator;
    // login : Locator;
    // profile : Locator;
    // shop : Locator;
    newArrivals : Locator;
    newArrivalProductNames : Locator;
    newArrivalsHeading : Locator;
    newArrivalProductPrice: Locator;
    newArrivalsSection: Locator;
    newArrivalsNextButton: Locator;
    newArrivalsCarousel: Locator;
    cartIcon: Locator;
     cartHeading: Locator;

constructor(public page: Page){
    this.actions = new Actions();
    this.header = this.page.locator("//div[text()='PlayGround']");
    // this.menu = this.page.locator("//div[@class='relative']/div[contains(@class,'cursor-pointer') and .//svg[@viewBox='0 0 448 512']]");
    // this.login = this.page.locator("//li[text()='Login']")
    // this.profile = this.page.locator("//a[contains(@href, 'profile')]")
    // this.shop = this.page.locator("//a[text()='Shop']")
    this.newArrivals = this.page.locator("//div[text()='New Arrivals']/ancestor::div[1]")
    this.newArrivalProductNames = this.page.locator("//div[normalize-space()='New Arrivals']/ancestor::div[1]/descendant::h2[not(ancestor::div[contains(@class,'slick-cloned')])]")
    this.newArrivalsHeading = this.page.locator("//div[normalize-space()='New Arrivals']");
    this.newArrivalProductPrice = this.page.locator(".//h2/ancestor::div[contains(@class,'group')][1]/descendant::p[contains(@class,'text-xl') and contains(@class,'font-semibold')]")
    this.newArrivalsSection = this.page.locator(
    "//div[normalize-space()='New Arrivals']/parent::div"
);

this.newArrivalsNextButton = this.newArrivalsSection.locator(
    "xpath=.//div[contains(@class,'right-2')]"
);
this.newArrivalsCarousel = this.newArrivalsSection.locator(
    "xpath=.//div[contains(@class,'slick-list')]"
);
this.cartIcon = this.page.locator("//a[@href='/cart']");
this.cartHeading = this.page.locator("//h1[normalize-space()='Cart']");
}
  async launchWebApp() {
    await test.step("Navigate to PlayGround application", async () => {
      await this.page.goto("https://www.playground.testingmavens.tools/");
    });
}
  async verifyPlayGroundPage() {
  await test.step("Verify user is on PlayGround application", async () => {
    await expect(this.page).toHaveURL("https://www.playground.testingmavens.tools/");
  });
}
  async getNewArrivalProductNames(): Promise<string[]> {
    return await this.newArrivalProductNames.allTextContents();
  }

async getNewArrivalProducts() {

    const products = [];

    const count = await this.newArrivalProductNames.count();

    for (let i = 0; i < count; i++) {

        const productName =
            this.newArrivalProductNames.nth(i);

        const name =
            await productName.innerText();

        const productCard =
            productName.locator(
                "xpath=ancestor::div[contains(@class,'group')][1]"
            );

        const priceText =
            await productCard.locator(
                "xpath=descendant::p[contains(@class,'text-xl') and contains(@class,'font-semibold')]"
            ).innerText();

        const price =
            Number(priceText.replace("$", "").trim());

        products.push({
            name,
            price
        });
    }

    return products;
}
getNewArrivalProduct(productName: string): Locator {
    return this.page.locator(
        `//div[normalize-space()='New Arrivals']/ancestor::div[1]//h2[normalize-space()='${productName}' and not(ancestor::div[contains(@class,'slick-cloned')])]`
    );
}
getNewArrivalProductCard(productName: string): Locator {
    const product = this.getNewArrivalProduct(productName);

    return product.locator(
        "xpath=ancestor::div[contains(@class,'group')][1]"
    );
}
async showNewArrivalProduct(productName: string) {
    const product = this.getNewArrivalProductCard(productName);

    await product.waitFor({
        state: "visible"
    });

    await product.scrollIntoViewIfNeeded();
}
async waitForNewArrivalImages() {

    const images = this.newArrivalsSection.locator("xpath=.//img");

    const count = await images.count();

    for (let i = 0; i < count; i++) {

        const image = images.nth(i);

        await image.waitFor({
            state: "visible"
        });

        await image.evaluate((img: HTMLImageElement) => {

            if (img.complete && img.naturalWidth > 0) {
                return;
            }

            return new Promise<void>((resolve) => {
                img.addEventListener("load", () => resolve(), {
                    once: true
                });
            });

        });
    }
}
async addProductToCart(productName: string) {

    const product =
        this.getNewArrivalProductCard(productName);

    const addToCartButton =
        product.locator(
            "xpath=.//button[normalize-space()='Add to Cart']"
        );

    await this.actions.click(addToCartButton);
}
async openCart() {
    await this.actions.click(this.cartIcon);
    await expect(this.cartHeading).toBeVisible();
    }
}
