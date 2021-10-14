import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { SubscribeButton } from '.'

jest.mock('next-auth/client')
jest.mock('next/router')

describe('SubscribeButton Component', () => {
  test('should render correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  test('should be redirected when the user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)
    const signInMocked = mocked(signIn)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  test('should be redirected when the user has a valid subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const pushMocked = jest.fn()
    const useSessionMocked = mocked(useSession)

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
    } as never)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMocked).toHaveBeenCalledWith('/posts')
  })
})
