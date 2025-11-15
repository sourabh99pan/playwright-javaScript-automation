// pages/ComparePage.js
class ComparePage {
  constructor(page) {
    this.page = page;
    this.comparedProducts = page.locator('div._1YokD2._3Mn1Gg ._3dGepu');
  }

  async openComparePage() {
    await this.page.goto('/compare');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getComparedProductNames() {
    return await this.comparedProducts.locator('._1sPNy2').allTextContents();
  }

  async getComparedPrices() {
    return await this.comparedProducts.locator('._30jeq3').allTextContents();
  }
}

module.exports = { ComparePage };
