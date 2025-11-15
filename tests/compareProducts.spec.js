// tests/compare.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SearchResultsPage } = require('../pages/SearchResultsPage');
const { ProductPage } = require('../pages/ProductPage');
const { ComparePage } = require('../pages/ComparePage');

test.skip('Compare two televisions', async ({ page }) => {
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);
  const compare = new ComparePage(page);

  await home.goto();
  await home.dismissLoginPopupIfPresent();
  await home.search('Television');

  // Open first product
  const p1Page = await results.openProductByIndex(0);
  const firstProduct = new ProductPage(p1Page);
  firstProduct.init();
  const p1Name = await firstProduct.getName();
  await firstProduct.addToCompare();

  // Open second product
  await page.bringToFront();
  const p2Page = await results.openProductByIndex(1);
  const secondProduct = new ProductPage(p2Page);
  secondProduct.init();
  const p2Name = await secondProduct.getName();
  await secondProduct.addToCompare();

  // Compare Page
  await compare.openComparePage();
  const comparedNames = await compare.getComparedProductNames();

  console.log('Compared Products:', comparedNames);

  expect(comparedNames).toContain(p1Name);
  expect(comparedNames).toContain(p2Name);
});
