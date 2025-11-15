// tests/flipkart.search.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test.describe('Flipkart search', () => {

  test('search televisions and see results', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.dismissLoginPopupIfPresent();

    await home.search('television');
    const count = await home.countResults();

    console.log('Result items:', count);
    expect(count).toBeGreaterThan(0);
  }); 

    test('search LG televisions and see results', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.dismissLoginPopupIfPresent();

    await home.search('LG television');
    const count = await home.countResults();

    console.log('Result items:', count);
    expect(count).toBeGreaterThan(0);
  }); 

      test('search televisions between 15k to 60k', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.dismissLoginPopupIfPresent();

    await home.search('LG television');
    await home.applyFilterPrice("₹15000","₹60000");
    const count = await home.countResults();

    console.log('Result items between 15k to 60k:', count);
    expect(count).toBeGreaterThan(0);
  }); 

});
