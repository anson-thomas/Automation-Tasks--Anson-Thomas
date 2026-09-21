import { test, expect } from "../pages/customFixtures";
import data from "../test-data/data.json";
import { testStep } from "../../helper/testStep";

test.describe("Day 5 Assignment", () => {

    test("Add items to cart, Validate Cart Item Count, Validate Products in Cart", async ({ page, shopPage, cartPage }) => {

        const selectedProducts: {
            name: string;
            price: number;
            quantity: number;
        }[] = [];

        await testStep("Verify user is able to launch the Shop page", page, async () => {

            await shopPage.launchShopPage();

            await expect(shopPage.shopHeading).toBeVisible();

            console.log("Shop page launched successfully");
        });

        for (const product of data.products) {

            await testStep(`Verify ${product} can be added to cart`, page, async () => {

                const productDetails = await shopPage.getProductDetails(product);

                const currentCartCount = await cartPage.getCartCount();

                await shopPage.addProductToCart(product);

                await expect(cartPage.cartCount).toHaveText(
                    String(currentCartCount + 1)
                );

                selectedProducts.push(productDetails);

                console.log(
                    `${productDetails.name} added successfully | Price: $${productDetails.price} | Quantity: ${productDetails.quantity}`
                );
            });
        }

        await testStep("Verify user is able to navigate to Cart", page, async () => {

            await cartPage.openCart();

            await expect(cartPage.cartHeading).toBeVisible();

            console.log("Cart page opened successfully");
        });

        await testStep("Verify selected products are successfully added to cart", page, async () => {

            await cartPage.productRows.last().waitFor();

            const cartProducts = await cartPage.getProductNames();
            const cartQuantities = await cartPage.getQuantities();
            const cartPrices = await cartPage.getUnitPrices();

            console.log("Products in cart:", cartProducts);

            for (let i = 0; i < selectedProducts.length; i++) {

                await expect(
                    await cartPage.verifyProductInCart(selectedProducts[i].name)
                ).toBeTruthy();

                console.log(
                    `${selectedProducts[i].name} - Product name validated`
                );

                await expect(cartQuantities[i]).toBe(
                    selectedProducts[i].quantity
                );

                console.log(
                    `${selectedProducts[i].name} - Quantity validated: ${cartQuantities[i]}`
                );

                await expect(cartPrices[i]).toBe(
                    selectedProducts[i].price
                );

                console.log(
                    `${selectedProducts[i].name} - Unit price validated: $${cartPrices[i]}`
                );
            }
        });

        await testStep("Verify cart item count", page, async () => {

            const cartCount = await cartPage.getCartCount();

            const expectedQuantity = selectedProducts.reduce(
                (total, product) => total + product.quantity,
                0
            );

            await expect(cartCount).toBe(expectedQuantity);

            console.log(
                `Cart item count validated | Expected: ${expectedQuantity} | Actual: ${cartCount}`
            );
        });

        await testStep("Verify total price", page, async () => {

            const expectedTotal = selectedProducts.reduce(
                (total, product) => total + (product.price * product.quantity),
                0
            );

            const actualSubtotal = await cartPage.getCartSubtotal();

            await expect(actualSubtotal).toBe(expectedTotal);

            console.log(
                `Total price validated | Expected: $${expectedTotal} | Actual: $${actualSubtotal}`
            );
        });
        await testStep("Verify Reset cart removes all products", page, async () => {

            await cartPage.resetCart();

            await expect(cartPage.productRows).toHaveCount(0);

            const cartCount = await cartPage.getCartCount();

            await expect(cartCount).toBe(0);

            console.log("All products removed from cart successfully");
            console.log(
                `Cart count validated | Expected: 0 | Actual: ${cartCount}`
            );
        });
    });
});