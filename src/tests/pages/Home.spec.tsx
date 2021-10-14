import { screen, render } from '@testing-library/react'
import Home, { getStaticProps } from '../../pages'
import { stripe } from '../../services/stripe'
import { mocked } from 'ts-jest/utils'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text
  // eslint-disable-next-line react/display-name
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  }
}))

jest.mock('../../services/stripe')

describe('Home Page', () => {
  test('should renders correctly', () => {
    render(<Home product={{ amount: 'R$10,00', priceId: 'fake-price-id' }} />)

    expect(screen.getByText('for R$10,00 month'))
  })

  test('loads initial data', async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve)

    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})
