// playwright.config.js
// JS Project Configuration
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  retries: 0,

  use: {
    baseURL: 'https://www.flipkart.com',
    headless: false,            // run headed while developing
    viewport: null,
    launchOptions: {
    args: ['--start-maximized']
  },
    actionTimeout: 10000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  // ✅ Add reporters section for HTML reporting
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],

  // ✅ Optional: run cleanup automatically before tests
  outputDir: 'test-results',

  // ✅ Browser projects (you can later add firefox, webkit)
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
