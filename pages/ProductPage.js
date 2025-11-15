const { expect } = require('@playwright/test');

class ProductPage {
  constructor(page) {
    this.page = page;

    // Locators BEFORE clicking product (search results)
    this.productTitles = page.locator('a:has(h3), a:has(div.KzDlHZ)');
      this.addToCartBtn = this.page.getByRole('button', { name: /add to cart/i }).first();
    this.buyNowBtn = this.page.getByRole('button', { name: /buy now/i });
    this.productPrice = this.page.locator('div.Nx9bqj');
    this.productRating = this.page.locator('div.XQDdHH');
    this.productSpecs = this.page.locator('div._3Fm-hO');
	this.addToCompareBtn = this.page.locator('text=Compare');
  }

  // ✔ switch tab + reinitialize all product page locators
  /*async openFirstProduct() {
    await this.productTitles.first().click();

    // Wait for new tab
    await this.page.waitForTimeout(2000);

    // Get new tab
    const pages = this.page.context().pages();
    const newPage = pages[pages.length - 1];

    await newPage.bringToFront();
    this.page = newPage;

    // ✔ RE-INITIALIZE LOCATORS for product page
    this.addToCartBtn = this.page.getByRole('button', { name: /add to cart/i }).first();
    this.buyNowBtn = this.page.getByRole('button', { name: /buy now/i });
    this.productPrice = this.page.locator('div.Nx9bqj');
    this.productRating = this.page.locator('div.XQDdHH');
    this.productSpecs = this.page.locator('div._3Fm-hO');
	this.addToCompareBtn = this.page.locator('text=Compare');
  }*/

  async openFirstProduct() {
  await this.productTitles.first().click();

  // Wait for new tab to open
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    this.productTitles.first().click()
  ]);

  await newPage.waitForLoadState();

  return newPage; // ← return actual page object
}


  async getProductPrice() {
    return (await this.productPrice.first().textContent())?.trim() || 'N/A';
  }

  // 👉 Verify if product name is displayed 
   async getProductName() { 
      const title = await this.page.locator('span.VU-ZEz').textContent(); 
      return title ? title.trim() : 'No title found';
    }

  async getProductRating() {
    return (await this.productRating.first().textContent())?.trim() || 'No rating';
  }

  async getProductSpecs() {
    const specs = await this.productSpecs.allTextContents();
    return specs.length ? specs : ['No specs available'];
  }

  async verifyButtons() {
    await this.page.waitForLoadState('domcontentloaded');

    const addToCartVisible = await this.addToCartBtn.isVisible();
    const buyNowVisible = await this.buyNowBtn.isVisible();

    return { addToCartVisible, buyNowVisible };
  }
    async addToCompare() {
    await this.addToCompareBtn.click();
  }

async addToCart() {
  // Click the add to cart button
  await this.addToCartBtn.click();

  // Wait for possible mini-cart drawer or full cart redirection
  await this.page.waitForTimeout(2000);

  // Check if "GO TO CART" button appears
  const goToCartBtn = this.page.getByRole('button', { name: /go to cart/i });

  if (await goToCartBtn.isVisible()) {
    await goToCartBtn.click();    // ✔ Redirect to cart page
  } else {
    // fallback: manually open cart
    await this.page.goto('https://www.flipkart.com/viewcart?otracker=Cart_Icon_Click');
  }

  // Ensure cart page is fully loaded
  await this.page.waitForLoadState('networkidle');
}

}

module.exports = { ProductPage };