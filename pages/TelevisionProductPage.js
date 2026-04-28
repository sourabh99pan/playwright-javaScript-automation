const { expect } = require('@playwright/test');

class TelevisionProductPage {
  constructor(page) {
    this.page = page;

    // Locators BEFORE clicking product (search results)
    this.productTitles = page.locator('a:has(div.RG5Slk)');
  }

  // ✔ switch tab + reinitialize all product page locators
  async openFirstProduct() {
    await this.productTitles.first().click();

    // Wait for new tab
    await this.page.waitForTimeout(2000);

    // Get new tab
    const pages = this.page.context().pages();
    const newPage = pages[pages.length - 1];

    await newPage.bringToFront();
    this.page = newPage;

    // ✔ RE-INITIALIZE LOCATORS for product page
    //this.addToCartBtn = this.page.getByRole('button', { name: /add to cart/i }).first();
    this.buyNowBtn = this.page.getByText('Buy now').first();
    this.buyWithEmi = this.page.getByText('Buy with EMI').first();
    this.productPrice = this.page.locator('text=/₹[0-9,]+/');
    this.productRating = this.page.locator('text=/\\d\\.\\d/');
    this.productSpecs = this.page.locator('div._3Fm-hO');
  }

  async getProductPrice() {
    return (await this.productPrice.first().textContent())?.trim() || 'N/A';
  }

  // 👉 Verify if product name is displayed 
   async getProductName() { 
      const title = await this.page.getByRole('heading', { level: 1 }).first().textContent();
      return title ? title.trim() : 'No title found';
    }

  async getProductRating() {
    const ratingtext = await this.productRating.first().textContent();
    return ratingtext?.trim() || 'No rating';
  }

  async getProductSpecs() {
    const specs = await this.productSpecs.allTextContents();
    return specs.length ? specs : ['No specs available'];
  }

  async verifyButtons() {
    await this.page.waitForLoadState('domcontentloaded');

    const buyWithEmi = await this.buyWithEmi.isVisible();
    const buyNowVisible = await this.buyNowBtn.isVisible();

    return { buyWithEmi, buyNowVisible };
  }
}

module.exports = { TelevisionProductPage };