class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async click(locator) {
        await this.page.locator(locator).click();
    }

    async fill(locator, value) {
        await this.page.locator(locator).fill(value);
    }

    async getText(locator) {
        return await this.page.locator(locator).textContent();
    }

    async isVisible(locator) {
        return await this.page.locator(locator).isVisible();
    }

    async waitForElement(locator) {
        await this.page.locator(locator).waitFor();
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async takeScreenshot(path) {
        await this.page.screenshot({
            path: path,
            fullPage: true
        });
    }
}

module.exports = BasePage;