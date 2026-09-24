import { test, expect } from "../pages/customFixtures";
import { testStep } from "../../helper/utility";
import fs from "fs";

test.describe("New Arrivals Assignment", () => {
    test("Identify, sort and capture minimum and maximum priced products",
        async ({ page, homePage,cartPage }) => {
            
            await testStep("Verify user is able to launch the webpage",page,async()=>{
            await homePage.launchWebApp();
            await homePage.waitForNewArrivalImages();
            await expect(homePage.newArrivalsSection).toBeVisible();              
            });

            await testStep("Verify all new arrival products and their prices can be identified",page,async()=>{
            const products = await homePage.getNewArrivalProducts();
            console.log("New Arrivals:", products);                
            },
            homePage.newArrivalsSection
            );

            const products = await homePage.getNewArrivalProducts(); 
            products.sort((a, b) => a.price - b.price);
            const minProduct = products[0];
            const maxProduct = products[products.length - 1];

            await testStep("Verify all new arrival products are sorted from minimum to maximum price and stored the minimum and maximum product details in JSON.",page,async()=>{
            console.log("Sorted Products:", products);
            console.log("Minimum Product:", minProduct);
            console.log("Maximum Product:", maxProduct);
            const productData = {minimumProduct: minProduct,maximumProduct: maxProduct};
            fs.writeFileSync("testAssets/test-data/productData.json",JSON.stringify(productData, null, 4));
            })

            await testStep("Minimum priced product",page,async () => {
                const minimumProduct =homePage.getNewArrivalProductCard(minProduct.name);
                await minimumProduct.scrollIntoViewIfNeeded();
                }                
            );

            await testStep("Maximum priced product",page,async () => {
                const maximumProduct = homePage.getNewArrivalProductCard(maxProduct.name);
                await maximumProduct.scrollIntoViewIfNeeded();
                }
            );

            await testStep("Add minimum priced product to cart",page,async () => {
                await homePage.addProductToCart(minProduct.name);
                await expect(cartPage.cartCount).toHaveText("1");
            }
            );

            await testStep("Add maximum priced product to cart",page,async () => {
                await homePage.addProductToCart(maxProduct.name);
                await expect(cartPage.cartCount).toHaveText("2");
                }
            );

            await testStep("Validate cart item count",page,async () => {
                
                await cartPage.actions.highlight(cartPage.cartCount);
                await homePage.openCart();
                const cartCount = await cartPage.getCartCount();
                await expect(cartCount).toBe(2);
                }
            );
            
            await testStep("Validate product names",page,async () => {
                    const productNames = cartPage.productName;
                    for (let i = 0; i < await productNames.count(); i++) {
                        await cartPage.actions.highlight(productNames.nth(i)
                        );
                    }
                    const cartProductNames =await cartPage.getProductNames();
                    await expect(cartProductNames).toContain(minProduct.name);
                    await expect(cartProductNames).toContain(maxProduct.name);
                }
            );

            await testStep("Validate product prices",page,async () => {
                    const unitPrices = cartPage.unitPrice;
                    for (let i = 0; i < await unitPrices.count(); i++) {
                        await cartPage.actions.highlight(unitPrices.nth(i));
                    }
                    const cartPrices =await cartPage.getUnitPrices();
                    await expect(cartPrices).toContain(minProduct.price);
                    await expect(cartPrices).toContain(maxProduct.price);
                }
            );
            await testStep("Validate product quantities",page,async () => {
                    const quantities = cartPage.quantity;
                    for (let i = 0; i < await quantities.count(); i++) {
                        await cartPage.actions.highlight(quantities.nth(i));
                    }
                    const cartQuantities =await cartPage.getQuantities();
                    await expect(cartQuantities).toEqual([1, 1]);
                }
            );
            await testStep("Validate cart subtotal",page,async () => {
                    await cartPage.actions.highlight(cartPage.cartSubTotal);
                    const expectedTotal = minProduct.price + maxProduct.price;
                    const cartTotal = await cartPage.getCartSubtotal();
                    await expect(cartTotal).toBe(expectedTotal);
                }
            );
        }
    );
});