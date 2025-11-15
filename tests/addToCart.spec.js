// tests/add-to-cart.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');

test('Add product to cart and validate cart details', async ({ page }) => {
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);

  // Step 1: Open Flipkart
  await home.goto();
  await home.dismissLoginPopupIfPresent();

  // Step 2: Search Product
  await home.search('Samsung TV');

  // Step 3: Click on the first product 

  const productPageInstance = await results.openFirstProduct();
    const product = new ProductPage(productPageInstance);
  const expectedName = await product.getProductName();
  const expectedPrice = await product.getProductPrice();

  // Step 4: Add to Cart
  await product.addToCart();

   // 👉 CartPage must use SAME product page
  const cart = new CartPage(productPageInstance);

  // Step 5: Validate cart
  const cartName = await cart.getCartItemName();
  const cartPrice = await cart.getCartItemPrice();

  console.log('Product Name:', expectedName);
  console.log('Cart Name:', cartName);
  console.log('Product Price:', expectedPrice);
  console.log('Cart Price:', cartPrice);

  expect(cartName).toContain(expectedName.substring(0, 10)); // fuzzy match
  expect(cartPrice).toBe(expectedPrice);
});
