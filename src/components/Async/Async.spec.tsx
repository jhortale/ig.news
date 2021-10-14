import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { Async } from '.'

test('Should show dialog when click toggle button', async () => {
  render(<Async />)

  const button = screen.getByText('Toggle')

  expect(button).toBeInTheDocument()
  expect(await screen.findByText('Dialog')).toBeInTheDocument()
})
