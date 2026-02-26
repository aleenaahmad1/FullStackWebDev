const loginWith = async (page, username, password) => {
    await page.getByRole('button', {name: 'login'}).click()
    await page.getByLabel('username').fill(username)
    await page.getByLabel('password').fill(password)
    await page.getByRole('button', {name: 'login'}).click()
}

const addBlog = async ( page, title, author, url ) => {
    await page.getByRole('button', { name: 'Add Blog' }).click()
                
    await page.getByLabel('Title').fill(title)
    await page.getByLabel('Author').fill(author)
    await page.getByLabel('URL').fill(url)
    await page.getByRole('button', { name: 'Create' }).click()
}

const likeBlog = async ( page, title ) => {
    const blog = page.locator('.blog', { hasText: title })
    await blog.getByRole('button', { name: 'view'}).click()
    await blog.getByRole('button', { name: 'Like'}).click()
    await blog.getByRole('button', { name: 'hide'}).click()    
}

const viewDetails = async ( page, title ) => {
    const blog = page.locator('.blog', { hasText: title })
    await blog.getByRole('button', { name: 'view'}).click()
}
export { loginWith, addBlog, likeBlog, viewDetails }