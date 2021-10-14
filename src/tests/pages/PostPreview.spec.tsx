import { screen, render } from '@testing-library/react'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')
jest.mock('next/router')

const post = {
  slug: 'my-post',
  title: 'My Post',
  content: 'My post content',
  excerpt: 'This is my post',
  updatedAt: 'today'
}

describe('Post Preview Page', () => {
  test('should renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText('My Post'))
    expect(screen.getByText('Wanna continue reading?'))
  })

  test('should redirect when user is subscribed', () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'john.doe@email.com' },
        activeSubscription: 'valid',
        expires: 'never'
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<Post post={post} />)

    expect(pushMocked).toHaveBeenCalledWith('/posts/my-post')
  })

  test('loads initial data', async () => {
    const getPrismicMockedClient = mocked(getPrismicClient)

    getPrismicMockedClient.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My New Post' }],
          content: [{ type: 'paragraph', text: 'Post Content' }]
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post Content</p>',
            updatedAt: 'April 01, 2021'
          }
        }
      })
    )
  })
})
