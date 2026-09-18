import { test, expect } from "@playwright/test";
import list from "../testData/list.json";

import GreenKartPage from "../pages/greenKartPage";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";

test.describe("GreenKart Automation", () => {
  test("Task 1 - Identify and group products by category", async ({ page }, testInfo) => {
    const greenKartPage = new GreenKartPage(page);
    await test.step("Navigate to GreenKart application", async () => {
      await greenKartPage.launchWebApp();
      await expect(page).toHaveURL(/seleniumPractise/);
      await greenKartPage.actions.screenshot("task1-greenkart-page", testInfo);
    });
    const groupedProducts = await test.step(
      "Identify and group products by category",async () => {
        const productNames = await greenKartPage.getProductNames();
        const groupedProducts = productNames.map((name) => {
          if (list.vegetables.includes(name)) {
            return { name, category: "Vegetables" };
          }
          if (list.fruits.includes(name)) {
            return { name, category: "Fruits" };
          }
          if (list.nuts.includes(name)) {
            return { name, category: "Nuts" };
          }
          return { name, category: "Unknown" };
        });
        await greenKartPage.actions.screenshot("task1-products-grouped", testInfo);
        return groupedProducts;
      }
    );

    await test.step("Verify products are grouped correctly", async () => {
      const vegetables = groupedProducts.filter((product) => product.category === "Vegetables");
      const fruits = groupedProducts.filter((product) => product.category === "Fruits");
      const nuts = groupedProducts.filter((product) => product.category === "Nuts");
      expect(vegetables).toHaveLength(list.vegetables.length);
      expect(fruits).toHaveLength(list.fruits.length);
      expect(nuts).toHaveLength(list.nuts.length);
      console.log("Vegetables:",vegetables.map((product) => product.name));
      console.log("Fruits:",fruits.map((product) => product.name));
      console.log("Nuts:",nuts.map((product) => product.name));
      await greenKartPage.actions.screenshot("task1-grouping-validation", testInfo);
    });
  });

  test("Task 2 - Add products to cart based on category", async ({page}, testInfo) => {
    const greenKartPage = new GreenKartPage(page);
    const productsToBuy = [...list.productsToBuy.vegetables,...list.productsToBuy.fruits,...list.productsToBuy.nuts,];
    await test.step("Navigate to GreenKart application", async () => {
      await greenKartPage.launchWebApp();
      await expect(page).toHaveURL(/seleniumPractise/);
      await greenKartPage.actions.screenshot("task2-greenkart-page", testInfo);
    });
    await test.step("Add category-based products to cart", async () => {
      for (const product of productsToBuy) {
        await greenKartPage.addProductToCart(product.name);
      }
      await greenKartPage.actions.screenshot("task2-products-added-to-cart",testInfo);
    });
    await test.step("Verify cart item count", async () => {
      const expectedCartCount = productsToBuy.length;
      const cartCount = await greenKartPage.getCartCount();
      expect(cartCount).toBe(expectedCartCount.toString());
      await greenKartPage.actions.screenshot("task2-cart-count-validation", testInfo);
    });
  });

  test("Task 3 - Verify cart items and proceed for billing", async ({page}, testInfo) => {
    const greenKartPage = new GreenKartPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const productsToBuy = [...list.productsToBuy.vegetables,...list.productsToBuy.fruits,...list.productsToBuy.nuts,];
    await test.step("Navigate to GreenKart application", async () => {
      await greenKartPage.launchWebApp();
      await expect(page).toHaveURL(/seleniumPractise/);
      await greenKartPage.actions.screenshot("task3-greenkart-page", testInfo);
    });
    await test.step("Add products to cart", async () => {
      for (const product of productsToBuy) {
        await greenKartPage.addProductToCart(product.name);
      }
      await greenKartPage.actions.screenshot("task3-products-added-to-cart",testInfo);
    });
    await test.step("Navigate to cart", async () => {
      await greenKartPage.openCart();
      await greenKartPage.actions.screenshot("task3-cart-page", testInfo);
    });
    await test.step("Proceed to checkout", async () => {
      await cartPage.proceedToCheckout();
      await greenKartPage.actions.screenshot("task3-checkout-page", testInfo);
    });
    await test.step("Verify cart products, quantities and prices", async () => {
      for (const product of productsToBuy) {
        const row = cartPage.getProductRow(product.name);
        await expect(row).toBeVisible();
        await expect(row.locator(".quantity")).toHaveText(product.quantity.toString());
        await expect(row.locator(".amount").first()).toHaveText(product.price.toString());
        const expectedTotal = product.price * product.quantity;
        await expect(row.locator(".amount").nth(1)).toHaveText(expectedTotal.toString());
      }
      await greenKartPage.actions.screenshot("task3-cart-products-validation", testInfo);
    });

    await test.step("Verify total number of items", async () => {
      const totalItems = productsToBuy.reduce((total, product) => total + product.quantity,0);
      const numberOfItems = await cartPage.getNumberOfItems();
      expect(numberOfItems).toContain(totalItems.toString());
      await greenKartPage.actions.screenshot("task3-total-items-validation", testInfo);
    });

    await test.step("Verify total amount", async () => {
      const expectedAmount = productsToBuy.reduce((total, product) =>total + product.price * product.quantity,0);
      const totalAmount = await cartPage.getTotalAmount();
      expect(totalAmount).toContain(expectedAmount.toString());
      await greenKartPage.actions.screenshot("task3-total-amount-validation", testInfo);
    });

    await test.step("Place the order", async () => {
      await checkoutPage.clickPlaceOrder();
      await greenKartPage.actions.screenshot("task3-place-order-page", testInfo);
    });

    await test.step("Select country and accept terms", async () => {
      await checkoutPage.selectCountry("India");
      await checkoutPage.acceptTerms();
      await greenKartPage.actions.screenshot("task3-country-and-terms", testInfo);
    });

    await test.step("Proceed with the order", async () => {
      await checkoutPage.proceed();
      await expect(checkoutPage.successMessage).toBeVisible();
      await greenKartPage.actions.screenshot("task3-order-success", testInfo);
    });
  });
});