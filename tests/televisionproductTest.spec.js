// tests/television-product.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { TelevisionProductPage } = require('../pages/TelevisionProductPage');

test.describe('Television Product Details', () => {

  test('Validate first product details and buttons', async ({ page }) => {
    const home = new HomePage(page);
    const product = new TelevisionProductPage(page);

    // 🏠 Navigate to Flipkart and search
    await home.goto();
    await home.dismissLoginPopupIfPresent();
    await home.search('Television');

    // 🖱️ Click on the first product
    await product.openFirstProduct();

    // 🔍 Validate product details
    const name = await product.getProductName();
    const price = await product.getProductPrice();
    const rating = await product.getProductRating();
    const specs = await product.getProductSpecs();
    const { buyNowVisible, addToCartVisible } = await product.verifyButtons();

    // 🧾 Assertions + Logs
    console.log('🖥️ Product Name:', name);
    console.log('💰 Price:', price);
    console.log('⭐ Rating:', rating);
    console.log('📋 Specs:', specs);
    console.log('🛒 Add to Cart Visible:', addToCartVisible);
    console.log('⚡ Buy Now Visible:', buyNowVisible);

    expect(name).not.toBe('No title found');
    expect(price).not.toBe('N/A');
    expect(buyNowVisible).toBeTruthy();
    expect(addToCartVisible).toBeTruthy();
  });

});
