import { test, expect } from '@playwright/test';
import list from '../testData/list.json';

test('Task 1 - Identify and group products by category', async ({ page }) => {
    await page.goto('/seleniumPractise/#/');
    const products = page.locator('.product').filter({has: page.locator('.product-name')});
    const productNames = await products.locator('.product-name').allTextContents();
    const groupedProducts = productNames.map(name => {
        if (list.vegetables.includes(name)) {
            return { name, category: 'Vegetables' };
        }
        if (list.fruits.includes(name)) {
            return { name, category: 'Fruits' };
        }
        if (list.nuts.includes(name)) {
            return { name, category: 'Nuts' };
        }
        return { name, category: 'Unknown' };
    });
    const vegetables = groupedProducts.filter(product => product.category === 'Vegetables');
    const fruits = groupedProducts.filter(product => product.category === 'Fruits');
    const nuts = groupedProducts.filter(product => product.category === 'Nuts');

    console.log('Vegetables:', vegetables.map(product => product.name));
    console.log('Vegetable count:', vegetables.length);
    console.log('Fruits:', fruits.map(product => product.name));
    console.log('Fruit count:', fruits.length);
    console.log('Nuts:', nuts.map(product => product.name));
    console.log('Nuts count:', nuts.length);

    expect(vegetables).toHaveLength(list.vegetables.length);
    expect(fruits).toHaveLength(list.fruits.length);
    expect(nuts).toHaveLength(list.nuts.length);
});


test('Task 2 - Add products to cart based on category', async ({ page }) => {
    await page.goto('/seleniumPractise/#/');
    const productsToBuy = [
        ...list.productsToBuy.vegetables,
        ...list.productsToBuy.fruits,
        ...list.productsToBuy.nuts
    ];
    for (const product of productsToBuy) {
        const productCard = page.locator('.product').filter({hasText: product.name});
        await productCard.locator('button').click();
    }
    const expectedCartCount =
        list.productsToBuy.vegetables.length +
        list.productsToBuy.fruits.length +
        list.productsToBuy.nuts.length;

    const cartCount = page.locator('.cart-count');
    await expect(cartCount).toHaveText(expectedCartCount.toString());
});

test('Task 3 - Verify cart items and proceed for billing', async ({ page }) => {
    await page.goto('/seleniumPractise/#/');
    const productsToBuy = [
        ...list.productsToBuy.vegetables,
        ...list.productsToBuy.fruits,
        ...list.productsToBuy.nuts
    ];
    for (const product of productsToBuy) {
        const productCard = page.locator('.product').filter({hasText: product.name});
        await productCard.locator('button').click();
    }
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('button', {name: 'PROCEED TO CHECKOUT'}).click();
    for (const product of productsToBuy) {
        const row = page.locator('#productCartTables tbody tr').filter({hasText: product.name});
        await expect(row).toBeVisible();
        await expect(row.locator('.quantity')).toHaveText(product.quantity.toString());
        await expect(row.locator('.amount').first()).toHaveText(product.price.toString());
        const expectedTotal = product.price * product.quantity;
        await expect(row.locator('.amount').nth(1)).toHaveText(expectedTotal.toString());
    }
    const totalItems = productsToBuy.reduce((total, product) => total + product.quantity,0);
    await expect(page.getByText('No. of Items :').locator('..')).toContainText(totalItems.toString());
    const expectedAmount = productsToBuy.reduce((total, product) => total + (product.price * product.quantity),0);
    await expect(page.getByText('Total Amount :').locator('..')).toContainText(expectedAmount.toString());
    await page.getByRole('button', {name: 'Place Order'}).click();
    await page.getByRole('combobox').selectOption('India');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', {name: 'Proceed'}).click();
    await expect(page.getByText('Thank you, your order has been placed Successfully')).toBeVisible();
    await page.screenshot({path: 'test-results/task3-order-success.png',fullPage: true});
});