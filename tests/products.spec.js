const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

require('dotenv').config();

test('Verify Product Count', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const productsPage =
        new ProductsPage(page);

    const cartPage =
        new CartPage(page);

    await loginPage
        .navigateToApplication();

        console.log("USERNAME:", process.env.APP_USERNAME);
        console.log("PASSWORD:", process.env.APP_PASSWORD);

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

    const cartPage =
        new CartPage(page);

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

test('Add Product To Cart and verify details', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const productsPage =
        new ProductsPage(page);
    
    const cartPage =
        new CartPage(page);

    await loginPage
        .navigateToApplication();

    await loginPage.login(
        process.env.APP_USERNAME,
        process.env.APP_PASSWORD
    );

     const expectedProduct =
        await productsPage.getProductDetails(
            'Sauce Labs Bike Light'
        );

    await productsPage.addProductToCart(
        'Sauce Labs Bike Light'
    );

    await productsPage.openCart();

    const actualProduct =
        await cartPage.getCartProductDetails();

    expect(actualProduct.name)
        .toBe(expectedProduct.name);

    expect(actualProduct.desc)
        .toBe(expectedProduct.desc);

    expect(actualProduct.price)
        .toBe(expectedProduct.price);
});
