const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, addBlog } = require('./helper')

describe('Blog App', () => {
    beforeEach( async ({ page, request }) => {
        const res = await request.post('http://localhost:3003/api/testing/reset')
        console.log('RESET STATUS:', res.status())
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

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'poshii', '123456')
        })

        test('a new blog can be created', async ({ page }) => {
            await addBlog(page, 'test blog by playwright', 'Poshmal', 'test.com')
            
            await expect(page.getByText('test blog by playwright')).toBeVisible()
        })

        describe('and a blog exists', () => {
            beforeEach(async ({ page }) => {
                await addBlog(page, 'test blog by playwright', 'Poshmal', 'test.com')
                await addBlog(page, 'another test blog by playwright', 'Poshmal', 'test2.com')
                await addBlog(page, 'a third test blog by playwright', 'Poshmal', 'test2.com')
            })
        
        test.only('a blog can be liked', async ({ page }) => {
            const blog = page.locator('.blog', { hasText: 'another test blog by playwright' })
            
            await blog.getByRole('button', { name: 'view'}).click()
            await blog.getByRole('button', { name: 'Like'}).click()
            await expect(page.getByText('Likes 1')).toBeVisible()
        })  

        })
    })
})