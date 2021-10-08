import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {
  test('should render correctly when the user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument()
  })

  test('should render correctly when the user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John Doe', email: 'john.doe@email.com' },
        expires: 'never'
      },
      false
    ])

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
