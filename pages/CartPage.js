const BasePage = require('./BasePage');

class CartPage extends BasePage {

    constructor(page) {

        super(page);

        this.productName = page.locator('.inventory_item_name');

        this.productDesc = page.locator('.inventory_item_desc');

        this.productPrice = page.locator('.inventory_item_price');
    }
    
async getCartProductDetails() {

    await this.productName.first().waitFor();

    return {
        name: await this.productName.first().textContent(),
        desc: await this.productDesc.first().textContent(),
        price: await this.productPrice.first().textContent()
    };
}
}

module.exports = CartPage;