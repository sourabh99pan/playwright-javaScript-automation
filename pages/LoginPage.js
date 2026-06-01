const BasePage = require('./BasePage');

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.username = '#user-name';
        this.password = '#password';
        this.loginButton = '#login-button';
        this.errorMessage = '[data-test="error"]';
    }

    async navigateToApplication() {

        await this.navigate(
            'https://www.saucedemo.com'
        );
    }

    async login(username, password) {

        await this.fill(
            this.username,
            username
        );

        await this.fill(
            this.password,
            password
        );

        await this.click(
            this.loginButton
        );
    }

    async getErrorMessage() {

        return await this.getText(
            this.errorMessage
        );
    }
}

module.exports = LoginPage;