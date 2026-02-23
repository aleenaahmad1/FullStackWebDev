import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Blog from './Blog'

test('renders title and author by default', () => {
  const blog = {
    title: 'how to cook',
    author: 'MM',
    likes: 10,
    url: 'https://www.cooking.com',
    user: {
      username: 'aleena',
      id: 1
    }
  }

  const mockUpdateLikes = vi.fn()
  const mockDeleteBlogs = vi.fn()

  const user = {
    username: 'aleena',
    id: 1
  }

  render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlogs} user={user} />)
  const title = screen.getByText('how to cook')
  const author = screen.getByText('MM')
  const likes = screen.queryByText('Likes 10')
  const url = screen.queryByText('https://www.cooking.com')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(likes).toBeNull()
  expect(url).toBeNull()
})