const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

require('dotenv').config();

test('Verify Product Count', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const productsPage =
        new ProductsPage(page);

    await loginPage
        .navigateToApplication();

        console.log("USERNAME:", process.env.USERNAME);
        console.log("PASSWORD:", process.env.PASSWORD);

    await loginPage.login(
        process.env.APP_USERNAME,
        process.env.APP_PASSWORD
    );

    const count =
        await productsPage.getProductCount();

    console.log(
        'Product Count:',
        count
    );

    expect(count).toBeGreaterThan(0);
});


test('Add Product To Cart', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const productsPage =
        new ProductsPage(page);

    await loginPage
        .navigateToApplication();

    await loginPage.login(
        process.env.APP_USERNAME,
        process.env.APP_PASSWORD
    );

    await productsPage.addProductToCart(
        'Sauce Labs Backpack'
    );

    const cartCount =
        await productsPage.getCartCount();

    expect(cartCount).toBe('1');
});