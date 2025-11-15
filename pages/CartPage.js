// pages/CartPage.js
class CartPage {
  constructor(page) {
    this.page = page;

    // Cart item name (product title in cart)
    this.cartItemName = page.locator('a.T2CNXf, a._2qUgWb, a.FKcPFB');
    
    // Cart item price
    this.cartItemPrice = page.locator('span.LAlF6k, div.Nx9bqj'); 
  }

  async getCartItemName() {
    await this.cartItemName.first().waitFor({ state: 'visible', timeout: 20000 });
    const name = await this.cartItemName.first().textContent();
    return name?.trim() || 'No name found';
  }

  async getCartItemPrice() {
    await this.cartItemPrice.first().waitFor({ state: 'visible', timeout: 20000 });
    const price = await this.cartItemPrice.nth(1).textContent();
    return price?.trim() || 'N/A';
  }
}

module.exports = { CartPage };
