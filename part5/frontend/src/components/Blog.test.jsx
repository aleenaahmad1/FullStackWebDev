import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

// test('renders title and author by default', () => {
//   const blog = {
//     title: 'how to cook',
//     author: 'MM',
//     likes: 10,
//     url: 'https://www.cooking.com',
//     user: {
//       username: 'aleena',
//       id: 1
//     }
//   }

//   const mockUpdateLikes = vi.fn()
//   const mockDeleteBlogs = vi.fn()

//   const user = {
//     username: 'aleena',
//     id: 1
//   }

//   render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlogs} user={user} />)
//   const title = screen.getByText('how to cook')
//   const author = screen.getByText('MM')
//   const likes = screen.queryByText('Likes 10')
//   const url = screen.queryByText('https://www.cooking.com')

//   expect(title).toBeDefined()
//   expect(author).toBeDefined()
//   expect(likes).toBeNull()
//   expect(url).toBeNull()
// })

// test('renders url and likes when view button is clicked', async () => {
//   const blog = {
//     title: 'how to cook',
//     author: 'MM',
//     likes: 10,
//     url: 'https://www.cooking.com',
//     user: {
//       username: 'aleena',
//       id: 1
//     }
//   }

//   const blogUser = {
//     username: 'aleena',
//     id: 1
//   }

//   const mockUpdateLikes = vi.fn()
//   const mockDeleteBlogs = vi.fn()

//   render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlogs} user={blogUser} />)

//   const user = userEvent.setup()
//   const button = screen.getByText('view')
//   await user.click(button)

//   const likes = screen.getByText('Likes 10')
//   const url = screen.getByText('https://www.cooking.com')

//   expect(likes).toBeDefined()
//   expect(url).toBeDefined()

// })

test('event handler called twice if button clicked twice', async () => {
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

  const blogUser = {
    username: 'aleena',
    id: 1
  }

  const mockUpdateLikes = vi.fn()
  const mockDeleteBlogs = vi.fn()

  render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlogs} user={blogUser} />)

  const user = userEvent.setup()

  // first click the view button to show the like button
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateLikes.mock.calls).toHaveLength(2)
})

test('event handler called with correct details when new blog added', async () => {
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

  const blogUser = {
    username: 'aleena',
    id: 1
  }

  const mockUpdateLikes = vi.fn()
  const mockDeleteBlogs = vi.fn()

  render(<Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlogs} user={blogUser} />)

  const user = userEvent.setup()

  // first click the view button to show the like button
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateLikes.mock.calls).toHaveLength(2)
})