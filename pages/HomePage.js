const { expect } = require('@playwright/test');

class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.closeLoginBtn = page.getByRole('button',{name: '✕'});
    this.searchInput = page.getByRole('textbox', { name: 'Search for Products, Brands' })
    this.searchSubmit = page.locator('button[type="submit"]');
    this.resultItems = page.locator('div._4rR01T, div.KzDlHZ, a:has(h3)'); // product cards
    this.minPriceDropdown = page.getByRole('combobox').first();
    this.maxPriceDropdown = page.getByRole('combobox').nth(1);
  }

  async goto() {
    await this.page.goto('/');
    // wait for shell to render
    await this.page.waitForLoadState('domcontentloaded');
  }

  async dismissLoginPopupIfPresent() {
    // Flipkart’s login modal often appears on first visit
    try{
      await this.closeLoginBtn.waitFor({state:'visible',timeout:3000});
      await this.closeLoginBtn.click();
      console.log('Popup Closed');
    }catch(e){
      console.log('Popup not displayed');
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