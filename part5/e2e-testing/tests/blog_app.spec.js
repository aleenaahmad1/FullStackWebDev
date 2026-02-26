const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog App', () => {
    beforeEach( async ({ page, request }) => {
        await request.post('http://localhost:3003/api/users/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Poshi',
                username: 'poshii', 
                password: '123456'
            }
        })

        await page.goto('http://localhost:5173')
        
    })

    test('Login Form is shown', async ({ page }) => {
        const loginButton = await page.getByRole('button', {name: 'login'})
        await expect(loginButton).toBeVisible()
        await loginButton.click()
        await expect(page.getByLabel('username')).toBeVisible()
        await expect(page.getByLabel('password')).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'poshii', '123456')
            await expect(page.getByText('Logged in as poshii')).toBeVisible()
        })

        test('fails with incorrect credentials', async ({ page }) => {
            await loginWith(page, 'poshii', 'wrongpassword')
            await expect(page.getByText('Wrong username or password')).toBeVisible()

        })
    })
})