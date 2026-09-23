import { test, expect } from "../pages/customFixtures";
import { testStep } from "../../helper/utility";
import fs from "fs";

test.describe("New Arrivals Assignment", () => {

    test("Identify, sort and capture minimum and maximum priced products",
        async ({ page, homePage,cartPage }) => {

            await homePage.launchWebApp();

            await expect(homePage.header).toBeVisible();

            await homePage.newArrivalsHeading.waitFor({
                state: "visible"
            });

            await homePage.waitForNewArrivalImages();

            // Task 1: Get all New Arrivals products and prices

            const products =
                await homePage.getNewArrivalProducts();

            console.log("New Arrivals:", products);

            // Task 2: Sort products from minimum to maximum price

            products.sort(
                (a, b) => a.price - b.price
            );

            console.log("Sorted Products:", products);

            const minProduct = products[0];
            const maxProduct =
                products[products.length - 1];

            console.log("Minimum Product:", minProduct);
            console.log("Maximum Product:", maxProduct);

            // Store minimum and maximum product details in JSON

            const productData = {
                minimumProduct: minProduct,
                maximumProduct: maxProduct
            };

            fs.writeFileSync(
                "testAssets/test-data/productData.json",
                JSON.stringify(productData, null, 4)
            );

            // Task 3: Locate and screenshot minimum priced product

            const minimumProduct =
                homePage.getNewArrivalProductCard(
                    minProduct.name
                );

            await testStep(
                "Minimum priced product",
                page,
                async () => {
                    await minimumProduct.scrollIntoViewIfNeeded();
                },
                minimumProduct
            );

            // Locate and screenshot maximum priced product

            const maximumProduct =
                homePage.getNewArrivalProductCard(
                    maxProduct.name
                );

            await testStep(
                "Maximum priced product",
                page,
                async () => {
                    await maximumProduct.scrollIntoViewIfNeeded();
                },
                maximumProduct
            );
await testStep(
    "Add minimum priced product to cart",
    page,
    async () => {
        await homePage.addProductToCart(
            minProduct.name
        );

        await expect(cartPage.cartCount).toHaveText("1");
    }
);

await testStep(
    "Add maximum priced product to cart",
    page,
    async () => {
        await homePage.addProductToCart(
            maxProduct.name
        );

        await expect(cartPage.cartCount).toHaveText("2");
    }
);
await homePage.openCart();
await testStep(
    "Validate cart item count",
    page,
    async () => {
        await cartPage.actions.highlight(
            cartPage.cartCount
        );

        const cartCount =
            await cartPage.getCartCount();

        await expect(cartCount).toBe(2);
    }
);

await testStep(
    "Validate product names",
    page,
    async () => {
        const productNames = cartPage.productName;

        for (let i = 0; i < await productNames.count(); i++) {
            await cartPage.actions.highlight(
                productNames.nth(i)
            );
        }

        const cartProductNames =
            await cartPage.getProductNames();

        await expect(cartProductNames).toContain(
            minProduct.name
        );

        await expect(cartProductNames).toContain(
            maxProduct.name
        );
    }
);

await testStep(
    "Validate product prices",
    page,
    async () => {
        const unitPrices = cartPage.unitPrice;

        for (let i = 0; i < await unitPrices.count(); i++) {
            await cartPage.actions.highlight(
                unitPrices.nth(i)
            );
        }

        const cartPrices =
            await cartPage.getUnitPrices();

        await expect(cartPrices).toContain(
            minProduct.price
        );

        await expect(cartPrices).toContain(
            maxProduct.price
        );
    }
);
await testStep(
    "Validate product quantities",
    page,
    async () => {
        const quantities = cartPage.quantity;

        for (let i = 0; i < await quantities.count(); i++) {
            await cartPage.actions.highlight(
                quantities.nth(i)
            );
        }

        const cartQuantities =
            await cartPage.getQuantities();

        await expect(cartQuantities).toEqual([1, 1]);
    }
);
await testStep(
    "Validate cart subtotal",
    page,
    async () => {
        await cartPage.actions.highlight(
            cartPage.cartSubTotal
        );

        const expectedTotal =
            minProduct.price + maxProduct.price;

        const cartTotal =
            await cartPage.getCartSubtotal();

        await expect(cartTotal).toBe(
            expectedTotal
        );
    }
);}
    );
});