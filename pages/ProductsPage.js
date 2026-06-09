const BasePage = require('./BasePage');

class ProductsPage extends BasePage {

    constructor(page) {

        super(page);

        this.productsTitle = '.title';

        this.inventoryItems = '.inventory_item';

        this.cartBadge = '.shopping_cart_badge';

        this.cartIcon = '.shopping_cart_link';

        this.productName = page.locator('.inventory_item_name');

        this.productDesc = page.locator('.inventory_item_desc');

        this.productPrice = page.locator('.inventory_item_price');
    }

    async verifyProductsPage() {

        return await this.page
            .locator(this.productsTitle)
            .textContent();
    }

    async getProductCount() {

        return await this.page
            .locator(this.inventoryItems)
            .count();
    }

    async addProductToCart(productName) {

        await this.page
            .locator('.inventory_item')
            .filter({
                has: this.page.locator(
                    '.inventory_item_name',
                    { hasText: productName }
                )
            })
            .getByRole('button', {
                name: 'Add to cart'
            })
            .click();
    }

    async getCartCount() {

        return await this.page
            .locator(this.cartBadge)
            .textContent();
    }

    async openCart() {

        await this.page
            .locator(this.cartIcon)
            .click();
    }

async getProductDetails(productName) {

    const product = this.page
        .locator('.inventory_item')
        .filter({
            has: this.page.locator(
                '.inventory_item_name',
                { hasText: productName }
            )
        });

    return {
        name: await product
            .locator('[data-test="inventory-item-name"]')
            .textContent(),

        desc: await product
            .locator('[data-test="inventory-item-desc"]')
            .textContent(),

        price: await product
            .locator('[data-test="inventory-item-price"]')
            .textContent()
    };

}
}

module.exports = ProductsPage;