import { test, expect } from "../pages/customFixtures";
import { testStep } from "../../helper/utility";
import fs from "fs";

test.describe("New Arrivals Assignment", () => {
    test.skip("Identify, sort and capture minimum and maximum priced products",async ({ page, homePage, cartPage }) => {

            let products: { name: string; price: number }[] = [];
            let minProduct: { name: string; price: number };
            let maxProduct: { name: string; price: number };

            await testStep("Step 1 : Verify user is able to launch the webpage",page,async () => {
                    await homePage.launchWebApp();
                    await homePage.waitForNewArrivalImages();
                    await expect(homePage.newArrivalsSection).toBeVisible();
                }
            );
            await testStep("Step 2 : Verify all new arrival products and their prices can be identified",page,async () => {
                    products = await homePage.getNewArrivalProducts();
                    await expect(products.length).toBeGreaterThan(0);
                    console.log("New Arrivals:", products);
                },
                homePage.newArrivalsSection
            );
            await testStep("Step 3 : Sort products and identify minimum and maximum priced products",page,async () => {
                    products.sort((a, b) => a.price - b.price);
                    minProduct = products[0];
                    maxProduct = products[products.length - 1];
                    await expect(products.length).toBeGreaterThan(0);
                    await expect(minProduct).toBeDefined();
                    await expect(maxProduct).toBeDefined();
                    console.log("Sorted Products:", products);
                    console.log("Minimum Product:", minProduct);
                    console.log("Maximum Product:", maxProduct);
                    const productData = {minimumProduct: minProduct,maximumProduct: maxProduct};
                    fs.writeFileSync("testAssets/test-data/productData.json",JSON.stringify(productData, null, 4));
                }
            );
            await testStep("Step 4 : Identify the minimum priced product",page,async () => {
                    const minimumProduct = homePage.getNewArrivalProductCard(minProduct.name);
                    await minimumProduct.scrollIntoViewIfNeeded();
                    await expect(minimumProduct).toBeVisible();
                }
            );
            await testStep("Step 5 : Identify the maximum priced product",page,async () => {
                    const maximumProduct = homePage.getNewArrivalProductCard(maxProduct.name);
                    await maximumProduct.scrollIntoViewIfNeeded();
                    await expect(maximumProduct).toBeVisible();
                }
            );
            await testStep("Step 6 : Add minimum priced product to cart",page,async () => {
                    await homePage.addProductToCart(minProduct.name);
                    await expect(cartPage.cartCount).toHaveText("1");
                }
            );
            await testStep("Step 7 : Add maximum priced product to cart",page,async () => {
                    await homePage.addProductToCart(maxProduct.name);
                    await expect(cartPage.cartCount).toHaveText("2");
                }
            );

            await testStep("Step 8 : Validate cart item count",page,async () => {
                    await cartPage.actions.highlight(cartPage.cartCount);
                    await homePage.openCart();
                    await expect(cartPage.cartHeading).toBeVisible();
                    const cartCount = await cartPage.getCartCount();
                    await expect(cartCount).toBe(2);
                }
            );
            await testStep("Step 9 : Validate product names",page,async () => {
                    const productNames = cartPage.productName;
                    for (let i = 0; i < await productNames.count(); i++) {
                        await cartPage.actions.highlight(productNames.nth(i)
                        );
                    }
                    const cartProductNames = await cartPage.getProductNames();
                    await expect(cartProductNames).toContain(minProduct.name);
                    await expect(cartProductNames).toContain(maxProduct.name);
                }
            );

            await testStep("Step 10 : Validate product prices",page,async () => {
                    const unitPrices = cartPage.unitPrice;
                    for (let i = 0; i < await unitPrices.count(); i++) {
                        await cartPage.actions.highlight(unitPrices.nth(i));
                    }
                    const cartPrices = await cartPage.getUnitPrices();
                    await expect(cartPrices).toContain(minProduct.price);
                    await expect(cartPrices).toContain(maxProduct.price);
                }
            );

            await testStep("Step 11 : Validate product quantities",page,async () => {
                    const quantities = cartPage.quantity;
                    for (let i = 0; i < await quantities.count(); i++) {
                        await cartPage.actions.highlight(quantities.nth(i));
                    }
                    const cartQuantities = await cartPage.getQuantities();
                    await expect(cartQuantities).toEqual([1, 1]);
                }
            );
            await testStep("Step 12 : Validate cart subtotal",page,async () => {
                    await cartPage.actions.highlight(cartPage.cartSubTotal);
                    const expectedTotal = minProduct.price + maxProduct.price;
                    const cartTotal = await cartPage.getCartSubtotal();
                    await expect(cartTotal).toBe(expectedTotal);
                }
            );
        }
    );
});
