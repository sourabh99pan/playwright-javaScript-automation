// pages/SearchResultsPage.js
class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.productTitles = page.locator('div._4rR01T, div.KzDlHZ'); // Flipkart TV names
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
  await this.productTitles.first().click();

  // Wait for new tab to open
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    //this.productTitles.first().click()
  ]);

  await newPage.waitForLoadState();

  return newPage; // ← return actual page object
}

  async openProductByName(text) {
    await this.page.locator(`div._4rR01T:has-text("${text}")`).first().click();
  }
}

module.exports = { SearchResultsPage };
