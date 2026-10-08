import { test, expect } from "../pages/customFixtures";
import { testStep } from "../../helper/utility";

type Product = { name: string; price: number };

test.describe("New Arrival Cart Scenarios", () => {
    test("Add the highest-priced new arrival to the cart and delete it", async ({ page, homePage, cartPage }) => {
        let highestPricedProduct: Product | undefined;

        await testStep("Step 1 : Launch the home page", page, async () => {
            await homePage.launchWebApp();
            await homePage.waitForNewArrivalImages();
            await expect(homePage.newArrivalsSection).toBeVisible();
        });

        await testStep("Step 2 : Identify the highest-priced new arrival product", page, async () => {
            const products: Product[] = await homePage.getNewArrivalProducts();
            await expect(products.length).toBeGreaterThan(0);
            products.sort((firstProduct, secondProduct) => secondProduct.price - firstProduct.price);
            highestPricedProduct = products[0];
            await expect(highestPricedProduct).toBeDefined();
        });

        await testStep("Step 3 : Add the highest-priced product to the cart", page, async () => {
            await expect(highestPricedProduct).toBeDefined();
            await homePage.addProductToCart(highestPricedProduct!.name);
            await expect(cartPage.cartCount).toHaveText("1");
        });

        await testStep("Step 4 : Verify the selected product is in the cart", page, async () => {
            await homePage.openCart();
            await expect(await cartPage.getProductNames()).toContain(highestPricedProduct!.name);
        });

        await testStep("Step 5 : Delete the only product from the cart", page, async () => {
            await cartPage.resetCart();
            await expect(cartPage.productName).toHaveCount(0);
            await expect(cartPage.cartCount).toHaveText("0");
        });
    });

    test("Add all visible new arrival products to the cart", async ({ page, homePage, cartPage }) => {
        let products: Product[] = [];

        await testStep("Step 1 : Launch the home page", page, async () => {
            await homePage.launchWebApp();
            await homePage.waitForNewArrivalImages();
            await expect(homePage.newArrivalsSection).toBeVisible();
        });

        await testStep("Step 2 : Identify all visible new arrival products", page, async () => {
            products = await homePage.getNewArrivalProducts();
            await expect(products.length).toBeGreaterThan(0);
        });

        for (const [index, product] of products.entries()) {
            await testStep(`Step ${index + 3} : Add ${product.name} to the cart`, page, async () => {
                await homePage.addProductToCart(product.name);
                await expect(cartPage.cartCount).toHaveText(String(index + 1));
            });
        }

        await testStep(`Step ${products.length + 3} : Verify all visible new arrivals are in the cart`, page, async () => {
            await homePage.openCart();
            await expect(cartPage.cartHeading).toBeVisible();
            const cartProductNames = await cartPage.getProductNames();
            for (const product of products) {
                await expect(cartProductNames).toContain(product.name);
            }
            await expect(cartPage.cartCount).toHaveText(String(products.length));
        });
    });

    test("Add the lowest-priced new arrival to the cart and proceed to checkout", async ({ page, homePage, cartPage }) => {
        let lowestPricedProduct: Product | undefined;

        await testStep("Step 1 : Launch the home page", page, async () => {
            await homePage.launchWebApp();
            await homePage.waitForNewArrivalImages();
            await expect(homePage.newArrivalsSection).toBeVisible();
        });

        await testStep("Step 2 : Identify the lowest-priced new arrival product", page, async () => {
            const products: Product[] = await homePage.getNewArrivalProducts();
            await expect(products.length).toBeGreaterThan(0);
            products.sort((firstProduct, secondProduct) => firstProduct.price - secondProduct.price);
            lowestPricedProduct = products[0];
            await expect(lowestPricedProduct).toBeDefined();
        });

        await testStep("Step 3 : Add the lowest-priced product to the cart", page, async () => {
            await expect(lowestPricedProduct).toBeDefined();
            await homePage.addProductToCart(lowestPricedProduct!.name);
            await expect(cartPage.cartCount).toHaveText("1");
        });

        await testStep("Step 4 : Verify the selected product is in the cart", page, async () => {
            await homePage.openCart();
            await expect(await cartPage.getProductNames()).toContain(lowestPricedProduct!.name);
        });

        await testStep("Step 5 : Proceed to checkout and verify the sign-in requirement", page, async () => {
            await cartPage.proceedToCheckout();
            await expect(page).toHaveURL(/signin/i);
            await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
        });
    });
});