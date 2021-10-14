import { render, screen } from '@testing-library/react'
import { Async } from '.'

test('Should show dialog when click toggle button', async () => {
  render(<Async />)

  screen.logTestingPlaygroundURL()

  const button = screen.getByText('Toggle')

  const dialog = await screen.findByText('Dialog')

  expect(button).toBeInTheDocument()
  expect(dialog).toBeInTheDocument()
})
