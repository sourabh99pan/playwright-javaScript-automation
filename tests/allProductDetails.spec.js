// tests/get-products.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { AllProductDetailsPage } = require('../pages/AllProductDetailsPage');

test('Get all products and prices for any item', async ({ page }) => {
  const home = new HomePage(page);
  const results = new AllProductDetailsPage(page);

  await home.goto();
  await home.dismissLoginPopupIfPresent();

  await home.search('Mobiles');   // <-- YOU CAN ENTER ANY PRODUCT

  const products = await results.getProductsSortedByPrice();

 console.log("Products sorted by price:");
 console.table(products);

  expect(products.length).toBeGreaterThan(0);
});
