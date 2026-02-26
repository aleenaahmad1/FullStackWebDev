const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, addBlog, likeBlog, viewDetails } = require('./helper')

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
        const loginButton = page.getByRole('button', {name: 'login'})
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
                await addBlog(page, 'another blog by playwright', 'Poshmal', 'test2.com')
                await addBlog(page, 'a third blog by playwright', 'Poshmal', 'test2.com')
            })
        
            test('a blog can be liked', async ({ page }) => {
                const blog = page.locator('.blog', { hasText: 'another test blog by playwright' })
                
                await blog.getByRole('button', { name: 'view'}).click()
                await blog.getByRole('button', { name: 'Like'}).click()
                await expect(page.getByText('Likes 1')).toBeVisible()
            })  

            test('a blog can be deleted by the user who created it', async ({ page }) => {
                const blog = page.locator('.blog', { hasText: 'test blog by playwright' })
                
                await blog.getByRole('button', { name: 'view'}).click()
                page.on('dialog', dialog => dialog.accept())
                await blog.getByRole('button', { name: 'Remove'}).click()
                await expect(page.getByText('test blog by playwright')).not.toBeVisible()
            })

            test('remove button not visible to a different user', async ({ page, request }) => {
                await request.post('http://localhost:3003/api/users', {
                    data: {
                        name: 'Another User',
                        username: 'anotheruser',
                        password: 'password'
                    }
                })
                await page.getByRole('button', { name: 'Log Out' }).click()
                await loginWith(page, 'anotheruser', 'password')

                const blog = page.locator('.blog', { hasText: 'test blog by playwright' })
                
                await blog.getByRole('button', { name: 'view'}).click()
                await expect(blog.getByRole('button', { name: 'Remove'})).not.toBeVisible()
            })

            test.only('blogs displayed in order of likes', async ({ page }) => {
                await likeBlog(page, 'test blog by playwright')
                await page.pause()
                await likeBlog(page, 'test blog by playwright')
                await page.pause()
                await likeBlog(page, 'another blog by playwright')
                await page.pause()

                // viewDetails(page, 'test blog by playwright')
                const blogs = page.locator('.blog')
                await expect(blogs.first()).toContainText('test blog by playwright')
                await expect(blogs.nth(1)).toContainText('another blog by playwright')
                await expect(blogs.nth(2)).toContainText('a third blog by playwright')

            })
    })
  })
})
