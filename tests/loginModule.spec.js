const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

const data = require(
    '../testdata/login_data.json'
);

test.describe('Login Module', () => {

    data.loginData.forEach((testData) => {

        test(
            `Login Test - ${testData.expected}`,
            async ({ page }) => {

                const loginPage =
                    new LoginPage(page);

                await loginPage
                    .navigateToApplication();

                await loginPage.login(
                    testData.username,
                    testData.password
                );

                if (
                    testData.expected === 'Pass'
                ) {

                    await expect(
                        page.locator('.title')
                    ).toHaveText('Products');

                } else {

                    await expect(
                        page.locator(
                            '[data-test="error"]'
                        )
                    ).toBeVisible();
                }
            }
        );
    });
});