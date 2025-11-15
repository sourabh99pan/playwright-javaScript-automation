const { expect } = require('@playwright/test');

class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.closeLoginBtn = this.page.locator('button:has-text("✕"), button[aria-label="Close"]');
    this.searchInput = this.page.locator('input[title="Search for Products, Brands and More"], input[name="q"]');
    this.searchSubmit = this.page.locator('button[type="submit"]');
    this.resultItems = this.page.locator('div._4rR01T, div.KzDlHZ, a:has(h3)'); // product cards
    this.minPriceDropdown = this.page.getByRole('combobox').first();
    this.maxPriceDropdown = this.page.getByRole('combobox').nth(1);
  }

  async goto() {
    await this.page.goto('/');
    // wait for shell to render
    await this.page.waitForLoadState('domcontentloaded');
  }

  async dismissLoginPopupIfPresent() {
    // Flipkart’s login modal often appears on first visit
    if (await this.closeLoginBtn.first().isVisible().catch(() => false)) {
      await this.closeLoginBtn.first().click();
    }
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchSubmit.click();
    await this.page.waitForLoadState('domcontentloaded');
    // Results page has ?q= in URL
    await expect(this.page).toHaveURL(/[\?&]q=/);
  }

  async countResults() {
    return await this.resultItems.count();
  }

  async applyFilterPrice(minLabel, maxLabel){
    console.log("Applying price filter");
    await this.minPriceDropdown.waitFor({ state: 'visible' });
    await this.minPriceDropdown.selectOption({label:minLabel});
    await this.maxPriceDropdown.waitFor({ state: 'visible' });
    await this.maxPriceDropdown.selectOption({label:maxLabel});
    await this.page.waitForTimeout(3000);
  }
}

module.exports = { HomePage };