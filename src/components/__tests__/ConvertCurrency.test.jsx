import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import ConvertCurrency from '../ConvertCurrency'
import MockAdapter from 'axios-mock-adapter'
import api from '../../services/api'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const mock = new MockAdapter(api)

describe('ConvertCurrency Component', () => {
  it('should convert currency and display the result', async () => {
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)

    // Mock the API response
    mock.onPost('/convert/').reply(200, {
      converted_amount: 85.0,
      conversion_rate: 0.85,
    })

    render(<ConvertCurrency />)

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/From Currency/i), {
      target: { value: 'USD' },
    })
    fireEvent.change(screen.getByLabelText(/To Currency/i), {
      target: { value: 'EUR' },
    })
    fireEvent.change(screen.getByLabelText(/Amount/i), {
      target: { value: '100' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Convert/i }))

    // Assert the result is displayed
    await waitFor(() => {
      expect(
        screen.getByText(
          (content, element) =>
            content.includes('Converted Amount:') &&
            content.includes('85') &&
            content.includes('Rate: 0.85'),
        ),
      ).toBeInTheDocument()
    })
  })
})
