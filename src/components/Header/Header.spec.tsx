import { render, screen } from '@testing-library/react'
import { Header } from '.'

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

jest.mock('next/image', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  }
}))

describe('Header Component', () => {
  test('should render Header correctly', () => {
    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})
