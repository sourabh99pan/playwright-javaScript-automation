// pages/AllProductDetailsPage.js
class AllProductDetailsPage {
  constructor(page) {
    this.page = page;

    // Flipkart has multiple structures, so we use a combined locator:
    this.productTitles = page.locator(
      'div._4rR01T, div.KzDlHZ, a > div.s1Q9rs'
    );

    this.productPrices = page.locator('div._30jeq3, div.Nx9bqj');
  }

  /**
   * 🔍 Returns an array of product objects:
   * [{ title: "...", price: "₹24,999" }, ...]
   */
async getProductsSortedByPrice() {
  // Get all titles and prices
  const titles = await this.page.locator('div._4rR01T, div.KzDlHZ').allTextContents();
  const prices = await this.page.locator('div.Nx9bqj').allTextContents();

  const count = Math.min(titles.length, prices.length);

  let products = [];

  for (let i = 0; i < count; i++) {
    products.push({
      name: titles[i]?.trim() || "No Name",
      price: parseInt(prices[i].replace(/[₹,]/g, "")) || 0
    });
  }

  // Sort by price ASC
  products.sort((a, b) => a.price - b.price);

  return products;
}


}

module.exports = { AllProductDetailsPage };
