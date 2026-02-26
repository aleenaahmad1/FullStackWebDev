const { test, describe, expect, beforeEach } = require('@playwright/test');

describe('Blog App', () => {
    beforeEach( async ({ page }) => {

        await page.goto('http://localhost:5173')
    })

    test('Login button is shown', async ({ page }) => {
        const loginButton = await page.getByRole('button', {name: 'login'})
        await expect(loginButton).toBeVisible()
        await loginButton.click()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })
})