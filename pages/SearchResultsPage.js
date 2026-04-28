// pages/SearchResultsPage.js
class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('a:has(div.RG5Slk)');
  }

  async getProductNames() {
    return await this.productTitles.allTextContents();
  }

  async openProductByIndex(index = 0) {
    await this.productTitles.nth(index).click();
    // Wait for new tab
    await this.page.waitForTimeout(2000);

    //get new tab
    const pages = this.page.context().pages();
    const newPage = pages[pages.length - 1];
    await newPage.bringToFront();
    return newPage; // return new product detail page
  }

  async openFirstProduct() {
  const firstProduct = this.productTitles.first();

  await firstProduct.waitFor();

  const context = this.page.context();
  const existingPages = context.pages();

  await firstProduct.click();

  // wait a bit for navigation or new tab
  await this.page.waitForTimeout(1000);

  const allPages = context.pages();

  let pageToUse;

  if (allPages.length > existingPages.length) {
    // new tab opened
    pageToUse = allPages[allPages.length - 1];
  } else {
    // same tab navigation
    pageToUse = this.page;
  }

  await pageToUse.waitForLoadState();

  return pageToUse;
  }

  async openProductByName(text) {
    await this.page.locator(`div._4rR01T:has-text("${text}")`).first().click();
  }
}

module.exports = { SearchResultsPage };
