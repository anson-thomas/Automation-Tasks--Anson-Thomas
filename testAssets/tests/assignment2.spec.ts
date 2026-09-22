import { test, expect } from "../pages/customFixtures";
import list from "../testData/list.json";
import { testStep } from "../../helper/utility";

test.describe("GreenKart Automation", () => {
    test("Task 1 - Identify and group products by category",async ({ page, greenKartPage }) => {
            await testStep("Navigate to GreenKart application",page,async () => {
                    await greenKartPage.launchWebApp();
                    await expect(page).toHaveURL(/seleniumPractise/);
                },
                greenKartPage.products.first()
            );
            const productNames = await greenKartPage.getProductNames();
            const groupedProducts = productNames.map((name) => {
                if (list.vegetables.includes(name)) {
                    return {
                        name,
                        category: "Vegetables"
                    };
                }
                if (list.fruits.includes(name)) {
                    return {
                        name,
                        category: "Fruits"
                    };
                }
                if (list.nuts.includes(name)) {
                    return {
                        name,
                        category: "Nuts"
                    };
                }
                return {
                    name,
                    category: "Unknown"
                };
            });

            await testStep("Verify products are grouped correctly",page,async () => {
                    const vegetables = groupedProducts.filter((product) => product.category === "Vegetables");
                    const fruits = groupedProducts.filter((product) => product.category === "Fruits");
                    const nuts = groupedProducts.filter((product) => product.category === "Nuts");
                    await expect(vegetables).toHaveLength(list.vegetables.length);
                    await expect(fruits).toHaveLength(list.fruits.length);
                    await expect(nuts).toHaveLength(list.nuts.length);
                    console.log("Vegetables:",vegetables.map((product) => product.name));
                    console.log("Fruits:",fruits.map((product) => product.name));
                    console.log("Nuts:",nuts.map((product) => product.name));
                },
                greenKartPage.products.first()
            );
        }
    );
    test("Task 2 - Add products to cart based on category",async ({ page, greenKartPage }) => {
            const productsToBuy = [
                ...list.productsToBuy.vegetables,
                ...list.productsToBuy.fruits,
                ...list.productsToBuy.nuts
            ];
            await testStep("Navigate to GreenKart application",page,async () => {
                    await greenKartPage.launchWebApp();
                    await expect(page).toHaveURL(/seleniumPractise/);
                },
                greenKartPage.products.first()
            );
            for (const product of productsToBuy) {
                const productCard = greenKartPage.products.filter({hasText: product.name});
                await testStep(`Add ${product.name} to cart`,page,async () => {
                        await greenKartPage.actions.expectVisible(productCard);
                        await greenKartPage.addProductToCart(product.name);
                    },
                    productCard
                );
            }
            await testStep("Verify cart item count",page,async () => {
                    const expectedCartCount = productsToBuy.length;
                    const cartCount = await greenKartPage.getCartCount();
                    await greenKartPage.actions.highlight(greenKartPage.cartLink);
                    expect(cartCount).toBe(expectedCartCount.toString());
                    console.log(`Cart count validated | Expected: ${expectedCartCount} | Actual: ${cartCount}`);
                }
            );
        }
    );
    test("Task 3 - Verify cart items and proceed for billing",async ({page,greenKartPage,cartPage,checkoutPage}) => {
            const productsToBuy = [
                ...list.productsToBuy.vegetables,
                ...list.productsToBuy.fruits,
                ...list.productsToBuy.nuts
            ];
            await testStep("Navigate to GreenKart application",page,async () => {
                    await greenKartPage.launchWebApp();
                    await expect(page).toHaveURL(/seleniumPractise/);
                },
                greenKartPage.products.first()
            );
            for (const product of productsToBuy) {
                const productCard =greenKartPage.products.filter({hasText: product.name});
                await testStep(`Add ${product.name} to cart`,page,async () => {
                        await greenKartPage.actions.expectVisible(productCard);
                        await greenKartPage.addProductToCart(product.name);
                    },
                    productCard
                );
            }
            await testStep("Navigate to cart",page,async () => {
                    await greenKartPage.openCart();
                },
                cartPage.proceedToCheckoutButton
            );
            await testStep("Proceed to checkout",page,async () => {
                    await cartPage.proceedToCheckout();
                },
                checkoutPage.placeOrderButton
            );
            for (const product of productsToBuy) {
                const row = cartPage.getProductRow(product.name);
                await testStep(`Validate ${product.name} in cart`,page,
                    async () => {
                        await cartPage.actions.expectVisible(row);
                        await cartPage.actions.expectText(row.locator(".quantity"),product.quantity.toString());
                        await cartPage.actions.expectText(row.locator(".amount").first(),product.price.toString());
                        const expectedTotal =product.price * product.quantity;
                        await cartPage.actions.expectText(row.locator(".amount").nth(1),expectedTotal.toString()
                        );
                    }
                );
            }
            await testStep("Verify total number of items",page,async () => {
                    const totalItems =productsToBuy.reduce((total, product) =>total + product.quantity,0);
                    await cartPage.actions.expectText(cartPage.numberOfItems,new RegExp(totalItems.toString()));
                }
            );
            await testStep("Verify total amount",page,async () => {
                    const expectedAmount =productsToBuy.reduce((total, product) =>total +product.price *product.quantity,0);
                    await cartPage.actions.expectText(cartPage.totalAmount,new RegExp(expectedAmount.toString()));
                }
            );
            await testStep("Place the order",page,async () => {
                    await checkoutPage.clickPlaceOrder();
                },
                checkoutPage.countryDropdown
            );
            await testStep("Select country and accept terms",page,async () => {
                    await checkoutPage.selectCountry("India");
                    await checkoutPage.acceptTerms();
                },
                checkoutPage.termsCheckbox
            );
            await testStep("Proceed with the order",page,async () => {
                    await checkoutPage.proceed();
                    await expect(checkoutPage.successMessage).toBeVisible();
                },
                checkoutPage.successMessage
            );
        }
    );
});