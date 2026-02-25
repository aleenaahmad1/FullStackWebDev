import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

test('event handler called with correct details when new blog added', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<AddBlog handleNewBlog={addBlog} />)

  const titleInput = screen.getByLabelText('Title:')
  const authorInput = screen.getByLabelText('Author:')
  const urlInput = screen.getByLabelText('URL:')

  // console.log('Checking inputs:', titleInput, authorInput, urlInput)

  const submitButton = screen.getByText('Create')

  await user.type(titleInput, 'test Blog')
  await user.type(authorInput, 'test')
  await user.type(urlInput, 'blog.com')

  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('test Blog')
  expect(addBlog.mock.calls[0][0].author).toBe('test')
  expect(addBlog.mock.calls[0][0].url).toBe('blog.com')

})