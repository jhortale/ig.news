import { screen, render } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'

jest.mock('../../services/prismic')

const posts = [
  {
    slug: 'my-post',
    title: 'My Post',
    excerpt: 'This is my post',
    updatedAt: 'today'
  }
]

describe('Posts Page', () => {
  test('should renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('My Post'))
  })

  test('loads initial data', async () => {
    const getPrismicMockedClient = mocked(getPrismicClient)

    getPrismicMockedClient.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [{ type: 'heading', text: 'My New Post' }],
              content: [{ type: 'paragraph', text: 'Post excerpt' }]
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'my-new-post',
              title: 'My New Post',
              excerpt: 'Post excerpt',
              updatedAt: 'April 01, 2021'
            }
          ]
        }
      })
    )
  })
})
