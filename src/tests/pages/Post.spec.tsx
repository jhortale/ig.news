import { screen, render } from '@testing-library/react'
import { getSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')
jest.mock('next-auth/client')

const post = {
  slug: 'my-post',
  title: 'My Post',
  content: 'My post content',
  excerpt: 'This is my post',
  updatedAt: 'today'
}

describe('Post Page', () => {
  test('should renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('My Post'))
    expect(screen.getByText('My post content'))
  })

  test('redirect user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: {
        slug: 'my-new-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/my-new-post'
        })
      })
    )
  })

  test('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any)

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

    const response = await getServerSideProps({
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
